// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
// Application
import browserHistory from './app/history';
import store from './app/store';
import { genRouteHandler } from './app/route-handlers';
// Components
import App from './components/App';
import HomePage from './components/HomePage';


ReactDOM.render(
  <Provider store={ store }>
    <Router history={ syncHistoryWithStore(browserHistory, store) }>
      <Route path="/" component={ App }>
        <Route path="home" component={ HomePage } onEnter={ genRouteHandler() } />
        <Redirect path="*" to="home" />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('[data-react]')
);
