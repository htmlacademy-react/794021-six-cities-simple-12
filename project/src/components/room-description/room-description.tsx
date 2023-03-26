import { getUniqueItems } from 'src/utils/utils';

type RoomDescriptionProps = {
  description: string;
}

function RoomDescription(
  { description }: RoomDescriptionProps
): JSX.Element {
  const textLines = description.split('\n');
  const uniqueTextLines = getUniqueItems(textLines);

  return (
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
  );
}

export default RoomDescription;
