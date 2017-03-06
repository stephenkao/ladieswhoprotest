// Libraries
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
// Modules
import postsReducers from '../modules/posts/reducers';
// import navigationReducers from '../modules/navigation/reducers';
// Utilities
import browserHistory from './history';


const reducers = combineReducers({
  posts: postsReducers,
  //  navigation: navigationReducers,
  routing: routerReducer
});

const middleware = [
  thunkMiddleware,
  routerMiddleware(browserHistory)
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));

export default store;
