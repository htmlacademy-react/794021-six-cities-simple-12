import { render, screen } from '@testing-library/react';
import RoomGallery from './room-gallery';
import { makeMockOffer } from 'src/utils/mock-offer';
import { OFFER_PHOTO_LIMIT_COUNT } from 'src/consts/consts';

describe('Component: <RoomGallery>', () => {
  it('searches for image src paths in the rendered block', () => {
    const { images } = makeMockOffer();

    render(
      <RoomGallery
        images={images}
      />);

    const imageNodes = screen.getAllByRole('img');
    const imageSrcs = imageNodes.map((imageNode) => imageNode.getAttribute('src'));
    imageSrcs.forEach((imageSrc) => {
      expect(images)
        .toEqual(expect.arrayContaining([ imageSrc ]));
    });

    expect(imageNodes.length)
      .toBeLessThanOrEqual(OFFER_PHOTO_LIMIT_COUNT);
  });
});
