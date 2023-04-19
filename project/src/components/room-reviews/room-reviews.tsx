import { Reviews } from 'src/types/types';
import RoomReview from 'src/components/room-review/room-review';
import { makeHash } from 'src/utils/utils';
import { RoomReview as RoomReviewConstant } from 'src/consts/consts';

type RoomReviewProps = {
  reviews: Reviews;
}

function RoomReviews(props: RoomReviewProps): JSX.Element | null {
  if (!props.reviews.length) {
    return null;
  }

  return (
    <ul className="reviews__list"
      data-testid="offer-reviews-list"
    >
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
    </ul>
  );
}

export default RoomReviews;
