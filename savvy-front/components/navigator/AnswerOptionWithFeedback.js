import React, { useState } from "react";
import styled from "styled-components";


const StyledButton = styled.div`
  display: inline-block;
  vertical-align: middle;
  border: ${(props) => (props.color !== "#c4c4c4" ? "2px solid" : "1px solid")};
  border-color: ${(props) => props.color};
  padding: 10px 15px;
  background: #fff;
  cursor: pointer;
  margin-right: 3%;
  margin-bottom: 2%;
  border-radius: ${(props) => (props.color !== "#c4c4c4" ? "25px" : "0px")};

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

const StyledButtonGreen = styled.div`
  display: inline-block;
  vertical-align: middle;
  border: 2px solid #3d811b;
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

const AnswerOptionWithFeedback = (props) => {
  const [choose, setChoose] = useState(false);

  const change = (e) => {
    if (!props.hidden) {
      props.onAnswerSelected(props.type);
      setChoose(!choose);
    }
  };

  let color;

  if (choose) {
    color = "#122A62";
  } else {
    color = "#c4c4c4";
  }
  return (
    !props.hidden &&
    (props.type == "discount" || props.type == "payment" ? (
      <StyledButtonGreen
        type="checkbox"
        // value={this.props.correct}
        answer={props.answer}
        number={props.number}
        choose={choose}
        onClick={(e) => change()}
        color={"green"}
      >
        {props.answer && parse(props.answer)}
      </StyledButtonGreen>
    ) : (
      <StyledButton
        type="checkbox"
        // value={this.props.correct}
        answer={props.answer}
        number={props.number}
        choose={choose}
        onClick={(e) => change()}
        color={color}
      >
        {props.answer && parse(props.answer)}
      </StyledButton>
    ))
  );
};

export default AnswerOptionWithFeedback;
