import { OfferId, Reviews } from 'src/types/types';
import RoomReviewForm from 'src/components/room-review-form/room-review-form';
import RoomReview from 'src/components/room-review/room-review';
import { makeHash } from 'src/utils/utils';
import { RoomReview as RoomReviewConstant } from 'src/consts/consts';

type RoomReviewProps = {
  isUserLoggedIn: boolean;
  offerId: OfferId;
  reviews: Reviews;
}

function RoomReviews({ isUserLoggedIn, offerId, reviews }: RoomReviewProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>

      { // TODO: sort: more recent items must be above (#1.1.2.1)
        reviews.length ?
          <ul className="reviews__list">
            {
              reviews.map((review, index) => {
                const key = makeHash(review);

                return index < RoomReviewConstant.PerOfferMaxCount ?
                  <li
                    className="reviews__item"
                    data-testid="offer-review-item"
                    key={key}
                  >
                    <RoomReview review={review} />
                  </li>
                  :
                  null;
              })
            }
          </ul> :
          null
      }

      { isUserLoggedIn && <RoomReviewForm key={offerId} /> }
    </>
  );
}

export default RoomReviews;
