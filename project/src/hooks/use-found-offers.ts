import { useEffect } from 'react';
import { fetchOffersAction } from 'src/store/api-actions';
import { getOffers, getOffersFetchStatus } from 'src/store/data/data.selectors';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { FetchStatus } from 'src/consts/api';
import { CityName, Offers } from 'src/types/types';

type UseFoundOffersResult = {
  offers: Offers;
  fetchStatus: FetchStatus;
}

export function useFoundOffers(cityName: CityName): UseFoundOffersResult {
  const dispatch = useAppDispatch();
  const fetchStatus = useAppSelector(getOffersFetchStatus);
  const allOffers = useAppSelector(getOffers);

  useEffect(() => {
    if (fetchStatus === FetchStatus.NotStarted) {
      dispatch(fetchOffersAction());
    }
  }, [ dispatch, fetchStatus ]);

  return {
    offers: allOffers.filter(({ city }) => city?.name === cityName),
    fetchStatus,
  };
}
