import React from "react";
import QuizResult from "./QuizResult";
import ProblemResult from "./ProblemResult";
import styled from "styled-components";

const Styles = styled.div`
  font-size: 1.4rem;
  outline: 0;
  background: #f8f8f8;
  padding: 25px 0;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const NextBlock = (props) => {
  const {
    task,
    id,
    quizes,
    student,
    results,
    all_quizes,
    all_tests,
    all_notes,
    problems,
    testResults,
    problemResults,
  } = props;
  return task ? (
    <Styles>
      {task && task.toLowerCase() == "quiz" && (
        <QuizResult
          quizes={all_quizes.filter((t) => t.id === id)}
          student={student}
          results={results}
        />
      )}
      {task && task.toLowerCase() == "problem" && (
        <ProblemResult
          problems={problems.filter((t) => t.id === id)}
          student={student}
          results={problemResults}
          newTests={all_tests}
          testResults={testResults}
          quizes={all_quizes}
          quizResults={results}
          notes={all_notes}
        />
      )}
    </Styles>
  ) : null;
};

export default NextBlock;
