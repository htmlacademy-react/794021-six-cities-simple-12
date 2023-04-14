import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NotFound from './not-found';
import { AppRoute } from 'src/consts/consts';

const TEXT_TO_BE = '404 Not Found' as const;

describe('Component: "NotFound"', () => {

  it('renders static block', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText(TEXT_TO_BE)).toBeInTheDocument();

    expect(screen.getByRole('link')).toHaveAttribute('href', AppRoute.Root);
  });
});
