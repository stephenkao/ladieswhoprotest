// Libraries
import React from 'react';
import Slider from 'react-slick';

export default class Banner extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { hasMounted: false };
  }

  componentDidMount() {
    // HACK: Recalculate slider dimensions
    setTimeout(() => {
      this.setState({ hasMounted: true });
      window.dispatchEvent(new Event('resize'));
    }, 1);
  }

  render() {
    return (
      <div className="Banner">
        <Slider
          accessibility
          autoplay={ this.state.hasMounted }
          infinite
        >
          { [1, 2, 3, 4].map((number) => (
            <div
              key={ number }
              alt="kitten"
              className="Banner__item"
              style={ {
                backgroundImage: `url('http://lorempixel.com/1024/768/cats/${number}'`
              } }
            />
          )) }
        </Slider>
      </div>
    );
  }
}
