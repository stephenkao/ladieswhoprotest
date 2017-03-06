// Libraries
import React from 'react';
// Configuration
import { postPropTypes } from '../config/prop-definitions';
// Utilities
import rit from '../utils/rit';


const GalleryPost = ({
  post: {
    featuredMedia,
    title
  }
}) => (
  <li className="flex-child post post--gallery">
    <img
      alt={ title }
      src="http://placehold.it/300x300"
    />
    { rit(title && title.rendered, () => title.rendered) }
  </li>
);

GalleryPost.propTypes = {
  post: postPropTypes.isRequired
};

export default GalleryPost;
