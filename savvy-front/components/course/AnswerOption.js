import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
  input {
    width: 5%;
  }
`;

  function AnswerOption(props) {
    return (
      <StyledButton>
        <li className="answerOption">
          <input
            type="radio"
            className="radioCustomButton"
            name="radioGroup"
            // checked={props.id.type === props.id.answer}
            id={props.id.type}
            value={props.id.type}
            disabled={false}
            onChange={props.onAnswerSelected}
          />
          <span className="checkmark"></span>
          <label className="radioCustomLabel">
            {props.id.answer}
          </label> 
        </li>
      </StyledButton>
    );
  }

//   AnswerOption.propTypes = {
//     answerType: PropTypes.bool.isRequired,
//     answerContent: PropTypes.string.isRequired,
//     answer: PropTypes.string.isRequired,
//     onAnswerSelected: PropTypes.func.isRequired,
//   };

  export default AnswerOption;