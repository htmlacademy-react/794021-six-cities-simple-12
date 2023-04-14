import { render, screen } from '@testing-library/react';
import { lorem } from 'faker';
import OfferCards from './offer-cards';
import { makeMockOffers } from 'src/utils/mock-offer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

describe('Component: OfferCards', () => {
  const className = lorem.word();
  const header = lorem.sentence();
  const offersCount = 20;
  const offers = makeMockOffers(offersCount);
  const onSomeAction = jest.fn();
  const childContent = lorem.paragraph();

  it('renders component', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <OfferCards
                className={className}
                header={header}
                offers={offers}
                onActive={onSomeAction}
                onBlur={onSomeAction}
              >
                <div>{childContent}</div>
              </OfferCards>
            }
          />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText(header)).toBeInTheDocument();
    expect(screen.getByText(childContent)).toBeInTheDocument();
  });
});
