import { datatype, lorem, name, internet } from 'faker';
import { OfferId, Review, Reviewer, ReviewsMap } from 'src/types/types';

const makeMockReviewer = (): Reviewer => ({
  avatarUrl: internet.url(),
  id: datatype.number(100) + 1,
  isPro: datatype.boolean(),
  name: name.firstName(),
});

export const makeMockReview = (): Review => ({
  comment: lorem.paragraphs(2, ' '),
  date: datatype.datetime().toDateString(),
  id: datatype.number(10),
  rating: datatype.number(50) / 10,
  user: makeMockReviewer(),
});

export const makeMockReviewsMap = (
  offerId: OfferId,
  count: number,
): ReviewsMap => {
  const reviews = new Array(count).fill(makeMockReview());

  return {
    [ offerId ]: reviews,
  };
};
