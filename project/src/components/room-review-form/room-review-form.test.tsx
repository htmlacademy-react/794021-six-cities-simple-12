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

    expect(screen.getByRole('radio', { name: /perfect/i }))
      .toBeInTheDocument();

    expect(screen.getByRole('radio', { name: /good/i }))
      .toBeInTheDocument();

    expect(screen.getByRole('radio', { name: /not bad/i }))
      .toBeInTheDocument();

    expect(screen.getByRole('radio', { name: /badly/i }))
      .toBeInTheDocument();

    expect(screen.getByRole('radio', { name: /terribly/i }))
      .toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Submit/i }))
      .toBeInTheDocument();
  });
});
