// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


/* eslint-disable react/prefer-stateless-function */
@connect((state) => ({
  pathname: state.routing.locationBeforeTransitions.pathname
}))
export default class Navigation extends Component {
  static propTypes = {
    pathname: PropTypes.string
  };

  static defaultProps = {
    pathname: ''
  };

  render() {
    const { pathname } = this.props;

    return (
      <nav className="Navigation">
        <ul className="Navigation__list">
          <li className="Navigation__link">
            <Link to="/protests">Protests</Link>
          </li>
          <li className="Navigation__link">
            <Link to="/share">Share</Link>
          </li>
          <li className="Navigation__link">
            <Link to="/home">
              { ['', '/', '/home'].indexOf(pathname) !== -1 ? (
                <div className="Navigation__logo" />
              ) : (
                'Home'
              ) }
            </Link>
          </li>
          <li className="Navigation__link">
            <Link to="/about">About</Link>
          </li>
          <li className="Navigation__link">
            <Link to="/locate">Locate</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
