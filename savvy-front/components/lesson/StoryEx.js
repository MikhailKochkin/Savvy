import React, { useEffect, useState } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import styled from "styled-components";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { TailSpin } from "react-loader-spinner";

import Note from "./notes/Note";
import BannerOffer from "./offers/BannerOffer";
import Shots from "./shots/Shots";
import SingleTest from "./tests/SingleTest";
import Chat from "./chat/Chat";
import SingleQuiz from "./quizes/SingleQuiz";
import SingleProblem from "./problems/SingleProblem";
import SingleTextEditor from "./textEditors/SingleTextEditor";
import SingleConstructor from "./constructions/SingleConstructor";
import NewConstructor from "./constructions/NewConstructor";
import TeamQuest from "./teamQuests/TeamQuest";
import Forum from "./forum/Forum";
import Document from "./documents/Document";
import Exam from "./exams/Exam";
import Feed from "./Feed";
import LessonHeader from "./LessonHeader";
import TestPractice from "./testblocks/TB";

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
      createdAt
      updatedAt
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
  const { tasks, me, lesson, next, coursePageID, coursePage } = props;
  const [experience, setExperience] = useState(0);
  const [showArrow, setShowArrow] = useState(true);
  const [solved, setSolved] = useState([]);
  const total = props.lesson.totalPoints;

  const getShowArrow = (val) => {
    setShowArrow(val);
  };

  const moveNext = (id) => {
    setSolved([...solved, id]);
  };

  const getResults = (res, id) => {
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
  }, [props.me]);
  if (stats_error) return <p>{stats_error}</p>;
  if (stats_loading)
    return (
      <Progress>
        <TailSpin
          height="80"
          width="80"
          color="#2E80EC"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />{" "}
      </Progress>
    );

  let my_result = null;

  if (stats_data && stats_data.lessonResults.length > 0) {
    // Special case: if there's only one item, return it
    if (stats_data.lessonResults.length === 1) {
      my_result = stats_data.lessonResults[0];
    } else {
      const filteredResults = stats_data.lessonResults.filter(
        (result) => result.progress < lesson.structure.lessonItems.length
      );

      // If any items are left, find the one with the maximum progress
      if (filteredResults.length > 0) {
        my_result = filteredResults.reduce((prev, current) => {
          return prev.progress > current.progress ? prev : current;
        });
      }
    }
  }

  // Now, my_result should contain the item with the highest progress value that is not equal to maxProgress, or null if no such item exists.

  let components = [];
  let move_statuses = [];
  tasks.map((task) => {
    let el;
    let item;
    if (task.type.toLowerCase() === "note") {
      el = lesson.notes.find((note) => note.id === task.id);
      if (!el) return;
      item = (
        // <BannerOffer me={me} coursePageId={coursePageID} />
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
      move_statuses.push(true);
    } else if (task.type.toLowerCase() === "offer") {
      el = lesson.offers.find((t) => t.id === task.id);
      if (!el) return;
      item = (
        <BannerOffer
          key={el.id}
          id={el.id}
          offer={el}
          me={me}
          coursePage={lesson.coursePage}
          coursePageId={lesson.coursePage.id}
          lessonId={lesson.id}
          user={el.user.id}
          story={true}
          getResults={getResults}
        />
      );
      components.push(item);
      move_statuses.push(true);
    } else if (task.type.toLowerCase() === "newtest") {
      el = lesson.newTests.find((t) => t.id === task.id);
      if (!el) return;

      item = (
        <SingleTest
          key={el.id}
          id={el.id}
          moveNext={moveNext}
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
      move_statuses.push(solved.includes(el.id) ? true : false);
    } else if (task.type.toLowerCase() === "quiz") {
      el = lesson.quizes.find((quiz) => quiz.id === task.id);
      if (!el) return;

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
      move_statuses.push(true);
    } else if (task.type.toLowerCase() === "testpractice") {
      el = lesson.testPractices.find((t) => t.id === task.id);
      if (!el) return;

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
      move_statuses.push(true);
    } else if (task.type.toLowerCase() === "teamquest") {
      el = lesson.teamQuests.find((t) => t.id === task.id);
      if (!el) return;

      item = (
        <TeamQuest
          key={el.id}
          lessonID={lesson.id}
          // getResults={getResults}
          me={me}
          teamQuest={el}
          quizes={lesson.quizes}
          tests={lesson.newTests}
          lesson={lesson}
          story={true}
        />
      );
      components.push(item);
      move_statuses.push(true);
    } else if (task.type.toLowerCase() === "shot") {
      el = lesson.shots.find((shot) => shot.id === task.id);
      if (!el) return;

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
      move_statuses.push(true);
    } else if (task.type.toLowerCase() === "chat") {
      el = lesson.chats.find((chat) => chat.id === task.id);
      if (!el) return;

      item = (
        <Chat
          key={el.id}
          name={el.name}
          isSecret={el.isSecret}
          experience={experience}
          total={total}
          clicks={el.link_clicks}
          me={me}
          getShowArrow={getShowArrow}
          author={lesson.user}
          complexity={el.complexity}
          messages={el.messages}
          id={el.id}
          lessonId={lesson.id}
          story={true}
        />
      );
      components.push(item);
      move_statuses.push(true);
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
      move_statuses.push(true);
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
      move_statuses.push(true);
    } else if (task.type.toLowerCase() === "construction") {
      el = lesson.constructions.find((con) => con.id === task.id);
      if (!el) return;

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
      move_statuses.push(true);
    } else if (task.type.toLowerCase() === "exam") {
      el = lesson.exams.find((con) => con.id === task.id);
      if (!el) return;

      item = <Exam lesson={lesson} me={props.me} exam={el} story={true} />;
      components.push(item);
    } else if (task.type.toLowerCase() === "document") {
      el = lesson.documents.find((con) => con.id === task.id);
      if (!el) return;

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
      move_statuses.push(true);
    } else if (task.type.toLowerCase() === "forum") {
      el = lesson.forum;
      if (!el) return;

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
      move_statuses.push(true);
    } else {
      return;
    }
  });
  const passStep = (num) => {
    props.passStep(num);
  };

  return (
    <Container>
      {me && (
        <Feed
          move_statuses={move_statuses}
          components={components}
          experience={experience}
          total={total}
          next={next}
          number_of_tasks={tasks.length}
          coursePageID={coursePageID}
          coursePageId={coursePageID}
          coursePage={coursePage}
          me={me}
          lesson_structure={lesson.structure.lessonItems}
          openLesson={props.openLesson}
          move={false}
          hasSecret={lesson.hasSecret}
          lesson_number={lesson.number}
          lesson_name={lesson.name}
          lessonID={lesson.id}
          showArrow={showArrow}
          my_result={my_result}
          passStep={passStep}
          lessonId={props.id}
          openSize={lesson.openSize}
        />
      )}
    </Container>
  );
};

export default StoryEx;
