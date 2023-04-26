import { ChangeEvent } from 'react';

type OneStarRadioInputProps = {
  dataTestId?: string;
  htmlId: string;
  htmlName: string;
  isChecked?: boolean;
  labelTitle: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

function OneStarRadioInput(props: OneStarRadioInputProps): JSX.Element {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        data-testid={props.dataTestId}
        id={props.htmlId}
        name={props.htmlName}
        onChange={props.onChange}
        checked={props.isChecked}
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
        <span className="visually-hidden">{props.labelTitle}</span>
      </label>
    </>
  );
}

export default OneStarRadioInput;
