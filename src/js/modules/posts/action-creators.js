// Libraries
import { fromJS } from 'immutable';
// Services
import { fetchPosts } from '../../services/posts';
// Configuration
import actionTypes from './action-types';


const { REQUEST_POSTS, RECEIVE_POSTS } = actionTypes;

export function requestPosts(params = {}) {
  return (dispatch) => {
    dispatch({
      type: REQUEST_POSTS,
      data: fromJS({
        isFetching: true
      })
    });

    fetchPosts(params)
      .then((posts) => {
        dispatch({
          data: fromJS({
            isFetching: false,
            posts
          }),
          status: 'success',
          type: RECEIVE_POSTS
        });
      });
  };
}
