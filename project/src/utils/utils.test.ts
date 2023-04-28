import { OfferSortingOption } from 'src/consts/consts';
import { sortOffers, throwErrorAtImpossibleCase } from './utils';
import { Offers } from 'src/types/types';

describe('Util functions: throwErrorAtImpossibleCase()', () => {
  let mockItem: never;

  it('throws an error', () => {
    expect(() => throwErrorAtImpossibleCase(mockItem)).toThrow();
  });
});


describe('Util functions: sortOffers()', () => {
  it('tests "PriceLowToHigh" variant', () => {
    const mockOffers = [
      { price: 100 },
      { price: 500.6 },
      { price: 0 },
      { price: 20.5 },
      { price: 300 },
      { price: 400 },
    ];

    expect(sortOffers(mockOffers as Offers, OfferSortingOption.PriceLowToHigh))
      .toEqual([
        { price: 0 },
        { price: 20.5 },
        { price: 100 },
        { price: 300 },
        { price: 400 },
        { price: 500.6 },
      ]);
  });


  it('tests "PriceHighToLow" variant', () => {
    const mockOffers = [
      { price: 100 },
      { price: 500.6 },
      { price: 0 },
      { price: 20.5 },
      { price: 300 },
      { price: 400 },
    ];

    expect(sortOffers(mockOffers as Offers, OfferSortingOption.PriceHighToLow))
      .toEqual([
        { price: 500.6 },
        { price: 400 },
        { price: 300 },
        { price: 100 },
        { price: 20.5 },
        { price: 0 },
      ]);
  });


  it('tests "TopRatedFirst" variant', () => {
    const mockOffers = [
      { rating: 100 },
      { rating: 500.6 },
      { rating: 0 },
      { rating: 20.5 },
      { rating: 300 },
      { rating: 400 },
    ];

    expect(sortOffers(mockOffers as Offers, OfferSortingOption.TopRatedFirst))
      .toEqual([
        { rating: 500.6 },
        { rating: 400 },
        { rating: 300 },
        { rating: 100 },
        { rating: 20.5 },
        { rating: 0 },
      ]);
  });
});
