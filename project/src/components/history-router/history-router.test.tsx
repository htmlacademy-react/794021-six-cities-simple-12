import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter, { HistoryRouterProps } from './history-router';

describe('Component: <HistoryRouter>', () => {
  let history: ReturnType<typeof createMemoryHistory>;
  let props: HistoryRouterProps;

  beforeEach(() => {
    history = createMemoryHistory();
    props = { history };
  });

  it('renders without crashing', () => {
    render(<HistoryRouter {...props} />);
  });


  it('sets the correct location in Router', () => {
    const MOCK_ROUTE = '/MOCK_ROUTE';
    history.push(MOCK_ROUTE);

    render(
      <HistoryRouter {...props}>
        <div data-testid="test-child" />
      </HistoryRouter>
    );

    expect(screen.getByTestId('test-child'))
      .toBeInTheDocument();

    expect(history.location.pathname)
      .toEqual(MOCK_ROUTE);
  });
});
