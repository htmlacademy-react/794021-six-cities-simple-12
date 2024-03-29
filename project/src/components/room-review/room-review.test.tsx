import { render, screen } from '@testing-library/react';
import RoomReview from './room-review';
import { makeMockReview } from 'src/utils/mock-review';

describe('Component: <RoomReview>', () => {
  it('renders user\'s data: avatar, name, comment', () => {
    const mockDate = '1991-08-19T00:00:00Z';
    const mockDateHumanReadable = 'August 1991';
    const review = makeMockReview({ date: mockDate });

    render(<RoomReview review={review}/>);

    expect(screen.getByRole('img'))
      .toHaveAttribute('src', review.user.avatarUrl);

    expect(screen.getByText(review.user.name))
      .toBeInTheDocument();

    expect(screen.getByTestId(/review-star-rating/i))
      .toBeInTheDocument();

    expect(screen.getByText(new RegExp(mockDateHumanReadable, 'i')))
      .toBeInTheDocument();

    expect(screen.getByText(review.comment, { exact: false }))
      .toBeInTheDocument();
  });


  it('renders no date if month is incorrect', () => {
    const mockDate = '1999-13-01T00:00:00Z';
    const review = makeMockReview({ date: mockDate });

    render(<RoomReview review={review}/>);

    expect(screen.queryByTestId(/room-review__date/i))
      .not.toBeInTheDocument();
  });


  it('renders no date if year is incorrect', () => {
    const mockDate = 'aabc-01-01T00:00:00Z';
    const review = makeMockReview({ date: mockDate });

    render(<RoomReview review={review}/>);

    expect(screen.queryByTestId(/room-review__date/i))
      .not.toBeInTheDocument();
  });


  it('renders no date if day is incorrect', () => {
    const mockDate = '1999-01-32T00:00:00Z';
    const review = makeMockReview({ date: mockDate });

    render(<RoomReview review={review}/>);

    expect(screen.queryByTestId(/room-review__date/i))
      .not.toBeInTheDocument();
  });
});
