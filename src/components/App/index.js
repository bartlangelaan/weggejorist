
import { PropTypes } from 'react';

function App({ children }) {
  return children;
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
