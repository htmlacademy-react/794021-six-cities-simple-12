export type Offer = {
  id: number;
  isPremium: boolean;
  images: Images;
  price: number;
  rating: number;
  type: string;
  title: string;
}

export type Offers = Offer[]

export type City = {
  name: string;
}

export type Image = string;
export type Images = string[];
