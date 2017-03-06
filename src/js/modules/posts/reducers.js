import { fromJS } from 'immutable';
import actionTypes from './action-types';

const { FETCH_POSTS, RECEIVED_POSTS } = actionTypes;

const initialState = fromJS({
  isFetching: true,
  posts: []
});

function handleGetPosts(state, { isFetching, posts }) {
  return state
    .set('isFetching', isFetching)
    .set('posts', posts);
}

export default function reducers(state = initialState, { type, data }) {
  switch (type) {
    case FETCH_POSTS:
    case RECEIVED_POSTS:
      return handleGetPosts(state, data);
  }

  return state;
}
