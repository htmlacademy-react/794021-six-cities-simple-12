import { useRef } from 'react';
import { Offer, Offers } from 'src/types/types';
import { useGeoMap } from 'src/hooks/use-geo-map';
import { useGeoMapPins } from 'src/hooks/use-geo-map-pins';
import 'leaflet/dist/leaflet.css';
import styles from './geo-map.module.css';

type GeoMapProps = {
  activeOffer: Offer | null;
  className: string;
  offers: Offers;
}

function GeoMap(props: GeoMapProps): JSX.Element {
  const nodeRef = useRef<HTMLElement | null>(null);
  const [ firstOffer ] = props.offers;
  const city = firstOffer?.city ?? null;
  const geoMap = useGeoMap(nodeRef, city);
  useGeoMapPins(geoMap, props.offers, props.activeOffer);

  return (
    <section
      className={`${props.className} ${styles.map}`}
      data-testid="geo-map-block"
      ref={nodeRef}
    >
    </section>
  );
}

export default GeoMap;
