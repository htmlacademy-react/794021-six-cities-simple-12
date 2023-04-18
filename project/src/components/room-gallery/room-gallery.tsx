import { OFFER_PHOTO_LIMIT_COUNT } from 'src/consts/consts';
import { Images } from 'src/types/types';

type RoomGalleryProps = {
  dataTestId?: string;
  images: Images;
}

function RoomGallery(props: RoomGalleryProps): JSX.Element {
  return (
    <div className="property__gallery-container container" data-testid={props.dataTestId}>
      <div className="property__gallery">
        {
          props.images.map((image, index) => (
            index < OFFER_PHOTO_LIMIT_COUNT ?
              <div className="property__image-wrapper"
                key={image}
              >
                <img
                  className="property__image"
                  src={image}
                  alt="Interior"
                />
              </div> :
              null
          ))
        }
      </div>
    </div>
  );
}

export default RoomGallery;
