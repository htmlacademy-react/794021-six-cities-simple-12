type OneStarInputProps = {
  htmlId: string;
  inputValue: string;
  labelTitle: string;
}

export default OneStarInput;

function OneStarInput(props: OneStarInputProps): JSX.Element {
  return (
    <>
      <input className="form__rating-input visually-hidden"
        id={props.htmlId}
        name="rating"
        type="radio"
        value={props.inputValue}
      />
      <label
        className="reviews__rating-label form__rating-label"
        htmlFor={props.htmlId}
        title={props.labelTitle}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}
