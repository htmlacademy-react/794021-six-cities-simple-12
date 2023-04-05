import { useEffect, useState } from 'react';
import { parseInteger } from 'src/utils/utils';
import { Offer } from 'src/types/types';
import { useAppSelector } from '.';

type UseFoundOfferResult = {
  isNotFound: boolean;
  offer: Offer | null;
}

export function useFoundOffer(idAsString: string): UseFoundOfferResult {
  const offerIdAsInt = parseInteger(idAsString);
  const [ isNotFound, setIsNotFound ] = useState<boolean>(isNaN(offerIdAsInt));
  const [ offer, setOffer ] = useState<Offer | null>(null);

  const allOffers = useAppSelector((state) => state.offers);
  const isFetchedOffers = useAppSelector((state) => state.isFetchedOffers);

  useEffect(() => {
    if (!isFetchedOffers) {
      return;
    }
    const foundOffer = allOffers.find(({ id }) => id === offerIdAsInt) ?? null;
    setOffer(foundOffer);
    setIsNotFound(!foundOffer);
  }, [allOffers, isFetchedOffers, offerIdAsInt]);

  return {
    isNotFound,
    offer,
  };
}
