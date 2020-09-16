import React from "react";
import styled from "styled-components";
import StudentDocumentResult from "./StudentDocumentResult";

const Styles = styled.div`
  margin: 0 1%;
  margin-bottom: 5px;
  padding: 1%;
  border-bottom: 2px solid #edefed;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;

const Document = (props) => {
  console.log(props.document);
  const { document, students } = props;
  let students_who_completed = students.filter(
    (s) =>
      s.documentResults.filter((d) => d.document.id === document.id).length > 0
  );
  console.log(students);
  console.log(students_who_completed);
  return (
    <Styles>
      <b>Документ {props.index}.</b>
      <div>{props.document.title}</div>
      <div>
        <b>Решения:</b>
      </div>
      <Block>
        <ol>
          {students_who_completed.map((s) => (
            <li>
              <StudentDocumentResult
                coursePage={props.coursePage}
                lesson={props.lesson}
                student={s}
                document={props.document}
              />
            </li>
          ))}
        </ol>
      </Block>
    </Styles>
  );
};

export default Document;
