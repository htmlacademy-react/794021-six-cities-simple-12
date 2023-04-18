import { useState, useLayoutEffect } from 'react';
import { Router } from 'react-router-dom';
import type { BrowserHistory } from 'history';

export interface HistoryRouterProps {
  basename?: string;
  children?: React.ReactNode;
  history: BrowserHistory;
}

function HistoryRouter(props: HistoryRouterProps) {
  const [ state, setState ] = useState({
    action: props.history.action,
    location: props.history.location,
  });

  useLayoutEffect(() => props.history.listen(setState), [ props.history ]);

  return (
    <Router
      basename={props.basename}
      location={state.location}
      navigationType={state.action}
      navigator={props.history}
    >
      {props.children}
    </Router>
  );
}

export default HistoryRouter;
