// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Configuration
import { postPropTypes } from '../config/prop-definitions';
// Services
import { requestPosts } from '../services/posts';
// Components
import GalleryPost from './GalleryPost';
// Utilities
import rit from '../utils/rit';


/* eslint-disable react/prefer-stateless-function */
@connect(({ posts }) => {
  const postsObj = posts.toJS();
  return {
    isFetching: postsObj.isFetching,
    page: postsObj.page,
    posts: postsObj.posts
  };
})
export default class GalleryPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    page: PropTypes.number,
    posts: PropTypes.arrayOf(postPropTypes)
  };

  static defaultProps = {
    isFetching: true,
    page: 1,
    posts: []
  }

  componentDidMount() {
    const { dispatch, page } = this.props;
    dispatch(requestPosts({ page }));
  }

  render() {
    const { isFetching, posts } = this.props;

    const shouldRenderPosts = isFetching && posts.length > 0;

    return (
      <ul className="flex-container spaced GalleryPage">
        { rit(!shouldRenderPosts, () => (
          <div>LOADING</div>
        )) }
        { rit(shouldRenderPosts, posts.map((post, index) => (
          <GalleryPost
            index={ index }
            key={ post.id }
            post={ post }
          />
        ))) }
      </ul>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
