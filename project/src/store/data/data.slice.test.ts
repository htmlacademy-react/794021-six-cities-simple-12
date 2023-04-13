import { address } from 'faker';
import { data, setCityNameAction } from './data.slice';
import { fetchOfferAction, fetchOffersAction, fetchReviewsAction } from 'src/store/api-actions';
import { makeFakeOffer } from 'src/utils/mock-offer';
import { makeMockReviewsMap } from 'src/utils/mock-review';
import { FetchStatus } from 'src/consts/api';

const { reducer } = data;

describe('Reducer: data', () => {
  it('returns initial state if sent unknown action', () => {
    expect(reducer(undefined, { type: 'NON_EXISTENT_ACTION' }))
      .toEqual({
        cityName: 'Paris',
        offersFetchStatus: FetchStatus.NotStarted as FetchStatus,
        isOfferFetching: false,
        areReviewsFetching: false,
        offers: [],
        reviewsMap: {},
      });
  });

  it('sets city name', () => {
    const cityName = address.cityName();
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

    const stateToBe = {
      ...initialState,
      cityName,
    };

    expect(reducer(initialState, { type: setCityNameAction.type, payload: cityName }))
      .toEqual(stateToBe);
  });

  describe('One offer fetching', () => {
    const action = fetchOfferAction;

    it('checks fulfilled status', () => {
      const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });
      const offer = makeFakeOffer();

      const stateToBe = {
        ...initialState,
        isOfferFetching: false,
        offers: [ offer ],
      };

      expect(reducer(initialState, { type: action.fulfilled.type, payload: offer }))
        .toEqual(stateToBe);
    });

    it('checks adding the same offer again', () => {
      const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });
      const offer = makeFakeOffer();
      const stateBefore = reducer(initialState, { type: action.fulfilled.type, payload: offer });
      const stateAfter = reducer(stateBefore, { type: action.fulfilled.type, payload: offer });

      expect(stateBefore)
        .toStrictEqual(stateAfter);
    });

    it('checks pending status', () => {
      const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

      const stateToBe = {
        ...initialState,
        isOfferFetching: true,
      };

      expect(reducer(initialState, { type: action.pending.type }))
        .toEqual(stateToBe);
    });

    it('checks rejected status', () => {
      const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

      const stateToBe = {
        ...initialState,
        isOfferFetching: false,
      };

      expect(reducer(initialState, { type: action.rejected.type }))
        .toEqual(stateToBe);
    });
  });


  describe('All offers fetching', () => {
    const action = fetchOffersAction;
    it('checks fulfilled status', () => {
      const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });
      const offers = new Array(30).fill(makeFakeOffer());

      const stateToBe = {
        ...initialState,
        offers,
        offersFetchStatus: FetchStatus.FetchedWithNoError,
      };

      expect(reducer(initialState, { type: action.fulfilled.type, payload: offers }))
        .toEqual(stateToBe);
    });

    it('checks pending status', () => {
      const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

      const stateToBe = {
        ...initialState,
        offersFetchStatus: FetchStatus.Pending,
      };

      expect(reducer(initialState, { type: action.pending.type }))
        .toEqual(stateToBe);
    });

    it('checks rejected status', () => {
      const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

      const stateToBe = {
        ...initialState,
        offersFetchStatus: FetchStatus.FetchedWithError,
      };

      expect(reducer(initialState, { type: action.rejected.type }))
        .toEqual(stateToBe);
    });
  });


  describe('Reviews fetching', () => {
    const action = fetchReviewsAction;

    it('checks fulfilled status', () => {
      const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });
      const reviewsMap = makeMockReviewsMap(1, 30);

      const stateToBe = {
        ...initialState,
        reviewsMap,
        areReviewsFetching: false,
      };

      expect(reducer(initialState, { type: action.fulfilled.type, payload: reviewsMap }))
        .toEqual(stateToBe);
    });

    it('checks pending status', () => {
      const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

      const stateToBe = {
        ...initialState,
        areReviewsFetching: true,
      };

      expect(reducer(initialState, { type: action.pending.type }))
        .toEqual(stateToBe);

    });


    it('checks rejected status', () => {
      const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

      const stateToBe = {
        ...initialState,
        areReviewsFetching: false,
      };

      expect(reducer(initialState, { type: action.rejected.type }))
        .toEqual(stateToBe);

    });
  });
});
