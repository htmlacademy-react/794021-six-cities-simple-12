import { fireEvent, render, screen } from '@testing-library/react';
import OfferSortingForm from './offer-sorting-form';
import { OfferSortingOption } from 'src/consts/consts';

const onChangeSortingType = jest.fn((_option: OfferSortingOption) => undefined);
const sortingOptions = Object.values(OfferSortingOption);

describe('Component: <OfferSortingForm>', () => {
  test.concurrent.each(sortingOptions)('Renders with header "%s"', (currentSortingOption) => {
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

    expect(menuNodes.length)
      .toEqual(sortingOptions.length);

    menuTexts.forEach((menuText) => {
      expect(sortingOptions)
        .toEqual(expect.arrayContaining([ menuText ]));
    });
  });


  test.concurrent.each(sortingOptions)('click and press Enter on menu item "%s"', (currentSortingOption) => {
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


  it('toggles menu on "Enter" keydown', () => {
    const [ currentSortingOption ] = sortingOptions;

    render(
      <OfferSortingForm
        onChangeSortingType={jest.fn}
        sortingType={currentSortingOption as OfferSortingOption}
      />
    );

    const menuHeader = screen.getByRole('button', { name: currentSortingOption });

    expect(menuHeader)
      .toHaveAttribute('aria-expanded', 'false');

    fireEvent.keyDown(menuHeader, { key: 'Enter' });
    expect(menuHeader)
      .toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(menuHeader, { key: 'Enter' });
    expect(menuHeader)
      .toHaveAttribute('aria-expanded', 'false');

    fireEvent.keyDown(menuHeader, { key: 'Enter' });
    expect(menuHeader)
      .toHaveAttribute('aria-expanded', 'true');
  });


  it('hides menu on "Escape" keydown', () => {
    const [ currentSortingOption ] = sortingOptions;

    render(
      <OfferSortingForm
        onChangeSortingType={jest.fn}
        sortingType={currentSortingOption as OfferSortingOption}
      />
    );

    const menuHeader = screen.getByRole('button', { name: currentSortingOption });

    expect(menuHeader)
      .toHaveAttribute('aria-expanded', 'false');

    fireEvent.keyDown(menuHeader, { key: 'Escape' });
    expect(menuHeader)
      .toHaveAttribute('aria-expanded', 'false');

    fireEvent.keyDown(menuHeader, { key: 'Escape' });
    expect(menuHeader)
      .toHaveAttribute('aria-expanded', 'false');

    fireEvent.keyDown(menuHeader, { key: 'Enter' });
    expect(menuHeader)
      .toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(menuHeader, { key: 'Escape' });
    expect(menuHeader)
      .toHaveAttribute('aria-expanded', 'false');
  });


  it('hides menu on blur', () => {
    const [ currentSortingOption ] = sortingOptions;

    render(
      <OfferSortingForm
        onChangeSortingType={jest.fn}
        sortingType={currentSortingOption as OfferSortingOption}
      />
    );

    const menuHeaderNode = screen.getByRole('button', { name: currentSortingOption });

    fireEvent.keyDown(menuHeaderNode, { key: 'Enter' });
    expect(menuHeaderNode)
      .toHaveAttribute('aria-expanded', 'true');

    fireEvent.blur(menuHeaderNode);
    expect(menuHeaderNode)
      .toHaveAttribute('aria-expanded', 'false');
  });
});
