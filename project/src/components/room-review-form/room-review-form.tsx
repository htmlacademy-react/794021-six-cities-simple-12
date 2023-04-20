import { ChangeEvent, useEffect, useState, FormEvent } from 'react';
import { sendReviewAction } from 'src/store/api-reviews/api-reviews.actions';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { getReviewSendStatus, getUserComment, getUserRating } from 'src/store/reviews/reviews.selectors';
import OneStarRadioInput from 'src/components/one-star-radio-input/one-star-radio-input';
import { RoomReview } from 'src/consts/consts';
import { UserReviewActionData } from 'src/types/api';
import { OfferId } from 'src/types/types';
import { setUserCommentAction, setUserRatingAction } from 'src/store/reviews/reviews.slice';

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
  const userComment = useAppSelector(getUserComment(props.offerId));
  const userRating = useAppSelector(getUserRating(props.offerId));
  const sendReviewStatus = useAppSelector(getReviewSendStatus);

  const [ isSubmitEnabled, setIsSubmitEnabled ] = useState(false);

  const handleChange = (evt: ChangeEvent<InputElement>): void => {
    const { name, value } = evt.target;
    switch (name) {
      case FormFieldName.Review:
        dispatch(setUserCommentAction({ offerId: props.offerId, value }));
        break;
      case FormFieldName.Rating:
        dispatch(setUserRatingAction({ offerId: props.offerId, value: +value }));
        break;
    }
  };

  const handleSubmit = (evt: FormEvent): void => {
    evt.preventDefault();
    if (!isFormDataValid(userComment, +userRating)) {
      return;
    }
    const review: UserReviewActionData = {
      comment: userComment,
      id: props.offerId,
      rating: +userRating,
    };
    dispatch(sendReviewAction(review));
  };

  useEffect(() => {
    const isDataReadyToSend = isFormDataValid(userComment, userRating) && sendReviewStatus !== 'pending';
    setIsSubmitEnabled(isDataReadyToSend);
  }, [ sendReviewStatus, userComment, userRating ]);

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
        <OneStarRadioInput htmlId='5-stars' labelTitle='perfect' value='5' isSelected={userRating === 5} onChange={handleChange} htmlName={FormFieldName.Rating} />
        <OneStarRadioInput htmlId='4-stars' labelTitle='good' value='4' isSelected={userRating === 4} onChange={handleChange} htmlName={FormFieldName.Rating} />
        <OneStarRadioInput htmlId='3-stars' labelTitle='not bad' value='3' isSelected={userRating === 3} onChange={handleChange} htmlName={FormFieldName.Rating} />
        <OneStarRadioInput htmlId='2-stars' labelTitle='badly' value='2' isSelected={userRating === 2} onChange={handleChange} htmlName={FormFieldName.Rating} />
        <OneStarRadioInput htmlId='1-star' labelTitle='terribly' value='1' isSelected={userRating === 1} onChange={handleChange} htmlName={FormFieldName.Rating} />
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review" name="review"
        maxLength={RoomReview.TextCharacterMaxLimit}
        onChange={handleChange}
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={userComment}
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

// FIXME 1.1.2.2. В случае возникновения ошибки следует уведомить пользователя. Способ отображения ошибки остаётся на усмотрение разработчика.

// FIXME 1.1.2.2. При нажатии кнопки «Submit» и отправке данных кнопка «Submit» и вся форма должны блокироваться. Разблокировка формы и кнопки происходит в случае успешной отправки или при возникновении ошибки.

// FIXME При успешной отправке отзыва, новый отзыв должен появиться в списке отзывов (SELF - без перезагрузки страницы).

// TODO Already made, make test for it
// TODO 1.1.2.2. Пока пользователь не выбрал оценку и не ввёл текст допустимой длины, кнопка отправки отзыва не активна.

function isFormDataValid(comment: string, rating: number): boolean {
  return comment.length >= RoomReview.TextCharacterMinLimit &&
    comment.length <= RoomReview.TextCharacterMaxLimit &&
    !isNaN(rating) &&
    rating > 0;
}

export default RoomReviewForm;
