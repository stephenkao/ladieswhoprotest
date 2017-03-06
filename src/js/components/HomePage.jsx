// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Configuration
import { postPropTypes } from '../config/prop-definitions';
// Components
import GalleryPost from './GalleryPost';


@connect((state) => ({
  posts: state.posts.get('posts').toJS()
}))
/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends Component {
  static defaultProps = {
    posts: []
  };

  static propTypes = {
    posts: PropTypes.arrayOf(postPropTypes)
  };

  render() {
    const { posts } = this.props;

    if (!posts.length) {
      return null;
    }

    return (
      <div className="HomePage">
        <ul className="flex-container">
          { posts.map((post) => <GalleryPost post={ post } key={ post.id } />) }
        </ul>
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
