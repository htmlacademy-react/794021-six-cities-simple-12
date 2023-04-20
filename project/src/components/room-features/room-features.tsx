import { capitalizeFirstLetter } from 'src/utils/utils';

type RoomFeaturesProps = {
  bedrooms: number;
  dataTestId?: string;
  maxAdults: number;
  type: string;
}

function RoomFeatures(props: RoomFeaturesProps): JSX.Element {
  return (
    <ul className="property__features" data-testid={props.dataTestId}>
      <li className="property__feature property__feature--entire">
        {capitalizeFirstLetter(props.type)}
      </li>
      <li className="property__feature property__feature--bedrooms">
        {props.bedrooms} Bedrooms
      </li>
      <li className="property__feature property__feature--adults">
        Max {props.maxAdults} adults
      </li>
    </ul>
  );
}

export default RoomFeatures;
