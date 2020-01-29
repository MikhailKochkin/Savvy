import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SingleQuiz from "../quizes/SingleQuiz";
import SingleTest from "../tests/SingleTest";
import Note from "../notes/Note";

const Styles = styled.div`
  width: 100%;
  span {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Questions = styled.div`
  display: ${props => (props.display ? `display` : `none`)};
  width: 100%;
  margin-top: 2%;
`;

class Interactive extends Component {
  state = {
    componentList: [],
    new: "",
    results: [],
    answers: [],
    display: false
  };
  updateArray = (data, type) => {
    let newQuiz;
    let newNote;
    let newTest;
    let finish;
    console.log(Object.keys(data)[0]);
    if (Object.keys(data)[0] === "quiz") {
      let el = this.props.lesson.quizes.filter(
        q => q.id === Object.values(data)[0]
      )[0];
      newQuiz = (
        <SingleQuiz
          key={el.id}
          question={el.question}
          answer={el.answer}
          me={this.props.me}
          type={el.type}
          hidden={true}
          userData={this.props.lesson.quizResults}
          lessonID={this.props.lesson.id}
          quizID={el.id}
          user={el.user.id}
          next={el.next}
          getData={this.updateArray}
          exam={true}
          story={true}
        />
      );

      this.setState(state => {
        const componentList = [...state.componentList, newQuiz];
        const results = [...state.results, type];
        return {
          componentList,
          results
        };
      });
    }
    if (Object.keys(data)[0] === "newTest") {
      let el = this.props.lesson.newTests.filter(
        n => n.id === Object.values(data)[0]
      )[0];
      newTest = (
        <SingleTest
          index={this.state.componentList.length + 1}
          key={el.id}
          id={el.id}
          question={el.question}
          answers={el.answers}
          true={el.correct}
          user={el.user.id}
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
      this.setState(state => {
        const componentList = [...state.componentList, newTest];
        const results = [...state.results, type];
        return {
          componentList,
          results
        };
      });
    }
    if (Object.keys(data)[0] === "note") {
      let el = this.props.lesson.notes.filter(
        q => q.id === Object.values(data)[0]
      )[0];
      newNote = (
        <Note
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
      this.setState(state => {
        const componentList = [...state.componentList, newNote];
        const results = [...state.results, type];
        return {
          componentList,
          results
        };
      });
    }
    if (Object.keys(data)[0] === "finish") {
      finish = <p> Запишите ответ на задачу!</p>;
      this.setState(state => {
        const componentList = [...state.componentList, finish];
        const results = [...state.results, type];
        return {
          componentList,
          results
        };
      });
    }
  };
  show = () => this.setState(prev => ({ display: !prev.display }));
  componentDidMount = () => {
    let newQuiz;
    let el;
    if (this.props.exam.nodeType === "quiz") {
      el = this.props.lesson.quizes.find(
        quiz => quiz.id === this.props.exam.nodeID
      );
      newQuiz = (
        <SingleQuiz
          index={1}
          key={el.id}
          question={el.question}
          answer={el.answer}
          me={this.props.me}
          type={el.type}
          hidden={true}
          userData={this.props.lesson.quizResults}
          lessonID={this.props.lesson.id}
          quizID={el.id}
          user={el.user.id}
          next={el.next}
          getData={this.updateArray}
          exam={true}
          story={true}
        />
      );
    }
    this.setState(state => {
      const componentList = [...state.componentList, newQuiz];
      return {
        componentList
      };
    });
  };
  render() {
    return (
      <Styles>
        <div>
          Начнем решать задачу вместе?{" "}
          <span onClick={this.show}>Первый вопрос</span>
        </div>
        <Questions display={this.state.display}>
          {this.state.componentList.map(el => el)}
        </Questions>
      </Styles>
    );
  }
}

Interactive.propTypes = {
  lesson: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
  exam: PropTypes.object.isRequired
};

export default Interactive;
