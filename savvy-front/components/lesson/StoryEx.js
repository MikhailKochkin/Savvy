import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import styled from "styled-components";
import Note from "./notes/Note";
import Shots from "./shots/Shots";
import SingleTest from "./tests/SingleTest";
import Chat from "./chat/Chat";
import SingleQuiz from "./quizes/SingleQuiz";
import SingleProblem from "./problems/SingleProblem";
import SingleTextEditor from "./textEditors/SingleTextEditor";
import SingleConstructor from "./constructions/SingleConstructor";
import Forum from "./forum/Forum";
import Document from "./documents/Document";
import Exam from "./exams/Exam";
import Feed from "./Feed";
import LessonHeader from "./LessonHeader";
import TestPractice from "./testblocks/TB";

const Container = styled.div`
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  .fade-leave {
    opacity: 1;
  }

  .fade-leave.fade-leave-active {
    opacity: 0.01;
    transition: opacity 10ms ease-in;
  }
`;

class StoryEx extends Component {
  render() {
    const { tasks, me, lesson, next, coursePageID } = this.props;
    let components = [];
    tasks.map((task) => {
      let el;
      let item;
      if (task.type.toLowerCase() === "note") {
        el = lesson.notes.find((note) => note.id === task.id);
        item = (
          <Note
            text={el.text}
            me={me}
            author={lesson.user}
            story={true}
            note={el}
            complexity={el.complexity}
          />
        );
        components.push(item);
      } else if (task.type.toLowerCase() === "newtest") {
        el = lesson.newTests.find((t) => t.id === task.id);
        item = (
          <SingleTest
            key={el.id}
            id={el.id}
            testID={el.id}
            author={lesson.user}
            complexity={el.complexity}
            question={el.question}
            answers={el.answers}
            true={el.correct}
            user={el.user.id}
            user_name={el.user}
            type={el.type}
            ifRight={el.ifRight}
            ifWrong={el.ifWrong}
            me={me}
            userData={lesson.testResults}
            lessonID={lesson.id}
            length={Array(el.correct.length).fill(false)}
            userData={lesson.testResults}
            story={true}
          />
        );
        components.push(item);
      } else if (task.type.toLowerCase() === "quiz") {
        el = lesson.quizes.find((quiz) => quiz.id === task.id);
        item = (
          <SingleQuiz
            key={el.id}
            id={el.id}
            complexity={el.complexity}
            question={el.question}
            answer={el.answer}
            type={el.type}
            check={el.check}
            me={me}
            ifRight={el.ifRight}
            ifWrong={el.ifWrong}
            type={el.type}
            hidden={true}
            userData={lesson.quizResults}
            lessonID={lesson.id}
            quizID={el.id}
            user={el.user.id}
            story={true}
            user_name={el.user}
            author={lesson.user}
          />
        );
        components.push(item);
      } else if (task.type.toLowerCase() === "testpractice") {
        el = lesson.testPractices.find((t) => t.id === task.id);
        item = (
          <TestPractice
            key={el.id}
            lessonID={lesson.id}
            quizResults={lesson.quizResults}
            me={me}
            testPractice={el}
            quizes={lesson.quizes}
            tests={lesson.newTests}
            lesson={lesson}
            story={true}
          />
        );
        components.push(item);
      } else if (task.type.toLowerCase() === "shot") {
        el = lesson.shots.find((shot) => shot.id === task.id);
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
        components.push(item);
      } else if (task.type.toLowerCase() === "chat") {
        el = lesson.chats.find((chat) => chat.id === task.id);
        item = (
          <Chat
            key={el.id}
            name={el.name}
            me={me}
            author={lesson.user}
            complexity={el.complexity}
            messages={el.messages}
            id={el.id}
            lessonId={lesson.id}
            me={me}
            story={true}
          />
        );
        components.push(item);
      } else if (task.type.toLowerCase() === "problem") {
        el = lesson.problems.find((problem) => problem.id === task.id);
        item = (
          <SingleProblem
            key={el.id}
            problem={el}
            complexity={el.complexity}
            lessonID={lesson.id}
            me={me}
            userData={lesson.problemResults}
            story={true}
            lesson={lesson}
            author={lesson.user}
          />
        );
        components.push(item);
      } else if (task.type.toLowerCase() === "texteditor") {
        el = lesson.texteditors.find((texteditor) => texteditor.id === task.id);
        item = (
          <SingleTextEditor
            key={el.id}
            lessonID={lesson.id}
            complexity={el.complexity}
            textEditor={el}
            me={me}
            userData={lesson.textEditorResults}
            story={true}
          />
        );
        components.push(item);
      } else if (task.type.toLowerCase() === "construction") {
        el = lesson.constructions.find((con) => con.id === task.id);
        item = (
          <SingleConstructor
            key={el.id}
            lessonID={lesson.id}
            complexity={el.complexity}
            construction={el}
            variants={el.variants}
            me={me}
            arr={Array(el.answer.length).fill("")}
            userData={lesson.constructionResults}
            story={true}
          />
        );
        components.push(item);
      } else if (task.type.toLowerCase() === "exam") {
        el = lesson.exams.find((con) => con.id === task.id);
        item = (
          <Exam lesson={lesson} me={this.props.me} exam={el} story={true} />
        );
        components.push(item);
      } else if (task.type.toLowerCase() === "document") {
        el = lesson.documents.find((con) => con.id === task.id);
        item = (
          <Document
            key={el.id}
            clauses={el.clauses}
            complexity={el.complexity}
            title={el.title}
            me={me}
            documentID={el.id}
            user={lesson.user.id}
            lessonID={lesson.id}
            story={true}
          />
        );
        components.push(item);
      } else if (task.type.toLowerCase() === "forum") {
        el = lesson.forum;
        item = (
          <Forum
            key={el.id}
            text={el.text}
            forum={el}
            me={me}
            id={el.id}
            story={true}
            lesson={lesson.id}
            author={lesson.user.id}
            result={me ? el.rating.filter((r) => r.user.id == me.id)[0] : null}
            statements={el.statements}
          />
        );
        components.push(item);
      }
    });
    return (
      <Container>
        <CSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={10}
        >
          <Feed
            components={components}
            next={next}
            number_of_tasks={tasks.length}
            coursePageID={coursePageID}
            me={me}
            lessonID={lesson.id}
            my_result={this.props.my_result}
          />
        </CSSTransitionGroup>
      </Container>
    );
  }
}

export default StoryEx;
