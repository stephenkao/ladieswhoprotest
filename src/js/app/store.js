// Libraries
import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
// Modules
import postsReducers from '../modules/posts/reducers';
// import navigationReducers from '../modules/navigation/reducers';
// Utilities
import browserHistory from './history';


const reducers = combineReducers({
  posts: postsReducers
//  navigation: navigationReducers
});

const middleware = [
  applyMiddleware(thunk),
  applyMiddleware(routerMiddleware(browserHistory))
];

if (window.devToolsExtension) {
  middleware.push(window.devToolsExtension());
}

const store = createStore(reducers, compose(...middleware));

export default store;
