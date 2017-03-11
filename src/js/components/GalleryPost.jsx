// Libraries
import React, { Component, PropTypes } from 'react';
// Configuration
import { postPropTypes } from '../config/prop-definitions';


const delay = 200;
/* eslint-disable react/prefer-stateless-function */
export default class GalleryPost extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    post: postPropTypes.isRequired
  };

  handleOnClick = (e) => {
    e.preventDefault();
  }

  render() {
    const {
      index,
      post: {
        images,
        title
      }
    } = this.props;

    return (
      <li
        className="flex-child post post--gallery"
        style={ {
          animationDelay: `${index * delay}ms`
        } }
      >
        <a
          className="post__link"
          href="#"
          onClick={ this.handleOnClick }
        >
          <div
            alt={ title.rendered }
            className="post__image"
            style={ {
              backgroundImage: `url(${images[0]})`
            } }
          />
          <figcaption
            className="post__title"
            dangerouslySetInnerHTML={ { __html: title.rendered } }
          />
        </a>
      </li>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
