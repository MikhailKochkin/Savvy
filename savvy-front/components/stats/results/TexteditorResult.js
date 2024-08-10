import React, { Component } from "react";
import styled from "styled-components";
import TexteditorModal from "./TexteditorModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  p {
    margin: 0.5% 0;
  }
  .answer {
    border-top: 2px solid #edefed;
    border-bottom: 2px solid #edefed;
  }
`;

const TexteditorResult = (props) => {
  const { texteditors, student, results } = props;
  return (
    <Container>
      {texteditors.length > 0 &&
        texteditors.map((texteditor) => (
          <TexteditorModal
            texteditor={texteditor}
            student={student}
            results={results}
            all_quizes={props.all_quizes}
            all_tests={props.all_tests}
            all_notes={props.all_notes}
            all_chats={props.all_chats}
            all_problems={props.all_problems}
            all_quiz_results={props.all_quiz_results}
            all_test_results={props.all_test_results}
          />
        ))}
    </Container>
  );
};

export default TexteditorResult;
