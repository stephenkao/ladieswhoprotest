// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Actions
import { requestPosts } from '../modules/posts/action-creators';
// Components
import LoadingPage from './LoadingPage';
// Styles
import '../../scss/main.scss';


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
    this.props.dispatch(requestPosts());
  }

  render() {
    const { children, isFetching } = this.props;

    return (
      <div className="App">
        { isFetching && <LoadingPage /> }
        { !isFetching && children }
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
