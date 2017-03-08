// Libraries
import React, { Component } from 'react';
// Configuration
import { postPropTypes } from '../config/prop-definitions';


/* eslint-disable react/prefer-stateless-function */
export default class GalleryPost extends Component {
  static propTypes = {
    post: postPropTypes.isRequired
  };

  handleOnClick = () => {
    console.log(this.props.post.id);
  }

  render() {
    const {
      post: {
        images,
        title
      }
    } = this.props;

    return (
      <li className="flex-child post post--gallery">
        <a
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
