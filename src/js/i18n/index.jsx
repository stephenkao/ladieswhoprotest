import React, {PropTypes} from 'react';
import ENGLISH_COPY from './english';
import store from '../app/store';


export function getLocale() {
  return store.getState().config.get('language');
}

function getTemplateString(name) {
  return ENGLISH_COPY[name];
}

export function t(name, fill = {}) {
  const template = getTemplateString(name);
  return template(fill, parts => parts.join(''));
}

const T = ({name, fill}) => {
  const template = getTemplateString(name);
  const parts = template(fill || {}, x => x);
  /* eslint-disable react/no-array-index-key */
  return <span>{parts.map((x, i) => <span key={`rt-${i}`}>{x}</span>)}</span>;
  /* eslint-enable react/no-array-index-key */
};

T.propTypes = {
  name: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired
};
