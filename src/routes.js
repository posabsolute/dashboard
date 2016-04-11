import React from 'react';
import { Route } from 'react-router';

import { App } from 'containers/App';
import Dashboard from 'containers/dashboard.js';

export default (
  <Route path="/" component={App}>
    <Route path="dashboard" component={Dashboard} />
  </Route>
);

