import { Reviews, } from 'src/types/types';
import { userAngelina, userMax, } from 'src/mocks/offers';

export const reviews: Reviews = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: 'Fri Apr 24 2020 03:02:01 GMT+0200',
    id: 1, // hotelId
    rating: 4.8,
    user: userMax,
  },
  {
    comment: 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    date: 'Tue May 25 2020 03:04:05 GMT+0200',
    id: 2, // hotelId
    rating: 3.9,
    user: userAngelina,
  },
];
