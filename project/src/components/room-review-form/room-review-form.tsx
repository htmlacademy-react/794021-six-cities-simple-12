import { ChangeEvent, useState, FormEvent, useRef } from 'react';
import { sendReviewAction } from 'src/store/api-reviews/api-reviews.actions';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { getReviewSendStatus } from 'src/store/reviews/reviews.selectors';
import OneStarRadioInput from 'src/components/one-star-radio-input/one-star-radio-input';
import { RoomReview } from 'src/consts/consts';
import { OfferId } from 'src/types/types';
import { setUserCommentAction, setUserRatingAction } from 'src/store/reviews/reviews.slice';
import { FetchStatus } from 'src/consts/api';

type InputElement = HTMLTextAreaElement | HTMLInputElement

const FormFieldName = {
  Rating: 'rating',
  Review: 'review',
} as const;

type RoomReviewFormProps = {
  dataTestId?: string;
  offerId: OfferId;
};

function RoomReviewForm(props: RoomReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const sendReviewStatus = useAppSelector(getReviewSendStatus);
  const [ isSubmitDisabled, setIsSubmitDisabled ] = useState(true);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const ratingRef = useRef<string>('');

  const handleChange = (evt: ChangeEvent<InputElement>): void => {
    const { name, value } = evt.target;

    switch (name) {
      case FormFieldName.Review:
        dispatch(setUserCommentAction({ offerId: props.offerId, value }));
        break;
      case FormFieldName.Rating:
        ratingRef.current = value;
        dispatch(setUserRatingAction({ offerId: props.offerId, value: +value }));
        break;
    }

    const shouldDisableSubmit =
      !isFormDataValid(commentRef.current?.value, ratingRef.current) ||
      sendReviewStatus === FetchStatus.Pending;

    setIsSubmitDisabled(shouldDisableSubmit);
  };

  const handleSubmit = (evt: FormEvent): void => {
    evt.preventDefault();
    dispatch(sendReviewAction());
  };

  return (
    <form
      action="#"
      className="reviews__form form"
      data-testid={props.dataTestId}
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor={FormFieldName.Review}>
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <OneStarRadioInput htmlId='5-stars' labelTitle='perfect' value='5' onChange={handleChange} htmlName={FormFieldName.Rating} />
        <OneStarRadioInput htmlId='4-stars' labelTitle='good' value='4' onChange={handleChange} htmlName={FormFieldName.Rating} />
        <OneStarRadioInput htmlId='3-stars' labelTitle='not bad' value='3' onChange={handleChange} htmlName={FormFieldName.Rating} />
        <OneStarRadioInput htmlId='2-stars' labelTitle='badly' value='2' onChange={handleChange} htmlName={FormFieldName.Rating} />
        <OneStarRadioInput htmlId='1-star' labelTitle='terribly' value='1' onChange={handleChange} htmlName={FormFieldName.Rating} />
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review" name="review"
        maxLength={RoomReview.TextCharacterMaxLimit}
        onChange={handleChange}
        placeholder="Tell how was your stay, what you like and what can be improved"
        ref={commentRef}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span>{' '}
          and describe your stay with at least{' '}
          <b className="reviews__text-amount">
            {RoomReview.TextCharacterMinLimit} characters
          </b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          disabled={isSubmitDisabled}
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}


function isFormDataValid(comment: string | undefined, rating: string): boolean {
  return comment !== undefined &&
    rating !== undefined &&
    comment.length >= RoomReview.TextCharacterMinLimit &&
    comment.length <= RoomReview.TextCharacterMaxLimit &&
    !isNaN(+rating) &&
    +rating > 0;
}

export default RoomReviewForm;
