import React from 'react';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import routes from '../routes';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

// We need a Root component for React Hot Loading.
function Root() {
  return (
    <MuiThemeProvider>
      <Router history={appHistory} routes={routes} />
    </MuiThemeProvider>
  );
}

export default Root;
