import { OfferId, Reviews } from 'src/types/types';
import RoomReviewForm from 'src/components/room-review-form/room-review-form';
import RoomReview from 'src/components/room-review/room-review';
import { makeHash } from 'src/utils/utils';
import { RoomReview as RoomReviewConstant } from 'src/consts/consts';

type RoomReviewProps = {
  dataTestId?: string;
  isUserLoggedIn: boolean;
  offerId: OfferId;
  reviews: Reviews;
}

function RoomReviews(props: RoomReviewProps): JSX.Element {
  return (
    <section className="property__reviews reviews" data-testid={props.dataTestId}>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{props.reviews.length}</span>
      </h2>

      { // TODO: sort: more recent items must be above (#1.1.2.1)
        props.reviews.length ?
          <ul className="reviews__list">
            {
              props.reviews.map((review, index) => {
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

      {
        props.isUserLoggedIn &&
        <RoomReviewForm key={props.offerId} dataTestId="room-review-post-form" />
      }
    </section>
  );
}

export default RoomReviews;
