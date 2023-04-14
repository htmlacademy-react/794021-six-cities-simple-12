import { render, screen } from '@testing-library/react';
import NotFound from './not-found';

describe('Component: "Not-Found"', () => {
  it('renders static block', () => {
    render(
      <NotFound />
    );

    expect(screen.getByText('404 Not Found'))
      .toBeInTheDocument();
  });
});
