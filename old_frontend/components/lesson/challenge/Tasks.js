import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Note from "../notes/Note";
import SingleTest from "../tests/SingleTest";
import SingleQuiz from "../quizes/SingleQuiz";
import Final from "./Final";

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
  border: 1px solid #edefed;
  padding: 0.5% 2%;
  color: black;
  width: 100%;
  padding-top: 4%;
  @media (max-width: 800px) {
    width: 100%;
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

const Tasks = (props) => {
  const [tasks, setTasks] = useState(props.tasks);
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [time, setTime] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useInterval(() => {
    // Your custom logic here
    if (tasks.length !== activeStep) {
      setTime(time + 1);
    }
  }, 1000);

  const update = (data) => {
    if (!data[0]) {
      setWrong(wrong + 1);
      setTimeout(function () {
        setActiveStep(activeStep + 1);
      }, 1000);
    } else if (data[0]) {
      setRight(right + 1);
      setTimeout(function () {
        setActiveStep(activeStep + 1);
      }, 1000);
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
        time={time}
        me={props.me}
        lesson={props.lesson.id}
      />
    );
  } else if (tasks.length > 0 && tasks[activeStep].__typename === "Note") {
    item = <Note text={task.text} me={props.me} story={true} note={tasks[0]} />;
  } else if (tasks.length > 0 && tasks[activeStep].__typename === "NewTest") {
    item = (
      <SingleTest
        key={task.id}
        id={task.id}
        testID={task.id}
        question={task.question}
        answers={task.answers}
        true={task.correct}
        user={task.user.id}
        type={task.type}
        test={task}
        me={props.me}
        userData={props.lesson.testResults}
        lessonID={props.lesson.id}
        length={Array(task.correct.length).fill(false)}
        userData={props.lesson.testResults}
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
        me={props.me}
        type={task.type}
        check={task.check}
        hidden={true}
        userData={props.lesson.quizResults}
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
        <Header>
          <div>
            {activeStep <= tasks.length - 1
              ? `Вопрос ${activeStep + 1} из ${tasks.length}`
              : `Результат:`}
          </div>
          <div>
            {activeStep <= tasks.length - 1
              ? `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
                  time - Math.floor(time / 60) * 60
                ).padStart(2, "0")}`
              : null}
          </div>
        </Header>
        <Block>{item}</Block>
      </LessonPart>
    </Container>
  );
};

export default Tasks;
