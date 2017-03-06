// Libraries
import { fromJS } from 'immutable';
// Configuration
import actionTypes from './action-types';


const { REQUEST_POSTS, RECEIVE_POSTS } = actionTypes;

const initialState = fromJS({
  isFetching: true,
  posts: []
});

function handleGetPosts(state, data) {
  if (!data) {
    return state;
  }

  return state
    .set('isFetching', data.get('isFetching'))
    .set('posts', data.get('posts'));
}

export default function reducers(state = initialState, { type, data }) {
  switch (type) {
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return handleGetPosts(state, data);
  }

  return state;
}
