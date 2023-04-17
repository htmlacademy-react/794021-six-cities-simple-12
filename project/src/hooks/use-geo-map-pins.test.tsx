import { renderHook } from '@testing-library/react';
import { useGeoMapPins } from './use-geo-map-pins';
import { Offers } from 'src/types/types';

describe('Hook: useGeoMapPins()', () => {
  it('returns null if passed Geo-map is null', () => {
    const geoMap = null;
    const offers = [] as Offers;
    const activeOffer = null;

    renderHook(() => useGeoMapPins(geoMap, offers, activeOffer));

    expect(geoMap).toBeNull();
  });
});
