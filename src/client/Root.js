import React from 'react';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import ReactGA from 'react-ga';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import routes from '../routes';

ReactGA.initialize('UA-97629232-1');


const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

// We need a Root component for React Hot Loading.
function Root() {
  return (
    <MuiThemeProvider>
      <Router
        history={appHistory}
        routes={routes}
        onUpdate={() => {
          ReactGA.pageview(`/${location.hash}`);
        }}
      />
    </MuiThemeProvider>
  );
}

export default Root;
