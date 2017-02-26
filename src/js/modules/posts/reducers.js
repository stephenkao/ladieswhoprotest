import Immutable from 'immutable';
import actionTypes from './action-types';

const { GET_POSTS } = actionTypes;

const initialState = Immutable.fromJS({
  posts: []
});

function handleGetPosts(state, posts) {
  return state
    .set('posts', posts);
}

export default function reducers(state = initialState, { type, data }) {
  switch (type) {
    case GET_POSTS:
      return handleGetPosts(state, data);
  }

  return state;
}
