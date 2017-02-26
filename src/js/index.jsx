// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, IndexRoute, IndexRedirect, Redirect } from 'react-router';
import { Provider } from 'react-redux';
// Application
import browserHistory from './app/history';
import store from './app/store';
import { genRouteHandler, saveParamsToState } from './app/route-handlers';
// Components
import App from './components/App';
import HomePage from './components/HomePage';


ReactDOM.render(
  <Provider store={ store }>
    <Router history={ syncHistoryWithStore(browserHistory, store) }>
      <Route path="/">
        <Route key="en">
          <IndexRedirect to="/" />
          <Route path="/" component={ App } onEnter={ saveParamsToState }>
            <IndexRoute component={ HomePage } onEnter={ genRouteHandler() } />
            <Redirect path="*" to="/" />
          </Route>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.querySelector('[data-react]')
);
