import { FocusEvent, KeyboardEvent, useRef, useState } from 'react';
import cn from 'classnames';
import { isChildNode } from 'src/utils/utils';
import { OfferSortingOption } from 'src/consts/consts';

type OfferSortingFormProps = {
  onChangeSortingType: (item: OfferSortingOption) => void;
  sortingType: OfferSortingOption;
}

function OfferSortingForm(props: OfferSortingFormProps): JSX.Element {
  const menuRef = useRef<HTMLElement>(null);
  const listRef = useRef(null);
  const [ isOpen, setIsOpen ] = useState(false);

  const handleClickMenu = () => setIsOpen(!isOpen);

  const handleKeyDownMenu = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      setIsOpen(false);
      return;
    }
    if (evt.key === 'Enter') {
      setIsOpen(!isOpen);
    }
  };

  const handleBlurMenu = (evt: FocusEvent<HTMLFormElement>) => {
    const { relatedTarget } = evt;
    if (!isChildNode(listRef.current, relatedTarget as HTMLElement | undefined)) {
      setIsOpen(false);
    }
  };

  const handleClickMenuItem = (soringType: OfferSortingOption) => {
    setIsOpen(false);
    menuRef.current && menuRef.current.focus();
    props.onChangeSortingType(soringType);
  };

  const handleKeyDownMenuItem = (evt: KeyboardEvent, sortingType: OfferSortingOption) => {
    if (evt.key === 'Enter') {
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
        className="places__sorting-type"
        data-testid="sorting-form-header"
        onClick={handleClickMenu}
        onKeyDown={handleKeyDownMenu}
        ref={menuRef}
        tabIndex={0}
      >
        {props.sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={cn(
          'places__options places__options--custom',
          { 'places__options--opened': isOpen }
        )}
        ref={listRef}
      >
        {
          Object.values(OfferSortingOption).map((sortingOption) => (
            <li
              className={cn(
                'places__option',
                { 'places__option--active': sortingOption === props.sortingType }
              )}
              data-testid="sorting-option-item"
              key={sortingOption}
              tabIndex={0}
              onClick={() => handleClickMenuItem(sortingOption)}
              onKeyDown={(evt) => handleKeyDownMenuItem(evt, sortingOption)}
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
