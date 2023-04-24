import { useEffect, useRef, useState } from 'react';
import { Map as LeafletGeoMap, TileLayer } from 'leaflet';
import { DEFAULT_GEOLOCATION, GeoMapAttributes } from 'src/consts/geo-map';
import { OfferLocation } from 'src/types/types';


export function useGeoMap (
  node: HTMLElement | null,
  centerLocation: OfferLocation | null,
): LeafletGeoMap | null {
  const mapRef = useRef<LeafletGeoMap | null>(null);
  const [ geoMap, setGeoMap ] = useState<LeafletGeoMap | null>(null);

  useEffect(() => {
    if (node === null) {
      return;
    }

    if (mapRef.current !== null) {
      return;
    }

    const layer = new TileLayer(
      GeoMapAttributes.TileType,
      { attribution: GeoMapAttributes.Copyright }
    );

    mapRef.current = new LeafletGeoMap(node);
    mapRef.current.addLayer(layer);

    setGeoMap(mapRef.current);
  }, [ node, centerLocation ]);


  useEffect(() => {
    if (geoMap === null || mapRef.current === null) {
      return;
    }

    const center = centerLocation ?? DEFAULT_GEOLOCATION;

    mapRef.current
      .setView([ center.latitude, center.longitude ], center.zoom);

  }, [ centerLocation, geoMap ]);

  return geoMap;
}
