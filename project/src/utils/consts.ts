export const RATING_TO_PERCENT_STEP = 20;

export enum AppRoute {
  Root = '/',
  Login = 'login',
  Offer = 'offer/:id',
}

export const CityNames = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export const RoomReview = {
  HeaderText: 'Your review',
  PlaceholderText: 'Tell how was your stay, what you like and what can be improved',
  SubmitButtonText: 'Submit',
  TextCharacterMinLimit: 50,
} as const;
