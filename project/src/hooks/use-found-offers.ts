import { useEffect, useState } from 'react';
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
  const [ foundOffers, setFoundOffers ] = useState<Offers>([]);
  const fetchStatus = useAppSelector(getOffersFetchStatus);
  const allOffers = useAppSelector(getOffers);

  useEffect(() => {
    switch (fetchStatus) {
      case FetchStatus.NotStarted:
        dispatch(fetchOffersAction());
        break;

      case FetchStatus.Pending:
        break;

      case FetchStatus.FetchedWithError:
        break;
    }

    const offers = allOffers.filter(({ city }) => city?.name === cityName);
    setFoundOffers(offers);
  }, [allOffers, cityName, dispatch, fetchStatus]);

  return {
    offers: foundOffers,
    fetchStatus,
  };
}
