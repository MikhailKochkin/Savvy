import React, { Component } from "react";
import Note from "./notes/Note";
import Shots from "./shots/Shots";
import SingleTest from "./tests/SingleTest";
import SingleQuiz from "./quizes/SingleQuiz";
import SingleProblem from "./problems/SingleProblem";
import SingleTextEditor from "./textEditors/SingleTextEditor";
import SingleConstructor from "./constructions/SingleConstructor";

class StoryEx extends Component {
  shuffle = array => {
    var m = array.length,
      t,
      i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  };
  render() {
    const { m, me, lesson } = this.props;
    let arr = [];
    let el;
    m.map(prop => {
      if (Object.keys(prop)[0] === "newTest") {
        el = lesson.newTests.find(test => test.id === Object.values(prop)[0]);
        arr.push(
          <SingleTest
            id={el.id}
            question={el.question}
            answers={el.answers}
            true={el.correct}
            user={el.user.id}
            me={me}
            userData={lesson.testResults}
            lessonID={lesson.id}
            length={Array(el.correct.length).fill(false)}
            userData={lesson.testResults}
          />
        );
      } else if (Object.keys(prop)[0] === "quiz") {
        el = lesson.quizes.find(quiz => quiz.id === Object.values(prop)[0]);
        arr.push(
          <SingleQuiz
            question={el.question}
            answer={el.answer}
            me={me}
            hidden={true}
            userData={lesson.quizResults}
            lessonID={lesson.id}
            id={el.id}
            user={el.user.id}
          />
        );
      } else if (Object.keys(prop)[0] === "note") {
        el = lesson.notes.find(note => note.id === Object.values(prop)[0]);
        arr.push(<Note text={el.text} />);
      } else if (Object.keys(prop)[0] === "shot") {
        el = lesson.shots.find(shot => shot.id === Object.values(prop)[0]);
        arr.push(
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
          />
        );
      } else if (Object.keys(prop)[0] === "problem") {
        el = lesson.problems.find(
          problem => problem.id === Object.values(prop)[0]
        );
        arr.push(
          <SingleProblem
            key={el.id}
            problem={el}
            lessonID={lesson.id}
            me={me}
            userData={lesson.problemResults}
          />
        );
      } else if (Object.keys(prop)[0] === "texteditor") {
        el = lesson.texteditors.find(
          texteditor => texteditor.id === Object.values(prop)[0]
        );
        arr.push(
          <SingleTextEditor
            key={el.id}
            lessonID={lesson.id}
            textEditor={el}
            me={me}
            userData={lesson.textEditorResults}
          />
        );
      } else if (Object.keys(prop)[0] === "construction") {
        el = lesson.constructions.find(
          con => con.id === Object.values(prop)[0]
        );
        arr.push(
          <SingleConstructor
            key={el.id}
            lessonID={lesson.id}
            construction={el}
            variants={this.shuffle(el.variants)}
            me={me}
            arr={Array(el.answer.length).fill("")}
            userData={lesson.constructionResults}
          />
        );
      }
    });
    return <div>{arr[this.props.step]}</div>;
  }
}

export default StoryEx;
