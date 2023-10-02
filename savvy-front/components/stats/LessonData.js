import { useState, useEffect } from "react";
import styled from "styled-components";
// import Button from "@material-ui/core/Button";
// import { withStyles } from "@material-ui/core/styles";
import parse from "html-react-parser";
import moment from "moment";
import Loading from "../Loading";
import { useLazyQuery, gql, useMutation } from "@apollo/client";
import CreateFeedback from "./CreateFeedback";
import TestResult from "./results/TestResult";
import Note from "../lesson/notes/Note";

import Chat from "../lesson/chat/Chat";
import Shots from "../lesson/shots/Shots";

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
        answerArray
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
        comment
        student {
          id
          name
          surname
        }
        quiz {
          id
          type
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

const Styles = styled.div``;
const Data = styled.div`
  display: flex;
  flex-direction: row;
`;

const Name = styled.div`
  font-size: 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
`;

const Box = styled.div`
  border-bottom: 3px solid #f2f6f9;
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 5px;
  min-height: 60px;

  div {
    padding: 0 5px;
    font-size: 1.4rem;
  }
  .div1 {
    width: 30%;
  }
  .div2 {
    width: 9%;
  }
  .div3 {
    width: 9%;
  }
  .div4 {
    width: 9%;
  }
  .div5 {
    width: 17%;
  }
  .div6 {
    width: 17%;
  }
  .div7 {
    width: 9%;
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

  const { index, lesson, student, coursePageID, res } = props;
  moment.locale("ru");
  const [getData, { loading, error, data }] = useLazyQuery(GET_RESULTS);
  const [checkAssignment, { data: data1 }] = useMutation(CHECK_MUTATION);
  useEffect(() => {
    let total = lesson.structure
      ? lesson.structure.lessonItems.reduce((total, item) => {
          if (typeof item.type === "string") {
            const difficulty = typeDifficultyMap[item.type.toLowerCase()] || 0;
            return total + difficulty;
          }
          return total;
        }, 0)
      : 0;
    let lesson_results = [];
    if (!data || !data.stats) return;

    lesson?.structure?.lessonItems.map((l) => {
      if (l.type.toLowerCase() == "newtest") {
        let test = lesson.newTests.find((t) => t.id === l.id);
        let correct_answer;
        if (test && test.correct) {
          correct_answer = getAllIndexes(test.correct, true).map((i) =>
            parse(test.answers[i])
          );
        } else {
          return;
        }
        let myTestResults = data.stats.testResults
          .filter((tr) => tr.student.id == student.id)
          .filter((tr) => tr.test.id == test.id);
        let val = 0;
        if (myTestResults.length > 0) {
          val = 0.2;
        }
        if (
          myTestResults.filter((mtr) => mtr.answer == correct_answer).length > 0
        ) {
          val = 0.8;
        }
        if (
          myTestResults.length ==
          myTestResults.filter((mtr) => mtr.answer == correct_answer).length
        ) {
          val = 1;
        }
        if (myTestResults.length > 0 && test.type == "FORM") {
          val = 1;
        }

        lesson_results.push(val * typeDifficultyMap[l.type.toLowerCase()]);
      } else if (l.type.toLowerCase() == "quiz") {
        let question = lesson.quizes.find((t) => t.id === l.id);
        let myQuestionResults = data.stats.quizResults
          .filter((tr) => tr.student.id == student.id)
          .filter((tr) => tr.quiz.id == question.id);

        let val = 0;
        if (myQuestionResults.length > 0) {
          val = 0.2;
        }
        if (myQuestionResults.filter((mqr) => mqr.correct).length > 0) {
          val = 0.8;
        }
        if (
          myQuestionResults.filter((mqr) => mqr.correct).length ==
          myQuestionResults.length
        ) {
          val = 1;
        }
        if (myQuestionResults.length > 0 && question.type == "FORM") {
          val = 1;
        }
        lesson_results.push(val * typeDifficultyMap[l.type.toLowerCase()]);
      } else if (l.type.toLowerCase() == "shot") {
        let shot = lesson.shots.find((t) => t.id === l.id);
        let myShotResults = data.stats.shotResults
          .filter((tr) => tr.student.id == student.id)
          .filter((tr) => tr.shot.id == shot.id);
        let val = 0;
        if (myShotResults.length > 0) val = 1;
        lesson_results.push(val * typeDifficultyMap[l.type.toLowerCase()]);
      } else if (l.type.toLowerCase() == "texteditor") {
        let textEditor = lesson.texteditors.find((t) => t.id === l.id);
        let myTexteditorResults = data.stats.textEditorResults
          .filter((tr) => tr.student.id == student.id)
          .filter((tr) => tr.textEditor.id == textEditor.id);

        function computeErrorMatches(texteditorContent, results) {
          // Create a virtual DOM to parse the texteditor content
          const parser = new DOMParser();
          const doc = parser.parseFromString(texteditorContent, "text/html");

          const error_elements = doc.querySelectorAll("[error_data]");

          // Filter results that are true and map them by their correct value, then deduplicate using a Set
          const uniqueCorrectResults = new Set(
            results.filter((r) => r.result).map((r) => r.correct)
          );

          const matchedErrorsCount = Array.from(error_elements).filter(
            (element) => {
              const correctVal = element.getAttribute("error_data");
              return uniqueCorrectResults.has(correctVal);
            }
          ).length;

          return [error_elements.length, matchedErrorsCount];
        }

        const [totalErrors, matchedErrors] = computeErrorMatches(
          textEditor.text,
          myTexteditorResults
        );

        let val = 0;
        if (totalErrors == 0) {
          val = 1;
        }
        if (matchedErrors > 0) {
          val = matchedErrors / totalErrors;
        }

        lesson_results.push(val * typeDifficultyMap[l.type.toLowerCase()]);
      } else if (l.type.toLowerCase() == "problem") {
        let problem = lesson.problems.find((t) => t.id === l.id);
        // console.log("problem", problem);
        let problemResults = data.stats.problemResults
          .filter((tr) => tr.student.id == student.id)
          .filter((tr) => tr.problem.id == problem.id);

        const exercises =
          problem.steps && problem.steps.problemItems
            ? problem.steps.problemItems
            : [];
        const res = [...data.stats.testResults, ...data.stats.quizResults];

        // Find results for a given exercise
        const findResultsForExercise = (exerciseId) => {
          return res.filter((result) => {
            return (
              (result.test && result.test.id === exerciseId) ||
              (result.quiz && result.quiz.id === exerciseId)
            );
          });
        };

        // Merge exercises with their corresponding results
        const mergedData = exercises.map((exercise) => {
          return {
            ...exercise,
            results: findResultsForExercise(exercise.id),
          };
        });

        const computeVal = (mergedData) => {
          const totalItems = mergedData.length;
          // Filter out exercises that have at least one result with a 'correct' value of true
          const correctItems = mergedData.filter((exercise) => {
            return exercise.results.some((result) => result.correct === true);
          }).length;

          // If no exercises have results
          if (correctItems === 0) {
            return 0;
          }

          // Compute val based on the given formula
          const val = 4 * (correctItems / totalItems);
          return val;
        };

        let val = 0;
        if (!problem.steps && problemResults.length > 0) {
          val = 1;
        }
        if (problem.steps && problemResults.length == 0) {
          val = computeVal(mergedData);
        }
        if (problem.steps && problemResults.length > 0) {
          val = computeVal(mergedData) + 1;
        }
        lesson_results.push(val);
      }
    });
    setStudentResults(
      lesson_results.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
    setTotalDifficulty(total);
  }, [data]);
  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  const typeDifficultyMap = {
    quiz: 2,
    testpractice: 3,
    texteditor: 4,
    construction: 4,
    problem: 5,
    newtest: 1,
    document: 5,
    note: 0,
    shot: 2,
    chat: 0,
    forum: 0,
    offer: 0,
  };

  const getAllIndexes = (arr, val) => {
    var indexes = [],
      i;
    if (!arr) return [];
    for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
    return indexes;
  };

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
      ) : (
        <Box>
          <div className="div1">
            <Name>
              {index + 1}. {lesson.name}{" "}
            </Name>
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
          {lesson?.structure?.lessonItems.map((l) => {
            if (l.type.toLowerCase() == "shot") {
              let shot = lesson.shots.filter((n) => n.id === l.id)[0];
              return (
                <Shots
                  key={shot.id}
                  comments={shot.comments}
                  parts={shot.parts}
                  shotUser={shot.user.id}
                  // me={me}
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
                  results={data.stats.textEditorResults.filter(
                    (t) => t.textEditor.id === l.id
                  )}
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
