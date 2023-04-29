import { OfferSortingOption } from 'src/consts/consts';
import { isChildNodeOrSelf, sortOffers } from './utils';
import { Offers } from 'src/types/types';


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


describe('Util functions: isChildNode()', () => {
  const mockRoot = { parentNode: null };
  const mockParentNode = { parentNode: mockRoot };
  const mockChildNode = { parentNode: mockParentNode };
  const mockDescendentNode = { parentNode: mockChildNode };
  const mockOrphantNode = { parentNode: mockRoot };


  it('tests nesting', () => {
    expect(isChildNodeOrSelf(mockParentNode, mockChildNode)).toBe(true);
    expect(isChildNodeOrSelf(mockParentNode, mockDescendentNode)).toBe(true);
    expect(isChildNodeOrSelf(mockChildNode, mockDescendentNode)).toBe(true);
  });


  it('tests nesting absence', () => {
    expect(isChildNodeOrSelf(mockParentNode, mockOrphantNode)).toBe(false);
    expect(isChildNodeOrSelf(mockChildNode, mockOrphantNode)).toBe(false);
    expect(isChildNodeOrSelf(mockDescendentNode, mockOrphantNode)).toBe(false);
  });


  it('tests if parent is same as child', () => {
    expect(isChildNodeOrSelf(mockParentNode, mockParentNode)).toBe(true);
    expect(isChildNodeOrSelf(mockChildNode, mockChildNode)).toBe(true);
    expect(isChildNodeOrSelf(mockDescendentNode, mockDescendentNode)).toBe(true);
  });


  it('tests null/undefined cases', () => {
    expect(isChildNodeOrSelf(null, null)).toBe(false);
    expect(isChildNodeOrSelf(null, undefined)).toBe(false);

    expect(isChildNodeOrSelf(undefined, undefined)).toBe(false);
    expect(isChildNodeOrSelf(undefined, null)).toBe(false);
  });


  it('tests if one of nodes is null/undefined', () => {
    expect(isChildNodeOrSelf(mockParentNode, null)).toBe(false);
    expect(isChildNodeOrSelf(mockParentNode, undefined)).toBe(false);

    expect(isChildNodeOrSelf(null, mockChildNode)).toBe(false);
    expect(isChildNodeOrSelf(undefined, mockChildNode)).toBe(false);
  });
});
