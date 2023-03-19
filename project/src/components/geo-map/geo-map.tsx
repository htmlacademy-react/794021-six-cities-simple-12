import { useEffect, useRef, useState, } from 'react';
import { Map as LeafletGeoMap, TileLayer } from 'leaflet';
import { City, Locations } from 'src/types/types';
import 'leaflet/dist/leaflet.css';
import styles from './geo-map.module.css';

type GeoMapProps = {
  className: string;
  currentCity: City;
  locations: Locations;
}

function GeoMap(props: GeoMapProps): JSX.Element {
  const [ geoMap, setGeoMap ] = useState<LeafletGeoMap | null>(null);
  const isRenderedRef = useRef<boolean>(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRenderedRef.current || !nodeRef.current) {
      return;
    }

    const { location: cityCenter } = props.currentCity;
    const mapProperties = {
      center: {
        lat: cityCenter.latitude,
        lng: cityCenter.longitude,
      },
      zoom: cityCenter.zoom,
    };

    const layer = new TileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }
    );

    const mapInstance = new LeafletGeoMap(nodeRef.current, mapProperties);
    mapInstance.addLayer(layer);
    setGeoMap(mapInstance);
    isRenderedRef.current = true;
  }, [props.locations, props.currentCity]);

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
