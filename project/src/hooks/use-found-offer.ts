import { useEffect, useRef, useState } from 'react';
import { parseInteger } from 'src/utils/utils';
import { Offer } from 'src/types/types';
import { useAppSelector } from '.';
import { store } from 'src/store';
import { fetchOffer } from 'src/store/api-actions';

type UseFoundOfferResult = {
  isNotFound: boolean;
  offer: Offer | null;
}

export function useFoundOffer(idAsString: string): UseFoundOfferResult {
  const offerIdAsInt = parseInteger(idAsString);
  const [ isNotFound, setIsNotFound ] = useState<boolean>(isNaN(offerIdAsInt));
  const [ foundOffer, setFoundOffer ] = useState<Offer | null>(null);
  const isStartedFetchingRef = useRef(false);

  const allOffers = useAppSelector((state) => state.offers);

  useEffect(() => {
    const offer = allOffers.find(({ id }) => id === offerIdAsInt) ?? null;
    if (offer) {
      setFoundOffer(offer);
      return;
    }

    if (!isStartedFetchingRef.current) {
      isStartedFetchingRef.current = true;
      store.dispatch(fetchOffer(offerIdAsInt));
      return;
    }

    const state = store.getState();
    !state.isFetchingOffers && setIsNotFound(true);
  }, [allOffers, offerIdAsInt]);

  return {
    isNotFound,
    offer: foundOffer,
  };
}
