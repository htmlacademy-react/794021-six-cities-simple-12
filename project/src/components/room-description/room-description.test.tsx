import RoomDescription from './room-description';
import { render, screen } from '@testing-library/react';
import { makeMockOffer } from 'src/utils/mock-offer';

describe('Component: <RoomDescription>', () => {
  it('renders component', () => {
    const { description } = makeMockOffer();
    const sentences = description.split('\n');

    render (
      <RoomDescription
        description={description}
      />
    );

    sentences.forEach(
      (sentence) => expect(screen.getByText(sentence)).toBeInTheDocument()
    );
  });
});
