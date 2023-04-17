import { useEffect, useState } from 'react';
import { fetchOfferAction } from 'src/store/api-actions';
import { getOffers } from 'src/store/data/data.selectors';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { findFirstOffer, parseInteger } from 'src/utils/utils';
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

  const offersFetchStatus = useAppSelector((state) => state[DomainNamespace.BusinessData].offersFetchStatus);
  const isOfferFetching = useAppSelector((state) => state[DomainNamespace.BusinessData].isOfferFetching);
  const [ isNotFound, setIsNotFound ] = useState<boolean>(isNaN(offerIdAsInt));
  const [ foundOffer, setFoundOffer ] = useState<Offer | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const offer = findFirstOffer(allOffers, offerIdAsInt);
    if (offer) {
      setFoundOffer(offer);
      return;
    }

    if (offersFetchStatus === FetchStatus.Pending || isOfferFetching) {
      return;
    }

    if (offersFetchStatus === FetchStatus.NotStarted || offersFetchStatus === FetchStatus.FetchedWithError) {
      dispatch(fetchOfferAction(offerIdAsInt));
      return;
    }

    setIsNotFound(true);
  }, [allOffers, dispatch, isOfferFetching, offerIdAsInt, offersFetchStatus]);

  return {
    isNotFound,
    offer: foundOffer,
  };
}
