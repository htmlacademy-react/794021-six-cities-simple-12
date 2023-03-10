import OneStarInput from './one-star-input';
import { RoomReview } from 'src/utils/consts';
import { ChangeEvent, useEffect, useState, FormEvent } from 'react';

type InputElement = HTMLTextAreaElement | HTMLInputElement;

function RoomReviewForm() {
  const [ formData, setFormData ] = useState({
    rating: 0,
    review: '',
  });
  const [ isDisabled, setIsDisabled ] = useState(true);

  const changeHandler = ({ target }: ChangeEvent<InputElement>): void => {
    const { name, value } = target;
    if (name === 'rating') {
      const rating = parseInt(value, 10);
      setFormData({ ...formData, [name]: rating });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (evt: FormEvent): void => {
    evt.preventDefault();
  };

  useEffect(() => {
    if (
      formData.review.length >= RoomReview.TextCharacterMinLimit &&
      formData.rating > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
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
        <OneStarInput htmlId='5-stars' labelTitle='perfect' value='5' onChange={changeHandler} />
        <OneStarInput htmlId='4-stars' labelTitle='good' value='4' onChange={changeHandler} />
        <OneStarInput htmlId='3-stars' labelTitle='not bad' value='3' onChange={changeHandler} />
        <OneStarInput htmlId='2-stars' labelTitle='badly' value='2' onChange={changeHandler} />
        <OneStarInput htmlId='1-star' labelTitle='terribly' value='1' onChange={changeHandler} />
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review" name="review"
        onChange={changeHandler}
        placeholder={RoomReview.PlaceholderText}
        value={formData.review}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          {' '}<span className="reviews__star">rating</span>
          {' '}and describe your stay with at least
          {' '}<b className="reviews__text-amount">{RoomReview.TextCharacterMinLimit} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          disabled={isDisabled}
          type="submit"
        >
          {RoomReview.SubmitButtonText}
        </button>
      </div>
    </form>
  );
}

export default RoomReviewForm;
