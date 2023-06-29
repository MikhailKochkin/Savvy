import React, { Component } from "react";
import styled from "styled-components";

const LessonImage = styled.img`
  position: relative;
  object-fit: cover;
  height: 300px;
  width: 100%;
`;

class EducatorImage extends Component {
  render() {
    return (
      <LessonImage src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/q_100/v1567425972/manhattan-407703_1.jpg" />
    );
  }
}

export default EducatorImage;
