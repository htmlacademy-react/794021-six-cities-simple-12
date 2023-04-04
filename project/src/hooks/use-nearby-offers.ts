import { Location, Offer, Offers } from 'src/types/types';
import { useAppSelector } from 'src/hooks';
import { useEffect, useState } from 'react';

export function useNearbyOffers(offer: Offer | null, limitCount: number): Offers {
  const offers = useAppSelector<Offers>((store) => store.offers);
  const [ nearbyOffers, setNearbyOffers ] = useState<Offers>([]);

  useEffect(() => {
    if (!offer) {
      setNearbyOffers([]);
      return;
    }
    const currentCityOffers = offers.filter(
      ({ city }) => () => city.name === offer.city.name
    );
    const foundOffers = getNearbyOffers(currentCityOffers, offer, limitCount);
    setNearbyOffers(foundOffers);

  }, [limitCount, offer, offers]);

  return nearbyOffers;
}


function getNearbyOffers(offers: Offers, offer: Offer, limitCount: number): Offers {
  const offersDistances = offers.map(({ id, location }) => {
    const distance = calcGeoDistance(location, offer.location);
    return {
      id,
      distance,
    };
  });

  offersDistances.sort((offer1, offer2) => offer1.distance - offer2.distance);
  offersDistances.splice(limitCount);
  const ids = offersDistances.map((offersDistance) => offersDistance.id);

  return offers.filter((iteratedOffer) => ids.includes(iteratedOffer.id));
}


function calcGeoDistance(
  coordinate1: Location,
  coordinate2: Location,
) {
  const EARTH_RADIUS_IN_KILOMETERS = 6571;

  function calcDegreesFromRadians(degrees: number) {
    return (degrees * Math.PI) / 180;
  }

  const startingLat = calcDegreesFromRadians(coordinate1.latitude);
  const startingLong = calcDegreesFromRadians(coordinate1.longitude);
  const destinationLat = calcDegreesFromRadians(coordinate2.latitude);
  const destinationLong = calcDegreesFromRadians(coordinate2.longitude);

  // Haversine equation
  const distanceInKilometers =
    Math.acos(Math.sin(startingLat) * Math.sin(destinationLat) +
    Math.cos(startingLat) * Math.cos(destinationLat) *
    Math.cos(startingLong - destinationLong)) * EARTH_RADIUS_IN_KILOMETERS;

  return distanceInKilometers;
}
