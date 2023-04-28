import { configureMockStore } from '@jedmao/redux-mock-store';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { lorem } from 'faker';
import { useOfferReviews } from './use-offer-reviews';
import { Offer } from 'src/types/types';
import { FetchStatus } from 'src/consts/api';
import { fetchReviewsAction } from 'src/store/api-reviews/api-reviews.actions';

const middlewares = [ thunk ];
const makeMockStore = configureMockStore(middlewares);

const offerWithUnknownId = {
  id: 1_000_000_000,
};

const offerWithId1 = {
  id: 1,
};

const reviewsForOffer1 = [
  {
    id: offerWithId1.id,
    comment: lorem.sentence(),
  },
  {
    id: offerWithId1.id,
    comment: lorem.sentence(),
  },
];


describe('Hook: useOfferReviews()', () => {
  it('returns reviews for offer', () => {
    const store = makeMockStore({
      REVIEWS: {
        dataMap: {
          [ offerWithId1.id ]: reviewsForOffer1,
        }
      }
    });

    const { result } = renderHook(
      () => useOfferReviews(offerWithId1 as Offer),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> },
    );

    expect(result.current).toEqual(reviewsForOffer1);
  });


  it('returns empty array, when no reviews in the store for the "id"', () => {
    const store = makeMockStore({
      REVIEWS: {
        dataMap: {
          [ offerWithId1.id ]: reviewsForOffer1,
          fetchStatus: FetchStatus.Pending,
        },
      }
    });

    const { result } = renderHook(
      () => useOfferReviews(offerWithUnknownId as Offer),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> },
    );

    expect(result.current)
      .toEqual([]);
  });


  it('returns empty array, when "offer" is not provided', () => {
    const store = makeMockStore({
      REVIEWS: {
        dataMap: {
          [ offerWithId1.id ]: reviewsForOffer1,
          fetchStatus: FetchStatus.Pending,
        },
      }
    });

    const { result } = renderHook(
      () => useOfferReviews(null),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> },
    );

    expect(result.current)
      .toEqual([]);
  });


  it('checks no dispatching, when fetch is pending', () => {
    const store = makeMockStore({
      REVIEWS: {
        dataMap: {
          [ offerWithId1.id ]: reviewsForOffer1,
          fetchStatus: FetchStatus.Pending,
        },
      }
    });

    renderHook(
      () => useOfferReviews(offerWithId1 as Offer),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> },
    );

    const actions = store.getActions();

    expect(actions).toHaveLength(0);
  });


  it('dispatches, when fetch is "Not Started" and "offer id" is provided', () => {
    const store = makeMockStore({
      REVIEWS: {
        dataMap: {
          [ offerWithId1.id ]: reviewsForOffer1,
          fetchStatus: FetchStatus.NotStarted,
        }
      }
    });

    renderHook(
      () => useOfferReviews(offerWithUnknownId as Offer),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> },
    );

    const actions = store.getActions();

    expect(actions).toHaveLength(1);

    expect(actions[0].type)
      .toEqual(fetchReviewsAction.pending.type);
  });

  it('checks no dispatching, when fetch is "Not Started" and "offer" is null', () => {
    const store = makeMockStore({
      REVIEWS: {
        dataMap: {
          [ offerWithId1.id ]: reviewsForOffer1,
          fetchStatus: FetchStatus.NotStarted,
        }
      }
    });

    renderHook(
      () => useOfferReviews(null),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> },
    );

    const actions = store.getActions();

    expect(actions).toHaveLength(0);
  });


  it('checks dispatching, when fetch is "FetchWithNoError" but for other fetch', () => {
    const store = makeMockStore({
      REVIEWS: {
        dataMap: {
          [ offerWithId1.id ]: reviewsForOffer1,
          fetchStatus: FetchStatus.FetchedWithNoError,
        }
      }
    });

    renderHook(
      () => useOfferReviews(offerWithUnknownId as Offer),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> },
    );

    const actions = store.getActions();

    expect(actions).toHaveLength(1);

    expect(actions[0].type)
      .toEqual(fetchReviewsAction.pending.type);
  });
});
