import { datatype, lorem, name, internet } from 'faker';
import { Review, Reviewer } from 'src/types/types';

const makeFakeReviewer = (): Reviewer => ({
  avatarUrl: internet.url(),
  id: datatype.number(100) + 1,
  isPro: datatype.boolean(),
  name: name.firstName(),
});

export const makeMockReview = (): Review => ({
  comment: lorem.paragraphs(2, '\n'),
  date: datatype.datetime().toDateString(), // Check format
  id: datatype.number(10),
  rating: datatype.number(50) / 10,
  user: makeFakeReviewer(),
});

