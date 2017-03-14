// Libraries
import React from 'react';
// Configuration
import Banner from './Banner';
import Divider from './Divider';


const HomePage = () => (
  <section className="HomePage">
    <Banner />
    <div className="HomePage__content">
      <div className="HomePage__borderContainer">
        <div className="HomePage__border" />
      </div>
    </div>
    <Divider />
  </section>
);

export default HomePage;
