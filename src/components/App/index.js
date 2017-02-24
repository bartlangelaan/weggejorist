// eslint

import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

function App({ children, location, history }) {
  return (
    <div>
      <AppBar
        title="Weggejorist"
        showMenuIconButton={false}
        zDepth={0}
      />
      <Tabs
        onChange={path => history.push(path)}
        value={location.pathname}
      >
        <Tab label="Weggejorist" value="/reaguursels"><div /></Tab>
        <Tab label="Opgerot" value="/reaguursels/opgerot"><div /></Tab>
        <Tab label="Stats" value="/stats"><div /></Tab>
      </Tabs>
      <div>{children}</div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object,
};

export default App;
