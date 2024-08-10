import { useState, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import moment from "moment";
import { useLazyQuery, gql, useMutation } from "@apollo/client";
import { TailSpin } from "react-loader-spinner";

import Loading from "../Loading";
import CreateFeedback from "./CreateFeedback";
import TestResult from "./results/TestResult";
import Note from "../lesson/notes/Note";
import Chat from "../lesson/chat/Chat";
import Shots from "../lesson/shots/Shots";
import TexteditorResult from "./results/TexteditorResult";
import QuizResult from "./results/QuizResult";
import ProblemResult from "./results/ProblemResult";
import ConstructionResult from "./results/ConstructionResult";
import TestPractice from "./results/TestPracticeResult";
import DocumentResult from "./results/DocumentResult";
import Feedback from "./Feedback";
import ReportGenerator from "./ReportGenerator";

const GET_RESULTS = gql`
  query stats($lessonId: String!, $userId: String!) {
    stats(lessonId: $lessonId, userId: $userId) {
      testResults {
        id
        answer
        answerArray
        test {
          id
          question
          goal
        }
        student {
          id
          name
          surname
        }
        createdAt
      }
      testPracticeResults {
        id
        testPractice {
          id
        }
        correct
        tasks
        createdAt
        updatedAt
      }
      shotResults {
        id
        answer
        lessonId
        shotId
        depth
        shot {
          id
        }
        student {
          id
          name
          surname
        }
        createdAt
        updatedAt
      }
      quizResults {
        id
        correct
        result
        comment
        type
        hint
        ideasList
        explanation
        improvement
        student {
          id
          name
          surname
        }
        quiz {
          id
          type
          goal
        }
        answer
        createdAt
      }
      textEditorResults {
        id
        wrong
        correct
        guess
        result
        attempts
        student {
          id
        }
        textEditor {
          id
          goal
        }
        createdAt
      }
      problemResults {
        id
        answer
        depth
        lesson {
          id
        }
        problem {
          id
          goal
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
        answers
        elements
        inputs
        attempts
        createdAt
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
          goal
        }
      }
      documentResults {
        id
        user {
          id
        }
        document {
          id
          goal
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

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 5px;
  min-height: 60px;

  div {
    padding: 0 5px;
    font-size: 1.6rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .div1 {
    width: 20%;
    border-right: 3px solid #f2f6f9;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: 1.4;
  }
  .div2 {
    width: 9%;
    border-right: 3px solid #f2f6f9;
  }
  .div3 {
    width: 9%;
    border-right: 3px solid #f2f6f9;
  }
  .div4 {
    width: 9%;
    border-right: 3px solid #f2f6f9;
  }
  .div5 {
    width: 20%;
    border-right: 3px solid #f2f6f9;
  }
  .div6 {
    width: 20%;
    border-right: 3px solid #f2f6f9;
  }
  .div7 {
    width: 13%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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

const SimpleButton = styled.button`
  width: 100px;
  height: 35px;
  background: none;
  padding: 5px 0;
  border: 2px solid #69696a;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #323334;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #f4f4f4;
  }
`;
const SimpleButton2 = styled.button`
  width: 55px;
  height: 35px;
  background: none;
  /* padding: 5px 0; */
  border: 2px solid #fff;
  border-radius: 5px;
  /* margin-right: 15px; */
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #323334;
  cursor: pointer;
  transition: 0.6s;
  &:hover {
    background: #f0f0f0;
  }
`;

const LessonContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
`;

const LessonData = (props) => {
  const [show, setShow] = useState(false);
  const [studentResults, setStudentResults] = useState();
  const [totalDifficulty, setTotalDifficulty] = useState();
  const [reportData, setReportData] = useState();
  const [report, setReport] = useState("");
  const [generating, setGenerating] = useState(false);
  const { index, lesson, student, coursePageID, res } = props;
  moment.locale("ru");

  const [getData, { loading, error, data }] = useLazyQuery(GET_RESULTS);
  const [checkAssignment, { data: data1 }] = useMutation(CHECK_MUTATION);

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  let challenge_result =
    student.challengeResults.filter((ch) => ch.lesson.id == lesson.id).length >
    0
      ? student.challengeResults.filter((ch) => ch.lesson.id == lesson.id)[0]
      : null;
  return (
    <>
      {res.length > 0 && res[0].lesson.structure ? (
        <Box>
          <div className="div1">
            {index + 1}. {lesson.name}{" "}
          </div>
          <div className="div2">
            {res[0].lesson.structure &&
            res[0].lesson.structure.lessonItems &&
            parseInt(
              (
                res[0].progress / res[0].lesson.structure.lessonItems.length
              ).toFixed(2) * 100
            ) > 100
              ? 100
              : parseInt(
                  (
                    res[0].progress / res[0].lesson.structure.lessonItems.length
                  ).toFixed(2) * 100
                )}
            %{" "}
          </div>
          <div className="div3">
            {studentResults ? (
              `${parseInt(
                (studentResults / totalDifficulty).toFixed(2) * 100
              )}%`
            ) : (
              <SimpleButton2
                onClick={(e) =>
                  getData({
                    variables: { lessonId: lesson.id, userId: student.id },
                  })
                }
              >
                Load
              </SimpleButton2>
            )}
          </div>
          <div className="div4">
            {/* Заходов:  */}
            {res[0].visitsNumber}{" "}
          </div>
          <div className="div5">
            {/* Первый заход:  */}
            {moment(res[0].createdAt).format("DD.MM.YYYY – h:mm A")}
          </div>
          <div className="div6">
            {/* Последний заход:  */}
            {moment(res[0].updatedAt).format("DD.MM.YYYY – h:mm A")}
          </div>
          <div className="div7">
            <SimpleButton
              onClick={(e) => {
                getData({
                  variables: { lessonId: lesson.id, userId: student.id },
                }),
                  setShow(!show);
              }}
            >
              {show ? "Close" : "Open"}
            </SimpleButton>
          </div>
        </Box>
      ) : challenge_result ? (
        <Box>
          <div className="div1">
            {index + 1}. {lesson.name}
          </div>
          <div className="div2">Data</div>
          <div className="div3">
            {challenge_result.correct} /
            {challenge_result.correct + challenge_result.wrong}
          </div>
          <div className="div4"></div>
          <div className="div5">
            {moment(challenge_result.createdAt).format("DD.MM.YYYY – h:mm A")}
          </div>
          <div className="div6">
            {" "}
            {moment(challenge_result.createdAt).format("DD.MM.YYYY – h:mm A")}
          </div>
          <div className="div7">
            {" "}
            <SimpleButton
              onClick={(e) => {
                getData({
                  variables: { lessonId: lesson.id, userId: student.id },
                }),
                  setShow(!show);
              }}
            >
              {show ? "Close" : "Open"}
            </SimpleButton>
          </div>
        </Box>
      ) : (
        <Box>
          <div className="div1">
            {index + 1}. {lesson.name}
          </div>
          <div className="div2">No data</div>
          <div className="div3"></div>
          <div className="div4"></div>
          <div className="div5"></div>
          <div className="div6"></div>
          <div className="div7"></div>
        </Box>
      )}
      {show && data !== undefined && (
        <LessonContent>
          <ReportGenerator
            student={student}
            lesson={lesson}
            lessonData={{
              stats: { quizResults: data.stats.quizResults },
              res,
              data,
            }}
            date={props.date}
          />
          <div>
            <h2>Lesson results</h2>
          </div>
          {lesson?.structure?.lessonItems.map((l) => {
            if (l.type.toLowerCase() == "shot") {
              let shot = lesson.shots.filter((n) => n.id === l.id)[0];
              return (
                <Shots
                  key={shot.id}
                  comments={shot.comments}
                  parts={shot.parts}
                  shotUser={shot.user.id}
                  shotID={shot.id}
                  lessonID={lesson.id}
                  title={shot.title}
                  userData={[]}
                  story={true}
                />
              );
            }
            if (l.type.toLowerCase() == "note") {
              let note = lesson.notes.filter((n) => n.id === l.id)[0];
              return (
                <Note
                  text={note.text}
                  id={l.id}
                  author={lesson.user}
                  me={lesson.user}
                  note={note}
                  story={true}
                  type={note.type}
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
            if (l.type.toLowerCase() == "testpractice") {
              let testPractice = lesson.testPractices.filter(
                (n) => n.id === l.id
              )[0];
              return (
                <TestPractice
                  lesson={lesson}
                  testPractice={testPractice}
                  student={student}
                  results={data.stats.testPracticeResults}
                  quizResults={data.stats.quizResults}
                  testResults={data.stats.testResults}
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
                  chats={lesson.chats}
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
                  all_quizes={lesson.quizes}
                  all_tests={lesson.newTests}
                  all_notes={lesson.notes}
                  problems={lesson.problems}
                  testResults={data.stats.testResults}
                  problemResults={data.stats.problemResults}
                />
              );
            }
            if (l.type.toLowerCase() == "texteditor") {
              return (
                <TexteditorResult
                  texteditors={lesson.texteditors.filter((t) => t.id === l.id)}
                  student={student}
                  results={data.stats.textEditorResults.filter(
                    (t) => t.textEditor.id === l.id
                  )}
                  all_quizes={lesson.quizes}
                  all_tests={lesson.newTests}
                  all_notes={lesson.notes}
                  all_chats={lesson.chats}
                  all_problems={lesson.problems}
                  all_quiz_results={data.stats.quizResults}
                  all_test_results={data.stats.testResults}
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
            if (l.type.toLowerCase() == "chat") {
              return (
                <Chat
                  id={l.id}
                  name={lesson.chats.filter((n) => n.id === l.id)[0].name}
                  me={lesson.user}
                  author={lesson.chats.filter((n) => n.id === l.id)[0].user}
                  messages={
                    lesson.chats.filter((n) => n.id === l.id)[0].messages
                  }
                  lessonId={lesson.id}
                  story={true}
                />
              );
            }
          })}
          <Feedback feedback={data.stats.feedbacks} lesson={lesson.id} />
          <CreateFeedback
            coursePage={coursePageID}
            lesson={lesson.id}
            student={student.id}
          />
        </LessonContent>
      )}
    </>
  );
};

export default LessonData;
export { GET_RESULTS };

// const results = [
//   { type: "problem", res: 4, max_val: 5, goal: "Learn to structure the deal" },

//   {
//     type: "problem",
//     res: 4,
//     max_val: 5,
//     goal: "Learn to distinguish between a share deal and an asset deal",
//   },

//   {
//     type: "newtest",
//     res: 1,
//     max_val: 1,
//     goal: "Learn about the difference between allotment of shares and means of shares transfer",
//   },

//   {
//     type: "newtest",
//     res: 0.8,
//     max_val: 1,
//     goal: "Learn about the FDA approval procedure",
//   },

//   {
//     type: "texteditor",
//     res: 4,
//     max_val: 4,
//     goal: "Learn find errors in a term sheet",
//   },
// ];
