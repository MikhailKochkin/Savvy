import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { TailSpin } from "react-loader-spinner";

import DemoFeed from "./DemoFeed";
import Note from "../lesson/block_type_notes/Note";
import Shots from "../lesson/block_type_shots/Shots";
import SingleTest from "../lesson/block_type_tests/SingleTest";
import Chat from "../lesson/block_type_chats/Chat";
import SingleQuiz from "../lesson/block_type_quizes/SingleQuiz";
import SingleProblem from "../lesson/block_type_problems/SingleProblem";
import SingleTextEditor from "../lesson/block_type_textEditors/SingleTextEditor";
import SingleConstructor from "../lesson/block_type_constructions/archive/SingleConstructor";
import NewConstructor from "../lesson/block_type_constructions/NewConstructor";
import DemoSignUp from "./DemoSignUp";
import Forum from "../lesson/block_type_forum/Forum";
import Document from "../lesson/block_type_documents/Document";
import TestPractice from "../lesson/block_type_testblocks/TB";
import LessonData from "../stats/DemoLessonData";

const LESSON_RESULTS_QUERY = gql`
  query LESSON_RESULTS_QUERY($lessonId: String!, $userId: String!) {
    lessonResults(lessonId: $lessonId, userId: $userId) {
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

const StatsColumn = styled.div`
  width: 60%;
  min-width: 1100px;
`;

const emily = {
  id: "clndce1s4005wyn0xgb40p0vm",
  email: "emily@besavvy.app",
  name: "Emily",
  surname: "Thompson",
  permissions: ["USER"],
  tags: [],
  image: null,
  work: null,
  score: 0,
  description: null,
  teams: [],
  myTeams: [],
  certificates: [],
  courseVisits: [
    {
      id: "clndcefez005yyn0xt69au466",
      reminders: [],
      coursePage: {
        id: "ck77iltf301370755hjoa4fnp",
      },
    },
    {
      id: "clne86oe7000oxs04m2kps78v",
      reminders: [],
      coursePage: {
        id: "clmusi4wx0000xsg122vc7a9c",
      },
    },
  ],
  teacherFeedback: [],
  level: {
    id: "clndce21m005xyn0x7gys2h8l",
    level: "2.27212222211",
  },
  studentFeedback: [],
  new_subjects: [
    {
      id: "ck77iltf301370755hjoa4fnp",
    },
    {
      id: "clmusi4wx0000xsg122vc7a9c",
    },
  ],
  company: null,
  status: "LAWYER",
  lessonResults: [
    {
      id: "clndcfh5v005zyn0xb0e5jjhg",
    },
    {
      id: "clne7hhh60028tp0x2ixidb1h",
    },
  ],
  orders: [],
  uni: null,
  coursePages: [],
  co_coursePages: [],
  lessons: [],
};

const result = [
  {
    checked: false,
    createdAt: "2023-10-06T06:08:59.322Z",
    id: "clne7hhh60028tp0x2ixidb1h",
    lesson: {
      id: "clmz0cqak00720t0xpltjg7wf",
      name: "M&A simulator",
      number: 1,
      structure: {
        lessonItems: [
          { id: "clne76o010026tp0xos4hpgd1", type: "Chat" },
          { id: "clne77p2u0027tp0xp667wcvm", type: "Chat" },
          { id: "clmz0uedy00740t0xlu0gtclo", type: "Chat" },
          { id: "clmz1af5k00750t0x32wyqctk", type: "Note" },
          { id: "clmz4bzw200770t0xuu0b1d8q", type: "Chat" },
          { id: "clmz4ocl2007e0t0xoyuiz0kd", type: "Problem" },
          { id: "clmz6ai8j00820t0xrodv0jsh", type: "Problem" },
          { id: "cln0n3i6q000qxs4p2fbpcvpy", type: "NewTest" },
          { id: "cln0n5f25000sxs4pikeu0wiy", type: "NewTest" },
          { id: "clmz6eai600830t0xe1nboluw", type: "Chat" },
          { id: "clmz78elv00840t0x30tybjs9", type: "TextEditor" },
          { id: "clmz7g57k008c0t0xu06q74z4", type: "Chat" },
          { id: "clmz7tf41008w0t0xmn7fluav", type: "Construction" },
          { id: "clmz81sh1009i0t0xx4hjxfpf", type: "Forum" },
        ],
      },
      type: "STORY",
      __typename: "Lesson",
    },
    progress: 14,
    student: {
      email: "emily@besavvy.app",
      id: "clndce1s4005wyn0xgb40p0vm",
      __typename: "User",
    },
    updatedAt: "2023-10-06T06:26:14.243Z",
    visitsNumber: 1,
    __typename: "LessonResult",
  },
];

const StoryEx = (props) => {
  const { tasks, me, lesson, next, coursePageID } = props;
  const [experience, setExperience] = useState(0);
  const [textToBeTranslated, setTextToBeTranslated] = useState(""); // Text selected for translation
  const [solved, setSolved] = useState([]); // List of solved task IDs

  const total = props.lesson.totalPoints;

  const translateSelectedText = async (text, targetLang) => {
    passTextToBeTranslated(text);
  };

  // 0. Translation functionality

  const handleSelection = useCallback(() => {
    const selection = window.getSelection().toString();
    if (selection && selection !== prevSelection.current) {
      translateSelectedText(selection, "es");
      prevSelection.current = selection;
    }
  }, [translateSelectedText]);

  // Event listener for text selection
  useEffect(() => {
    document.addEventListener("mouseup", handleSelection);
    return () => {
      document.removeEventListener("mouseup", handleSelection);
    };
  }, [handleSelection]);

  const prevSelection = useRef("");

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
        <TailSpin
          height="80"
          width="80"
          color="#2E80EC"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </Progress>
    );

  let my_result =
    stats_data && stats_data.lessonResults.length > 0
      ? stats_data.lessonResults.reduce((prev, current) =>
          prev.progress > current.progress ? prev : current
        )
      : [];

  let components = [];
  let move_statuses = [];
  const moveNext = (id) => {
    if (!solved.includes(id)) {
      setSolved((prevSolved) => [...prevSolved, id]);
    }
  };
  const passTextToBeTranslated = (text) => {
    setTextToBeTranslated(text);
  };

  tasks.map((task) => {
    let el;
    let item;
    // Render different components based on the task type
    if (task.type.toLowerCase() === "note") {
      el = lesson.notes.find((note) => note.id === task.id);
      if (!el) return;
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
          testID={el.id}
          author={lesson.user}
          complexity={el.complexity}
          question={el.question}
          answers={el.answers}
          comments={el.comments}
          true={el.correct}
          user={el.user.id}
          instructorName={el.instructorName}
          name={el.name}
          image={el.image}
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
          question={el.question}
          answer={el.answer}
          answers={el.answers}
          type={el.type}
          goalType={el.goalType}
          check={el.check}
          me={me}
          lesson={lesson}
          ifRight={el.ifRight}
          ifWrong={el.ifWrong}
          name={el.name}
          image={el.image}
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
          id={el.id}
          lessonID={lesson.id}
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
          id={el.id}
          lessonID={lesson.id}
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
          id={el.id}
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
          id={el.id}
          name={el.name}
          moveNext={moveNext}
          isSecret={el.isSecret}
          experience={experience}
          total={total}
          clicks={el.link_clicks}
          me={me}
          author={lesson.user}
          complexity={el.complexity}
          messages={el.messages}
          lessonId={lesson.id}
          story={true}
          passTextToBeTranslated={passTextToBeTranslated}
        />
      );
      components.push(item);
      move_statuses.push(solved.includes(el.id) ? true : false);
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
          id={el.id}
          problem={el}
          complexity={el.complexity}
          lessonID={lesson.id}
          me={me}
          story={true}
          lesson={lesson}
          author={lesson.user}
          moveNext={moveNext}
        />
      );
      components.push(item);
      // move_statuses.push(true);
      move_statuses.push(solved.includes(el.id) ? true : false);
    } else if (task.type.toLowerCase() === "texteditor") {
      el = lesson.texteditors.find((texteditor) => texteditor.id === task.id);
      item = (
        <SingleTextEditor
          key={el.id}
          id={el.id}
          lessonID={lesson.id}
          text={el.text}
          complexity={el.complexity}
          lesson={lesson}
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
            id={el.id}
            lessonID={lesson.id}
            construction={el}
            complexity={el.complexity}
            me={me}
            story={true}
            elements={el.elements.elements}
          />
        ) : (
          <SingleConstructor
            key={el.id}
            id={el.id}
            lessonID={lesson.id}
            complexity={el.complexity}
            construction={el}
            variants={el.variants}
            me={me}
            arr={Array(el.answer.length).fill("")}
            story={true}
          />
        );
      components.push(item);
      move_statuses.push(true);
    } else if (task.type.toLowerCase() === "document") {
      el = lesson.documents.find((con) => con.id === task.id);
      if (!el) return;

      item = (
        <Document
          key={el.id}
          id={el.id}
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
        <DemoFeed
          components={[
            ...components,
            <StatsColumn id="demo_lesson_data">
              <LessonData
                index={1}
                lesson={lesson}
                student={emily}
                coursePageID={coursePageID}
                res={result}
              />
            </StatsColumn>,
            <DemoSignUp />,
          ]}
          move_statuses={move_statuses}
          experience={experience}
          total={total}
          next={next}
          step={props.step}
          number_of_tasks={tasks.length}
          coursePageID={coursePageID}
          coursePageId={coursePageID}
          me={me}
          lesson_structure={lesson.structure.lessonItems}
          openLesson={props.openLesson}
          move={false}
          notes={lesson.notes}
          chats={lesson.chats}
          hasSecret={lesson.hasSecret}
          lesson_number={lesson.number}
          lesson_name={lesson.name}
          lessonID={lesson.id}
          my_result={my_result}
          passStep={passStep}
          lessonId={props.id}
          openSize={lesson.openSize}
          lesson={lesson}
          i_am_author={props.i_am_author}
          i_am_student={props.i_am_student}
          stats_data={stats_data}
          textToBeTranslated={textToBeTranslated}
        />
      )}
    </Container>
  );
};

export default StoryEx;
