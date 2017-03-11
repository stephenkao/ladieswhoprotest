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
@connect((state) => ({
  isFetching: state.posts.get('isFetching'),
  posts: state.posts.get('posts')
}))
export default class GalleryPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    posts: PropTypes.arrayOf(postPropTypes).isRequired
  };

  componentDidMount() {
    this.props.dispatch(requestPosts());
  }

  render() {
    const { posts } = this.props;

    return (
      <ul className="flex-container spaced Gallery">
        { posts.map((post, index) => (
          <GalleryPost
            index={ index }
            key={ post.id }
            post={ post }
          />
        )) }
      </ul>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
