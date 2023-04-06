import { RefObject, useEffect, useRef, useState } from 'react';
import { LatLngTuple, Map as LeafletGeoMap, TileLayer } from 'leaflet';
import { City } from 'src/types/types';
import { DEFAULT_GEOLOCATION } from 'src/consts/geo-map';

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
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }
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
