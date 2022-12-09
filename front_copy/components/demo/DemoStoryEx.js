import DemoFeed from "./DemoFeed";
import React, { useEffect, useState } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import styled from "styled-components";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import CircularProgress from "@material-ui/core/CircularProgress";

import Note from "../lesson/notes/Note";
// import Offer from "../lesson/Offer";
import Shots from "../lesson/shots/Shots";
import SingleTest from "../lesson/tests/SingleTest";
import Chat from "../lesson/chat/Chat";
import SingleQuiz from "../lesson/quizes/SingleQuiz";
import SingleProblem from "../lesson/problems/SingleProblem";
import SingleTextEditor from "../lesson/textEditors/SingleTextEditor";
import SingleConstructor from "../lesson/constructions/SingleConstructor";
import NewConstructor from "../lesson/constructions/NewConstructor";

import Forum from "../lesson/forum/Forum";
import Document from "../lesson/documents/Document";
import Exam from "../lesson/exams/Exam";
import TestPractice from "../lesson/testblocks/TB";

const LESSON_RESULTS_QUERY = gql`
  query LESSON_RESULTS_QUERY($lessonId: String!, $userId: String!) {
    lessonResults(
      where: {
        lesson: { id: { equals: $lessonId } }
        student: { id: { equals: $userId } }
      }
    ) {
      id
      visitsNumber
      progress
      lessonID
      student {
        id
      }
    }
  }
`;

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

const Progress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
  margin: 0 0 2% 0;
`;

const StoryEx = (props) => {
  const { tasks, me, lesson, next, coursePageID } = props;
  const [experience, setExperience] = useState(0);

  const total = props.lesson.totalPoints;

  const getResults = (res) => {
    // if (experience <= total) {
    setExperience(experience + res);
    // }
  };

  const [
    fetchQuery,
    { loading: stats_loading, error: stats_error, data: stats_data },
  ] = useLazyQuery(LESSON_RESULTS_QUERY, {
    variables: {
      lessonId: props.id,
      userId: me.id,
    },
  });
  useEffect(() => {
    // when the first query is loaded, then fire this lazy query function
    if (me) {
      fetchQuery({
        variables: {
          lessonId: props.id,
          userId: me.id,
        },
      });
    }
  }, [me]);
  if (stats_error) return <p>{stats_error}</p>;
  if (stats_loading)
    return (
      <Progress>
        <CircularProgress />
      </Progress>
    );

  let my_result =
    stats_data && stats_data.lessonResults.length > 0
      ? stats_data.lessonResults.reduce((prev, current) =>
          prev.progress > current.progress ? prev : current
        )
      : [];
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
          id={el.id}
          experience={experience}
          total={total}
          author={lesson.user}
          story={true}
          note={el}
          clicks={el.link_clicks}
          complexity={el.complexity}
          miniforum={lesson.miniforums.find((m) => m.value == el.id)}
        />
      );
      components.push(item);
    } else if (task.type.toLowerCase() === "newtest") {
      el = lesson.newTests.find((t) => t.id === task.id);
      item = (
        <SingleTest
          key={el.id}
          id={el.id}
          getResults={getResults}
          testID={el.id}
          author={lesson.user}
          complexity={el.complexity}
          question={el.question}
          answers={el.answers}
          comments={el.comments}
          true={el.correct}
          user={el.user.id}
          user_name={el.user}
          type={el.type}
          ifRight={el.ifRight}
          ifWrong={el.ifWrong}
          me={me}
          lessonID={lesson.id}
          length={Array(el.correct.length).fill(false)}
          story={true}
          miniforum={lesson.miniforums.find((m) => m.value == el.id)}
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
          getResults={getResults}
          question={el.question}
          answer={el.answer}
          type={el.type}
          check={el.check}
          me={me}
          ifRight={el.ifRight}
          ifWrong={el.ifWrong}
          hidden={true}
          lessonID={lesson.id}
          quizID={el.id}
          user={el.user.id}
          story={true}
          user_name={el.user}
          author={lesson.user}
          miniforum={lesson.miniforums.find((m) => m.value == el.id)}
        />
      );
      components.push(item);
    } else if (task.type.toLowerCase() === "testpractice") {
      el = lesson.testPractices.find((t) => t.id === task.id);
      item = (
        <TestPractice
          key={el.id}
          lessonID={lesson.id}
          getResults={getResults}
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
          userData={[]}
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
          isSecret={el.isSecret}
          experience={experience}
          total={total}
          clicks={el.link_clicks}
          me={me}
          author={lesson.user}
          complexity={el.complexity}
          messages={el.messages}
          id={el.id}
          lessonId={lesson.id}
          story={true}
        />
      );
      components.push(item);
    }
    // else if (task.type.toLowerCase() === "offer") {
    //   item = (
    //     <Offer
    //       key={1}
    //       name={"el.name"}
    //       me={me}
    //       author={lesson.user}
    //       complexity={1} // messages={el.messages}
    //       length={[false, false]}
    //       id={1}
    //       true={[true, false]}
    //       lessonId={lesson.id}
    //       story={true}
    //       coursePageId={coursePageID}
    //     />
    //   );
    //   components.push(item);
    // }
    else if (task.type.toLowerCase() === "problem") {
      el = lesson.problems.find((problem) => problem.id === task.id);
      item = (
        <SingleProblem
          key={el.id}
          problem={el}
          complexity={el.complexity}
          getResults={getResults}
          lessonID={lesson.id}
          me={me}
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
          text={el.text}
          complexity={el.complexity}
          getResults={getResults}
          textEditor={el}
          me={me}
          story={true}
        />
      );
      components.push(item);
    } else if (task.type.toLowerCase() === "construction") {
      el = lesson.constructions.find((con) => con.id === task.id);
      item =
        el.elements !== null ? (
          <NewConstructor
            key={el.id}
            lessonID={lesson.id}
            construction={el}
            complexity={el.complexity}
            me={me}
            story={true}
            elements={el.elements.elements}
            getResults={getResults}
          />
        ) : (
          <SingleConstructor
            key={el.id}
            lessonID={lesson.id}
            complexity={el.complexity}
            getResults={getResults}
            construction={el}
            variants={el.variants}
            me={me}
            arr={Array(el.answer.length).fill("")}
            story={true}
          />
        );
      components.push(item);
    } else if (task.type.toLowerCase() === "exam") {
      el = lesson.exams.find((con) => con.id === task.id);
      item = <Exam lesson={lesson} me={props.me} exam={el} story={true} />;
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
        {me && (
          <DemoFeed
            components={components}
            experience={experience}
            total={total}
            next={next}
            number_of_tasks={tasks.length}
            coursePageID={coursePageID}
            me={me}
            hasSecret={lesson.hasSecret}
            lesson_number={lesson.number}
            lesson_name={lesson.name}
            lessonID={lesson.id}
            my_result={my_result}
          />
        )}
      </CSSTransitionGroup>
    </Container>
  );
};

export default StoryEx;