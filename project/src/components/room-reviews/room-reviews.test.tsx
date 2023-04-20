import { render, screen } from '@testing-library/react';
import RoomReviews from './room-reviews';
import { makeMockReview } from 'src/utils/mock-review';
import { RoomReview } from 'src/consts/consts';
import { datatype } from 'faker';

const mockOfferId = datatype.number();

const mockReview1 = makeMockReview({ id: mockOfferId, date: '2019-01-01' });
const mockReview2 = makeMockReview({ id: mockOfferId, date: '2021-01-01' });
const mockReview3 = makeMockReview({ id: mockOfferId, date: '2020-01-01' });

const mockReviewsInitial = [ mockReview1, mockReview2, mockReview3 ];
const mockReviewSorted = [ mockReview2, mockReview3, mockReview1 ];

describe('Component: <RoomReviews>', () => {
  it('renders reviews, more recent above', () => {
    render(
      <RoomReviews
        reviews={mockReviewsInitial}
      />
    );

    const renderedReviews = screen.getAllByTestId(/offer-review-item/i);

    expect(renderedReviews.length)
      .toBeLessThanOrEqual(RoomReview.PerOfferMaxCount);

    renderedReviews.forEach((review, index) => {
      expect(review)
        .toHaveTextContent(mockReviewSorted[index].comment);
    });
  });

  it('renders null, if reviews array is empty', () => {
    render(
      <RoomReviews
        reviews={[]}
      />
    );

    expect(screen.queryByTestId('offer-reviews-list'))
      .not.toBeInTheDocument();
  });
});
