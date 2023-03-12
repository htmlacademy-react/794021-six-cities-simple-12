import { ChangeEvent } from 'react';

type OneStarInputProps = {
  htmlId: string;
  value: string;
  labelTitle: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function OneStarInput(props: OneStarInputProps): JSX.Element {
  return (
    <>
      <input className="form__rating-input visually-hidden"
        id={props.htmlId}
        name="rating"
        onChange={props.onChange}
        type="radio"
        value={props.value}
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

export default OneStarInput;
