import { useEffect, useState } from 'react';
import { store } from 'src/store';
import { fetchOfferAction } from 'src/store/api-actions';
import { getOffers } from 'src/store/data/data.selectors';
import { useAppSelector } from 'src/hooks';
import { getFirstOffer, parseInteger } from 'src/utils/utils';
import { DomainNamespace } from 'src/consts/domain';
import { FetchStatus } from 'src/consts/api';
import { Offer } from 'src/types/types';

type UseFoundOfferResult = {
  isNotFound: boolean;
  offer: Offer | null;
}

export function useFoundOffer(idAsString: string): UseFoundOfferResult {
  const offerIdAsInt = parseInteger(idAsString);
  const allOffers = useAppSelector(getOffers);
  const [ isNotFound, setIsNotFound ] = useState<boolean>(isNaN(offerIdAsInt));
  const [ foundOffer, setFoundOffer ] = useState<Offer | null>(null);

  useEffect(() => {
    const offer = getFirstOffer(allOffers, offerIdAsInt);
    if (offer) {
      setFoundOffer(offer);
      return;
    }

    const state = store.getState();
    const { offersFetchStatus, isOfferFetching } = state[DomainNamespace.BusinessData];
    if (offersFetchStatus === FetchStatus.Pending || isOfferFetching) {
      return;
    }

    if (offersFetchStatus === FetchStatus.NotStarted || offersFetchStatus === FetchStatus.FetchedWithError) {
      store.dispatch(fetchOfferAction(offerIdAsInt));
      return;
    }

    setIsNotFound(true);
  }, [allOffers, offerIdAsInt]);

  return {
    isNotFound,
    offer: foundOffer,
  };
}
