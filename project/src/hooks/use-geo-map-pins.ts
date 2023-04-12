import { useEffect, useMemo } from 'react';
import { icon as getIcon, marker, Map as LeafletGeoMap } from 'leaflet';
import { Offer, Offers } from 'src/types/types';
import { MapPinSetting } from 'src/consts/consts';

export function useGeoMapPins(
  geoMap: LeafletGeoMap | null,
  offers: Offers,
  activeOffer: Offer | null,
): void {
  const icon = useMemo(() => {
    const activeIcon = getIcon(MapPinSetting.Active);
    const defaultIcon = getIcon(MapPinSetting.Default);
    return { active: activeIcon, default: defaultIcon };
  }, []);

  useEffect(() => {
    if (!geoMap) {
      return;
    }

    for(const offer of offers) {
      const { latitude, longitude } = offer.location;
      const currentIcon = offer === activeOffer ?
        icon.active :
        icon.default;

      marker(
        [ latitude, longitude ],
        { icon: currentIcon },
      )
        .addTo(geoMap);
    }
  }, [activeOffer, geoMap, icon, offers]);
}
