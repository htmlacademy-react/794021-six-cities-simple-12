import { render, screen } from '@testing-library/react';
import RoomReviews from './room-reviews';
import { makeMockReviews } from 'src/utils/mock-review';
import { RoomReview } from 'src/consts/consts';

const MOCK_OFFER_ID = 1;
const mockReviews = makeMockReviews(RoomReview.PerOfferMaxCount + 1, MOCK_OFFER_ID);

describe('Component: <RoomReviews>', () => {
  it('renders reviews', () => {
    render(
      <RoomReviews
        reviews={mockReviews}
      />
    );

    expect(screen.getAllByTestId('offer-review-item').length)
      .toBeLessThanOrEqual(RoomReview.PerOfferMaxCount);
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
