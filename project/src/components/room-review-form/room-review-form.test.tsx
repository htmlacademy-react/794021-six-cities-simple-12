import { render, screen } from '@testing-library/react';
import RoomReviewForm from './room-review-form';

const RATING_STAR_COUNT = 5;

describe('Component: <RoomReviewForm>', () => {
  it('renders plain block', () => {

    render (
      <RoomReviewForm />
    );

    expect(screen.getByRole('textbox'))
      .toHaveAccessibleName('Your review');

    expect(screen.getByRole('textbox'))
      .not.toHaveAttribute('disabled');

    expect(screen.getAllByRole('radio').length)
      .toEqual(RATING_STAR_COUNT);
  });
});
