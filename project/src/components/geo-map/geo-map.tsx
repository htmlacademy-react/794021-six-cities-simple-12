import { useRef } from 'react';
import { useGeoMap } from 'src/hooks/use-geo-map';
import { useGeoMapPins } from 'src/hooks/use-geo-map-pins';
import 'leaflet/dist/leaflet.css';
import styles from './geo-map.module.css';
import { Offer, Offers } from 'src/types/types';

type GeoMapProps = {
  activeOffer: Offer | null;
  className: string;
  dataTestId?: string;
  offers: Offers;
}

function GeoMap(props: GeoMapProps): JSX.Element {
  const nodeRef = useRef<HTMLElement | null>(null);
  const [ firstOffer ] = props.offers;
  const centerLocation = firstOffer?.city?.location ?? null;
  const locations = props.offers.map((offer) => offer.location);
  const geoMap = useGeoMap(nodeRef.current, centerLocation);
  useGeoMapPins(geoMap, locations, props.activeOffer?.location);

  return (
    <section
      className={`${props.className} ${styles.map}`}
      data-testid={`geo-map-block ${props.dataTestId ?? ''}`}
      ref={nodeRef}
    >
    </section>
  );
}

export default GeoMap;
