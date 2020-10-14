import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import SingleQuiz from "../quizes/SingleQuiz";
import SingleTest from "../tests/SingleTest";
import DeleteExam from "./DeleteExam";
import Note from "../notes/Note";
import Finish from "./Finish";

const Styles = styled.div`
  padding-top: 4%;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 3.5%;
`;

class Exam extends Component {
  state = {
    componentList: [],
    new: "",
    results: [],
    answers: [],
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
      console.log(el);
      newQuiz = (
        <SingleQuiz
          key={el.id}
          id={el.id}
          question={el.question}
          type={el.type}
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
          testID={el.id}
          question={el.question}
          answers={el.answers}
          ifRight={el.ifRight}
          ifWrong={el.ifWrong}
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
        <Finish
          key={1}
          results={[...this.state.results, type]}
          exam={this.props.exam.id}
          lesson={this.props.lesson.id}
        />
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
  componentDidMount = () => {
    let item;
    let el;
    if (this.props.exam.nodeType === "quiz") {
      el = this.props.lesson.quizes.find(
        (quiz) => quiz.id === this.props.exam.nodeID
      );
      console.log(el);
      item = (
        <SingleQuiz
          id={el.id}
          index={1}
          key={el.id}
          type={el.type}
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
          testID={el.id}
          question={el.question}
          answers={el.answers}
          true={el.correct}
          ifRight={el.ifRight}
          ifWrong={el.ifWrong}
          user={el.user.id}
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
        {this.props.me &&
        this.props.me.id === this.props.exam.user.id &&
        !this.props.story ? (
          <DeleteExam
            id={this.props.me.id}
            examID={this.props.exam.id}
            lessonID={this.props.lesson.id}
          />
        ) : null}
        <Title>{this.props.exam.name}</Title>
        <p>{this.props.exam.question}</p>
        {this.state.componentList.map((el) => el)}
      </Styles>
    );
  }
}

Exam.propTypes = {
  lesson: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
  exam: PropTypes.object.isRequired,
};

export default Exam;
