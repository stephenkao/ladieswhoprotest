// Libraries
import React, { PropTypes } from 'react';
// Configuration
import { postPropTypes } from '../config/prop-definitions';
// Components
import GalleryPost from './GalleryPost';

const Gallery = ({ posts }) => (
  <ul className="flex-container Gallery">
    { posts.map((post) => <GalleryPost post={ post } key={ post.id } />) }
  </ul>
);

Gallery.propTypes = {
  posts: PropTypes.arrayOf(postPropTypes)
};

Gallery.defaultProps = {
  posts: []
};

export default Gallery;
