import React from 'react';
import { Switch, Route } from 'react-router-dom';

import List from '../pages/List';
import Grid from '../pages/Grid';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={List} />
      <Route path="/grid" component={Grid} />

    </Switch>
  );
}

export default Routes;
