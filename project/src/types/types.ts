export type Offer = {
  bedrooms: number;
  goods: HardwareFeatures;
  id: number;
  isPremium: boolean;
  images: Images;
  maxAdults: number;
  price: number;
  rating: number;
  type: string;
  title: string;
}

export type Offers = Offer[]

export type City = {
  name: string;
}

export type Cities = City[]

export type Image = string
export type Images = string[]

export type HardwareFeatures = HardwareFeature[]
export type HardwareFeature = string

export type UserLogin = string
