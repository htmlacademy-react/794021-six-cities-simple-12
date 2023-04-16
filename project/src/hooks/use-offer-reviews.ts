import { useEffect, useState } from 'react';
import { getReviewsMap } from 'src/store/data/data.selectors';
import { Reviews } from 'src/types/types';
import { useAppSelector } from 'src/hooks';
import { Offer } from 'src/types/types';

export function useOfferReviews(offer: Offer | null): Reviews {
  const [ reviews, setReviews ] = useState<Reviews>([]);
  const allReviewsMap = useAppSelector(getReviewsMap);

  useEffect(() => {
    if (!offer) {
      return;
    }
    const foundReviews = allReviewsMap[offer.id] ?? [];
    setReviews(foundReviews);

  }, [allReviewsMap, offer]);

  return reviews;
}
