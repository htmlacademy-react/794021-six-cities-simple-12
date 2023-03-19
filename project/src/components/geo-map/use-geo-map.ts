import { RefObject, useEffect, useRef, useState } from 'react';
import { LatLngTuple, Map as LeafletGeoMap, TileLayer } from 'leaflet';
import { City } from 'src/types/types';

export function useGeoMap(
  nodeRef: RefObject<HTMLDivElement | null>,
  city: City,
) {
  const [ geoMap, setGeoMap ] = useState<LeafletGeoMap | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (isRenderedRef.current || !nodeRef.current) {
      return;
    }

    const { location: cityCenter } = city;
    const mapProperties = {
      center: [
        cityCenter.latitude,
        cityCenter.longitude,
      ] as LatLngTuple,
      zoom: cityCenter.zoom,
    };

    const layer = new TileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }
    );

    const mapInstance = new LeafletGeoMap(nodeRef.current, mapProperties);
    mapInstance.addLayer(layer);
    setGeoMap(mapInstance);
    isRenderedRef.current = true;
  }, [city]);

  return geoMap;
}
