import { useEffect, useState } from 'react';
import { CityName, Offers } from 'src/types/types';
import { useAppSelector } from '.';
import { store } from 'src/store';
import { fetchOffers } from 'src/store/api-actions';

export function useFoundOffers(cityName: CityName): Offers {
  const [ foundOffers, setFoundOffers ] = useState<Offers | []>([]);
  const allOffers = useAppSelector((state) => state.offers);

  useEffect(() => {
    const state = store.getState();

    if (!state.isFetchedOffers) {
      store.dispatch(fetchOffers());
      return;
    }
    const offers = allOffers.filter(({ city }) => city?.name === cityName);
    setFoundOffers(offers);
  }, [allOffers, cityName]);

  return foundOffers;
}
