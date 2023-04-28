import { address, datatype } from 'faker';
import { makeMockOffer, makeMockOffers } from './mock-offer';


describe('Mock functions: makeMockOffers()', () => {
  const testCount = 30;

  it('passes no attributes', () => {
    const offersWithoutAttributes = makeMockOffers(testCount);

    offersWithoutAttributes.forEach((offer, index) => {
      expect(offer.id)
        .toBe(index + 1);
    });
  });


  it('passes empty attributes', () => {
    const offersWithEmptyAttributes = makeMockOffers(testCount, {});

    offersWithEmptyAttributes.forEach((offer, index) => {
      expect(offer.id)
        .toBe(index + 1);
    });
  });


  it('passes specific "id" attribute', () => {
    const mockId = datatype.number({ min: 1 });
    const offersWithSpecificIdAttribute = makeMockOffers(testCount, { id: mockId });

    offersWithSpecificIdAttribute.forEach((offer) => {
      expect(offer.id)
        .toBe(mockId);
    });
  });
});


describe('Mock functions: makeMockOffer()', () => {
  const testCount = 10;

  it('passes specific "id" attibute', () => {
    for(let i = 0; i < testCount; i++) {
      const mockId = datatype.number({ min: 1 });
      const mockOffer = makeMockOffer({ id: mockId });

      expect(mockOffer.id)
        .toBe(mockId);
    }
  });


  it('passes specific "city.name" attibute', () => {
    for(let i = 0; i < testCount; i++) {
      const mockCityName = address.city();
      const mockOffer = makeMockOffer({ city: { name: mockCityName }});

      expect(mockOffer.city.name)
        .toBe(mockCityName);
    }
  });
});
