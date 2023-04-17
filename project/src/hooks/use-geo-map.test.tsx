import { renderHook } from '@testing-library/react';
import { useGeoMap } from './use-geo-map';

const City = {
  Paris: {
    name: 'Paris',
    location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
  },
};

describe('Hook: useGeoMap', () => {
  const mockNodeRef = {
    current: document.createElement('div')
  } as const;

  it('renders a Geo map instance', () => {
    const { result } = renderHook(
      () => useGeoMap(mockNodeRef, City.Paris)
    );
    const geoMapInstance = result.current;

    expect(geoMapInstance).not.toBeNull();
  });
});
