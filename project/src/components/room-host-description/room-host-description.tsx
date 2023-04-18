import cn from 'classnames';
import { getUniqueItems } from 'src/utils/utils';
import { OfferHost } from 'src/types/types';

type RoomHostDescriptionProps = {
  host: OfferHost;
  description: string;
}

function RoomHostDescription(props: RoomHostDescriptionProps): JSX.Element {
  const { description, host } = props;
  const textLines = description.split('\n');
  const uniqueTextLines = getUniqueItems(textLines);

  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>

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

      <div className="property__description">
        {
          uniqueTextLines.map((textLine) => (
            <p
              className="property__text"
              key={textLine}
            >
              {textLine}
            </p>
          ))
        }
      </div>

    </div>
  );
}

export default RoomHostDescription;
