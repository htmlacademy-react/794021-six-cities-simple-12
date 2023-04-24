import { useEffect, useMemo, useRef } from 'react';
import { icon as getIcon, marker as makeMarker, Map as LeafletGeoMap, Marker } from 'leaflet';
import { OfferLocation, OfferLocations } from 'src/types/types';
import { MapPinSetting } from 'src/consts/consts';

export function useGeoMapPins(
  geoMap: LeafletGeoMap | null,
  locations: OfferLocations,
  activeLocation?: OfferLocation | undefined,
): void {
  const icon = useMemo(() => {
    const activeIcon = getIcon(MapPinSetting.Active);
    const defaultIcon = getIcon(MapPinSetting.Default);
    return { active: activeIcon, default: defaultIcon };
  }, []);

  const markers = useRef<Marker[]>([]);

  useEffect(() => {
    if (!geoMap) {
      return;
    }

    markers.current.forEach((marker) => geoMap.removeLayer(marker));

    for(const location of locations) {
      const { latitude, longitude } = location;
      const currentIcon = location === activeLocation ?
        icon.active :
        icon.default;

      const currentMarker = makeMarker(
        [ latitude, longitude ],
        { icon: currentIcon },
      )
        .addTo(geoMap);

      markers.current.push(currentMarker);
    }
  }, [ activeLocation, geoMap, icon, locations ]);
}
