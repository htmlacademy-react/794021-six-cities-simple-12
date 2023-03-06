export type Offer = {
  bedrooms: number;
  goods: HardwareFeatures;
  host: OfferHost;
  id: OfferId;
  isPremium: boolean;
  images: Images;
  maxAdults: number;
  price: number;
  rating: number;
  title: string;
  type: string;
}

export type OfferId = number;
export type Offers = Offer[]

export type City = {
  name: string;
}

export type Cities = City[]

export type Image = string
export type Images = string[]

export type HardwareFeatures = HardwareFeature[]
export type HardwareFeature = string

export type User = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type OfferHost = User
export type Reviewer = User

export type UserLogin = string

export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: Reviewer;
}

export type Reviews = Review[]
