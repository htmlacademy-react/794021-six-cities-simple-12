import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/hooks';
import { Reviews } from 'src/types/types';
import { Offer } from 'src/types/types';

const NO_REVIEWS: Reviews = [];

export function useOfferReviews(offer: Offer): Reviews {
  const [ reviews, setReviews ] = useState<Reviews>(NO_REVIEWS);
  const allReviews = useAppSelector((state) => state.reviews);

  useEffect(() => {
    const foundReviews = allReviews.filter((review) => review.id === offer.id);
    setReviews(foundReviews);

  }, [allReviews, offer]);

  return reviews;
}
