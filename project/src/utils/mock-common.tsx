import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function MockBrowserRouterWrapper({ children }: { children: ReactElement } ): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={children} >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
