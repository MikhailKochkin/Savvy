import React, { Component } from "react";
import Note from "./notes/Note";
import Shots from "./shots/Shots";
import SingleTest from "./tests/SingleTest";
import SingleQuiz from "./quizes/SingleQuiz";
import SingleProblem from "./problems/SingleProblem";
import SingleTextEditor from "./textEditors/SingleTextEditor";
import SingleConstructor from "./constructions/SingleConstructor";
import Exam from "./exams/Exam";

class StoryEx extends Component {
  render() {
    const { m, me, lesson } = this.props;
    let arr = [];
    let el;
    let item;
    if (Object.keys(m)[0] === "note") {
      el = lesson.notes.find(note => note.id === Object.values(m)[0]);
      item = <Note text={el.text} me={me} story={true} />;
    } else if (Object.keys(m)[0] === "newTest") {
      el = lesson.newTests.find(test => test.id === Object.values(m)[0]);
      item = (
        <SingleTest
          key={el.id}
          id={el.id}
          question={el.question}
          answers={el.answers}
          true={el.correct}
          user={el.user.id}
          type={el.type}
          me={me}
          userData={lesson.testResults}
          lessonID={lesson.id}
          length={Array(el.correct.length).fill(false)}
          userData={lesson.testResults}
          story={true}
        />
      );
    } else if (Object.keys(m)[0] === "quiz") {
      el = lesson.quizes.find(quiz => quiz.id === Object.values(m)[0]);
      item = (
        <SingleQuiz
          key={el.id}
          question={el.question}
          answer={el.answer}
          me={me}
          type={el.type}
          hidden={true}
          userData={lesson.quizResults}
          lessonID={lesson.id}
          quizID={el.id}
          user={el.user.id}
          story={true}
        />
      );
    } else if (Object.keys(m)[0] === "shot") {
      el = lesson.shots.find(shot => shot.id === Object.values(m)[0]);
      item = (
        <Shots
          key={el.id}
          comments={el.comments}
          parts={el.parts}
          shotUser={el.user.id}
          me={me}
          shotID={el.id}
          lessonID={lesson.id}
          title={el.title}
          userData={lesson.shotResults}
          story={true}
        />
      );
    } else if (Object.keys(m)[0] === "problem") {
      el = lesson.problems.find(problem => problem.id === Object.values(m)[0]);
      item = (
        <SingleProblem
          key={el.id}
          problem={el}
          lessonID={lesson.id}
          me={me}
          userData={lesson.problemResults}
          story={true}
          lesson={lesson}
        />
      );
    } else if (Object.keys(m)[0] === "texteditor") {
      el = lesson.texteditors.find(
        texteditor => texteditor.id === Object.values(m)[0]
      );
      item = (
        <SingleTextEditor
          key={el.id}
          lessonID={lesson.id}
          textEditor={el}
          me={me}
          userData={lesson.textEditorResults}
          story={true}
        />
      );
    } else if (Object.keys(m)[0] === "construction") {
      el = lesson.constructions.find(con => con.id === Object.values(m)[0]);
      item = (
        <SingleConstructor
          key={el.id}
          lessonID={lesson.id}
          construction={el}
          variants={el.variants}
          me={me}
          arr={Array(el.answer.length).fill("")}
          userData={lesson.constructionResults}
          story={true}
        />
      );
    } else if (Object.keys(m)[0] === "exam") {
      el = lesson.exams.find(con => con.id === Object.values(m)[0]);
      item = <Exam lesson={lesson} me={this.props.me} exam={el} />;
    }
    return <div>{item}</div>;
  }
}

export default StoryEx;
