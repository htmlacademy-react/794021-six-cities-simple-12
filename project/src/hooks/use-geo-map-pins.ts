import { useEffect, useMemo } from 'react';
import { icon as getIcon, marker, Map as LeafletGeoMap } from 'leaflet';
import { Offer, Offers } from 'src/types/types';
import { MapPinSettings } from 'src/consts/consts';

export function useGeoMapPins(
  geoMap: LeafletGeoMap | null,
  offers: Offers, // TODO: could be null ?
  activeOffer: Offer | null,
): void {
  const icon = useMemo(() => {
    const activeIcon = getIcon(MapPinSettings.Active);
    const defaultIcon = getIcon(MapPinSettings.Default);
    return { active: activeIcon, default: defaultIcon };
  }, []);

  useEffect(() => {
    if (!geoMap) {
      return;
    }

    for(const offer of offers) {
      const { latitude, longitude } = offer.location;
      const currentIcon = offer === activeOffer ? icon.active : icon.default;
      marker(
        [ latitude, longitude ],
        { icon: currentIcon },
      )
        .addTo(geoMap);
    }
  }, [activeOffer, geoMap, icon, offers]);
}
