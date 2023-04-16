import { render, screen } from '@testing-library/react';
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

    expect(screen.getByTestId('sorting-form-header'))
      .toHaveTextContent(currentSortingOption);

    const menuNodes = screen.getAllByTestId('sorting-option-item');
    const menuTexts = menuNodes.map((node) => node.textContent);
    menuTexts.forEach((menuText) => {
      expect(sortingOptions)
        .toEqual(expect.arrayContaining([ menuText ]));
    });
  });
});
