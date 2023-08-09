import { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import Loading from "../Loading";
import { useLazyQuery, gql, useMutation } from "@apollo/client";
import CreateFeedback from "./CreateFeedback";
import TestResult from "./results/TestResult";
import Note from "./results/Note";
import TexteditorResult from "./results/TexteditorResult";
import QuizResult from "./results/QuizResult";
import ProblemResult from "./results/ProblemResult";
import ConstructionResult from "./results/ConstructionResult";
import DocumentResult from "./results/DocumentResult";
import Feedback from "./Feedback";

const GET_RESULTS = gql`
  query stats($lessonId: String!, $userId: String!) {
    stats(lessonId: $lessonId, userId: $userId) {
      testResults {
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
      quizResults {
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
      textEditorResults {
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
      problemResults {
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
      constructionResults {
        id
        answer
        inputs
        attempts
        construction {
          id
        }
        student {
          id
          name
          surname
        }
        construction {
          id
        }
      }
      documentResults {
        id
        user {
          id
        }
        document {
          id
        }
        answers
        drafts
        createdAt
      }
      feedbacks {
        id
        text
        teacher {
          id
          name
          surname
        }
        lesson {
          id
        }
        createdAt
      }
    }
  }
`;

const CHECK_MUTATION = gql`
  mutation CHECK_MUTATION($id: String!, $checked: Boolean) {
    checkAssignment(id: $id, checked: $checked) {
      id
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
  margin-bottom: 35px;
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
  const [getData, { loading, error, data }] = useLazyQuery(GET_RESULTS);
  const [checkAssignment, { data: data1 }] = useMutation(CHECK_MUTATION);
  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;
  return (
    <>
      <Data>
        <Name>
          {index + 1}. {lesson.name}{" "}
          <b>{lesson.assignment ? " 🔥 Практическое задание" : ""}</b>
        </Name>
        <StyledButton
          onClick={(e) => {
            getData({
              variables: { lessonId: lesson.id, userId: student.id },
            }),
              setShow(!show);
          }}
        >
          {/* {show ? "Скрыть" : "Подробнее"} */}
          {show ? "Close" : "Open"}
        </StyledButton>
        {res.length > 0 && (
          <StyledButton
            onClick={(e) => {
              checkAssignment({
                variables: { id: res[0].id, checked: true },
              });
            }}
          >
            {/* {res[0].checked ? "✅ Проверено" : "Проверить"} */}
            {res[0].checked ? "✅ Checked" : "Check"}
          </StyledButton>
        )}
      </Data>
      {res.length > 0 && res[0].lesson.structure ? (
        <Box>
          <div className="div1">
            {res[0].lesson.structure &&
              res[0].lesson.structure.lessonItems &&
              (
                res[0].progress / res[0].lesson.structure.lessonItems.length
              ).toFixed(2) * 100}
            %{" "}
          </div>
          <div className="div2">
            {/* Заходов:  */}
            Visits:
            {res[0].visitsNumber}{" "}
          </div>
          <div className="div3">
            {/* Первый заход:  */}
            First visit: {moment(res[0].createdAt).format("LLL")}
          </div>
          <div className="div4">
            {/* Последний заход:  */}
            Last visit: {moment(res[0].updatedAt).format("LLL")}
            {"–"}
            {moment(res[0].updatedAt).fromNow()}
          </div>
        </Box>
      ) : (
        <div className="time">
          {/* Нет данных по заходам на урок или это был урок-испытание */}
          No data
        </div>
      )}
      {console.log("show", show, data)}
      {show && data !== undefined && (
        <>
          {lesson.structure.lessonItems.map((l) => {
            if (l.type.toLowerCase() == "note") {
              return (
                <Note
                  note={lesson.notes.filter((n) => n.id === l.id)}
                  // results={data.stats.testResults}
                  // student={student}
                />
              );
            }
            if (l.type.toLowerCase() == "newtest") {
              return (
                <TestResult
                  newTests={lesson.newTests.filter((t) => t.id === l.id)}
                  results={data.stats.testResults}
                  student={student}
                />
              );
            }
            if (l.type.toLowerCase() == "problem") {
              return (
                <ProblemResult
                  problems={lesson.problems.filter((t) => t.id === l.id)}
                  student={student}
                  results={data.stats.problemResults}
                  newTests={lesson.newTests}
                  testResults={data.stats.testResults}
                  quizes={lesson.quizes}
                  quizResults={data.stats.quizResults}
                  notes={lesson.notes}
                />
              );
            }
            if (l.type.toLowerCase() == "quiz") {
              return (
                <QuizResult
                  quizes={lesson.quizes.filter((t) => t.id === l.id)}
                  student={student}
                  results={data.stats.quizResults}
                />
              );
            }
            if (l.type.toLowerCase() == "texteditor") {
              return (
                <TexteditorResult
                  texteditors={lesson.texteditors.filter((t) => t.id === l.id)}
                  student={student}
                  results={data.stats.textEditorResults}
                />
              );
            }
            if (l.type.toLowerCase() == "construction") {
              return (
                <ConstructionResult
                  constructions={lesson.constructions.filter(
                    (t) => t.id === l.id
                  )}
                  student={student}
                  results={data.stats.constructionResults}
                />
              );
            }
            if (l.type.toLowerCase() == "document") {
              return (
                <DocumentResult
                  documents={lesson.documents.filter((t) => t.id === l.id)}
                  student={student}
                  results={data.stats.documentResults}
                />
              );
            }
          })}
          {/* <TestResult
            newTests={lesson.newTests}
            results={data.stats.testResults}
            student={student}
          />
          <QuizResult
            quizes={lesson.quizes}
            student={student}
            results={data.stats.quizResults}
          />
          <TexteditorResult
            texteditors={lesson.texteditors}
            student={student}
            results={data.stats.textEditorResults}
          />
          <ProblemResult
            problems={lesson.problems}
            student={student}
            results={data.stats.problemResults}
          />
          <ConstructionResult
            constructions={lesson.constructions}
            student={student}
            results={data.stats.constructionResults}
          />
          <DocumentResult
            documents={lesson.documents}
            student={student}
            results={data.stats.documentResults}
          /> */}
          <Feedback feedback={data.stats.feedbacks} lesson={lesson.id} />
          <CreateFeedback
            coursePage={coursePageID}
            lesson={lesson.id}
            student={student.id}
          />
        </>
      )}
    </>
  );
};

export default LessonData;
export { GET_RESULTS };
