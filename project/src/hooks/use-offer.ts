import { Offer, OfferId } from 'src/types/types';
import { useAppSelector } from '.';
import { useEffect, useState } from 'react';

export function useOffer(id: OfferId | null): Offer | null {
  const offers = useAppSelector((state) => state.offers);
  const [ offer, setOffer ] = useState<Offer | null>(null);

  useEffect(() => {
    if (id === null) {
      setOffer(null);
      return;
    }

    for (const iterableOffer of offers) {
      if (iterableOffer.id === id) {
        setOffer(iterableOffer);
        return;
      }
    }

    setOffer(null);
  }, [id, offers]);

  return offer;
}
