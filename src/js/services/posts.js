// Libraries
import { merge } from 'lodash';
import { stringify } from 'query-string';
import fetch from 'isomorphic-fetch';


export function fetchPosts(customParams = {}) {
  const params = merge({ page: 1 }, customParams);
  const url = `http://ladieswhoprotest.com/wp-json/wp/v2/posts?${stringify(params)}`;
  return new Promise((resolve, reject) => (
    fetch(url)
      .then((response) => {
        if (response.status >= 400) {
          reject(response);
        }
        resolve(response);
      })
      .catch((e) => {
        reject(e);
      })
  ));
}
