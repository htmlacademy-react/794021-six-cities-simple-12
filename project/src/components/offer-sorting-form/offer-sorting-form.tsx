import { FocusEvent, KeyboardEvent, useRef, useState } from 'react';
import cn from 'classnames';
import { isChildNodeOrSelf } from 'src/utils/utils';
import { OfferSortingOption } from 'src/consts/consts';

type OfferSortingFormProps = {
  onChangeSortingType: (item: OfferSortingOption) => void;
  sortingType: OfferSortingOption;
}

type CustomMouseKeyboardEvent = Pick<MouseEvent, 'type'> | KeyboardEvent;

function OfferSortingForm(props: OfferSortingFormProps): JSX.Element {
  const menuRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef(null);
  const [ isOpen, setIsOpen ] = useState(false);

  const handleClickMenu = () => setIsOpen(!isOpen);

  const handleKeyDownMenu = (evt: KeyboardEvent) => {
    switch (evt.key) {
      case 'Escape':
        setIsOpen(false);
        break;
      case 'Enter':
        setIsOpen(!isOpen);
    }
  };

  const handleBlurMenu = (evt: FocusEvent<HTMLFormElement>) => {
    const { relatedTarget } = evt;

    if (!isChildNodeOrSelf(listRef.current, relatedTarget)) {
      setIsOpen(false);
    }
  };

  const handleClickOrEnter = (evt: CustomMouseKeyboardEvent, sortingType: OfferSortingOption) => {
    if (evt.type === 'click' || ('key' in evt && evt.key === 'Enter')) {
      setIsOpen(false);
      menuRef.current && menuRef.current.focus();
      props.onChangeSortingType(sortingType);
    }
  };

  return (
    <form className="places__sorting" action="#" method="get"
      onBlur={handleBlurMenu}
    >
      <span className="places__sorting-caption">Sort by</span>{' '}
      <span
        aria-controls="offer-sorting-form__list"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="places__sorting-type"
        data-testid="offer-sorting-form__header"
        onClick={handleClickMenu}
        onKeyDown={handleKeyDownMenu}
        ref={menuRef}
        role="button"
        tabIndex={0}
      >
        {props.sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        aria-label="Sorting options"
        className={cn(
          'places__options places__options--custom',
          { 'places__options--opened': isOpen }
        )}
        id="offer-sorting-form__list"
        ref={listRef}
        role="menu"
      >
        {
          Object.values(OfferSortingOption).map((sortingOption) => (
            <li
              aria-checked={sortingOption === props.sortingType}
              className={cn(
                'places__option',
                { 'places__option--active': sortingOption === props.sortingType }
              )}
              data-testid="offer-sorting-form__item"
              key={sortingOption}
              role="menuitemradio"
              tabIndex={0}
              onClick={(evt) => handleClickOrEnter(evt, sortingOption)}
              onKeyDown={(evt) => handleClickOrEnter(evt, sortingOption)}
            >
              {sortingOption}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default OfferSortingForm;
