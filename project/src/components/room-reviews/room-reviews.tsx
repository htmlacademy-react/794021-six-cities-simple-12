import { Reviews } from 'src/types/types';
import OneStarInput from './one-star-input';
import RoomReview from 'src/components/room-review/room-review';
import { makeHash } from 'src/utils/utils';

type RoomReviewProps = {
  reviews: Reviews;
}

export default RoomReviews;
function RoomReviews({ reviews }: RoomReviewProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>

      {
        reviews.length ?
          <ul className="reviews__list">
            {
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

      <form className="reviews__form form" action="#" method="post">
        <label className="reviews__label form__label" htmlFor="review">
          Your review
        </label>
        <div className="reviews__rating-form form__rating">
          <OneStarInput htmlId='5-stars' labelTitle='perfect' inputValue='5' />
          <OneStarInput htmlId='4-stars' labelTitle='good' inputValue='4' />
          <OneStarInput htmlId='3-stars' labelTitle='not bad' inputValue='3' />
          <OneStarInput htmlId='3-stars' labelTitle='badly' inputValue='2' />
          <OneStarInput htmlId='1-star' labelTitle='terribly' inputValue='1' />
        </div>
        <textarea className="reviews__textarea form__textarea"
          id="review" name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
        >
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set
            {' '}<span className="reviews__star">rating</span>
            {' '}and describe your stay with at least
            <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled>
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
