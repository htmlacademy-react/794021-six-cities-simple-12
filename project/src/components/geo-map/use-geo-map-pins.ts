import { useEffect } from 'react';
import { icon, marker, Map as LeafletGeoMap } from 'leaflet';
import { Locations } from 'src/types/types';
import { MapPinSettings } from 'src/consts/consts';

export function useGeoMapPins(
  geoMap: LeafletGeoMap | null,
  pins: Locations,
): void {
  const defaultIcon = icon(MapPinSettings.Default);

  useEffect(() => {
    if (!geoMap) {
      return;
    }

    for(const pin of pins) {
      marker(
        [ pin.latitude, pin.longitude ],
        { icon: defaultIcon },
      )
        .addTo(geoMap);
    }
  }, [geoMap, pins]);
}
