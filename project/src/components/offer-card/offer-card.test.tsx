import { fireEvent, render, screen } from '@testing-library/react';
import OfferCard from './offer-card';
import { makeMockOffer } from 'src/utils/mock-offer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const offer = makeMockOffer();
const mockOnActive = jest.fn();
const mockOnBlur = jest.fn();

describe('Component: <OfferCard>', () => {
  it('renders offer card', () => {
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


  it('checks mouse/keyboard interactions', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <OfferCard
                offer={offer}
                onActive={mockOnActive}
                onBlur={mockOnBlur}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );

    const node = screen.getByTestId('offer-card__whole-block');

    fireEvent.mouseEnter(node);
    expect(mockOnActive).toBeCalledTimes(1);

    fireEvent.focus(node);
    expect(mockOnActive).toBeCalledTimes(2);

    fireEvent.mouseLeave(node);
    expect(mockOnBlur).toBeCalledTimes(1);

    fireEvent.blur(node);
    expect(mockOnBlur).toBeCalledTimes(2);
  });
});
