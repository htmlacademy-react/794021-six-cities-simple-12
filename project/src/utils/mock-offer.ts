import { address, datatype, finance, lorem, name, internet } from 'faker';
import { Images, OfferHost } from 'src/types/types';
import { HardwareFeatures } from 'src/types/types';
import { City } from 'src/types/types';
import { OfferLocation } from 'src/types/types';
import { Offer } from 'src/types/types';

const makeMockLocation = (): OfferLocation => ({
  latitude: +address.latitude(),
  longitude: +address.longitude(),
  zoom: datatype.number(10) + 1,
});

const makeMockCity = (): City => ({
  location: {
    latitude: +address.latitude(),
    longitude: +address.longitude(),
    zoom: datatype.number(10) + 1,
  },
  name: address.cityName(),
});

const makeMockHost = (): OfferHost => ({
  avatarUrl: internet.url(),
  id: datatype.number(100) + 1,
  isPro: datatype.boolean(),
  name: name.firstName(),
});

const makeMockGoods = (): HardwareFeatures =>
  new Array(datatype.number(5) + 1)
    .fill(lorem.words(4)) as HardwareFeatures;

const makeMockImages = (): Images =>
  new Array(datatype.number(3) + 7)
    .fill(internet.url()) as Images;

export const makeMockOffer = (): Offer => ({
  bedrooms: datatype.number(100) + 1,
  city: makeMockCity(),
  description: lorem.sentence(),
  goods: makeMockGoods(),
  host: makeMockHost(),
  id: datatype.number(100) + 1,
  images: makeMockImages(),
  isPremium: datatype.boolean(),
  location: makeMockLocation(),
  maxAdults: datatype.number(5) + 1,
  price: +finance.amount(1, 1001, 2),
  rating: datatype.number(5),
  title: lorem.sentence(),
  type: lorem.words(4),
});
