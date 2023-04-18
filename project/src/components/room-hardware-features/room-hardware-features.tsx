import { HardwareFeatures } from 'src/types/types';

type RoomHardwareFeaturesProps = {
  dataTestId?: string;
  goods: HardwareFeatures;
}

function RoomHardwareFeatures(props: RoomHardwareFeaturesProps): JSX.Element | null {
  if (!props.goods.length) {
    return null;
  }
  return (
    <div className="property__inside" data-testid={props.dataTestId}>
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {
          props.goods.map((good) => (
            <li className="property__inside-item"
              key={good}
            >
              {good}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default RoomHardwareFeatures;
