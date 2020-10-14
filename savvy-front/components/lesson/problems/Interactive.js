import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SingleQuiz from "../quizes/SingleQuiz";
import SingleTest from "../tests/SingleTest";
import Note from "../notes/Note";

const Styles = styled.div`
  width: 100%;
  #suggestion {
    background: #f0f8ff;
    border-radius: 16px;
    padding: 3% 5%;
  }
  span {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Questions = styled.div`
  display: ${(props) => (props.display ? `display` : `none`)};
  width: 100%;
  margin-top: 2%;
`;

const Final = styled.div`
  width: 100%;
  margin-top: 2%;
  text-align: center;
  background: #f0f8ff;
  border-radius: 16px;
  padding: 3% 5%;
`;

const Button = styled.div`
  width: 40%;
  text-align: center;
  border: 1px solid #24315e;
  box-sizing: border-box;
  border-radius: 10px;
  background: none;
  padding: 1.5% 3%;
  margin-top: 2%;
  cursor: pointer;
  @media (max-width: 800px) {
    width: 46%;
  }
  &:hover {
    background: #e3f2ff;
  }
`;

class Interactive extends Component {
  state = {
    componentList: [],
    new: "",
    results: [],
    answers: [],
    display: false,
  };
  updateArray = (data, type) => {
    let newQuiz;
    let newNote;
    let newTest;
    let finish;
    if (data[1].type === "quiz") {
      let el = this.props.lesson.quizes.filter(
        (q) => q.id === data[1].value
      )[0];
      newQuiz = (
        <SingleQuiz
          key={el.id}
          id={el.id}
          type={el.type}
          check={el.check}
          question={el.question}
          answer={el.answer}
          ifRight={el.ifRight}
          ifWrong={el.ifWrong}
          me={this.props.me}
          type={el.type}
          hidden={true}
          userData={this.props.lesson.quizResults}
          lessonID={this.props.lesson.id}
          quizID={el.id}
          user={el.user.id}
          user_name={el.user}
          next={el.next}
          getData={this.updateArray}
          exam={true}
          story={true}
        />
      );

      this.setState((state) => {
        const componentList = [...state.componentList, newQuiz];
        const results = [...state.results, type];
        return {
          componentList,
          results,
        };
      });
    }
    if (data[1].type && data[1].type.toLowerCase() === "newtest") {
      let el = this.props.lesson.newTests.filter(
        (n) => n.id === data[1].value
      )[0];
      newTest = (
        <SingleTest
          index={this.state.componentList.length + 1}
          key={el.id}
          id={el.id}
          testID={el.id}
          question={el.question}
          answers={el.answers}
          ifRight={el.ifRight}
          ifWrong={el.ifWrong}
          true={el.correct}
          user={el.user.id}
          user_name={el.user}
          type={el.type}
          me={this.props.me}
          userData={this.props.lesson.testResults}
          lessonID={this.props.lesson.id}
          length={Array(el.correct.length).fill(false)}
          userData={this.props.lesson.testResults}
          next={el.next}
          getData={this.updateArray}
          exam={true}
          story={true}
        />
      );
      this.setState((state) => {
        const componentList = [...state.componentList, newTest];
        const results = [...state.results, type];
        return {
          componentList,
          results,
        };
      });
    }
    if (data[1].type === "note") {
      let el = this.props.lesson.notes.filter((q) => q.id === data[1].value)[0];
      newNote = (
        <Note
          id={el.id}
          index={this.state.componentList.length + 1}
          key={el.id}
          text={el.text}
          me={this.props.me}
          teacher={el.user.id}
          note={el.id}
          next={el.next}
          getData={this.updateArray}
          exam={true}
          story={true}
        />
      );
      this.setState((state) => {
        const componentList = [...state.componentList, newNote];
        const results = [...state.results, type];
        return {
          componentList,
          results,
        };
      });
    }
    if (
      data[1].type === "finish" ||
      data[1].type === null ||
      data[1].value === null ||
      data[1].value === ""
    ) {
      finish = (
        <Final>
          {" "}
          Теперь запишите ответ на задачу на основе наводящих вопросов📝
        </Final>
      );
      this.setState((state) => {
        if (!(finish in this.state.componentList)) {
          const componentList = [...state.componentList, finish];
          const results = [...state.results, type];
          return {
            componentList,
            results,
          };
        }
      });
    }
  };
  show = () => this.setState((prev) => ({ display: !prev.display }));
  componentDidMount = () => {
    let item;
    let el;
    if (this.props.exam.nodeType === "quiz") {
      el = this.props.lesson.quizes.find(
        (quiz) => quiz.id === this.props.exam.nodeID
      );
      item = (
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
          me={this.props.me}
          type={el.type}
          hidden={true}
          userData={this.props.lesson.quizResults}
          lessonID={this.props.lesson.id}
          quizID={el.id}
          user={el.user.id}
          user_name={el.user}
          next={el.next}
          getData={this.updateArray}
          exam={true}
          story={true}
        />
      );
    } else if (this.props.exam.nodeType.toLowerCase() === "newtest") {
      el = this.props.lesson.newTests.find(
        (test) => test.id === this.props.exam.nodeID
      );
      item = (
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
          me={this.props.me}
          userData={this.props.lesson.testResults}
          lessonID={this.props.lesson.id}
          length={Array(el.correct.length).fill(false)}
          userData={this.props.lesson.testResults}
          getData={this.updateArray}
          next={el.next}
          story={true}
          exam={true}
        />
      );
    }
    this.setState((state) => {
      const componentList = [...state.componentList, item];
      return {
        componentList,
      };
    });
  };
  render() {
    return (
      <Styles>
        <div id="suggestion">
          👩🏼‍🏫<b>Начнем решать задачу вместе?</b> Зададим наводящие вопросы и
          покажем, как прийти к правильному ответу.
          <br />
          <Button onClick={this.show}>
            {!this.state.display ? "Первый вопрос" : "Закрыть"}
          </Button>
        </div>
        <Questions display={this.state.display}>
          {this.state.componentList.map((el) => el)}
        </Questions>
      </Styles>
    );
  }
}

Interactive.propTypes = {
  lesson: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
  exam: PropTypes.object.isRequired,
};

export default Interactive;
