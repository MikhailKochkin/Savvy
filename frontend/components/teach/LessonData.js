import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import { Query, Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import CreateFeedback from "./CreateFeedback";
import TestResult from "./results/TestResult";
import TexteditorResult from "./results/TexteditorResult";
import QuizResult from "./results/QuizResult";
import ProblemResult from "./results/ProblemResult";
import DocumentResult from "./results/DocumentResult";
import Feedback from "./Feedback";

const Data = styled.div`
  display: flex;
  flex-direction: row;
`;

const Name = styled.div`
  font-size: 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 4%;
`;

const Box = styled.div`
  display: grid;
  border: 1px solid #edefed;
  border-radius: 5px;
  grid-template-columns: 0.6fr 1.2fr 1.2fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin: 10px 0;
  padding: 0.5%;
  div {
    padding: 0 15px;
  }
  .div1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .div2 {
    grid-area: 1 / 2 / 2 / 3;
    border-left: 1px solid #edefed;
  }
  .div3 {
    grid-area: 1 / 3 / 2 / 4;
    border-left: 1px solid #edefed;
  }
  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 5%;
    div {
      padding: 8px 15px;
    }
    .div2 {
      border-left: 1px solid white;
      border-top: 1px solid #edefed;
    }
    .div3 {
      border-left: 1px solid white;
      border-top: 1px solid #edefed;
    }
  }
`;

const StyledButton = withStyles({
  root: {
    margin: "1% 0",
    marginRight: "2%",
    fontSize: "1.6rem",
    textTransform: "none",
  },
})(Button);

const LessonData = (props) => {
  const [show, setShow] = useState(false);
  const { index, lesson, student, coursePageID } = props;
  moment.locale("ru");
  let res = student.lessonResults.filter(
    (result) => result.lesson.id === lesson.id
  );
  return (
    <>
      <Data>
        <Name>
          {index + 1}. {lesson.name}
        </Name>
        <StyledButton onClick={(e) => setShow(!show)}>
          {show ? "Скрыть" : "Подробнее"}
        </StyledButton>
      </Data>
      {res.length > 0 ? (
        <Box>
          <div className="div1">Заходов на урок: {res[0].visitsNumber} </div>
          <div className="div2">
            Первый заход: {moment(res[0].createdAt).format("LLL")}
          </div>
          <div className="div3">
            Последний заход: {moment(res[0].updatedAt).format("LLL")}
            {"–"}
            {moment(res[0].updatedAt).fromNow()}
          </div>
        </Box>
      ) : (
        <div className="time">Нет данных по заходам на урок.</div>
      )}
      {show && (
        <>
          <TestResult newTests={lesson.newTests} student={student} />
          <QuizResult quizes={lesson.quizes} student={student} />
          <ProblemResult problems={lesson.problems} student={student} />
          {/*<ConstructionResult
            constructions={lesson.constructions}
            student={student}
          /> */}
          <TexteditorResult
            texteditors={lesson.texteditors}
            student={student}
          />
          <DocumentResult documents={lesson.documents} student={student} />
          <CreateFeedback
            coursePage={coursePageID}
            lesson={lesson.id}
            student={student.id}
          />
          <Feedback feedback={student.studentFeedback} lesson={lesson.id} />
        </>
      )}
    </>
  );
};

export default LessonData;
