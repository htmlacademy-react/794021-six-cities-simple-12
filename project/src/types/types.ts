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
export type Images = Image[]

export type HardwareFeatures = HardwareFeature[]
export type HardwareFeature = string

export type Location = {
  latitude: number;
  longitude: number;
}

export type OfferLocation = {
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
  id: number; // it is a 'hotelId', not 'review-id' (sort of error-by-design)
  rating: number;
  user: Reviewer;
}

export type Reviews = Review[]

export type ReviewsMap = Record<OfferId, Reviews>
