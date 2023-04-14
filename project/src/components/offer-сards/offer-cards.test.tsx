import { render, screen } from '@testing-library/react';
import { lorem } from 'faker';
import OfferCards from './offer-cards';
import { makeMockOffers } from 'src/utils/mock-offer';

describe('Component: OfferCards', () => {
  const className = lorem.word();
  const header = lorem.sentence();
  const offersCount = 20;
  const offers = makeMockOffers(offersCount);
  const onSomeAction = jest.fn();
  const childContent = lorem.paragraph();

  it('renders component', () => {
    render(
      <OfferCards
        className={className}
        header={header}
        offers={offers}
        onActive={onSomeAction}
        onBlur={onSomeAction}
      >
        <div>{childContent}</div>
      </OfferCards>
    );

    expect(screen.getByText(header)).toBeInTheDocument();
    expect(screen.getByText(childContent)).toBeInTheDocument();
  });
});
