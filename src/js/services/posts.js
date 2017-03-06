// Libraries
import { merge } from 'lodash';
import { stringify } from 'query-string';
import fetch from 'isomorphic-fetch';


export async function fetchPosts(customParams = {}) {
  const params = merge({ page: 1 }, customParams);
  const url = `http://ladieswhoprotest.com/wp-json/wp/v2/posts?${stringify(params)}`;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    throw new Error(e);
  }
}
