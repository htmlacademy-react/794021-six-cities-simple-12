import { address, datatype, lorem } from 'faker';
import { data, setCityNameAction, setSortingTypeAction } from './data.slice';
import { fetchOfferAction, fetchOffersAction } from 'src/store/api-actions';
import { makeMockOffer } from 'src/utils/mock-offer';
import { FetchStatus } from 'src/consts/api';
import { DEFAULT_OFFER_SORTING_KEY_NAME } from 'src/consts/consts';

const { reducer } = data;
const DEFAULT_STATE_CITY_NAME = 'Paris';


describe('Reducer: data. State management', () => {
  it('returns initial state if sent unknown action', () => {
    expect(reducer(undefined, { type: 'NON_EXISTENT_ACTION' }))
      .toEqual({
        cityName: DEFAULT_STATE_CITY_NAME,
        offerFetchStatus: FetchStatus.NotStarted as FetchStatus,
        offersFetchStatus: FetchStatus.NotStarted as FetchStatus,
        offers: [],
        sortingType: DEFAULT_OFFER_SORTING_KEY_NAME,
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

  it('sets sorting type', () => {
    const mockSortingType = lorem.word(datatype.number({ min: 5, max: 20 }));
    const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

    const stateToBe = {
      ...initialState,
      sortingType: mockSortingType,
    };

    expect(reducer(initialState, { type: setSortingTypeAction.type, payload: mockSortingType }))
      .toEqual(stateToBe);
  });

  describe('Reducer: data. Fetching one offer', () => {
    const action = fetchOfferAction;

    it('checks fulfilled status', () => {
      const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });
      const offer = makeMockOffer();

      const stateToBe = {
        ...initialState,
        offerFetchStatus: FetchStatus.NotStarted,
        offers: [ offer ],
      };

      expect(reducer(initialState, { type: action.fulfilled.type, payload: offer }))
        .toEqual(stateToBe);
    });

    it('checks adding the same offer again', () => {
      const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });
      const offer = makeMockOffer();
      const stateBefore = reducer(initialState, { type: action.fulfilled.type, payload: offer });
      const stateAfter = reducer(stateBefore, { type: action.fulfilled.type, payload: offer });

      expect(stateBefore)
        .toStrictEqual(stateAfter);
    });

    it('checks pending status', () => {
      const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

      const stateToBe = {
        ...initialState,
        offerFetchStatus: FetchStatus.Pending,
      };

      expect(reducer(initialState, { type: action.pending.type }))
        .toEqual(stateToBe);
    });

    it('checks rejected status', () => {
      const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });

      const stateToBe = {
        ...initialState,
        offerFetchStatus: FetchStatus.FetchedWithError,
      };

      expect(reducer(initialState, { type: action.rejected.type }))
        .toEqual(stateToBe);
    });
  });


  describe('Reducer: data. Fetching all offers at once', () => {
    const action = fetchOffersAction;
    it('checks fulfilled status', () => {
      const initialState = reducer(undefined, { type: 'NON_EXISTENT_ACTION' });
      const offers = new Array(30).fill(makeMockOffer());

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
});
