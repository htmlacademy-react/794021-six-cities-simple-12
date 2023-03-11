import { HardwareFeatures } from 'src/types/types';

type RoomHardwareFeaturesProps = {
  goods: HardwareFeatures;
}

function RoomHardwareFeatures({ goods }: RoomHardwareFeaturesProps): JSX.Element | null {
  if (!goods.length) {
    return null;
  }
  return (
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {
          goods.map((good) => (
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
