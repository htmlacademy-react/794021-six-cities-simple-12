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
  SubmitButtonText: 'Submit',
  TextCharacterLimit: 50,
} as const;
