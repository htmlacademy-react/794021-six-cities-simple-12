import { configureMockStore } from '@jedmao/redux-mock-store';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { lorem } from 'faker';
import { useOfferReviews } from './use-offer-reviews';
import { Offer } from 'src/types/types';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const offerWithUnknownId = {
  id: 1_000_000_000,
};

const offerWithId1 = {
  id: 1,
};

const offerWithId2 = {
  id: 2,
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

const reviewsForOffer2 = [
  {
    id: offerWithId2.id,
    comment: lorem.sentence(),
  },
];

const state = {
  REVIEWS: {
    dataMap: {
      [ offerWithId1.id ]: reviewsForOffer1,
      [ offerWithId2.id ]: reviewsForOffer2,
    }
  }
};

describe('Hook: useOfferReviews()', () => {
  it('returns reviews for offer', () => {
    const store = mockStore(state);
    const offer = offerWithId1;

    const { result } = renderHook(
      () => useOfferReviews(offer as Offer),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> },
    );

    expect(result.current).toEqual(reviewsForOffer1);
  });


  it('returns empty array of reviews for unknown offer', () => {
    const store = mockStore(state);
    const offer = offerWithUnknownId;

    const { result } = renderHook(
      () => useOfferReviews(offer as Offer),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> },
    );

    expect(result.current).toEqual([]);
  });
});
