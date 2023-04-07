import { useEffect, useRef, useState } from 'react';
import { store } from 'src/store';
import { fetchOfferAction } from 'src/store/api-actions';
import { getOffers } from 'src/store/data/data.selectors';
import { useAppSelector } from 'src/hooks';
import { parseInteger } from 'src/utils/utils';
import { DomainNamespace } from 'src/consts/domain';
import { Offer } from 'src/types/types';

type UseFoundOfferResult = {
  isNotFound: boolean;
  offer: Offer | null;
}

export function useFoundOffer(idAsString: string): UseFoundOfferResult {
  const offerIdAsInt = parseInteger(idAsString);
  const [ isNotFound, setIsNotFound ] = useState<boolean>(isNaN(offerIdAsInt));
  const [ foundOffer, setFoundOffer ] = useState<Offer | null>(null);
  const isStartedFetchingRef = useRef(false);

  const allOffers = useAppSelector(getOffers);

  useEffect(() => {
    const offer = allOffers.find(({ id }) => id === offerIdAsInt) ?? null;
    if (offer) {
      setFoundOffer(offer);
      return;
    }

    if (!isStartedFetchingRef.current) {
      isStartedFetchingRef.current = true;
      store.dispatch(fetchOfferAction(offerIdAsInt));
      return;
    }

    const dataState = store.getState()[DomainNamespace.BusinessData];
    !dataState.isFetchingOffers && setIsNotFound(true);
  }, [allOffers, offerIdAsInt]);

  return {
    isNotFound,
    offer: foundOffer,
  };
}
