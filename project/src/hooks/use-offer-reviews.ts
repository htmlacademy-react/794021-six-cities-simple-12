import { useEffect, useState } from 'react';
import { getReviews } from 'src/store/data/data.selectors';
import { Reviews } from 'src/types/types';
import { useAppSelector } from 'src/hooks';
import { Offer } from 'src/types/types';

const NO_REVIEWS: Reviews = [];

export function useOfferReviews(offer: Offer): Reviews {
  const [ reviews, setReviews ] = useState<Reviews>(NO_REVIEWS);
  const allReviews = useAppSelector(getReviews);

  useEffect(() => {
    const foundReviews = allReviews.filter((review) => review.id === offer.id);
    setReviews(foundReviews);

  }, [allReviews, offer]);

  return reviews;
}
