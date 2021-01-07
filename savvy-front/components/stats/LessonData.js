import { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useQuery, gql } from "@apollo/client";
// import CreateFeedback from "./CreateFeedback";
// import TestResult from "./results/TestResult";
// import TexteditorResult from "./results/TexteditorResult";
// import QuizResult from "./results/QuizResult";
// import ProblemResult from "./results/ProblemResult";
// import DocumentResult from "./results/DocumentResult";
// import Feedback from "./Feedback";

const GET_TEST_RESULTS = gql`
  query testResults($lessonId: String!, $userId: String!) {
    testResults(
      where: { lessonId: { equals: $lessonId }, studentId: { equals: $userId } }
    ) {
      id
      answer
      test {
        id
        question
      }
      student {
        id
        name
        surname
      }
      createdAt
    }
  }
`;

const GET_QUIZ_RESULTS = gql`
  query quizResults($lessonId: String!, $userId: String!) {
    quizResults(
      where: { lessonId: { equals: $lessonId }, studentId: { equals: $userId } }
    ) {
      id
      correct
      student {
        id
        name
        surname
      }
      quiz {
        id
      }
      answer
      createdAt
    }
  }
`;

const GET_PROBLEM_RESULTS = gql`
  query problemResults($lessonId: String!, $userId: String!) {
    problemResults(
      where: { lessonId: { equals: $lessonId }, studentId: { equals: $userId } }
    ) {
      id
      answer
      lesson {
        id
      }
      problem {
        id
      }
      student {
        id
        name
        surname
      }
      revealed
      createdAt
    }
  }
`;

const GET_EDITOR_RESULTS = gql`
  query textEditorResults($lessonId: String!, $userId: String!) {
    textEditorResults(
      where: { lessonId: { equals: $lessonId }, studentId: { equals: $userId } }
    ) {
      id
      wrong
      correct
      guess
      attempts
      student {
        id
      }
      textEditor {
        id
      }
      createdAt
    }
  }
`;

const GET_FEEDBACK = gql`
  query feedbacks($lessonId: String!, $userId: String!) {
    feedbacks(
      where: { lessonId: { equals: $lessonId }, studentId: { equals: $userId } }
    ) {
      id
      text
      lesson {
        id
      }
      createdAt
    }
  }
`;

const Data = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
`;

const Name = styled.div`
  font-size: 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 4%;
`;

const Box = styled.div`
  border: 1px solid #edefed;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 2fr repeat(2, 4fr) 0;
  grid-template-rows: 0 1fr repeat(3, 0);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin: 5px 0;
  padding: 0.5%;
  div {
    padding: 0 15px;
  }
  .div1 {
    grid-area: 2 / 1 / 3 / 2;
  }
  .div2 {
    grid-area: 2 / 2 / 3 / 3;
    border-left: 1px solid #edefed;
  }
  .div3 {
    grid-area: 2 / 3 / 3 / 4;
    border-left: 1px solid #edefed;
  }
  .div4 {
    grid-area: 2 / 4 / 3 / 5;
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
  const { index, lesson, student, coursePageID, res } = props;
  moment.locale("ru");
  // const {
  //   loading: test_loading,
  //   error: test_error,
  //   data: test_data,
  // } = useQuery(GET_TEST_RESULTS, {
  //   variables: { lessonId: lesson.id, userId: student.id },
  // });
  // if (test_loading) return "Loading...";
  // if (test_error) return `Error! ${test_error.message}`;

  // const {
  //   loading: quiz_loading,
  //   error: quiz_error,
  //   data: quiz_data,
  // } = useQuery(GET_QUIZ_RESULTS, {
  //   variables: { lessonId: lesson.id, userId: student.id },
  // });
  // if (quiz_loading) return "Loading...";
  // if (quiz_error) return `Error! ${quiz_error.message}`;

  // const {
  //   loading: problem_loading,
  //   error: problem_error,
  //   data: problem_data,
  // } = useQuery(GET_PROBLEM_RESULTS, {
  //   variables: { lessonId: lesson.id, userId: student.id },
  // });
  // if (problem_loading) return "Загружаю задачи...";
  // if (problem_error) return `Error! ${problem_error.message}`;

  // const {
  //   loading: editor_loading,
  //   error: editor_error,
  //   data: editor_data,
  // } = useQuery(GET_EDITOR_RESULTS, {
  //   variables: { lessonId: lesson.id, userId: student.id },
  // });
  // if (editor_loading) return "Загружаю задачи...";
  // if (editor_error) return `Error! ${editor_error.message}`;

  // const {
  //   loading: feedback_loading,
  //   error: feedback_error,
  //   data: feedback_data,
  // } = useQuery(GET_FEEDBACK, {
  //   variables: { lessonId: lesson.id, userId: student.id },
  // });
  // if (feedback_loading) return "Загружаю задачи...";
  // if (feedback_error) return `Error! ${feedback_error.message}`;
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
      {res.length > 0 && res[0].lesson.structure ? (
        <Box>
          <div className="div1">
            {(
              res[0].progress / res[0].lesson.structure.lessonItems.length
            ).toFixed(2) * 100}
            %{" "}
          </div>
          <div className="div2">Заходов: {res[0].visitsNumber} </div>
          <div className="div3">
            Первый заход: {moment(res[0].createdAt).format("LLL")}
          </div>
          <div className="div4">
            Последний заход: {moment(res[0].updatedAt).format("LLL")}
            {"–"}
            {moment(res[0].updatedAt).fromNow()}
          </div>
        </Box>
      ) : (
        <div className="time">
          Нет данных по заходам на урок или это был урок-испытание
        </div>
      )}
      {show && (
        <>
          {/* <TestResult
            newTests={lesson.newTests}
            results={test_data.testResults}
            student={student}
          />
          <QuizResult
            quizes={lesson.quizes}
            student={student}
            results={quiz_data.quizResults}
          />
          <ProblemResult
            problems={lesson.problems}
            student={student}
            results={problem_data.problemResults}
          />
          <TexteditorResult
            texteditors={lesson.texteditors}
            student={student}
            results={editor_data.textEditorResults}
          /> */}
          {/*  <ConstructionResult
            constructions={lesson.constructions}
            student={student}
          />
          <DocumentResult documents={lesson.documents} student={student} />
          <CreateFeedback
            coursePage={coursePageID}
            lesson={lesson.id}
            student={student.id}
          />
          <Feedback feedback={feedback_data.feedbacks} lesson={lesson.id} /> */}
        </>
      )}
    </>
  );
};

export default LessonData;
export { GET_FEEDBACK };
