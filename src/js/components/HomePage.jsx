// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
// Configuration
import { postPropTypes } from '../config/prop-definitions';
// Components
import Gallery from './Gallery';


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
        <Slider
          autoplay
          infinite
          pauseOnHover
        >
          <img src="http://placehold.it/1024x768" />
          <img src="http://placehold.it/1024x768" />
          <img src="http://placehold.it/1024x768" />
          <img src="http://placehold.it/1024x768" />
          <img src="http://placehold.it/1024x768" />
          <img src="http://placehold.it/1024x768" />
        </Slider>
        <Gallery posts={ posts } />
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
