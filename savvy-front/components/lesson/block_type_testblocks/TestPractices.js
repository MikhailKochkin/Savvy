import React from "react";
import TestPractice from "./TB";

const TestPractices = (props) => {
  const { lesson, me } = props;

  return (
    <div>
      {props.testPractices.map((t) => (
        <TestPractice
          lessonID={lesson.id}
          quizResults={props.quizResults}
          testResults={props.testResults}
          me={me}
          testPractice={t}
          quizes={lesson.quizes}
          tests={lesson.newTests}
          lesson={lesson}
        />
      ))}
    </div>
  );
};

export default TestPractices;
