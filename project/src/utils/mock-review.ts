import { datatype, lorem, name, internet } from 'faker';
import { OfferId, Review, Reviewer, Reviews, ReviewsMap } from 'src/types/types';

const makeMockReviewer = (): Reviewer => ({
  avatarUrl: internet.url(),
  id: datatype.number(100) + 1,
  isPro: datatype.boolean(),
  name: name.firstName(),
});

export const makeMockReview = (id?: OfferId): Review => ({
  comment: lorem.paragraphs(2, ' '),
  date: datatype.datetime().toDateString(),
  id: id ?? datatype.number(1000),
  rating: datatype.number(50) / 10,
  user: makeMockReviewer(),
});

export const makeMockReviews = (
  count: number,
  id?: OfferId,
): Reviews => (
  new Array(count)
    .fill({})
    .map(() => makeMockReview(id))
);

export const makeMockReviewsMap = (
  offerId: OfferId,
  count: number,
): ReviewsMap => (
  {
    [ offerId ]: makeMockReviews(count, offerId),
  }
);
