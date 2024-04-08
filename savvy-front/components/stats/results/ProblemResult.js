import React from "react";
import styled from "styled-components";
import ProblemModal from "./ProblemModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 1.4rem;
  margin-bottom: 1%;
  p {
    margin: 0.5% 0;
  }
  .answer {
    border-top: 2px solid #edefed;
    border-bottom: 2px solid #edefed;
  }
`;

const ProblemResults = (props) => {
  const {
    problems,
    student,
    results,
    newTests,
    quizes,
    notes,
    chats,
    testResults,
    quizResults,
  } = props;
  return (
    <>
      <Container>
        {problems.length > 0 &&
          problems.map((problem) => (
            <ProblemModal
              problem={problem}
              student={student}
              results={results}
              newTests={newTests}
              chats={chats}
              testResults={testResults}
              quizes={quizes}
              quizResults={quizResults}
              notes={notes}
            />
          ))}
      </Container>
    </>
  );
};

export default ProblemResults;
