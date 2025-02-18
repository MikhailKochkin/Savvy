import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

import Note from "./block_type_notes/Note";
import BannerOffer from "./block_type_offers/BannerOffer";
import Shots from "./block_type_shots/Shots";
import SingleTest from "./block_type_tests/SingleTest";
import Chat from "./block_type_chats/Chat";
import SingleQuiz from "./block_type_quizes/SingleQuiz";
import SingleProblem from "./block_type_problems/SingleProblem";
import SingleTextEditor from "./block_type_textEditors/SingleTextEditor";
import SingleConstructor from "./block_type_constructions/archive/SingleConstructor";
import NewConstructor from "./block_type_constructions/NewConstructor";
import TeamQuest from "./block_type_teamQuests/TeamQuest";
import Forum from "./block_type_forum/Forum";
import Document from "./block_type_documents/Document";
import Feed from "./Feed";
import TestPractice from "./block_type_testblocks/TB";

const LESSON_RESULTS_QUERY = gql`
  query LESSON_RESULTS_QUERY($lessonId: String!, $studentId: String!) {
    lessonResults(lessonId: $lessonId, studentId: $studentId) {
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

const StoryEx = (props) => {
  const { tasks, me, lesson, coursePageId, coursePage, context } = props;
  const [experience, setExperience] = useState(0); // User's experience points
  const [textToBeTranslated, setTextToBeTranslated] = useState(""); // Text selected for translation
  const [solved, setSolved] = useState([]); // List of solved task IDs
  const total = props.lesson.totalPoints; // Total points for the lesson

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

  const passTextToBeTranslated = (text) => {
    setTextToBeTranslated(text);
  };

  // 2. Generate a dynamic query

  // 1. Function to handle the "next" button visibility
  // It adds the task ID to the solved array when completed
  // This works the following way:
  // 1.1 We have two arrays: solved (state) and move_statuses
  // 1.2 Solved has the ids of all the blocks the user has worked with already. Solved is updated every time a block is completed.
  // 1.3 Move_statuses has the boolean value for every block that determines if the next arrow button should be shown. Move_statuses is created on page load.
  // 1.4. Once the block is completed its id is passed to the solved array
  // 1.5. Then the function checks if current block's id is in the solved array. If yes, the next arrow is shown

  const moveNext = (id) => {
    if (!solved.includes(id)) {
      setSolved((prevSolved) => [...prevSolved, id]);
    }
  };

  // 5.  Fetch lesson results for the current user
  const [
    fetchQuery,
    { loading: stats_loading, error: stats_error, data: stats_data },
  ] = useLazyQuery(LESSON_RESULTS_QUERY, {
    variables: {
      lessonId: props.id,
      studentId: me.id,
    },
    fetchPolicy: "no-cache", // Use cached data first, then fetch from the network
    // nextFetchPolicy: "cache-first", // Use cached data for subsequent queries
  });

  useEffect(() => {
    const fetchLessonResults = async () => {
      try {
        const response = await fetchQuery({
          variables: {
            lessonId: props.id,
            userId: me.id,
          },
        });
        const data = await response.json();
        // setLoading(false);
      } catch (error) {
        // setError(error.message);
        // setLoading(false);
      }
    };

    if (me) {
      fetchLessonResults();
    }
  }, [props.id, me]);

  // Find the lesson result with the highest progress value for the current user
  const findNewestLessonResult = (stats_data, lesson) => {
    // Check if stats_data is valid and contains lesson results
    if (
      !stats_data ||
      !stats_data.lessonResults ||
      stats_data.lessonResults.length === 0
    ) {
      return null; // Return null if no valid lesson results are found
    }

    // Find the newest lesson result based on the updatedAt property
    const newestResult = stats_data.lessonResults.reduce((prev, current) => {
      const prevUpdatedAt = new Date(prev.updatedAt);
      const currentUpdatedAt = new Date(current.updatedAt);
      // Compare the update dates to find the newest result
      return prevUpdatedAt > currentUpdatedAt ? prev : current;
    });

    // If the newest result's progress equals the total number of lesson items (meaning lesson was finished), set my_result to null
    if (newestResult.progress === lesson.structure.lessonItems.length) {
      return null; // Start over the lesson
    }

    // Otherwise, return the newest lesson result
    return newestResult;
  };

  // Usage
  let my_result = findNewestLessonResult(stats_data, lesson);

  if (stats_error) return <p>{stats_error}</p>;

  // 6. Now, my_result should contain the item with the highest progress value that is not equal to maxProgress, or null if no such item exists.
  // Now we build the structure of the lesson

  let components = [];
  let move_statuses = [];
  let updatedTasks = [...tasks];
  let updatedStructure = [...lesson.structure.lessonItems];
  if (
    !props.i_am_student &&
    !props.i_am_author &&
    coursePage?.courseType === "FORMONEY"
  ) {
    // Determine the middle index
    let middleIndex = Math.floor(updatedTasks.length / 2);

    // Create the new object to be inserted
    let newObject = { id: "offer_id", type: "Offer" };

    // Insert the new object into the middle of the array
    updatedTasks.splice(middleIndex, 0, newObject);
    updatedStructure.splice(middleIndex, 0, newObject);
  }

  const populateLessonStructure = (items) => {
    const updatedItems = items.map((item) => {
      let content;
      if (item.type === "Chat") {
        content = lesson.chats
          .find((chat) => chat.id === item.id)
          ?.messages.messagesList.map((message) => message.text)
          .join(" ");
      } else if (item.type === "Note") {
        content = lesson.notes.find((note) => note.id === item.id)?.text;
      } else if (item.type === "Problem") {
        content = lesson.problems.find(
          (problem) => problem.id === item.id
        ).text;
      } else if (item.type === "TextEditor") {
        content = lesson.textEditors.find(
          (textEditor) => textEditor.id === item.id
        ).text;
      } else if (item.type === "Shot") {
        content = "";
      } else if (item.type === "Construction") {
        content = "";
      } else if (item.type === "Forum") {
        content = lesson.forum.text;
      } else if (item.type === "Quiz") {
        content = lesson.quizes.find((quiz) => quiz.id === item.id).question;
      } else if (item.type === "NewTest") {
        content = lesson.newTests.find((newTest) => newTest.id === item.id)
          .question[0];
      }
      return {
        type: item.type,
        content: content,
      };
    });
    return updatedItems;
  };

  updatedTasks.map((task) => {
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
          instructorName={el.instructorName}
          story={true}
          note={el}
          clicks={el.link_clicks}
          complexity={el.complexity}
          miniforum={null}
        />
      );
      components.push(item);
      move_statuses.push(true);
    } else if (task.type.toLowerCase() === "offer") {
      // el = lesson.offers.find((t) => t.id === task.id);
      item = (
        <BannerOffer
          key={"offer_id"}
          id={"offer_id"}
          // offer={el}
          me={me}
          coursePage={lesson.coursePage}
          // coursePageId={lesson.coursePage.id}
          // lessonId={lesson.id}
          // user={el.user.id}
          // story={true}
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
          context={context}
          lessonID={lesson.id}
          length={Array(el.correct.length).fill(false)}
          story={true}
          miniforum={null}
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
          isOrderOfAnswersImportant={el.isOrderOfAnswersImportant}
          shouldAnswerSizeMatchSample={el.shouldAnswerSizeMatchSample}
          check={el.check}
          jsonStoryString={JSON.stringify(
            lesson.structure
              ? populateLessonStructure(lesson.structure?.lessonItems)
              : []
          )}
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
          context={context}
          user_name={el.user}
          author={lesson.user}
          miniforum={null}
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
          context={context}
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
          type={el.type}
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
      move_statuses.push(
        solved.includes(el.id) || el.type.toLowerCase() == "dynamicchat"
          ? true
          : false
      );
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
          jsonStoryString={JSON.stringify(
            lesson.structure
              ? populateLessonStructure(lesson.structure?.lessonItems)
              : []
          )}
          // context={el.context}
          story={true}
          lesson={lesson}
          author={lesson.user}
          moveNext={moveNext}
          context={context}
        />
      );
      components.push(item);
      move_statuses.push(solved.includes(el.id) ? true : false);
    } else if (task.type.toLowerCase() === "texteditor") {
      el = lesson.textEditors.find((texteditor) => texteditor.id === task.id);
      item = (
        <SingleTextEditor
          key={el.id}
          id={el.id}
          lessonID={lesson.id}
          text={el.text}
          context={context}
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
            lesson={lesson}
            construction={el}
            complexity={el.complexity}
            me={me}
            context={el.context}
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

  let previousStories = [];
  if (lesson.coursePage.lessons) {
    lesson.coursePage.lessons.map((other_lesson) => {
      if (other_lesson.number < lesson.number) {
        previousStories.push(other_lesson.story);
      }
    });
  }
  return (
    <Container>
      {me && (
        <Feed
          move_statuses={move_statuses}
          components={components}
          // components={[]}
          experience={experience}
          total={total}
          next={next}
          step={props.step}
          number_of_tasks={updatedTasks.length}
          coursePageID={coursePageId}
          coursePageId={coursePageId}
          coursePage={coursePage}
          me={me}
          lesson_structure={updatedStructure}
          openLesson={props.openLesson}
          move={false}
          // notes={lesson.notes}
          // chats={lesson.chats}
          openSize={props.openSize}
          hasSecret={false}
          lesson_number={lesson.number}
          lesson_name={lesson.name}
          lessonID={lesson.id}
          my_result={my_result}
          passStep={passStep}
          lessonId={props.id}
          lesson={lesson}
          i_am_author={props.i_am_author}
          i_am_student={props.i_am_student}
          is_analytics_page_open={props.is_analytics_page_open}
          is_dev_page_open={props.is_dev_page_open}
          stats_data={stats_data}
          textToBeTranslated={textToBeTranslated}
          authSource={props.authSource}
          embedded={props.embedded}
          story={true}
        />
      )}
    </Container>
  );
};

export default StoryEx;
