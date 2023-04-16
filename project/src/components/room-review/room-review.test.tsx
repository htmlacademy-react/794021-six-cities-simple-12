import { render, screen } from '@testing-library/react';
import RoomReview from './room-review';
import { makeMockReview } from 'src/utils/mock-review';

describe('Component: <RoomReview>', () => {
  it('renders user\'s data: avatar, name, comment', () => {
    const review = makeMockReview();

    render(<RoomReview review={review}/>);

    expect(screen.getByRole('img'))
      .toHaveAttribute('src', review.user?.avatarUrl);

    expect(screen.getByText(review.user?.name))
      .toBeInTheDocument();

    expect(screen.getByText(review.comment, { exact: false }))
      .toBeInTheDocument();
  });
});
