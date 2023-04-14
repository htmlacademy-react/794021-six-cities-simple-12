import { render, screen } from '@testing-library/react';
import RoomHardwareFeatures from './room-hardware-features';
import { makeMockOffer } from 'src/utils/mock-offer';

describe('Component: <RoomHardwareFeatures>', () => {
  it('renders list of items', () => {
    const { goods } = makeMockOffer();

    render(
      <RoomHardwareFeatures
        goods={goods}
      />
    );

    expect(screen.getByRole('heading')).toHaveTextContent('What\'s inside');

    goods.forEach((item) => {
      expect(screen.getByText(item))
        .toBeInTheDocument();
    });
  });
});
