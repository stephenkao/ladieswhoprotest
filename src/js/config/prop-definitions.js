// Libraries
import {PropTypes} from 'react';

export const postPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  date_gmt: PropTypes.string.isRequired,
  guid: PropTypes.shape({
    rendered: PropTypes.string.isRequired
  }).isRequired,
  modified: PropTypes.string.isRequired,
  modified_gmt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.shape({
    rendered: PropTypes.string.isRequired
  }).isRequired,
  content: PropTypes.shape({
    rendered: PropTypes.string.isRequired,
    protected: PropTypes.bool.isRequired
  }).isRequired,
  excerpt: PropTypes.shape({
    rendered: PropTypes.string.isRequired,
    protected: PropTypes.bool.isRequired
  }).isRequired,
  author: PropTypes.number.isRequired,
  featured_media: PropTypes.number.isRequired,
  comment_status: PropTypes.string.isRequired,
  ping_status: PropTypes.string.isRequired,
  sticky: PropTypes.bool.isRequired,
  template: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
  meta: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  categories: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  _links: PropTypes.shape({
    self: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string.isRequired
    }).isRequired).isRequired,
    collection: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string.isRequired
    }).isRequired).isRequired,
    about: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string.isRequired
    }).isRequired).isRequired,
    author: PropTypes.arrayOf(PropTypes.shape({
      embeddable: PropTypes.bool.isRequired,
      href: PropTypes.string.isRequired
    }).isRequired).isRequired,
    replies: PropTypes.arrayOf(PropTypes.shape({
      embeddable: PropTypes.bool.isRequired,
      href: PropTypes.string.isRequired
    }).isRequired).isRequired,
    'version-history': PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string.isRequired
    }).isRequired).isRequired,
    'wp:attachment': PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string.isRequired
    }).isRequired).isRequired,
    'wp:term': PropTypes.arrayOf(PropTypes.shape({
      taxonomy: PropTypes.string.isRequired,
      embeddable: PropTypes.bool.isRequired,
      href: PropTypes.string.isRequired
    }).isRequired).isRequired,
    curies: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      templated: PropTypes.bool.isRequired
    }).isRequired).isRequired
  })
});
