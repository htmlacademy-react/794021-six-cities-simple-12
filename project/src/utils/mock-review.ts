import { datatype, lorem, name, internet } from 'faker';
import { OfferId, Review, Reviewer, ReviewsMap } from 'src/types/types';

const makeMockReviewer = (): Reviewer => ({
  avatarUrl: internet.url(),
  id: datatype.number(100) + 1,
  isPro: datatype.boolean(),
  name: name.firstName(),
});

const makeMockReview = (): Review => ({
  comment: lorem.paragraphs(2, '\n'),
  date: datatype.datetime().toDateString(), // Check format
  id: datatype.number(10),
  rating: datatype.number(50) / 10,
  user: makeMockReviewer(),
});

export const makeMockReviewsMap = (
  count: number,
  offerId: OfferId,
): ReviewsMap => {
  const reviews = new Array(count).fill(makeMockReview());

  return {
    [ offerId ]: reviews,
  };
};
