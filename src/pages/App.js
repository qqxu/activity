/**
 * Created by qqxu on 2019/6/4.
 */
import React from 'react';
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from "history";

import Rain from './rain/index';
import Test from './test/index';
import Lottery from './lottery/index';
import ModalWrapper from './modalWrapper/index'

const history = createBrowserHistory();

export default class App extends React.Component {
  render() {
    return (
      <Router history={history} >
        <Route path="/canvas" component={Test} />
        <Route path="/rain" component={Rain} />
        <Route path="/lottery" component={Lottery} />
        <Route path="/modal" component={ModalWrapper} />
      </Router>
    );
  }
}


