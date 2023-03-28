import { FocusEvent, KeyboardEvent, useRef, useState } from 'react';
import { OfferSortingVariant } from 'src/consts/consts';
import { OfferSortingOption } from 'src/types/types';

type OfferSortingFormProps = {
  onChangeSortingType: (item: OfferSortingOption) => void;
  sortingType: OfferSortingOption;
}

function OfferSortingForm(props: OfferSortingFormProps): JSX.Element {
  const menuRef = useRef<HTMLElement>(null);
  const listRef = useRef(null);
  const [ isOpen, setIsOpen ] = useState(false);
  const menuAdditionalClassName = isOpen ? 'places__options--opened' : '';

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
        onClick={handleClickMenu}
        onKeyDown={handleKeyDownMenu}
        ref={menuRef}
        tabIndex={0}
      >
        {OfferSortingVariant[props.sortingType].title}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${menuAdditionalClassName}`}
        ref={listRef}
      >
        {
          Object.values(OfferSortingVariant).map((sortingOption) => {
            const additionalClassName = sortingOption.id === props.sortingType ?
              'places__option--active' :
              '';
            return (
              <li
                className={`places__option ${additionalClassName}`}
                key={sortingOption.id}
                tabIndex={0}
                onClick={() => handleClickMenuItem(sortingOption.id)}
                onKeyDown={(evt) => handleKeyDownMenuItem(evt, sortingOption.id)}
              >
                {sortingOption.title}
              </li>
            );
          })
        }
      </ul>
    </form>
  );
}

export default OfferSortingForm;

// TODO: move to utils

function isChildNode(parent: HTMLElement | null, node: HTMLElement | undefined): boolean {
  function assertHasParentNodeOrUndefined(item: EventTarget | undefined): asserts item is HTMLElement {
    if (item && !('parentNode' in item)) {
      throw new Error('Node or undefined expected');
    }
  }

  assertHasParentNodeOrUndefined(node);
  if (parent === undefined || node === null || node === undefined) {
    return false;
  }

  if (parent === node) {
    return true;
  }

  const { parentNode: surItem } = node;
  return isChildNode(parent, surItem as HTMLElement);
}
