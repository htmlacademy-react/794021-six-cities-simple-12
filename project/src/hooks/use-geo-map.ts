import { RefObject, useEffect, useRef, useState } from 'react';
import { LatLngTuple, Map as LeafletGeoMap, TileLayer } from 'leaflet';
import { City } from 'src/types/types';
import { DEFAULT_GEOLOCATION, GeoMapAttributes } from 'src/consts/geo-map';

export function useGeoMap(
  nodeRef: RefObject<HTMLElement | null>,
  city: City | null,
) {
  const [ geoMap, setGeoMap ] = useState<LeafletGeoMap | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!nodeRef.current || isRenderedRef.current) {
      return;
    }

    const layer = new TileLayer(
      GeoMapAttributes.TileType,
      { attribution: GeoMapAttributes.Copyright }
    );

    const mapInstance = new LeafletGeoMap(nodeRef.current);
    mapInstance.addLayer(layer);
    setGeoMap(mapInstance);
    isRenderedRef.current = true;
  }, [city, geoMap, nodeRef]);

  useEffect(() => {
    if (!isRenderedRef) {
      return;
    }

    const centerLocation = city?.location ?? DEFAULT_GEOLOCATION;
    const center: LatLngTuple = [
      centerLocation.latitude,
      centerLocation.longitude,
    ];
    geoMap?.setView(center, centerLocation.zoom);
  }, [city, geoMap, isRenderedRef]);


  return geoMap;
}
