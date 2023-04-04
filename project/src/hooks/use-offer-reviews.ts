import { useEffect, useState } from 'react';
import { Reviews } from 'src/types/types';
import { Offer } from 'src/types/types';
import { useAppSelector } from 'src/hooks/index';

const NO_REVIEWS: Reviews = [];

export function useOfferReviews(offer: Offer | null) {
  const [ reviews, setReviews ] = useState<Reviews>(NO_REVIEWS);
  const allReviews = useAppSelector((state) => state.reviews);

  useEffect(() => {
    if (!offer) {
      setReviews(NO_REVIEWS);
      return;
    }
    const foundReviews = allReviews.filter((review) => review.id === offer.id);
    setReviews(foundReviews);

  }, [allReviews, offer]);

  return reviews;
}
