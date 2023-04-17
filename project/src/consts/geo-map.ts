import { OfferLocation } from 'src/types/types';

export const DEFAULT_GEOLOCATION: OfferLocation = {
  latitude: 0,
  longitude: 0,
  zoom: 0,
} as const;

export const GeoMapAttributes = {
  TileType: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  Copyright: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
} as const;
