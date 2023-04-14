import { render, screen } from '@testing-library/react';
import RoomHost from './room-host';
import { makeMockHost } from 'src/utils/mock-offer';

describe('Component: <RoomHost>', () => {
  it('renders name, avatar, "pro" badge', () => {
    const host = makeMockHost({ isPro: true });

    render (<RoomHost host={host} /> );

    expect(screen.getByText(host.name))
      .toBeInTheDocument();

    expect(screen.getByRole('img'))
      .toHaveAttribute('src', host.avatarUrl);

    expect(screen.getByText('Pro'))
      .toBeInTheDocument();

  });


  it('renders without "pro" badge', () => {
    const host = makeMockHost({ isPro: false });

    render (<RoomHost host={host} />);

    expect(screen.queryByText('Pro'))
      .not.toBeInTheDocument();

  });
});
