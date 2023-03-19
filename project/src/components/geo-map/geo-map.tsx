import { useRef } from 'react';
import { City, Offer, Offers } from 'src/types/types';
import { useGeoMap } from './use-geo-map';
import { useGeoMapPins } from './use-geo-map-pins';
import 'leaflet/dist/leaflet.css';
import styles from './geo-map.module.css';

type GeoMapProps = {
  activeOffer: Offer | null;
  className: string;
  currentCity: City;
  offers: Offers;
}

function GeoMap(props: GeoMapProps): JSX.Element {
  const nodeRef = useRef<HTMLDivElement>(null);
  const geoMap = useGeoMap(nodeRef, props.currentCity);
  useGeoMapPins(geoMap, props.offers, props.activeOffer);

  return (
    <section
      className={`${props.className} map`}
    >
      <div
        className={styles.map}
        ref={nodeRef}
      >
      </div>
      {geoMap ? undefined : null}
    </section>
  );
}

export default GeoMap;
