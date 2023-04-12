import { useEffect, useState } from 'react';
import { store } from 'src/store';
import { fetchOffersAction } from 'src/store/api-actions';
import { getOffers } from 'src/store/data/data.selectors';
import { useAppSelector } from 'src/hooks';
import { DomainNamespace } from 'src/consts/domain';
import { FetchStatus } from 'src/consts/api';
import { CityName, Offers } from 'src/types/types';

type UseFoundOffersResult = {
  offers: Offers;
  fetchStatus: FetchStatus;
}

export function useFoundOffers(cityName: CityName): UseFoundOffersResult {
  const [ foundOffers, setFoundOffers ] = useState<Offers>([]);
  const fetchStatus = useAppSelector((state) => state[DomainNamespace.BusinessData].offersFetchStatus);
  const allOffers = useAppSelector(getOffers);

  useEffect(() => {
    switch (fetchStatus) {
      case FetchStatus.NotStarted:
        store.dispatch(fetchOffersAction());
        return;

      case FetchStatus.Pending:
        return;

      case FetchStatus.FetchedWithError:
        return;
    }

    const offers = allOffers.filter(({ city }) => city?.name === cityName);
    setFoundOffers(offers);
  }, [allOffers, cityName, fetchStatus]);

  return {
    offers: foundOffers,
    fetchStatus,
  };
}
