import React, { Component } from "react";
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
  display: ${(props) => (props.display ? `flex` : `none`)};
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

class Interactive extends Component {
  state = {
    componentList: [],
    new: "",
    results: [],
    answers: [],
    display: false,
  };

  getResults = () => {
    return;
  };

  updateArray = (data, type) => {
    let newQuiz;
    let newNote;
    let newTest;
    let finish;
    if (
      data[1].type === "quiz" &&
      data[1].value !== null &&
      data[1].value !== "0" &&
      data[1].value !== ""
    ) {
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
          answers={el.answers}
          ifRight={el.ifRight}
          ifWrong={el.ifWrong}
          me={this.props.me}
          hidden={true}
          userData={[]}
          lessonID={this.props.lesson.id}
          quizID={el.id}
          user={el.user.id}
          user_name={el.user}
          next={el.next}
          getData={this.updateArray}
          exam={true}
          problem={true}
          author={this.props.author}
          getResults={this.getResults}
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
    if (
      data[1].type &&
      data[1].type.toLowerCase() === "newtest" &&
      data[1].value !== null &&
      data[1].value !== "0" &&
      data[1].value !== ""
    ) {
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
          comments={el.comments}
          true={el.correct}
          user={el.user.id}
          user_name={el.user}
          type={el.type}
          me={this.props.me}
          userData={[]}
          lessonID={this.props.lesson.id}
          length={Array(el.correct.length).fill(false)}
          next={el.next}
          getData={this.updateArray}
          exam={true}
          story={true}
          problem={true}
          author={this.props.author}
          getResults={this.getResults}
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
    if (
      data[1].type === "note" &&
      data[1].value !== null &&
      data[1].value !== "0" &&
      data[1].value !== ""
    ) {
      let el = this.props.lesson.notes.filter((q) => q.id === data[1].value)[0];
      newNote = (
        <Note
          id={el.id}
          clicks={el.link_clicks}
          index={this.state.componentList.length + 1}
          key={el.id}
          text={el.text}
          me={this.props.me}
          teacher={el.user.id}
          note={el.id}
          next={el.next}
          getData={this.updateArray}
          exam={true}
          problem={true}
          author={this.props.author}
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
      data[1].value === "" ||
      data[1].value == "0"
    ) {
      this.props.onFinish(true, "old");
      finish = (
        <></>
        // <Final>
        //   Now write down the answer to the problem in the form below. Then we
        //   will share the answer provided by the course author. 📝
        // </Final>
      );
      // finish = <div></div>;
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
    const getResults = () => {
      return;
    };

    if (this.props.problem.nodeType === "quiz") {
      el = this.props.lesson.quizes.find(
        (quiz) => quiz.id === this.props.problem.nodeID
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
          answers={el.answers}
          ifRight={el.ifRight}
          ifWrong={el.ifWrong}
          me={this.props.me}
          hidden={true}
          userData={[]}
          lessonID={this.props.lesson.id}
          quizID={el.id}
          user={el.user.id}
          user_name={el.user}
          next={el.next}
          getData={this.updateArray}
          exam={true}
          story={true}
          author={this.props.author}
          getResults={getResults}
        />
      );
    } else if (this.props.problem.nodeType.toLowerCase() === "newtest") {
      el = this.props.lesson.newTests.find(
        (test) => test.id === this.props.problem.nodeID
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
          lessonID={this.props.lesson.id}
          length={Array(el.correct.length).fill(false)}
          userData={[]}
          getData={this.updateArray}
          next={el.next}
          story={true}
          exam={true}
          author={this.props.author}
          getResults={getResults}
        />
      );
    } else if (this.props.problem.nodeType.toLowerCase() === "note") {
      let el = this.props.lesson.notes.filter(
        (q) => q.id === this.props.problem.nodeID
      )[0];
      item = (
        <Note
          id={el.id}
          clicks={el.link_clicks}
          index={this.state.componentList.length + 1}
          key={el.id}
          text={el.text}
          me={this.props.me}
          teacher={el.user.id}
          note={el.id}
          next={el.next}
          getData={this.updateArray}
          exam={true}
          problem={true}
          author={this.props.author}
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
        <div className="suggestion">
          <Button onClick={this.show}>
            Start
            {/* Начать решать */}
            {/* {!this.state.display ? "Первый вопрос" : "Закрыть"} */}
          </Button>
        </div>
        <Questions display={this.state.display}>
          {[...this.state.componentList].map((el) => el)}
        </Questions>
      </Styles>
    );
  }
}

Interactive.propTypes = {
  lesson: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
  problem: PropTypes.object.isRequired,
};

export default Interactive;
