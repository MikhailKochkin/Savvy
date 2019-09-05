import React, { Component } from "react";
import Carousel from "nuka-carousel";

import styled from "styled-components";

class DemoCarousel extends Component {
  render() {
    return <Carousel slidesToShow={2} />;
  }
}

export default DemoCarousel;
