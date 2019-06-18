/**
 * Created by qqxu on 2019/6/4.
 */
import React from 'react';
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from "history";

import Rain from './rain/index';
import Test from './test/index';

const history = createBrowserHistory();

export default class App extends React.Component {
  render() {
    return (
      <Router history={history} >
        <Route path="/inbox" component={Test} />
        <Route path="/about" component={Rain} />
      </Router>
    );
  }
}


