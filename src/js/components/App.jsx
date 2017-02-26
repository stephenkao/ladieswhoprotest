// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


@connect((state) => ({
  isFetching: state.posts.get('isFetching')
}))
/* eslint-disable react/prefer-stateless-function */
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    isFetching: PropTypes.bool
  };

  render() {
    if (this.props.isFetching) {
      return (
        <div className="App">
          <img
            alt="Loading"
            className="spinner"
          />
        </div>
      );
    }

    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
