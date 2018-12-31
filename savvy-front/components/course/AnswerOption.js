import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
  input {
    width: 30px;
  }
`;

  function AnswerOption(props) {
    return (
      <li className="answerOption">
        <StyledButton>
          <input
            type="radio"
            className="radioCustomButton"
            name="radioGroup"
            checked={props.id.type === props.id.answer}
            id={props.id.type}
            value={props.id.type}
            disabled={false}
            onChange={props.onAnswerSelected}
          />
          <span class="checkmark"></span>
          <label className="radioCustomLabel">
            {props.id.answer}
          </label> 
        </StyledButton>
      </li>
    );
  }

//   AnswerOption.propTypes = {
//     answerType: PropTypes.bool.isRequired,
//     answerContent: PropTypes.string.isRequired,
//     answer: PropTypes.string.isRequired,
//     onAnswerSelected: PropTypes.func.isRequired,
//   };

  export default AnswerOption;