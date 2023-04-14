import { render, screen } from '@testing-library/react';
import OfferCard from './offer-card';
import { makeMockOffer } from 'src/utils/mock-offer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

describe('Component: <OfferCard>', () => {
  it('renders offer card', () => {
    const offer = makeMockOffer();
    const priceAsString = `€${offer.price.toString()}`;

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <OfferCard
                offer={offer}
                onActive={jest.fn()}
                onBlur={jest.fn()}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText(priceAsString))
      .toBeInTheDocument();

    expect(screen.getByText(offer.title))
      .toBeInTheDocument();

    expect(screen.getByText(offer.type, { exact: false }))
      .toBeInTheDocument();

    const foundImageSrc = screen.queryByRole('img')?.getAttribute('src');
    expect(offer.images).toEqual(
      expect.arrayContaining([ foundImageSrc ])
    );
  });
});
