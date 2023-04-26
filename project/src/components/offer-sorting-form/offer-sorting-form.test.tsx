import { fireEvent, render, screen } from '@testing-library/react';
import OfferSortingForm from './offer-sorting-form';
import { OfferSortingOption } from 'src/consts/consts';

const onChangeSortingType = jest.fn((_option: OfferSortingOption) => undefined);
const sortingOptions = Object.values(OfferSortingOption);

describe('Component: <OfferSortingForm>', () => {
  test.each(sortingOptions)('Renders with header "%s"', (currentSortingOption) => {
    render(
      <OfferSortingForm
        onChangeSortingType={onChangeSortingType}
        sortingType={currentSortingOption}
      />
    );

    expect(screen.getByTestId('offer-sorting-form__header'))
      .toHaveTextContent(currentSortingOption);

    const menuNodes = screen.getAllByTestId('offer-sorting-form__item');
    const menuTexts = menuNodes.map((node) => node.textContent);
    menuTexts.forEach((menuText) => {
      expect(sortingOptions)
        .toEqual(expect.arrayContaining([ menuText ]));
    });
  });


  test.each(sortingOptions)('click and press Enter on menu item "%s"', (currentSortingOption) => {
    render(
      <OfferSortingForm
        onChangeSortingType={onChangeSortingType}
        sortingType={currentSortingOption}
      />
    );

    const menuNodes = screen.getAllByTestId('offer-sorting-form__item');

    menuNodes.forEach((node) => {
      fireEvent.keyDown(node, { key: 'Enter' });

      expect(onChangeSortingType)
        .toBeCalledWith(node.textContent);

      fireEvent.click(node);

      expect(onChangeSortingType)
        .toBeCalledWith(node.textContent);
    });
  });
});
