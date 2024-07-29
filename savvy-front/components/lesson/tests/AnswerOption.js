import React, { useState } from "react";
import parse from "html-react-parser";
import styled from "styled-components";

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

const AnswerOption = ({
  onAnswerSelected,
  number,
  answer,
  sourceId,
  answerState,
  hidden,
  correct,
  true: isTrue,
  answerOption,
  stop,
  type,
}) => {
  const [choose, setChoose] = useState(answerOption);

  const handleChange = () => {
    if (stop) return;
    onAnswerSelected(number, answer, sourceId);
    setChoose((prevChoose) => !prevChoose);
  };

  let color;
  if (type === "BRANCH") {
    color = answerOption ? "#122A62" : "#c4c4c4";
  } else {
    if (!hidden && isTrue) {
      color = "rgba(50, 172, 102, 0.25)";
    } else if (hidden && choose) {
      color = "#122A62";
    } else {
      color = "#c4c4c4";
    }
  }

  return (
    <StyledButton
      type="checkbox"
      value={correct}
      choose={choose}
      onClick={handleChange}
      color={color}
    >
      {answer && parse(answer)}
    </StyledButton>
  );
};

export default AnswerOption;
