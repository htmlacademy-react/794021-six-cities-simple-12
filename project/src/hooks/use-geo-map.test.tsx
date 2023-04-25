import { RefObject } from 'react';
import { address } from 'faker';
import { renderHook } from '@testing-library/react';
import { useGeoMap } from './use-geo-map';
import { makeMockOffers } from 'src/utils/mock-offer';
import { DEFAULT_GEOLOCATION } from 'src/consts/geo-map';

type HookReturn = ReturnType<typeof useGeoMap>;
type HookTestProps = {
  nodeRef: Parameters<typeof useGeoMap>[0];
  center: Parameters<typeof useGeoMap>[1];
};

const NULL_CITY = null;
const mockCityName = address.cityName();
const mockOffers = makeMockOffers(10, { city: { name: mockCityName }});
const [{ city: { location: mockCityCenter } }] = mockOffers;

const NULL_NODE_REF = { current: null } as RefObject<HTMLElement | null>;
const getNewNodeRef = () => ({ current: document.createElement('div') as HTMLElement });

describe('Hook: useGeoMap. Independent calls', () => {
  it('runs with: (a) node is null, (b) center is empty', () => {
    const { result: mapInstance } = renderHook(() => useGeoMap(NULL_NODE_REF, NULL_CITY));

    expect(mapInstance.current)
      .toBeNull();
  });

  it('runs with: (a) node is null, (b) center is not empty', () => {
    const { result: mapInstance } = renderHook(() => useGeoMap(NULL_NODE_REF, mockCityCenter));

    expect(mapInstance.current)
      .toBeNull();
  });

  it('runs with: (a) node is provided, (b) center is empty', () => {
    const nodeRef = getNewNodeRef();
    const { result: mapInstance } = renderHook(() => useGeoMap(nodeRef, NULL_CITY));

    expect(mapInstance.current)
      .not.toBeNull();

    expect(mapInstance.current?.getCenter())
      .toEqual({ lat: DEFAULT_GEOLOCATION.latitude, lng: DEFAULT_GEOLOCATION.longitude });
  });
});


describe('Hook: useGeoMap. Serial calls', () => {
  it('renders hook with null node', () => {
    const { result, rerender } = renderHook<HookReturn, HookTestProps>(
      (props) => useGeoMap(props.nodeRef, props.center),
      {
        initialProps: {
          nodeRef: getNewNodeRef(),
          center: mockCityCenter,
        }
      }
    );

    expect(result.current)
      .not.toBeNull();

    rerender({
      nodeRef: NULL_NODE_REF,
      center: mockCityCenter
    });

    expect(result.current)
      .toBeNull();

    rerender({
      nodeRef: getNewNodeRef(),
      center: mockCityCenter
    });

    expect(result.current)
      .not.toBeNull();
  });
});
