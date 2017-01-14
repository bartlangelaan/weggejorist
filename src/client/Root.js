import React from 'react';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import routes from '../routes';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

// We need a Root component for React Hot Loading.
function Root() {
  return (
    <Router history={appHistory} routes={routes} />
  );
}

export default Root;
