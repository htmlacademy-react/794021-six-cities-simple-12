import { renderHook } from '@testing-library/react';
import { useGeoMap } from './use-geo-map';
import { address } from 'faker';

const city = {
  name: address.cityName(),
  location: {
    latitude: +address.latitude(),
    longitude: +address.longitude(),
    zoom: 9,
  },
};

describe('Hook: useGeoMap', () => {
  const mockNodeRef = {
    current: document.createElement('div')
  } as const;

  it('renders a Geo map instance', () => {
    const { result } = renderHook(
      () => useGeoMap(mockNodeRef, city)
    );
    const geoMapInstance = result.current;

    expect(geoMapInstance).not.toBeNull();
  });
});
