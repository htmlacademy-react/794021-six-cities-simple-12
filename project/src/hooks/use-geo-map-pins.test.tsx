import { renderHook } from '@testing-library/react';
import { useGeoMapPins } from './use-geo-map-pins';
import { OfferLocations } from 'src/types/types';

describe('Hook: useGeoMapPins()', () => {
  it('returns null if passed Geo-map is null', () => {
    const geoMap = null;
    const locations = [] as OfferLocations;
    const activeLocation = undefined;

    renderHook(() => useGeoMapPins(geoMap, locations, activeLocation));

    expect(geoMap).toBeNull();
  });
});
