export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: HardwareFeatures;
  host: OfferHost;
  id: OfferId;
  isPremium: boolean;
  images: Images;
  location: OfferLocation;
  maxAdults: number;
  price: number;
  rating: number;
  title: string;
  type: string;
}

export type OfferId = number
export type Offers = Offer[]

export type City = {
  location: OfferLocation;
  name: CityName;
}

export type CityName = string

export type CityNames = readonly CityName[]

export type Image = string
export type Images = string[]

export type HardwareFeatures = HardwareFeature[]
export type HardwareFeature = string

export type Location = {
  latitude: number;
  longitude: number;
}

export type OfferLocation = { // TODO get from Location type!
  latitude: number;
  longitude: number;
  zoom: number;
}

export type OfferLocations = OfferLocation[]

export type User = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type OfferHost = User
export type Reviewer = User

export type UserLogin = string
export type UserPassword = string

export type Review = {
  comment: string;
  date: string;
  id: number; // hotelId https://12.react.pages.academy/six-cities-simple/spec#get-/comments/-hotelId-:~:text=GET%20/comments/%7BhotelId%7D
  rating: number;
  user: Reviewer;
}

export type Reviews = Review[]
