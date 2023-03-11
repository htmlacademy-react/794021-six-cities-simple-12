type RoomDescriptionProps = {
  description: string;
}

export default RoomDescription;

function RoomDescription(
  { description }: RoomDescriptionProps
): JSX.Element {
  const textLines = description.split('\n');

  return (
    <div className="property__description">
      {
        textLines.map((textLine) => (
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
