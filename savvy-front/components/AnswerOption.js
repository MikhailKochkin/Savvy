import React from 'react';
import PropTypes from 'prop-types';

  function AnswerOption(props) {
    return (
      <li className="answerOption">
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
        <label className="radioCustomLabel">
          {props.id.answer}
        </label>
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