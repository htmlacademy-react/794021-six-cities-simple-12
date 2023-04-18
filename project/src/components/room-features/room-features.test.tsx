import { render, screen } from '@testing-library/react';
import RoomFeatures from './room-features';
import { datatype, lorem } from 'faker';

const bedroomCount = datatype.number();
const adultCount = datatype.number();
const offerType = lorem.sentence();

describe('Component: <RoomFeatures />', () => {
  it('renders components correctly', () => {
    render(
      <RoomFeatures
        bedrooms={bedroomCount}
        maxAdults={adultCount}
        type={offerType}
      />,
    );

    expect(screen.getByText(offerType))
      .toBeInTheDocument();

    expect(screen.getByText(new RegExp(`${bedroomCount.toString()} Bedrooms`, 'i')))
      .toBeInTheDocument();

    expect(screen.getByText(new RegExp(`Max ${adultCount.toString()} adults`, 'i')))
      .toBeInTheDocument();
  });
});
