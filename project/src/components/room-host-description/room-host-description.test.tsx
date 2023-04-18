import { render, screen } from '@testing-library/react';
import RoomHostDescription from './room-host-description';
import { makeMockHost, makeMockOffer } from 'src/utils/mock-offer';

const { description } = makeMockOffer();
const sentences = description.split('\n');

const hostWithProBadge = makeMockHost({ isPro: true });
const hostWithoutProBadge = makeMockHost({ isPro: false });

describe('Component: <RoomHostDescription>', () => {
  it('renders name, avatar, "pro" badge, description', () => {
    render (<RoomHostDescription host={hostWithProBadge} description={description} /> );

    expect(screen.getByText('Pro'))
      .toBeInTheDocument();

    expect(screen.getByText(hostWithProBadge.name))
      .toBeInTheDocument();

    expect(screen.getByRole('img'))
      .toHaveAttribute('src', hostWithProBadge.avatarUrl);

    sentences.forEach(
      (sentence) => expect(screen.getByText(sentence)).toBeInTheDocument()
    );
  });


  it('renders without "pro" badge', () => {
    render (<RoomHostDescription host={hostWithoutProBadge} description={description} /> );

    expect(screen.queryByText('Pro'))
      .not.toBeInTheDocument();

    expect(screen.getByText(hostWithoutProBadge.name))
      .toBeInTheDocument();

    expect(screen.getByRole('img'))
      .toHaveAttribute('src', hostWithoutProBadge.avatarUrl);

    sentences.forEach(
      (sentence) => expect(screen.getByText(sentence)).toBeInTheDocument()
    );

  });
});
