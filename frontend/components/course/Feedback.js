import React, { Component } from "react";
import renderHTML from "react-render-html";
import styled from "styled-components";

const Box = styled.div`
  border-bottom: 1px solid grey;
`;

class Feedback extends Component {
  render() {
    const { feedback } = this.props;
    return (
      <Box>
        <>
          <h4>{feedback.lesson.name}</h4>
          {renderHTML(feedback.text)}
        </>
      </Box>
    );
  }
}

export default Feedback;
