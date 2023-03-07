import { Review } from 'src/types/types';
import { getPercentFromRating } from 'src/utils/utils';

type RoomReviewProps = {
  review: Review;
}

export default RoomReview;

function RoomReview({ review }: RoomReviewProps): JSX.Element {
  return (
    <>
      <div className="reviews__user user">
        {
          review.user.avatarUrl &&
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
          </div>
        }
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: getPercentFromRating(review.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date}>
          {review.date /* TODO: convert*/}
        </time>
      </div>
    </>
  );
}
