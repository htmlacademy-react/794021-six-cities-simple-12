import { useEffect } from 'react';
import { icon, marker, Map as LeafletGeoMap } from 'leaflet';
import { Offer, Offers } from 'src/types/types';
import { MapPinSettings } from 'src/consts/consts';

export function useGeoMapPins(
  geoMap: LeafletGeoMap | null,
  offers: Offers, // TODO: could be null ?
  activeOffer: Offer | null,
): void {
  const defaultIcon = icon(MapPinSettings.Default);
  const activeIcon = icon(MapPinSettings.Active);

  useEffect(() => {
    if (!geoMap) {
      return;
    }

    for(const offer of offers) {
      const icon = offer === activeOffer ? activeIcon : defaultIcon;
      marker(
        [ offer.location.latitude, offer.location.longitude ],
        { icon },
      )
        .addTo(geoMap);
    }
  }, [activeOffer, geoMap, offers]);
}
