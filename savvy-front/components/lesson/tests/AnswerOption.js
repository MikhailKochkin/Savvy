import React, { Component } from "react";
import styled from "styled-components";

const StyledButton = styled.div`
  input {
    width: 5%;
  }

  /* Customize the label (the container) */
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 1.8rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    @media (max-width: 700px) {
      font-size: 1.4rem;
    }
  }

  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 6px;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    @media (max-width: 700px) {
      top: 3px;
      height: 20px;
      width: 20px;
    }
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: #2196f3;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    top: 10px;
    right: 5px;
    position: absolute;
    display: none;
    @media (max-width: 700px) {
      top: 10px;
      right: 5px;
    }
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 10px;
    top: 7px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    @media (max-width: 700px) {
      left: 7px;
      top: 4px;
    }
  }
  p {
    font-size: 1.6rem;
  }
`;
const AnswerOption = props => (
  <StyledButton>
    <li className="answerOption">
      <label class="container">
        <input
          type="checkbox"
          // className="radioCustomButton"
          // name="radioGroup"
          value={props.correct}
          disabled={false}
          number={props.number}
          onChange={props.onAnswerSelected}
        />
        <span class="checkmark" />
        <p>{props.question}</p>
      </label>
    </li>
  </StyledButton>
);
export default AnswerOption;
