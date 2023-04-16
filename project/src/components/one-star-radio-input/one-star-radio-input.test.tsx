import { render, screen } from '@testing-library/react';
import OneStarRadioInput from './one-star-radio-input';

describe('Component: <OneStarRadioInput>', () => {
  const value = '1';

  it('renders plain block', () => {
    render(
      <OneStarRadioInput
        htmlId="id"
        htmlName="name"
        labelTitle="title"
        onChange={jest.fn()}
        value={value}
      />
    );

    expect(screen.getByRole('radio'))
      .toHaveProperty('id', 'id');

    expect(screen.getByRole('radio'))
      .toHaveProperty('name', 'name');

    expect(screen.getByRole('radio'))
      .toHaveProperty('value', '1');
  });
});
