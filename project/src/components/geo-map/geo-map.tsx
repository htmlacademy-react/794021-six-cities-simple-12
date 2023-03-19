import { useRef } from 'react';
import { City, Locations } from 'src/types/types';
import { useGeoMap } from './use-geo-map';
import { useGeoMapPins } from './use-geo-map-pins';
import 'leaflet/dist/leaflet.css';
import styles from './geo-map.module.css';

type GeoMapProps = {
  className: string;
  currentCity: City;
  locations: Locations;
}

function GeoMap(props: GeoMapProps): JSX.Element {
  const nodeRef = useRef<HTMLDivElement>(null);
  const geoMap = useGeoMap(nodeRef, props.currentCity);
  useGeoMapPins(geoMap, props.locations);

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
