import React, { useState } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";

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

const AnswerOption = (props) => {
  const [choose, setChoose] = useState(false);

  const change = (e) => {
    if (!choose && !props.hidden) {
      props.onAnswerSelected(
        props.number,
        props.move,
        props.update ? props.update : props.answer,
        props.id
      );
      setChoose(!choose);
    } else if (props.lastBlock) {
      props.onAnswerSelected(
        props.number,
        props.move,
        props.update ? props.update : props.answer,
        props.id
      );
    }
  };

  const changeCourse = (e) => {
    console.log("props.lastBlock", props.lastBlock);
    if (!choose && !props.hidden) {
      props.onAnswerSelected(
        props.number,
        props.move,
        props.update ? props.update : props.answer,
        props.id
      );
      setChoose(!choose);
    }
  };

  const shuffle = () => {
    props.shuffle(true);
  };

  let color;
  // if (!props.hidden && props.true) {
  //   color = "rgba(50, 172, 102, 0.25)";
  // } else if (props.hidden && choose) {
  //   color = "#122A62";
  // } else {
  //   color = "#c4c4c4";
  // }
  if (choose) {
    color = "#122A62";
  } else {
    color = "#c4c4c4";
  }
  return (
    !props.hidden &&
    (props.type == "link" ? (
      <StyledButton
        type="checkbox"
        answer={props.answer}
        number={props.number}
        choose={choose}
        onClick={(e) => changeCourse()}
        color={color}
      >
        <a href={props.link} target="_blank">
          {props.answer && renderHTML(props.answer)}
        </a>
      </StyledButton>
    ) : props.type == "shuffle" ? (
      <StyledButton
        type="checkbox"
        answer={props.answer}
        onClick={(e) => shuffle()}
        choose={choose}
        color={color}
      >
        {props.answer && renderHTML(props.answer)}
      </StyledButton>
    ) : (
      <StyledButton
        type="checkbox"
        answer={props.answer}
        number={props.number}
        choose={choose}
        onClick={(e) => change()}
        color={color}
      >
        {props.answer && renderHTML(props.answer)}
      </StyledButton>
    ))
  );
};

export default AnswerOption;
