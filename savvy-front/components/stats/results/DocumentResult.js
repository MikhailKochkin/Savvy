import React from "react";
import styled from "styled-components";
import DocumentModal from "./DocumentModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  p {
    margin: 0.5% 0;
  }
  .answer {
    border-top: 2px solid #edefed;
    border-bottom: 2px solid #edefed;
  }
`;

const DocumentResult = (props) => {
  const { documents, student, results } = props;

  return (
    <Container>
      {documents.length > 0 &&
        documents.map((q) => (
          <DocumentModal document={q} student={student} results={results} />
        ))}
    </Container>
  );
};

export default DocumentResult;
