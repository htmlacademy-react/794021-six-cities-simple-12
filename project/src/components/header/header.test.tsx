import { internet } from 'faker';
import { render, screen } from '@testing-library/react';
import Header from './header';
import { MockBrowserRouterWrapper } from 'src/utils/mock-common';

describe('Component: <Header>', () => {
  const userAvatarUrl = internet.url();
  const userLogin = internet.email();

  it('shows header navigation block, where user is nor authorized, nor not-authorized', () => {
    render(
      <MockBrowserRouterWrapper>
        <Header
          isAuthorized={false}
          isNotAuthorized={false}
          userAvatarUrl={userAvatarUrl}
          userLogin={userLogin}
        />
      </MockBrowserRouterWrapper>
    );

    expect(screen.queryByText(userLogin)).not.toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('shows header navigation block, where user is authorized', () => {
    render(
      <MockBrowserRouterWrapper>
        <Header
          isAuthorized
          isNotAuthorized={false}
          userAvatarUrl={userAvatarUrl}
          userLogin={userLogin}
        />
      </MockBrowserRouterWrapper>
    );

    expect(screen.getByText(userLogin)).toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('shows header navigation block, where user is not authorized', () => {
    render(
      <MockBrowserRouterWrapper>
        <Header
          isAuthorized={false}
          isNotAuthorized
          userAvatarUrl={userAvatarUrl}
          userLogin={userLogin}
        />
      </MockBrowserRouterWrapper>
    );

    expect(screen.queryByText(userLogin)).not.toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });
});
