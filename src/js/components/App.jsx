// Libraries
import React, { PropTypes } from 'react';
// Components
import Navigation from './Navigation';
import Footer from './Footer';
// Styles
import '../../scss/main.scss';


const App = ({ children }) => (
  <div className="App">
    <div className="App__content">
      { children }
      <Navigation />
    </div>
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
