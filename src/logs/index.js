import React from 'react';
import { Route } from 'react-router-dom';
import LogList from './LogList';

function Logs() {
  return (
    <React.Fragment>
      <Route>
        <LogList />
      </Route>
    </React.Fragment>
  );
};

export default Logs;