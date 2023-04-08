import cn from 'classnames';
import { OfferHost } from 'src/types/types';

type RoomHostProps = {
  host: OfferHost;
}

function RoomHost({ host }: RoomHostProps): JSX.Element {
  return (
    <div className="property__host-user user">
      <div
        className={cn(
          'property__avatar-wrapper user__avatar-wrapper',
          { 'property__avatar-wrapper--pro': host.isPro },
        )}
      >
        <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
      </div>
      <span className="property__user-name">
        {host.name}
      </span>
      {
        host.isPro ?
          <span className="property__user-status">
            Pro
          </span> :
          null
      }
    </div>
  );
}

export default RoomHost;
