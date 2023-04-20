import { DeepPartial } from '@reduxjs/toolkit';
import { datatype, lorem, name, internet, date } from 'faker';
import { OfferId, Review, Reviewer, Reviews, ReviewsMap } from 'src/types/types';

export const makeMockRating = (): number => datatype.number({ min: 1, max: 5 });

const makeMockReviewer = (): Reviewer => ({
  avatarUrl: internet.url(),
  id: datatype.number(100) + 1,
  isPro: datatype.boolean(),
  name: name.firstName(),
});

export const makeMockReview = (attributes?: DeepPartial<Review>): Review => ({
  comment: lorem.paragraphs(2, ' '),
  date: attributes?.date ?? date.past().toISOString(),
  id: attributes?.id ?? datatype.number(1000),
  rating: makeMockRating(),
  user: makeMockReviewer(),
});

export const makeMockReviews = (
  count: number,
  id?: OfferId,
): Reviews => (
  new Array(count)
    .fill({})
    .map(() => makeMockReview({ id }))
);

export const makeMockReviewsMap = (
  offerId: OfferId,
  count: number,
): ReviewsMap => (
  {
    [ offerId ]: makeMockReviews(count, offerId),
  }
);
