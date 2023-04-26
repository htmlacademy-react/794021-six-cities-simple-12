import { fireEvent, render, screen } from '@testing-library/react';
import { lorem } from 'faker';
import OfferCards from './offer-cards';
import { makeMockOffers } from 'src/utils/mock-offer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

describe('Component: <OfferCards>', () => {
  const className = lorem.word();
  const header = lorem.sentence();
  const offersCount = 20;
  const offers = makeMockOffers(offersCount);
  const handleMockOnActive = jest.fn();
  const handleMockOnBlur = jest.fn();
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
                onActive={handleMockOnActive}
                onBlur={handleMockOnBlur}
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


  it('checks event handlers', () => {
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
                onActive={handleMockOnActive}
                onBlur={handleMockOnBlur}
              >
                <div>{childContent}</div>
              </OfferCards>
            }
          />
        </Routes>
      </BrowserRouter>
    );

    offers.forEach((offer) => {
      fireEvent.mouseEnter(screen.getByText(offer.title));
      expect(handleMockOnActive).toBeCalledWith(offer);
    });

    offers.forEach((offer) => {
      fireEvent.mouseLeave(screen.getByText(offer.title));
      expect(handleMockOnActive).toBeCalledTimes(offersCount);
    });
  });
});
