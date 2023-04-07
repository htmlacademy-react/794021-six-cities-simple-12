import { useEffect, useState } from 'react';
import { store } from 'src/store';
import { fetchOffersAction } from 'src/store/api-actions';
import { getOffers } from 'src/store/data/data.selectors';
import { useAppSelector } from 'src/hooks';
import { DomainNamespace } from 'src/consts/domain';
import { CityName, Offers } from 'src/types/types';

export function useFoundOffers(cityName: CityName): Offers {
  const [ foundOffers, setFoundOffers ] = useState<Offers | []>([]);
  const allOffers = useAppSelector(getOffers);

  useEffect(() => {
    const state = store.getState();

    if (!state[DomainNamespace.BusinessData].isFetchedOffers) {
      store.dispatch(fetchOffersAction());
      return;
    }
    const offers = allOffers.filter(({ city }) => city?.name === cityName);
    setFoundOffers(offers);
  }, [allOffers, cityName]);

  return foundOffers;
}
