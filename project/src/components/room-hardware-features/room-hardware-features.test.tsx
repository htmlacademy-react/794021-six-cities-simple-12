import { render, screen } from '@testing-library/react';
import RoomHardwareFeatures from './room-hardware-features';
import { makeMockOffer } from 'src/utils/mock-offer';
import { HardwareFeatures } from 'src/types/types';

describe('Component: <RoomHardwareFeatures>', () => {
  it('renders list of items', () => {
    const { goods } = makeMockOffer();

    render(
      <RoomHardwareFeatures
        goods={goods}
      />
    );

    expect(screen.getByRole('heading'))
      .toHaveTextContent('What\'s inside');

    goods.forEach((item) => {
      expect(screen.getByText(item))
        .toBeInTheDocument();
    });
  });


  it('renders "null" if list is empty', () => {
    const goods: HardwareFeatures = [];

    render(
      <RoomHardwareFeatures
        goods={goods}
      />
    );

    expect(screen.queryByRole('heading'))
      .not.toBeInTheDocument();
  });
});
