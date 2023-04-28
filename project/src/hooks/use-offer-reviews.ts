import { useEffect, useState } from 'react';
import { Reviews } from 'src/types/types';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { Offer } from 'src/types/types';
import { fetchReviewsAction } from 'src/store/api-reviews/api-reviews.actions';
import { getReviewsFetchStatusp, getReviewsMap } from 'src/store/reviews/reviews.selectors';
import { FetchStatus } from 'src/consts/api';

export function useOfferReviews(offer: Offer | null): Reviews {
  const [ reviews, setReviews ] = useState<Reviews>([]);
  const allReviewsMap = useAppSelector(getReviewsMap);
  const fetchStatus = useAppSelector(getReviewsFetchStatusp);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!offer) {
      return;
    }

    if (fetchStatus === FetchStatus.Pending) {
      return;
    }

    if (
      !(offer.id in allReviewsMap) ||
      fetchStatus === FetchStatus.NotStarted
    ) {
      dispatch(fetchReviewsAction(offer));
      return;
    }

    const foundReviews = allReviewsMap[offer.id] ?? [];
    setReviews(foundReviews);
  }, [ allReviewsMap, dispatch, fetchStatus, offer ]);

  return reviews;
}
