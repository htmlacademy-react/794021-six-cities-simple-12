import { ChangeEvent, useEffect, useState, FormEvent } from 'react';
import { sendReviewAction } from 'src/store/api-reviews/api-reviews.actions';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import OneStarRadioInput from 'src/components/one-star-radio-input/one-star-radio-input';
import { RoomReview } from 'src/consts/consts';
import { UserReviewActionData } from 'src/types/api';
import { OfferId } from 'src/types/types';
import { getReviewSendStatus } from 'src/store/reviews/reviews.selectors';

type InputElement = HTMLTextAreaElement | HTMLInputElement
type RoomReviewFormData = { rating: string; review: string }

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
    if (!isFormDataValid(formData)) {
      return;
    }
    const review: UserReviewActionData = {
      comment: formData.review,
      id: props.offerId,
      rating: parseInt(formData.rating, 10),
    };
    dispatch(sendReviewAction(review));
  };

  useEffect(() => {
    const isDataReadyToSend = isFormDataValid(formData);
    setIsSubmitEnabled(isDataReadyToSend);
  }, [formData]);

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
          disabled={!isSubmitEnabled || sendReviewStatus === 'pending'}
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

// FIXME 1.1.2.2. В случае успешной отправки отзыва форма очищается.

// FIXME 1.1.2.2. В случае возникновения ошибки следует уведомить пользователя. Способ отображения ошибки остаётся на усмотрение разработчика.

// FIXME 1.1.2.2. При нажатии кнопки «Submit» и отправке данных кнопка «Submit» и вся форма должны блокироваться. Разблокировка формы и кнопки происходит в случае успешной отправки или при возникновении ошибки.

// FIXME При успешной отправке отзыва, новый отзыв должен появиться в списке отзывов (SELF - без перезагрузки страницы).

// TODO Already made, make test for it
// TODO 1.1.2.2. Пока пользователь не выбрал оценку и не ввёл текст допустимой длины, кнопка отправки отзыва не активна.

function isFormDataValid(formData: RoomReviewFormData): boolean {
  const rating = parseInt(formData.rating, 10);
  const { length } = formData.review;

  return length >= RoomReview.TextCharacterMinLimit &&
    length <= RoomReview.TextCharacterMaxLimit &&
    rating > 0;
}

export default RoomReviewForm;
