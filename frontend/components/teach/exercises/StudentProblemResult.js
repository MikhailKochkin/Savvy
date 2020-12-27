import React, { useState } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import CreateFeedback from "../CreateFeedback";
import Feedback from "../Feedback";

const Block = styled.div`
  margin: 0 1%;
  margin-bottom: 5px;
  padding: 1%;
  border-bottom: 1px solid #edefed;
`;

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

const Answer = styled.div`
  margin: 1%;
  margin-bottom: 5px;
  padding: 1%;
  background: #f0f8ff;
`;

const StudentProblemResult = (props) => {
  const [reveal, setReveal] = useState(false);
  return (
    <div>
      {props.student.name} {props.student.surname}
      <Button onClick={(e) => setReveal(!reveal)}>
        {reveal ? "Закрыть" : "Открыть"}
      </Button>
      {reveal && (
        <>
          <div>
            {props.components &&
              props.components.length > 0 &&
              props.components.map((d, i) => (
                <Block>
                  {/* <b>{i + 1}.</b> */}
                  {d.__typename.toLowerCase() === "quiz" && (
                    <>
                      <div>Вопрос: {d.question}</div>
                      <div>
                        <b>Ответ: </b>
                        {props.student.quizResults &&
                        props.student.quizResults.filter(
                          (q) => q.quiz.id === d.id
                        )[0] ? (
                          props.student.quizResults.filter(
                            (q) => q.quiz.id === d.id
                          )[0].answer
                        ) : (
                          <span>Нет ответа</span>
                        )}
                      </div>
                    </>
                  )}
                  {d.__typename.toLowerCase() === "note" && <div>{d.text}</div>}
                  {d.__typename.toLowerCase() === "newtest" && (
                    <>
                      <div>Тест: {d.question}</div>
                      <div>
                        <b>Ответ: </b>
                        {props.student.testResults.filter(
                          (t) => t.test.id === d.id
                        )[0] ? (
                          renderHTML(
                            props.student.testResults.filter(
                              (t) => t.test.id === d.id
                            )[0].answer
                          )
                        ) : (
                          <span>Нет ответа</span>
                        )}
                      </div>
                    </>
                  )}
                </Block>
              ))}{" "}
            <Answer>
              <b>Финальный ответ:</b>
              {props.student.problemResults.filter(
                (p) => p.problem.id === props.problem.id
              )[0] &&
                renderHTML(
                  props.student.problemResults.filter(
                    (p) => p.problem.id === props.problem.id
                  )[0].answer
                )}
            </Answer>
          </div>
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
  );
};

export default StudentProblemResult;
