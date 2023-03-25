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
  const [{ city: currentCity }] = props.offers;
  const geoMap = useGeoMap(nodeRef, currentCity);
  useGeoMapPins(geoMap, props.offers, props.activeOffer);

  return (
    <section
      className={`${props.className} ${styles.map}`}
      ref={nodeRef}
    >
    </section>
  );
}

export default GeoMap;
