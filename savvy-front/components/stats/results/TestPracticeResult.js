import { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import parse from "html-react-parser";
import TestResult from "./TestResult";
import QuizResult from "./QuizResult";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 1.6rem;
  margin-bottom: 50px;
  h2 {
    margin: 15px 0;
  }
  p {
    margin: 0.5% 0;
  }
  .answer {
    border-top: 2px solid #edefed;
    border-bottom: 2px solid #edefed;
  }
`;

const TestPracticeResult = (props) => {
  const [areQuestionsShown, setAreQuestionsShown] = useState(false);
  console.log("TestPracticeResult props", props);
  const { lesson, results, testPractice, student, quizResults, testResults } =
    props;
  let allTasks = [...lesson.newTests, ...lesson.quizes];
  console.log("testPractice", testPractice);

  return (
    <Container>
      {results.map((result, index) => {
        let activeTasks = allTasks.filter((task) =>
          result.tasks.includes(task.id)
        );
        console.log("result", result);
        return (
          <div key={index}>
            <h2>Chain of questions</h2>
            <p>
              Result: {result.correct} / {testPractice.tasksNum}
            </p>
            <button onClick={() => setAreQuestionsShown(!areQuestionsShown)}>
              {areQuestionsShown ? "Hide" : "Show"} questions
            </button>
            {areQuestionsShown &&
              activeTasks.map((task, index) => {
                console.log("task", task.type.toLowerCase());
                if (task.type.toLowerCase() == "test") {
                  return (
                    <TestResult
                      newTests={lesson.newTests.filter((t) => t.id === task.id)}
                      results={testResults}
                      student={student}
                    />
                  );
                } else if (task.type.toLowerCase() == "quiz") {
                  return (
                    <QuizResult
                      quizes={lesson.quizes.filter((t) => t.id === task.id)}
                      student={student}
                      results={quizResults}
                      all_quizes={lesson.quizes}
                      all_tests={lesson.newTests}
                      all_notes={lesson.notes}
                    />
                  );
                }
              })}
          </div>
        );
      })}
    </Container>
  );
};

export default TestPracticeResult;
