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
  if (!data.has('posts')) {
    return state;
  }

  const imgRe = /<img([\w\W]+?)\/>/g;
  const srcRe = /src="(.*?)"/;

  const posts = data.get('posts').toJS().map((post) => {
    const content = post.content.rendered;
    const images = content.match(imgRe).map((img) => img.match(srcRe)[1]);

    // Remove all images from content
    post.content = content.replace(imgRe, '');
    post.images = images;

    return post;
  });

  console.log(posts);

  return state
    .set('isFetching', data.get('isFetching'))
    .set('posts', fromJS(posts));
}

export default function reducers(state = initialState, { type, data }) {
  switch (type) {
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return handleGetPosts(state, data);
  }

  return state;
}
