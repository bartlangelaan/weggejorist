
import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRedirect from 'react-router/lib/IndexRedirect';
import App from '../components/App';
import { Banned, Deleted } from '../components/Comments';
import Stats from '../components/Stats';

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="reaguursels" />
    <Route path="reaguursels" component={Deleted} />
    <Route path="reaguursels/opgerot" component={Banned} />
    <Route path="stats" component={Stats} />
  </Route>
);

export default routes;
