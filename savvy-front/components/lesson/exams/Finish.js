import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import PropTypes from "prop-types";

const CREATE_EXAM_RESULT_MUTATION = gql`
  mutation CREATE_EXAM_RESULT_MUTATION(
    $answers: [String]
    $lesson: ID
    $exam: ID
  ) {
    createExamResult(answers: $answers, lesson: $lesson, exam: $exam) {
      id
    }
  }
`;

const Styles = styled.div`
  padding: 5% 0 10% 0;
  div {
    font-size: 1.8rem;
    font-weight: bold;
  }
`;

const Result = styled.div`
  display: ${(props) => (props.display ? "block" : "none")};
`;

const Button = styled.button`
  padding: 1.5%;
  background: none;
  border: 1px solid black;
  outline: 0;
  margin-bottom: 3%;
  display: ${(props) => (props.display ? "block" : "none")};
`;

const Finish = (props) => {
  const [reveal, show] = useState(false);
  const rights = props.results.filter((r) => r === "true");
  return (
    <Styles>
      <Mutation
        mutation={CREATE_EXAM_RESULT_MUTATION}
        variables={{
          lesson: props.lesson.id,
          exam: props.exam,
          answers: props.results,
        }}
      >
        {(createExamResult, { loading, error }) => (
          <Button
            display={!reveal}
            onClick={async (e) => {
              e.preventDefault();
              show(!reveal);
              const res = await createExamResult();
            }}
          >
            Открыть результаты
          </Button>
        )}
      </Mutation>
      <Result display={reveal}>
        Ваш результат: {rights.length}/{props.results.length} или{" "}
        {parseInt((rights.length / props.results.length) * 100) + "%"}
      </Result>
    </Styles>
  );
};

// Document.propTypes = {
//   title: PropTypes.array.isRequired,
//   cla: PropTypes.string.isRequired,
//   lesson: PropTypes.string.isRequired
// };

export default Finish;
