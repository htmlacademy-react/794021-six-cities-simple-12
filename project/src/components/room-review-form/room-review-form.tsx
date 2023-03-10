import OneStarInput from './one-star-input';
import { RoomReview } from 'src/utils/consts';
import { ChangeEvent, useEffect, useState, FormEvent } from 'react';

type InputElement = HTMLTextAreaElement | HTMLInputElement
type RoomReviewFormData = { rating: string; review: string }
// TODO: reset form on every change of Room
function RoomReviewForm() {
  const [ formData, setFormData ] = useState({
    rating: '0',
    review: '',
  } as RoomReviewFormData);
  const [ isSubmitDisabled, setIsSubmitDisabled ] = useState(true);

  const handleChange = (evt: ChangeEvent<InputElement>): void => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (evt: FormEvent): void => {
    evt.preventDefault();
  };

  useEffect(() => {
    const isFulfilled = isFormComplete(
      formData, RoomReview.TextCharacterMinLimit
    );
    setIsSubmitDisabled(!isFulfilled);
  }, [formData]);

  return (
    <form
      action="#"
      className="reviews__form form"
      method="post"
      onSubmit={submitHandler}
    >
      <label className="reviews__label form__label" htmlFor="review">
        {RoomReview.HeaderText}
      </label>
      <div className="reviews__rating-form form__rating">
        <OneStarInput htmlId='5-stars' labelTitle='perfect' value='5' onChange={handleChange} />
        <OneStarInput htmlId='4-stars' labelTitle='good' value='4' onChange={handleChange} />
        <OneStarInput htmlId='3-stars' labelTitle='not bad' value='3' onChange={handleChange} />
        <OneStarInput htmlId='2-stars' labelTitle='badly' value='2' onChange={handleChange} />
        <OneStarInput htmlId='1-star' labelTitle='terribly' value='1' onChange={handleChange} />
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review" name="review"
        onChange={handleChange}
        placeholder={RoomReview.PlaceholderText}
        value={formData.review}
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
          {RoomReview.SubmitButtonText}
        </button>
      </div>
    </form>
  );
}

function isFormComplete(
  formData: RoomReviewFormData,
  textCharacterMinLimit: number
): boolean {
  return formData.review.length < textCharacterMinLimit ||
    parseInt(formData.rating, 10) < 1;
}

export default RoomReviewForm;
