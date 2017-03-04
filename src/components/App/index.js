// eslint

import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import { StickyContainer, Sticky } from 'react-sticky';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

function App({ children, location, history }) {
  return (
    <StickyContainer>
      <AppBar
        title="Weggejorist"
        showMenuIconButton={false}
        zDepth={0}
      />
      <Sticky style={{ zIndex: 1 }}>
        <Tabs
          onChange={path => history.push(path)}
          value={location.pathname}
        >
          <Tab label="Weggejorist" value="/reaguursels"><div /></Tab>
          <Tab label="Opgerot" value="/reaguursels/opgerot"><div /></Tab>
          <Tab label="Stats" value="/stats"><div /></Tab>
        </Tabs>
      </Sticky>
      <div>{children}</div>
    </StickyContainer>
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
