import { useState, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import moment from "moment";
import { TailSpin } from "react-loader-spinner";
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
        hint
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
  border: 3px solid #f2f6f9;
  border-top: none;
  display: flex;
  background-color: #fff;
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
  font-size: 1.6rem;
  font-weight: 500;
  color: #323334;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #f4f4f4;
  }
`;

const Report = styled.div`
  width: 100%;
  border: 2px solid #f2f6f9;
  border-radius: 20px;
  padding: 15px;
  background: #fff;
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
  font-size: 1.6rem;
  font-weight: 500;
  color: #323334;
  cursor: pointer;
  transition: 0.6s;
  &:hover {
    background: #f0f0f0;
  }
`;

const TopBox = styled.div`
  border-bottom: 3px solid #f2f6f9;
  border-top: 3px solid #f2f6f9;
  background: #f2f6f9;
  min-height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  div {
    padding: 0 5px;
    font-size: 1.6rem;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .div1 {
    width: 20%;
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
    width: 20%;
  }
  .div6 {
    width: 20%;
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

const Progress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  margin: 0 0 2% 0;
`;

const IntroData = styled.div`
  width: 60%;
  margin: 30px 0;
  font-size: 1.6rem;
  h4 {
    font-size: 2rem;
    margin: 20px 0;
  }
  button {
    width: 200px;
    height: 35px;
    background: none;
    padding: 5px 0;
    margin: 30px 0;

    border: 2px solid #69696a;
    border-radius: 5px;
    font-family: Montserrat;
    font-size: 1.6rem;
    font-weight: 500;
    color: #323334;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background: #f4f4f4;
    }
  }
`;

const LessonContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
  h2 {
    font-size: 2.8rem;
  }
`;

const Bottom = styled.div`
  margin-bottom: 150px;
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
    setTotalDifficulty(total);

    let lesson_results = [];
    let initial_report = [];
    if (!data || !data.stats) return;

    lesson?.structure?.lessonItems.map((l) => {
      if (l.type.toLowerCase() == "newtest") {
        let test = lesson.newTests.find((t) => t.id === l.id);
        let correct_answer;
        if (test && test.correct) {
          correct_answer = getAllIndexes(test.correct, true).map(
            (i) => test.answers[i]
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
        initial_report.push({
          type: "newtest",
          res: val,
          max_val: typeDifficultyMap[l.type.toLowerCase()],
        });
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
        initial_report.push({
          type: "quiz",
          res: val,
          max_val: typeDifficultyMap[l.type.toLowerCase()],
        });
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
        initial_report.push({
          type: "texteditor",
          res: val * typeDifficultyMap[l.type.toLowerCase()],
          max_val: typeDifficultyMap[l.type.toLowerCase()],
        });
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
          // console.log("mergedData", mergedData);
          const totalItems = mergedData.length;

          // console.log("totalItems", totalItems);
          // Filter out exercises that have at least one result with a 'correct' value of true
          const correctItems = mergedData.filter((exercise) => {
            if (exercise.type.toLowerCase() == "newtest") {
              if (exercise.results.length > 0) {
                return true;
              }
            } else {
              return exercise.results.some((result) => result.correct === true);
            }
          }).length;
          // console.log("correctItems", correctItems);
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
          val = Math.round(computeVal(mergedData) * 10) / 10;
        }
        if (problem.steps && problemResults.length > 0) {
          val = Math.round((computeVal(mergedData) + 1) * 10) / 10;
        }
        initial_report.push({
          type: "problem",
          res: val,
          max_val: typeDifficultyMap[l.type.toLowerCase()],
        });
        lesson_results.push(val);
      }
    });
    setReportData(initial_report);
    setStudentResults(
      lesson_results.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
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

  const generateReport = async (event) => {
    event.preventDefault();
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);

      setReport(`
        <h3>Introduction</h3>
        <p>Emily Thompson has completed the simulator called "M&A simulator" on 7th April 2024. 
        The goal of the simulator is to <b>develop due diligence skills and deal structuring skills for M&A projects.</b></p>
        <h3>Executive summary</h3>
        <p>Emily has looked through all the materials in the simulator and has completed all exercises.
        However, errors have not been reflected upon and worked on yet meaning that we can't be sure that they have developped the necessary skills.</p>
        <p>It is recommended that Emily <b>focuses on reflecting on and correcting errors, especially, from the "Share deal vs Asset deal" part of the simulator</b>.
        Only after that the student will have all the competencies to work on M&A projects.</p>
        <h3>Task 1. Share deal vs Asset deal</h3>
        <p>Result: <b>50%</b></p>
        <p>The goal: to learn to distinguish between a share deal and an asset deal.<p>
        <p>Insights: Emily has not practiced enough or analyzed provided feedback. 
        They need to work more on understanding why a share deal is generally easier to structure, 
        what is transferred in a share deal versus an asset deal, and how an asset deal may help to avoid historical risks associated with the target company.</p>
        <p><b>Recommendation:</b> Emily does not yet have the necessary skills and should go through the simulator 
         one more time to improve their understanding of share and asset deals.</p>
        <h3>Task 2. Transaction structure</h3>
        <p>Result: <b>58%</b></p>
        <p>The goal: learn the details of an M&A deal structure, including understanding what agreements need to be signed and when they need to be signed.<p>
        <p>Insights: while Emily has shown effort in solving the problem, there are areas that need improvement. 
        Emily reflected on their errors in the completed exercises, which is a positive sign of growth. But they have not completed all necessary exercises.
        Emily's weak points that need more attention include understanding the different types of due diligence in M&A transactions 
        and identifying common types of preliminary agreements in M&A transactions. These areas require further study and practice.</p>
        <p><b>Recommendation:</b> Continue learning and practicing. They do not yet have the necessary skills, so 
        going through the simulator one more time would be beneficial for further improvement.</p>
        <h3>Task 3. Minutes of a meeting of the board of directors</h3>
        <p>Result: <b>78%</b></p>
        <p>The goal: learn to find errors and key information in the Minutes of a meeting of the board of directors.<p>
        <p>Insights: Emily has not managed to find the following errors:</p>
        <ol>
          <li>When was the most recent enactment of the Companies Act?</li>
        </ol>
        All other errors were found and corrected. Emily has shown good results in analyzing the document and correcting errros.</p>
        <p><b>Recommendation:</b> Emily is ready to analyze the documents of this category on real projects.</p>
        <h3>Overall Recommendations</h3>
        <p>📊 Overall result: <b>62%</b></p>
        <p>Emily has shown dedication to practicing in the M&A simulator, but there is room for improvement in reflecting on errors and feedback.
         As a result, it seems that they have not yet fully achieved the goal of developing due diligence skills and deal structuring skills for M&A projects. 
         We recommend that Emily carefully <b>reviews the exercises, pays attention to the feedback provided, and reflects on the errors to enhance her learning experience.</b></p>

  
  `);
    }, 3500);
    // try {
    //   const response = await fetch("/api/generate", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       prompt: `
    //       Return
    //      `,
    //     }),
    //   });

    //   if (response.status !== 200) {
    //     throw (
    //       (await response.json()).error ||
    //       new Error(`Request failed with status ${response.status}`)
    //     );
    //   }
    //   const data = await response.json();
    //   if (data.result.content) {
    //     ;
    //   } else {
    //     setReport("Sorry, we are disconnected.");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   alert(error.message);
    // }
  };

  return (
    <>
      <>
        <TopBox>
          <div className="div1">Simulator Name</div>
          <div className="div2">Progress</div>
          <div className="div3">Result</div>
          <div className="div4">Visits</div>
          <div className="div5">First action</div>
          <div className="div6">Last action</div>
          <div className="div7"></div>
        </TopBox>
      </>
      {res.length > 0 && res[0].lesson.structure ? (
        <Box>
          <div className="div1">
            {index + 1}. {lesson.name}{" "}
          </div>
          <div className="div2">100% </div>
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
          <IntroData>
            <h4>How to use the analytics page?</h4>
            <div>
              At analytics page you can:
              <ul>
                <li>
                  get recommendations based on the simulator goals and student
                  results (press the "Generate report" button for that)
                </li>
                <li>
                  take a look at how the student was going through the
                  simulator. (scroll down to the "Lesson Results" section){" "}
                </li>
              </ul>
            </div>
            <button onClick={(e) => generateReport(e)}>Generate report</button>
            {generating ? (
              <Progress>
                <TailSpin
                  height="60"
                  width="60"
                  color="#2E80EC"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </Progress>
            ) : (
              ""
            )}
            {report && report.length > 0 && <Report>{parse(report)}</Report>}
          </IntroData>
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
          {/* <Feedback feedback={data.stats.feedbacks} lesson={lesson.id} />
          <CreateFeedback
            coursePage={coursePageID}
            lesson={lesson.id}
            student={student.id}
          /> */}
        </LessonContent>
      )}
      <Bottom></Bottom>
    </>
  );
};

export default LessonData;
export { GET_RESULTS };
