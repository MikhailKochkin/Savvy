import React, { useState } from "react";
import renderHTML from "react-render-html";
import styled from "styled-components";
import CreateFeedback from "../CreateFeedback";
import Feedback from "../Feedback";

const Button = styled.button`
  margin-left: 5px;
  font-family: Montserrat;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 1%;
  outline: none;
  &:hover {
    background: #f0f8ff;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2% 0;
  @media (max-width: 800px) {
    flex-direction: column;
  }
  div {
    flex-basis: 50%;
    padding: 0 2%;
    p {
      margin-bottom: 10px;
    }
  }
  .right {
    border-left: 1px solid grey;
  }
`;

const StudentDocumentResult = (props) => {
  const [reveal, setReveal] = useState(false);
  const doc = props.student.documentResults.filter(
    (d) => d.document.id === props.document.id
  );
  console.log(doc);
  return (
    <div>
      <div>
        {props.student.name} {props.student.surname}
        <Button onClick={(e) => setReveal(!reveal)}>
          {reveal ? "Закрыть" : "Открыть"}
        </Button>
        {reveal && (
          <>
            <Block>
              <div>
                <b>Первоначальный ответ:</b>
                {doc.map((t) => t.drafts.map((par) => renderHTML(par)))}
              </div>
              <div className="right">
                <b>Финальный ответ:</b>
                {doc.map((t) => t.answers.map((par) => renderHTML(par)))}
              </div>
            </Block>
            <CreateFeedback
              coursePage={props.coursePage}
              lesson={props.lesson}
              student={props.student.id}
            />
            <Feedback
              feedback={props.student.studentFeedback}
              lesson={props.lesson}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDocumentResult;
