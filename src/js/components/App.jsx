// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Actions
import { getPosts } from '../modules/posts/action-creators';
// Utilities
import rit from '../utils/rit';


/* eslint-disable react/prefer-stateless-function */
@connect((state) => ({
  isFetching: state.posts.get('isFetching'),
  posts: state.posts.get('posts')
}))
export default class App extends Component {
  static defaultProps = {
    children: [],
    isFetching: false
  };

  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool
  };

  componentDidMount() {
    this.props.dispatch(getPosts());
  }

  render() {
    console.log(this.props);

    const { children, isFetching } = this.props;

    return (
      <div className="App">
        { rit(isFetching, () => (
          <img
            alt="Loading"
            className="spinner"
          />
        )) }
        { rit(!isFetching, children) }
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
