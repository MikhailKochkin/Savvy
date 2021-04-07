import React, { Component } from "react";
import renderHTML from "react-render-html";
import styled from "styled-components";

const Box = styled.div`
  border-bottom: 1px solid grey;
  ins {
    text-decoration: none;
    background: #edffe7;
    /* padding: 0.5% 0.3%; */
  }
  del {
    background: #f6b7bc;
  }
`;

class Feedback extends Component {
  render() {
    const { feedback } = this.props;
    console.log(feedback.lesson);
    return (
      <Box>
        <>
          <h4>
            Урок {feedback.lesson.number}. {feedback.lesson.name}
          </h4>
          {renderHTML(feedback.text)}
        </>
      </Box>
    );
  }
}

export default Feedback;
