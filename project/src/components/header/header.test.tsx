import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { internet } from 'faker';
import { render, screen } from '@testing-library/react';
import Header from './header';

describe('Component: Header', () => {
  const userAvatarUrl = internet.url();
  const userLogin = internet.email();

  it('shows header, where user is nor authorized, nor not-authorized', () => {
    render(
      <BrowserRouterWrapper>
        <Header
          isAuthorized={false}
          isNotAuthorized={false}
          userAvatarUrl={userAvatarUrl}
          userLogin={userLogin}
        />
      </BrowserRouterWrapper>
    );

    expect(screen.queryByText(userLogin)).not.toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('shows header, where user is authorized', () => {
    render(
      <BrowserRouterWrapper>
        <Header
          isAuthorized
          isNotAuthorized={false}
          userAvatarUrl={userAvatarUrl}
          userLogin={userLogin}
        />
      </BrowserRouterWrapper>
    );

    expect(screen.getByText(userLogin)).toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('shows header, where user is not authorized', () => {
    render(
      <BrowserRouterWrapper>
        <Header
          isAuthorized={false}
          isNotAuthorized
          userAvatarUrl={userAvatarUrl}
          userLogin={userLogin}
        />
      </BrowserRouterWrapper>
    );

    expect(screen.queryByText(userLogin)).not.toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });
});

function BrowserRouterWrapper({ children }: { children: ReactElement } ): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={children} >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
