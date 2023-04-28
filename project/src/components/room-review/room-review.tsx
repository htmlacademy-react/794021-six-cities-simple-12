import { Review } from 'src/types/types';
import { getPercentFromRating } from 'src/utils/utils';

type RoomReviewProps = {
  review: Review;
}

function RoomReview({ review }: RoomReviewProps): JSX.Element {
  let htmlDateAttr = '';
  let humanReadableDate = '';
  const [ year, month, day, monthName ] = splitYearMonthDayMonthName(review.date);
  htmlDateAttr = `${year}-${month}-${day}`;
  humanReadableDate = `${monthName} ${year}`;

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
        <div className="reviews__rating rating" data-testid="review-star-rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: getPercentFromRating(review.rating)}}></span>
            <p className="visually-hidden">{`Gave them ${review.rating}-star rating.`}</p>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        {
          year !== '' ?
            <time className="reviews__time" dateTime={htmlDateAttr} data-testid="room-review__date">
              {humanReadableDate}
            </time> :
            null
        }
      </div>
    </>
  );
}

function splitYearMonthDayMonthName(dateAsString: string): [string, string, string, string ] {
  const date = new Date(dateAsString);
  const day = date.getDate().toString();
  const month = date.getMonth().toString();
  const year = date.getFullYear().toString();
  const monthName = date.toLocaleString('en-US', { month: 'long' });

  if (year === 'NaN') {
    return ['', '', '', ''];
  }
  return [ year, month, day, monthName ];
}

export default RoomReview;
