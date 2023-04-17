import { useEffect, useState } from 'react';
import { fetchOfferAction } from 'src/store/api-actions';
import { getOfferFetchStatus, getOffers } from 'src/store/data/data.selectors';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { findFirstOffer, parseInteger } from 'src/utils/utils';
import { FetchStatus } from 'src/consts/api';
import { Offer } from 'src/types/types';

type UseFoundOfferResult = {
  isNotFound: boolean;
  offer: Offer | null;
}

export function useFoundOffer(idAsString: string | undefined): UseFoundOfferResult {
  const offerIdAsInt = parseInteger(idAsString);
  const allOffers = useAppSelector(getOffers);

  const offerFetchStatus = useAppSelector(getOfferFetchStatus);
  const [ isNotFound, setIsNotFound ] = useState<boolean>(false);
  const [ foundOffer, setFoundOffer ] = useState<Offer | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const offer = findFirstOffer(allOffers, offerIdAsInt);
    if (offer) {
      setFoundOffer(offer);
      return;
    }

    if (offerFetchStatus === FetchStatus.Pending) {
      return;
    }

    if (offerFetchStatus === FetchStatus.NotStarted) {
      dispatch(fetchOfferAction(offerIdAsInt));
      return;
    }

    setIsNotFound(true);
  }, [allOffers, dispatch, offerFetchStatus, offerIdAsInt]);

  return {
    isNotFound,
    offer: foundOffer,
  };
}
