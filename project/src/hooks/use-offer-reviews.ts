import { useEffect, useState } from 'react';
import { Reviews } from 'src/types/types';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { Offer } from 'src/types/types';
import { fetchReviewsAction } from 'src/store/api-reviews/api-reviews.actions';
import { getReviewsFetchStatusp, getReviewsMap } from 'src/store/reviews/reviews.selectors';
import { FetchStatus } from 'src/consts/api';

export function useOfferReviews(offer: Offer | null): Reviews {
  const dispatch = useAppDispatch();
  const allReviewsMap = useAppSelector(getReviewsMap);
  const fetchStatus = useAppSelector(getReviewsFetchStatusp);
  const [ reviews, setReviews ] = useState<Reviews>([]);

  useEffect(() => {
    if (!offer) {
      return;
    }

    const foundReviews = allReviewsMap[offer.id] ?? [];
    setReviews(foundReviews);

    if (
      fetchStatus === FetchStatus.NotStarted ||
      (fetchStatus !== FetchStatus.Pending && !(offer.id in allReviewsMap)) ||
      false
    ) {
      dispatch(fetchReviewsAction(offer));
    }

  }, [ allReviewsMap, dispatch, fetchStatus, offer ]);

  return reviews;
}
