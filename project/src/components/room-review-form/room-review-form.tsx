import { ChangeEvent, useEffect, useState, FormEvent } from 'react';
import OneStarRadioInput from 'src/components/one-star-radio-input/one-star-radio-input';
import { RoomReview } from 'src/consts/consts';

type InputElement = HTMLTextAreaElement | HTMLInputElement
type RoomReviewFormData = { rating: string; review: string }

const FormFieldName = {
  Rating: 'rating',
  Review: 'review',
} as const;

function RoomReviewForm(): JSX.Element {
  const [ formData, setFormData ] = useState({
    [ FormFieldName.Rating ]: '0',
    [ FormFieldName.Review ]: '',
  } as RoomReviewFormData);

  const [ isSubmitEnabled, setIsSubmitEnabled ] = useState(false);

  const handleChange = (evt: ChangeEvent<InputElement>): void => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (evt: FormEvent): void => {
    evt.preventDefault();
  };

  useEffect(() => {
    const isDataReadyToSend = isFormDataValid(formData);
    setIsSubmitEnabled(isDataReadyToSend);
  }, [formData]);

  return (
    <form
      action="#"
      className="reviews__form form"
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
          disabled={!isSubmitEnabled}
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

function isFormDataValid(formData: RoomReviewFormData): boolean {
  const rating = parseInt(formData.rating, 10);
  const { length } = formData.review;

  return length >= RoomReview.TextCharacterMinLimit &&
    length <= RoomReview.TextCharacterMaxLimit &&
    rating > 0;
}

export default RoomReviewForm;
