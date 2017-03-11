// Libraries
import React from 'react';
import Slider from 'react-slick';

export default class Banner extends React.Component {
  componentDidMount() {
    // HACK: Recalculate slider dimensions
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1);
  }

  render() {
    return (
      <Slider accessibility autoplay infinite>
        <img alt="kitten" src="http://lorempixel.com/1024/768/cats/1" />
        <img alt="kitten" src="http://lorempixel.com/1024/768/cats/2" />
        <img alt="kitten" src="http://lorempixel.com/1024/768/cats/3" />
        <img alt="kitten" src="http://lorempixel.com/1024/768/cats/4" />
      </Slider>
    );
  }
}
