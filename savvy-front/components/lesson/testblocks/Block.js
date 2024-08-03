import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import Note from "../notes/Note";
import SingleTest from "../tests/SingleTest";
import SingleQuiz from "../quizes/SingleQuiz";
import Final from "./Final";
import { useTranslation } from "next-i18next";

const CREATE_TEST_PRACTICE_RESULT_MUTATION = gql`
  mutation CREATE_TEST_PRACTICE_RESULT_MUTATION(
    $tasks: [String]
    $correct: Int
    $lessonId: String
    $testPracticeId: String
  ) {
    createTestPracticeResult(
      tasks: $tasks
      correct: $correct
      lessonId: $lessonId
      testPracticeId: $testPracticeId
    ) {
      id
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
  /* The side navigation menu */
  .sidenav {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #112a62; /* Blue*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
  }

  /* The navigation menu links */
  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  /* When you mouse over the navigation links, change their color */
  .sidenav a:hover {
    color: #f1f1f1;
  }

  /* Position and style the close button (top right corner) */
  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
  #main {
    transition: margin-left 0.5s;
    padding: 20px;
  }

  /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
    .sidenav a {
      font-size: 18px;
    }
  }
`;

const Circle = styled.div`
  background: ${(props) => (props.correct == "true" ? "#72b205" : "#C8C8C8")};
  /* border: ${(props) =>
    props.active == "true" ? "1px solid #122961" : "7px solid s#fff"}; */
  border-radius: 50%;
  width: ${(props) => (props.active == "true" ? "21px" : "15px")};
  height: ${(props) => (props.active == "true" ? "21px" : "15px")};
  margin: 5px;
  margin-top: 6px;
`;

const LessonPart = styled.div`
  display: flex;
  /* border: 1px solid #edefed; */
  padding: 0.5% 2%;
  width: 100%;
  flex-direction: column;
  border-radius: 2px;
  margin: 0 0 20px 0;
  a {
    padding-top: 2%;
    padding-left: 2%;
  }
  button {
    background-color: #b9adff;
    border-radius: 5px;
    border: 1px solid #b9adff;
    color: #fff;
    height: 40px;
    width: 250px;
    font-size: 1.7rem;
    font-family: Montserrat;
    cursor: pointer;
    margin-top: 20px;
    transition: all ease-in 0.3s;
    &:hover {
      background: #8b78ff;
      border: 1px solid #8b78ff;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
  }
  .example-enter {
    opacity: 0.01;
  }

  .example-enter.example-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  .example-leave {
    opacity: 1;
  }

  .example-leave.example-leave-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }
`;

const Header = styled.div`
  border: 1px solid #edefed;
  background: #1a2980;
  color: white;
  margin-top: 4%;
  border-bottom: 0;
  width: 100%;
  text-align: left;
  padding: 5px 2% 5px 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Block = styled.div`
  /* border: 1px solid #edefed; */
  padding: 0.5% 0%;
  color: black;
  width: 100%;
  padding-top: 4%;
  border-bottom: 1px solid #c4c4c4;
  padding-bottom: 40px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Progress = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  .question {
    margin-right: 15px;
    font-weight: 600;
  }
  .circles {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Element = (props) => {
  const [tasks, setTasks] = useState(props.tasks);
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [time, setTime] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const { t } = useTranslation("lesson");

  const [createTestPracticeResult, { data, loading, error }] = useMutation(
    CREATE_TEST_PRACTICE_RESULT_MUTATION
  );

  const getResults = (res) => {
    return;
  };

  let tasks_array = props.tasks.map((t) => t.id);
  useInterval(() => {
    // Your custom logic here
    if (tasks.length !== activeStep) {
      setTime(time + 1);
    }
  }, 1000);

  const update = (data) => {
    if (!data[0]) {
      let old_answers = [...answers];
      setAnswers([...old_answers, false]);
    } else if (data[0]) {
      let old_answers = [...answers];
      setAnswers([...old_answers, true]);
    }
  };

  let item;
  let task = tasks[activeStep];
  if (tasks.length === activeStep) {
    item = (
      <Final
        completed={props.completed}
        results={props.results}
        wrong={wrong}
        right={right}
        passResult={props.passResult}
        answers={answers}
        time={time}
        failureText={props.failureText}
        successText={props.successText}
        me={props.me}
        lesson={props.lesson.id}
        tasks_number={tasks.length}
      />
    );
  } else if (tasks.length > 0 && tasks[activeStep].__typename === "Note") {
    item = (
      <Note
        clicks={task.link_clicks}
        text={task.text}
        me={props.me}
        story={true}
        note={tasks[0]}
      />
    );
  } else if (tasks.length > 0 && tasks[activeStep].__typename === "NewTest") {
    item = (
      <SingleTest
        key={task.id}
        id={task.id}
        testID={task.id}
        question={task.question}
        answers={task.answers}
        true={task.correct}
        getResults={getResults}
        author={props.lesson.user}
        type={task.type}
        test={task}
        me={props.me}
        ifRight={task.ifRight}
        ifWrong={task.ifWrong}
        user={props.lesson.user.id}
        comments={task.comments}
        user_name={props.lesson.user}
        // userData={props.lesson.testResults}
        lessonID={props.lesson.id}
        length={Array(task.correct.length).fill(false)}
        userData={props.testResults}
        story={true}
        exam={false}
        getData={update}
      />
    );
  } else if (tasks.length > 0 && tasks[activeStep].__typename === "Quiz") {
    item = (
      <SingleQuiz
        key={task.id}
        id={task.id}
        question={task.question}
        answer={task.answer}
        answers={task.answers}
        me={props.me}
        getResults={getResults}
        type={task.type}
        check={task.check}
        hidden={true}
        user_name={props.lesson.user}
        author={props.lesson.user}
        userData={props.quizResults}
        lessonID={props.lesson.id}
        quizID={task.id}
        user={task.user.id}
        story={true}
        exam={false}
        getData={update}
      />
    );
  }

  return (
    <Container>
      <LessonPart>
        <Progress>
          <div className="question">
            {t("get")} {Math.round(props.tasksNum * 0.8)} {t("out")}{" "}
            {props.tasksNum} {t("to_proceed")}
          </div>
          <div className="circles">
            {_.times(props.tasksNum, (i) => (
              <Circle
                active={i == activeStep ? "true" : "false"}
                correct={answers[i] ? "true" : "false"}
              ></Circle>
            ))}
          </div>
        </Progress>
        <Block>{item}</Block>
        {activeStep < props.tasksNum && (
          <button
            onClick={async (e) => {
              e.preventDefault();
              setActiveStep(activeStep + 1);

              if (activeStep + 1 > answers.length) {
                setAnswers([...answers, false]);
              }
              if (activeStep + 1 == props.tasksNum) {
                props.passResult(3);
                const res = await createTestPracticeResult({
                  variables: {
                    tasks: tasks_array,
                    correct: answers.filter((a) => a !== false).length,
                    lessonId: props.lesson.id,
                    testPracticeId: props.id,
                  },
                });
              }
            }}
          >
            {t("next")}
          </button>
        )}
        {activeStep == props.tasksNum &&
          answers.filter((a) => a !== false).length / props.tasksNum < 0.8 && (
            <button onClick={(e) => props.restart(false)}>
              {t("restart")}
            </button>
          )}
      </LessonPart>
    </Container>
  );
};

export default Element;
