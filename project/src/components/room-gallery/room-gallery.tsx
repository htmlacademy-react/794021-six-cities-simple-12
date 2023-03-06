import { Images } from 'src/types/types';

type RoomGalleryProps = {
  images: Images;
}

export default RoomGallery;

function RoomGallery({ images }: RoomGalleryProps): JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {
          images.map((image) => (
            <div className="property__image-wrapper"
              key={image}
            >
              <img
                className="property__image"
                src={image}
                alt="Photo studio"
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}
