import { useEffect } from 'react';
import { getNearbyOffers } from 'src/store/data/data.selectors';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { Offer, Offers } from 'src/types/types';
import { fetchNearbyOffers } from 'src/store/api-actions';

export function useNearbyOffers(offer: Offer | null, limitCount: number): Offers {
  const dispatch = useAppDispatch();
  const nearbyOffers = useAppSelector(getNearbyOffers);

  useEffect(() => {
    if (!offer) {
      return;
    }

    dispatch(fetchNearbyOffers(offer.id));
  }, [ dispatch, offer ]);

  return nearbyOffers.filter((_offer, index) => index < limitCount);
}
