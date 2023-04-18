import { render, screen } from '@testing-library/react';
import GeoMap from './geo-map';

const MOCK_CLASS_NAME = 'SOMETHING_LOOKS_AS_A_CLASS_NAME';
const TEST_ID_FOR_GEO_MAP_BLOCK = 'geo-map-block';

describe('Component: <GeoMap>', () => {
  it('should render correctly', () => {
    render(
      <GeoMap
        activeOffer={null}
        className={MOCK_CLASS_NAME}
        offers={[]}
      />
    );

    expect(screen.getByTestId(TEST_ID_FOR_GEO_MAP_BLOCK))
      .toBeInTheDocument();
  });
});
