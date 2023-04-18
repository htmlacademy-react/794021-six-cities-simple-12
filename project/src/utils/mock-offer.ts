import { DeepPartial } from '@reduxjs/toolkit';
import { address, datatype, finance, lorem, name, internet } from 'faker';
import { OFFER_PHOTO_LIMIT_COUNT } from 'src/consts/consts';
import { Images, OfferHost, Offers } from 'src/types/types';
import { HardwareFeatures } from 'src/types/types';
import { City } from 'src/types/types';
import { OfferLocation } from 'src/types/types';
import { Offer } from 'src/types/types';

const makeMockLocation = (): OfferLocation => ({
  latitude: +address.latitude(),
  longitude: +address.longitude(),
  zoom: datatype.number(10) + 1,
});

const makeMockCity = (attributes?: DeepPartial<City>): City => ({
  location: {
    latitude: +address.latitude(),
    longitude: +address.longitude(),
    zoom: datatype.number(10) + 1,
  },
  name: attributes?.name ?? address.cityName(),
});

export const makeMockHost = (attributes?: Partial<OfferHost>): OfferHost => ({
  avatarUrl: internet.url(),
  id: datatype.number(100) + 1,
  isPro: attributes?.isPro ?? datatype.boolean(),
  name: name.firstName(),
});

const makeMockGoods = (): HardwareFeatures =>
  new Array(datatype.number(5) + 1)
    .fill('')
    .map((_item) => lorem.words(4));

const makeMockImages = (): Images =>
  new Array(datatype.number(3) + OFFER_PHOTO_LIMIT_COUNT + 1)
    .fill('')
    .map((_item) => internet.url());

export const makeMockOffer = (attributes?: DeepPartial<Offer>): Offer => ({
  bedrooms: datatype.number(100) + 1,
  city: makeMockCity(attributes?.city),
  description: lorem.paragraphs(3, '\n'),
  goods: makeMockGoods(),
  host: makeMockHost(),
  id: attributes?.id ?? datatype.number(1000) + 1,
  images: makeMockImages(),
  isPremium: datatype.boolean(),
  location: makeMockLocation(),
  maxAdults: datatype.number(5) + 1,
  price: +finance.amount(1, 1001, 2),
  rating: datatype.number(5),
  title: lorem.sentence(),
  type: lorem.words(4),
});

export const makeMockOffers = (count: number, offerAttributes: DeepPartial<Offer>): Offers =>
  new Array(count)
    .fill({})
    .map((_item, index) => makeMockOffer(offerAttributes)) as Offers;
