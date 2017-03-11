// Libraries
import React from 'react';
// Configuration
import Banner from './Banner';


const HomePage = () => (
  <section className="HomePage">
    <div className="HomePage__content">
      <Banner />
      <div className="HomePage__overlay" />
      <div className="HomePage__borderContainer">
        <div className="HomePage__border" />
      </div>
    </div>
  </section>
);

export default HomePage;
