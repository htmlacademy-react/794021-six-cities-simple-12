import { Reviews } from 'src/types/types';
import ReviewForm from './review-form';
import RoomReview from 'src/components/room-review/room-review';
import { makeHash } from 'src/utils/utils';

type RoomReviewProps = {
  isUserLoggedIn: boolean;
  reviews: Reviews;
}

export default RoomReviews;

function RoomReviews({ isUserLoggedIn, reviews }: RoomReviewProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>

      { // TODO: sort: more recent items must be above (#1.1.2.1)
        reviews.length ?
          <ul className="reviews__list">
            { // TODO: limit top 10 (#1.1.2.1)
              reviews.map((review) => {
                const key = makeHash(review);
                return (
                  <li
                    className="reviews__item"
                    key={key}
                  >
                    <RoomReview review={review} />
                  </li>
                );
              })
            }
          </ul> :
          null
      }

      { isUserLoggedIn && <ReviewForm /> }
    </>
  );
}
