// Configuration
import actionTypes from './action-types';


const { GET_POSTS } = actionTypes;

export function getPostsData(posts) {
  return {
    type: GET_POSTS,
    data: posts
  };
}
