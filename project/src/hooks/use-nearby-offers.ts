import { useEffect, useState } from 'react';
import { getNearbyOffers, getNearbyOffersFetchStatus, getNearbyOffersOfferId } from 'src/store/nearby-offers/nearby-offers.selectors';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { Offer, Offers } from 'src/types/types';
import { fetchNearbyOffersAction } from 'src/store/api-actions';

export function useNearbyOffers(offer: Offer | null, limitCount: number): Offers {
  const dispatch = useAppDispatch();
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const offerIdInStore = useAppSelector(getNearbyOffersOfferId);
  const fetchStatus = useAppSelector(getNearbyOffersFetchStatus);
  const [ updatedNearbyOffers, setUpdatedNearbyOffers ] = useState<Offers>([]);

  useEffect(() => {
    if (!offer) {
      return;
    }

    if (
      offerIdInStore === null ||
      offerIdInStore !== offer.id ||
      false
    ) {
      dispatch(fetchNearbyOffersAction(offer.id));
      return;
    }

    const foundNearbyOffers = nearbyOffers.filter((_offer, index) => index < limitCount);
    setUpdatedNearbyOffers(foundNearbyOffers);

  }, [ dispatch, fetchStatus, limitCount, nearbyOffers, offer, offerIdInStore ]);

  return updatedNearbyOffers;
}
