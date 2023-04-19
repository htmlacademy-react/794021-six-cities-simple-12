import { render, screen } from '@testing-library/react';
import RoomReviews from './room-reviews';
import { makeMockReviews } from 'src/utils/mock-review';
import { RoomReview } from 'src/consts/consts';

const REVIEW_TEST_ID = 'offer-review-item';
const MOCK_OFFER_ID = 1;
const mockReviews = makeMockReviews(RoomReview.PerOfferMaxCount + 1, MOCK_OFFER_ID);

describe('Component: <RoomReviews>', () => {
  it('renders component when user is authorized', () => {
    const isUserLoggedIn = true;

    render(
      <RoomReviews
        offerId={MOCK_OFFER_ID}
        isUserLoggedIn={isUserLoggedIn}
        reviews={mockReviews}
      />
    );

    expect(screen.getByTestId('room-review-post-form'))
      .toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /Reviews/i }))
      .toHaveTextContent(new RegExp(mockReviews.length.toString(), 'i'));

    expect(screen.getAllByTestId(REVIEW_TEST_ID).length)
      .toBeLessThanOrEqual(RoomReview.PerOfferMaxCount);
  });

  it('renders component when user is not authorized', () => {
    const isUserLoggedIn = false;

    render(
      <RoomReviews
        offerId={MOCK_OFFER_ID}
        isUserLoggedIn={isUserLoggedIn}
        reviews={mockReviews}
      />
    );

    expect(screen.queryByTestId('room-review-post-form'))
      .not.toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /Reviews/i }))
      .toHaveTextContent(new RegExp(mockReviews.length.toString(), 'i'));

    expect(screen.getAllByTestId(REVIEW_TEST_ID).length)
      .toBeLessThanOrEqual(RoomReview.PerOfferMaxCount);
  });

  // FIXME 1.1.2.2. В случае успешной отправки отзыва форма очищается.

  // FIXME 1.1.2.2. В случае возникновения ошибки следует уведомить пользователя. Способ отображения ошибки остаётся на усмотрение разработчика.

  // FIXME 1.1.2.2. При нажатии кнопки «Submit» и отправке данных кнопка «Submit» и вся форма должны блокироваться. Разблокировка формы и кнопки происходит в случае успешной отправки или при возникновении ошибки.

  // FIXME При успешной отправке отзыва, новый отзыв должен появиться в списке отзывов (SELF - без перезагрузки страницы).

  // TODO Already made, make test for it
  // TODO 1.1.2.2. Пока пользователь не выбрал оценку и не ввёл текст допустимой длины, кнопка отправки отзыва не активна.
});
