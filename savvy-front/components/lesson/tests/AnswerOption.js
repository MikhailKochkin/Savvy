import React, { Component } from "react";
import styled from "styled-components";

const StyledButton = styled.div`
  display: inline-block;
  border: ${props =>
    props.choose ? "1.5px solid #122A62" : "1px solid #c4c4c4"};
  padding: 5px 15px;
  cursor: pointer;
  margin-right: 3%;
  margin-bottom: 2%;
`;

class AnswerOption extends Component {
  state = {
    choose: false
  };

  change = e => {
    this.props.onAnswerSelected(this.props.number, this.props.answer);
    this.setState(prev => ({
      choose: !prev.choose
    }));
  };

  render() {
    return (
      <StyledButton
        type="checkbox"
        value={this.props.correct}
        answer={this.props.answer}
        number={this.props.number}
        choose={this.state.choose}
        onClick={this.change}
      >
        <span>{this.props.answer}</span>
      </StyledButton>
    );
  }
}

export default AnswerOption;
