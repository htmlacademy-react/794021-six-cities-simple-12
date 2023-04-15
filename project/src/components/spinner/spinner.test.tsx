import { render, screen } from '@testing-library/react';
import { Spinner } from './spinner';
import { lorem } from 'faker';

describe('Component: <Spinner>', () => {
  it('renders plain block', () => {
    const text = lorem.sentence();

    render(
      <Spinner
        text={text}
      />
    );

    expect(screen.getByText(text))
      .toBeInTheDocument();
  });
});
