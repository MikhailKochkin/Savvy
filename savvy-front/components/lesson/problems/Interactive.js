import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SingleQuiz from "../quizes/SingleQuiz";
import SingleTest from "../tests/SingleTest";
import Note from "../notes/Note";
import { withTranslation } from "../../../i18n";

const Styles = styled.div`
  width: ${(props) => (props.story ? "100vw" : "100%")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  #suggestion {
    /* background: #f0f8ff; */
    color: white;
    border-radius: 16px;
    padding: 1.5% 3%;
    width: 50vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  span {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 800px) {
    #suggestion {
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
  width: 60%;
  text-align: center;
  box-sizing: border-box;
  border-radius: 10px;
  background: #f96358;
  padding: 2% 0;
  /* margin-top: 2%; */
  cursor: pointer;
  @media (max-width: 800px) {
    width: 65%;
  }
  transition: 0.3s;
  &:hover {
    background: #e75b52;
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
    console.log(data, data[1].value, data[1].value === "");
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
          problem={true}
          author={this.props.author}
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
          problem={true}
          author={this.props.author}
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
      finish = <Final> Теперь ответьте на изначальный вопрос📝</Final>;
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
          author={this.props.author}
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
          userData={this.props.lesson.testResults}
          lessonID={this.props.lesson.id}
          length={Array(el.correct.length).fill(false)}
          userData={this.props.lesson.testResults}
          getData={this.updateArray}
          next={el.next}
          story={true}
          exam={true}
          author={this.props.author}
        />
      );
    } else if (this.props.problem.nodeType.toLowerCase() === "note") {
      let el = this.props.lesson.notes.filter(
        (q) => q.id === this.props.problem.nodeID
      )[0];
      item = (
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
        <div id="suggestion">
          <Button onClick={this.show}>
            {!this.state.display
              ? this.props.t("first")
              : this.props.t("close1")}
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

export default withTranslation("tasks")(Interactive);
