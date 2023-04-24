import { RefObject } from 'react';
import { address } from 'faker';
import { renderHook } from '@testing-library/react';
import { useGeoMap } from './use-geo-map';
import { makeMockOffers } from 'src/utils/mock-offer';
import { DEFAULT_GEOLOCATION } from 'src/consts/geo-map';

type HookReturn = ReturnType<typeof useGeoMap>;
type HookTestProps = {
  node: Parameters<typeof useGeoMap>[0];
  center: Parameters<typeof useGeoMap>[1];
};

const NULL_CITY = null;
const mockCityName = address.cityName();
const mockOffers = makeMockOffers(10, { city: { name: mockCityName }});
const [{ city: { location: mockCityCenter } }] = mockOffers;

const NULL_NODE_REF = { current: null } as RefObject<HTMLElement | null>;


describe('Hook: useGeoMap', () => {
  it('runs with: (a) node is null, (b) center is empty', () => {
    const { result: mapInstance } = renderHook(() => useGeoMap(NULL_NODE_REF.current, NULL_CITY));

    expect(mapInstance.current)
      .toBeNull();
  });


  it('runs with: (a) node is null, (b) center is not empty', () => {
    const { result: mapInstance } = renderHook(() => useGeoMap(NULL_NODE_REF.current, mockCityCenter));

    expect(mapInstance.current)
      .toBeNull();
  });


  it('runs with: (a) node is provided, (b) center is changing', () => {
    const nodeRef = { current: document.createElement('div') } as RefObject<HTMLElement | null>;
    const { result: mapInstance, rerender } = renderHook<HookReturn, HookTestProps>(
      (props) => useGeoMap(props.node, props.center),
      { initialProps: { node: nodeRef.current, center: NULL_CITY }}
    );

    expect(mapInstance.current)
      .not.toBeNull();

    expect(mapInstance.current?.getCenter())
      .toEqual({ lat: DEFAULT_GEOLOCATION.latitude, lng: DEFAULT_GEOLOCATION.longitude });

    rerender({ node: nodeRef.current, center: mockCityCenter });

    expect(mapInstance.current?.getCenter())
      .toEqual({ lat: mockCityCenter.latitude, lng: mockCityCenter.longitude });
  });
});
