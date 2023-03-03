export type Offer = {
  id: number;
  isPremium: boolean;
  images: string[];
  price: number;
  rating: number;
  type: string;
  title: string;
}

export type Offers = Offer[]

export type City = {
  name: string;
}
