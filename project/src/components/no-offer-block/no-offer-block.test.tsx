import { render, screen } from '@testing-library/react';
import { address } from 'faker';
import NoOfferBlock from './no-offer-block';

describe('Component "NoOfferBlock"', () => {
  it('checks title and city name in text', () => {
    const cityName = address.cityName();

    render(
      <NoOfferBlock
        cityName={cityName}
      />
    );

    expect(screen.getByText(`We could not find any property available at the moment in ${cityName}`))
      .toBeInTheDocument();
  });
});
