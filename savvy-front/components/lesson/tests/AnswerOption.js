import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";

const StyledButton = styled.div`
  display: inline-block;
  vertical-align: middle;
  border: ${(props) => (props.color !== "#c4c4c4" ? "3px solid" : "1px solid")};
  border-color: ${(props) => props.color};
  padding: 10px 15px;
  background: #fff;
  cursor: pointer;
  margin-right: 3%;
  margin-bottom: 2%;
  img {
    display: block;
    margin: 2% 0;
    max-width: 100%;
    max-height: 20em;
    @media (max-width: 750px) {
      width: 100%;
      height: auto;
    }
  }
  p {
    margin: 0;
  }
`;

class AnswerOption extends Component {
  state = {
    choose: false,
  };

  change = (e) => {
    this.props.onAnswerSelected(this.props.number, this.props.answer);
    this.setState((prev) => ({
      choose: !prev.choose,
    }));
  };

  render() {
    let color;
    if (!this.props.hidden && this.props.true) {
      color = "rgba(50, 172, 102, 0.25)";
    } else if (this.props.hidden && this.state.choose) {
      color = "#122A62";
    } else {
      color = "#c4c4c4";
    }
    return (
      <StyledButton
        type="checkbox"
        value={this.props.correct}
        answer={this.props.answer}
        number={this.props.number}
        choose={this.state.choose}
        onClick={this.change}
        color={color}
      >
        {renderHTML(this.props.answer)}
      </StyledButton>
    );
  }
}

export default AnswerOption;
