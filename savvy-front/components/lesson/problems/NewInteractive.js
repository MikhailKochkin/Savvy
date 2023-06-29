import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import SingleQuiz from "../quizes/SingleQuiz";
import SingleTest from "../tests/SingleTest";
import Note from "../notes/Note";

const Styles = styled.div`
  width: ${(props) => (props.story ? "100vw" : "100%")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .suggestion {
    margin: 20px 0;
    color: white;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  span {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 800px) {
    .suggestion {
      width: 100%;
      margin-bottom: 20px;
    }
  }
`;

const Questions = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Final = styled.div`
  max-width: 400px;
  margin-top: 2%;
  text-align: center;
  background: #f0f8ff;
  border-radius: 16px;
  padding: 3% 5%;
`;

const Button = styled.div`
  width: 170px;
  text-align: center;
  box-sizing: border-box;
  border-radius: 10px;
  background: #000000;
  padding: 10px 10px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  @media (max-width: 800px) {
    width: 65%;
  }
  transition: 0.3s;
  &:hover {
    background: #444444;
  }
`;

const NewInteractive = (props) => {
  const [isShown, setIsShown] = useState(false);
  const [componentList, setComponentList] = useState([]);
  const { problem, lesson, me, author } = props;

  useEffect(() => {
    if (problem.steps.problemItems.length > 0) {
      setComponentList([problem.steps.problemItems[0]]);
    }
  }, [0]);

  const updateArray = (data) => {
    let next_el = problem.steps.problemItems.find(
      (el) => el.id == componentList.at(-1).next.true.value
    );
    if (next_el) {
      setComponentList([...componentList, next_el]);
    } else {
      props.onFinish(true, "new");
    }
  };

  const getResults = () => {
    return null;
  };

  return (
    <Styles>
      <div className="suggestion">
        <Button onClick={(e) => setIsShown(true)}>Начать решать</Button>
      </div>
      {isShown && (
        <Questions>
          {[...componentList].map((com) => {
            let item;
            let el;
            if (com.type.toLowerCase() === "quiz") {
              el = lesson.quizes.find((quiz) => quiz.id === com.id);
              return (
                <SingleQuiz
                  id={el.id}
                  index={1}
                  key={el.id}
                  type={el.type}
                  check={el.check}
                  question={el.question}
                  answer={el.answer}
                  ifRight={el.ifRight}
                  ifWrong={el.ifWrong}
                  me={me}
                  hidden={true}
                  userData={[]}
                  lessonID={lesson.id}
                  quizID={el.id}
                  user={el.user.id}
                  user_name={el.user}
                  next={el.next}
                  getData={updateArray}
                  exam={true}
                  story={true}
                  author={author}
                  getResults={getResults}
                />
              );
            } else if (com.type.toLowerCase() === "newtest") {
              el = lesson.newTests.find((test) => test.id === com.id);
              return (
                <SingleTest
                  key={el.id}
                  id={el.id}
                  testID={el.id}
                  question={el.question}
                  answers={el.answers}
                  true={el.correct}
                  ifRight={el.ifRight}
                  ifWrong={el.ifWrong}
                  user={el.user.id}
                  user_name={el.user}
                  type={el.type}
                  me={me}
                  lessonID={lesson.id}
                  length={Array(el.correct.length).fill(false)}
                  userData={[]}
                  getData={updateArray}
                  next={el.next}
                  story={true}
                  exam={true}
                  author={author}
                  getResults={getResults}
                />
              );
            } else if (com.type.toLowerCase() === "note") {
              let el = lesson.notes.filter((q) => q.id === com.id)[0];
              return (
                <Note
                  id={el.id}
                  clicks={el.link_clicks}
                  //   index={this.state.componentList.length + 1}
                  key={el.id}
                  text={el.text}
                  me={me}
                  teacher={el.user.id}
                  note={el.id}
                  next={el.next}
                  getData={updateArray}
                  exam={true}
                  problem={true}
                  author={author}
                />
              );
            }
          })}
        </Questions>
      )}
    </Styles>
  );
};

NewInteractive.propTypes = {
  lesson: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
  problem: PropTypes.object.isRequired,
};

export default NewInteractive;
