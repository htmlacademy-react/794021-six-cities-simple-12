import { address, datatype, finance, lorem, name, internet } from 'faker';
import { Images, OfferHost, OfferId, Offers } from 'src/types/types';
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
    .fill('')
    .map((_item) => lorem.words(4));

const makeMockImages = (): Images =>
  new Array(datatype.number(4) + 7)
    .fill('')
    .map((_item) => internet.url());

export const makeMockOffer = (id?: OfferId): Offer => ({
  bedrooms: datatype.number(100) + 1,
  city: makeMockCity(),
  description: lorem.paragraphs(3, '\n'),
  goods: makeMockGoods(),
  host: makeMockHost(),
  id: id ?? datatype.number(1000) + 1,
  images: makeMockImages(),
  isPremium: datatype.boolean(),
  location: makeMockLocation(),
  maxAdults: datatype.number(5) + 1,
  price: +finance.amount(1, 1001, 2),
  rating: datatype.number(5),
  title: lorem.sentence(),
  type: lorem.words(4),
});

export const makeMockOffers = (count: number): Offers =>
  new Array(count)
    .fill({})
    .map((_item, index) => makeMockOffer(index)) as Offers;
