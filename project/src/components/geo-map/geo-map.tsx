import { useEffect, useRef, useState, } from 'react';
import { Map as LeafletGeoMap, TileLayer } from 'leaflet';
import { City, Location, Locations } from 'src/types/types';
import 'leaflet/dist/leaflet.css';
import styles from './geo-map.module.css';

type GeoMapProps = {
  className: string;
  city?: City;
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

    const centerLocation = props.city?.location ?? calcCenter(props.locations);
    const mapProperties = {
      center: {
        lat: centerLocation.latitude,
        lng: centerLocation.longitude,
      },
      zoom: centerLocation.zoom,
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
  }, [props.locations, props.city]);

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

function calcCenter(locations: Locations): Location {
  // FIXME: remove duplication
  const minLatitude = Math.min(...locations.map(({ latitude }) => latitude));
  const maxLatitude = Math.max(...locations.map(({ latitude }) => latitude));

  const minLongitude = Math.min(...locations.map(({ longitude }) => longitude));
  const maxLongitude = Math.max(...locations.map(({ longitude }) => longitude));

  const minZoom = Math.min(...locations.map(({ zoom }) => zoom));

  return {
    latitude: (minLatitude + maxLatitude) / 2,
    longitude: (minLongitude + maxLongitude) / 2,
    zoom: minZoom,
  };
}

export default GeoMap;
