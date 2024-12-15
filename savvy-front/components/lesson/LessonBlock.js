import { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Block from "./block_type_problems/blocks/Block";
import CommentSection from "./lesson_management/CommentSection";

import CreateNewTest from "./block_type_tests/CreateNewTest";
import SingleTest from "./block_type_tests/SingleTest";

import CreateQuiz from "./block_type_quizes/CreateQuiz";
import SingleQuiz from "./block_type_quizes/SingleQuiz";

import CreateTestBlock from "./block_type_testblocks/CreateTestBlock";
import TestPractice from "./block_type_testblocks/TB";

import CreateOffer from "./block_type_offers/CreateOffer";
import BannerOffer from "./block_type_offers/BannerOffer";

import CreateTeamQuest from "./block_type_teamQuests/CreateTeamQuest";
import TeamQuest from "./block_type_teamQuests/TeamQuest";

import CreateShot from "./block_type_shots/CreateShot";
import Shots from "./block_type_shots/Shots";

import CreateConstructor from "./block_type_constructions/CreateConstructor";
import NewConstructor from "./block_type_constructions/NewConstructor";
import SingleConstructor from "./block_type_constructions/archive/SingleConstructor";

import CreateTextEditor from "./block_type_textEditors/CreateTextEditor";
import TextEditor from "./block_type_textEditors/SingleTextEditor";

import CreateProblem from "./block_type_problems/CreateProblem";
import Problem from "./block_type_problems/SingleProblem";

import CreateNote from "./block_type_notes/CreateNote";
import Note from "./block_type_notes/Note";

import CreateChat from "./block_type_chats/CreateChat";
import Chat from "./block_type_chats/Chat";

import CreateProcessManager from "./block_type_processManager/CreateProcessManager";
import ProcessManager from "./block_type_processManager/ProcessManager";

import CreateForum from "./block_type_forum/CreateForum";
import ChangeForum from "./block_type_forum/ChangeForum";
import CreateDocument from "./block_type_documents/CreateDocument";
import Document from "./block_type_documents/Document";
import { SecondaryButton, SecondaryMenuButton } from "./styles/DevPageStyles";

const Menu = styled.div`
  border-bottom: 1px solid #adb5bd;
  width: 100%;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const Box = styled.div`
  padding: 20px;
  border: ${(props) =>
    props.isAdded ? "2px solid #adb5bd" : "2px dashed #2274A5"};
  // border-bottom: none;
  width: 60%;
  background: #f8f8f8;
  margin: 20px 0;
  margin-right: 10px;
`;

const Styles = styled.div`
  padding: 20px;
  border: ${(props) =>
    props.isAdded ? "2px solid #F1F1F1" : "2px dashed #F1F1F1"};
  width: ${(props) => (props.width ? "75vw" : "660px")};
  margin-bottom: 100px;
  margin-top: 20px;
  margin-right: 10px;
  border-radius: 20px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 25px 10px;
  border-top: 1px solid #adb5bd;
  div {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  div.first {
    border-right: 1px solid #adb5bd;
  }
`;

const LessonBlock = (props) => {
  const {
    el,
    lesson,
    index,
    me,
    el_type,
    el_id,
    saved,
    lessonData,
    initial_data,
    simulationStory,
  } = props;
  const [isSaved, setIsSaved] = useState(saved);
  const [isAdded, setIsAdded] = useState(saved);
  const [updated, setUpdated] = useState(false);
  const { t } = useTranslation("lesson");

  let d;

  if (el.type && el.type.toLowerCase() == "note" && !el.data) {
    d = lesson.notes.find((n) => n.id == el.id);
  } else if (el.type && el.type.toLowerCase() == "newtest" && !el.data) {
    d = lesson.newTests.find((n) => n.id == el.id);
  } else if (el.type && el.type.toLowerCase() == "quiz" && !el.data) {
    d = lesson.quizes.find((n) => n.id == el.id);
  } else if (el.type && el.type.toLowerCase() == "testpractice" && !el.data) {
    d = lesson.testPractices.find((n) => n.id == el.id);
  } else if (el.type && el.type.toLowerCase() == "chat" && !el.data) {
    d = lesson.chats.find((n) => n.id == el.id);
  } else if (el.type && el.type.toLowerCase() == "texteditor" && !el.data) {
    d = lesson.texteditors.find((n) => n.id == el.id);
  } else if (el.type && el.type.toLowerCase() == "problem" && !el.data) {
    d = lesson.problems.find((n) => n.id == el.id);
  } else if (el.type && el.type.toLowerCase() == "forum" && !el.data) {
    d = lesson.forum;
  } else if (el.type && el.type.toLowerCase() == "document" && !el.data) {
    d = lesson.documents.find((n) => n.id == el.id);
  } else if (el.type && el.type.toLowerCase() == "construction" && !el.data) {
    d = lesson.constructions.find((n) => n.id == el.id);
  } else if (el.type && el.type.toLowerCase() == "shot" && !el.data) {
    d = lesson.shots.find((n) => n.id == el.id);
  } else if (el.type && el.type.toLowerCase() == "teamquest" && !el.data) {
    d = lesson.teamQuests.find((n) => n.id == el.id);
  } else if (el.type && el.type.toLowerCase() == "offer" && !el.data) {
    d = lesson.offers.find((n) => n.id == el.id);
  } else if (el.type && el.type.toLowerCase() == "processmanager" && !el.data) {
    d = lesson.processManagers.find((n) => n.id == el.id);
  } else if (el.data) {
    d = el.data;
  } else {
    d = null;
  }
  const [data, setData] = useState(d);
  const [type, setType] = useState(
    props.el_type
      ? props.el_type
      : props.initial_data?.format
      ? props.initial_data?.format
      : ""
  );
  const [idNum, setIdNum] = useState(props.el_id ? props.el_id : "");

  useEffect(() => {
    setData(d);
    if (props.updateTemplate) setType(props.el_type ? props.el_type : "");
  });

  useEffect(() => {
    if (props.initial_data?.format) {
      setType(props.initial_data?.format);
    }
  }, [props.initial_data]);

  const addBlock = (type) => {
    setType(type);
  };

  const getOldResult = (name, value, i) => {
    setType(name);
    setIdNum(value);
    props.addToLesson(value, index, name);
  };

  const getResult = async (res) => {
    if (res.data.createNote) {
      setType("Note");
      setIdNum(res.data.createNote.id);
      props.addToLesson(
        res.data.createNote.id,
        index,
        "Note",
        res.data.createNote
      );
    } else if (res.data.updateNote) {
      setType("Note");
      setIdNum(res.data.updateNote.id);
      props.addToLesson(
        res.data.updateNote.id,
        index,
        "Note",
        res.data.updateNote
      );
    } else if (res.data.createNewTest) {
      setType("NewTest");
      setIdNum(res.data.createNewTest.id);
      props.addToLesson(
        res.data.createNewTest.id,
        index,
        "NewTest",
        res.data.createNewTest
      );
    } else if (res.data.updateNewTest) {
      setType("NewTest");
      setIdNum(res.data.updateNewTest.id);
      props.addToLesson(
        res.data.updateNewTest.id,
        index,
        "NewTest",
        res.data.updateNewTest
      );
    } else if (res.data.createQuiz) {
      setType("Quiz");
      setIdNum(res.data.createQuiz.id);
      props.addToLesson(
        res.data.createQuiz.id,
        index,
        "Quiz",
        res.data.createQuiz
      );
    } else if (res.data.updateQuiz) {
      setType("Quiz");
      setIdNum(res.data.updateQuiz.id);
      props.addToLesson(
        res.data.updateQuiz.id,
        index,
        "Quiz",
        res.data.updateQuiz
      );
    } else if (res.data.createChat) {
      setIsAdded(true);
      setType("Chat");
      setIdNum(res.data.createChat.id);
      props.addToLesson(
        res.data.createChat.id,
        index,
        "Chat",
        res.data.createChat
      );
    } else if (res.data.updateChat) {
      setIsAdded(true);
      setType("Chat");
      setIdNum(res.data.updateChat.id);
      props.addToLesson(
        res.data.updateChat.id,
        index,
        "Chat",
        res.data.updateChat
      );
    } else if (res.data.updateDocument) {
      setIsAdded(true);
      setType("Document");
      setIdNum(res.data.updateDocument.id);
      props.addToLesson(
        res.data.updateDocument.id,
        index,
        "Document",
        res.data.updateDocument
      );
    } else if (res.data.createOffer) {
      setIsAdded(true);
      setType("Offer");
      setIdNum(res.data.createOffer.id);
      props.addToLesson(
        res.data.createOffer.id,
        index,
        "Offer",
        res.data.createOffer
      );
    } else if (res.data.updateOffer) {
      setIsAdded(true);
      setType("Offer");
      setIdNum(res.data.updateOffer.id);
      props.addToLesson(
        res.data.updateOffer.id,
        index,
        "Offer",
        res.data.updateOffer
      );
    } else if (res.data.createTextEditor) {
      setType("TextEditor");
      setIdNum(res.data.createTextEditor.id);
      props.addToLesson(
        res.data.createTextEditor.id,
        index,
        "TextEditor",
        res.data.createTextEditor
      );
    } else if (res.data.updateTextEditor) {
      setIsAdded(true);
      setType("TextEditor");
      setIdNum(res.data.updateTextEditor.id);
      props.addToLesson(
        res.data.updateTextEditor.id,
        index,
        "TextEditor",
        res.data.updateTextEditor
      );
    } else if (res.data.createShot) {
      setType("Shot");
      setIdNum(res.data.createShot.id);
      props.addToLesson(
        res.data.createShot.id,
        index,
        "Shot",
        res.data.createShot
      );
    } else if (res.data.updateShot) {
      setType("Shot");
      setIdNum(res.data.updateShot.id);
      props.addToLesson(
        res.data.updateShot.id,
        index,
        "Shot",
        res.data.updateShot
      );
    } else if (res.data.createProblem) {
      setType("Problem");
      setIdNum(res.data.createProblem.id);
      props.addToLesson(
        res.data.createProblem.id,
        index,
        "Problem",
        res.data.createProblem
      );
    } else if (res.data.createDocument) {
      setType("Document");
      setIdNum(res.data.createDocument.id);
      props.addToLesson(
        res.data.createDocument.id,
        index,
        "Document",
        res.data.createDocument
      );
    } else if (res.data.updateProblem) {
      setType("Problem");
      setIdNum(res.data.updateProblem.id);
      props.addToLesson(
        res.data.updateProblem.id,
        index,
        "Problem",
        res.data.updateProblem
      );
    } else if (res.data.createTestPractice) {
      setType("TestPractice");
      setIdNum(res.data.createTestPractice.id);
      props.addToLesson(
        res.data.createTestPractice.id,
        index,
        "TestPractice",
        res.data.createTestPractice
      );
    } else if (res.data.createForum) {
      setType("Forum");
      setIdNum(res.data.createForum.id);
      props.addToLesson(
        res.data.createForum.id,
        index,
        "Forum",
        res.data.createForum
      );
    } else if (res.data.createConstruction) {
      setIsAdded(true);
      setType("Construction");
      setIdNum(res.data.createConstruction.id);
      props.addToLesson(
        res.data.createConstruction.id,
        index,
        "Construction",
        res.data.createConstruction
      );
    } else if (res.data.createTeamQuest) {
      setType("TeamQuest");
      setIdNum(res.data.createTeamQuest.id);
      props.addToLesson(
        res.data.createTeamQuest.id,
        index,
        "TeamQuest",
        res.data.createTeamQuest
      );
    } else if (res.data.updateTeamQuest) {
      setType("TeamQuest");
      setIdNum(res.data.updateTeamQuest.id);
      props.addToLesson(
        res.data.updateTeamQuest.id,
        index,
        "Problem",
        res.data.updateTeamQuest
      );
    } else if (res.data.createProcessManager) {
      setType("ProcessManager");
      setIdNum(res.data.createProcessManager.id);
      props.addToLesson(
        res.data.createProcessManager.id,
        index,
        "ProcessManager",
        res.data.createProcessManager
      );
    } else if (res.data.updateProcessManager) {
      setType("ProcessManager");
      setIdNum(res.data.updateProcessManager.id);
      props.addToLesson(
        res.data.updateProcessManager.id,
        index,
        "ProcessManager",
        res.data.updateProcessManager
      );
    }
    setIsSaved(true);
  };

  let i_am_author = false;
  if (lesson.user.id == me.id) {
    i_am_author = true;
  } else if (me.permissions.includes("ADMIN")) {
    i_am_author = true;
  }

  const passGeneratedData = (data) => {
    props.addGeneratedPlace(idNum, data);
  };
  return (
    <>
      {props.index == 0 && (
        <SecondaryButton
          onClick={(e) => {
            props.addPlace(0);
          }}
        >
          {t("add_first")}
        </SecondaryButton>
      )}
      {props.comment && <Box>{parse(props.comment)}</Box>}
      <Styles
        id={props.id}
        isAdded={isAdded}
        width={
          type.toLowerCase() == "texteditor" ||
          type.toLowerCase() == "construction" ||
          type.toLowerCase() == "problem" ||
          type.toLowerCase() == "processmanager"
        }
      >
        {!isSaved && (
          <Menu>
            <SecondaryMenuButton
              active={type.toLowerCase() == "chat"}
              onClick={(e) => addBlock("Chat")}
            >
              {t("Chat")}
            </SecondaryMenuButton>
            <SecondaryMenuButton
              active={type.toLowerCase() == "note"}
              onClick={(e) => addBlock("Note")}
            >
              {t("Note")}
            </SecondaryMenuButton>
            <SecondaryMenuButton
              active={type.toLowerCase() == "shot"}
              onClick={(e) => addBlock("Shot")}
            >
              {t("Shot")}
            </SecondaryMenuButton>
            <SecondaryMenuButton
              active={type.toLowerCase() == "newtest"}
              onClick={(e) => addBlock("NewTest")}
            >
              {t("NewTest")}
            </SecondaryMenuButton>
            <SecondaryMenuButton
              active={type.toLowerCase() == "quiz"}
              onClick={(e) => addBlock("Quiz")}
            >
              {t("Quiz")}
            </SecondaryMenuButton>
            <SecondaryMenuButton
              active={type.toLowerCase() == "testpractice"}
              onClick={(e) => addBlock("TestPractice")}
            >
              {t("TestPractice")}
            </SecondaryMenuButton>
            <SecondaryMenuButton
              active={type.toLowerCase() == "problem"}
              onClick={(e) => addBlock("Problem")}
            >
              {t("Problem")}
            </SecondaryMenuButton>
            <SecondaryMenuButton
              active={type.toLowerCase() == "texteditor"}
              onClick={(e) => addBlock("TextEditor")}
            >
              {t("TextEditor")}
            </SecondaryMenuButton>
            <SecondaryMenuButton
              active={type.toLowerCase() == "construction"}
              onClick={(e) => addBlock("Construction")}
            >
              {t("Construction")}
            </SecondaryMenuButton>
            <SecondaryMenuButton
              active={type.toLowerCase() == "processManager"}
              onClick={(e) => addBlock("ProcessManager")}
            >
              Process Manager
            </SecondaryMenuButton>
            <SecondaryMenuButton
              active={type.toLowerCase() == "document"}
              onClick={(e) => addBlock("Document")}
            >
              {t("writing")}
            </SecondaryMenuButton>
            <SecondaryMenuButton
              active={type.toLowerCase() == "forum"}
              onClick={(e) => addBlock("Forum")}
            >
              {t("Forum")}
            </SecondaryMenuButton>
            <SecondaryMenuButton onClick={(e) => addBlock("addOld")}>
              {t("AddOld")}
            </SecondaryMenuButton>
            {/* <SecondaryMenuButton
              active={type.toLowerCase() == "teamquest"}
              onClick={(e) => addBlock("TeamQuest")}
            >
              Team Quest
            </SecondaryMenuButton> */}
            {/* <SecondaryMenuButton onClick={(e) => addBlock("Offer")}>
              Offer
            </SecondaryMenuButton> */}
          </Menu>
        )}
        {type.toLowerCase() == "note" && (
          <>
            {!isSaved && el.id == undefined && (
              <CreateNote
                lessonID={lesson.id}
                getResult={getResult}
                isSaved={isSaved}
                simulationStory={simulationStory}
                initial_data={
                  initial_data && initial_data.format == "note"
                    ? initial_data
                    : null
                }
              />
            )}
            {(isSaved || d != null) && data && data.__typename == "Note" && (
              <Note
                text={data.text}
                name={data.name}
                me={me}
                clicks={data.link_clicks}
                user={lesson.user.id}
                note={data}
                author={lesson.user}
                id={data.id}
                complexity={data.complexity}
                lessonID={lesson.id}
                miniforum={lesson.miniforums.find((m) => m.value == data.id)}
                getResult={getResult}
                passGeneratedData={passGeneratedData}
              />
            )}
          </>
        )}
        {type.toLowerCase() == "shot" && (
          <>
            {!isSaved && el.id == undefined && (
              <CreateShot
                lessonID={lesson.id}
                getResult={getResult}
                isSaved={isSaved}
                initial_data={
                  initial_data && initial_data.format == "shot"
                    ? initial_data
                    : null
                }
              />
            )}
            {(isSaved || d != null) && data && data.__typename == "Shot" && (
              <>
                <Shots
                  key={data.id}
                  comments={data.comments}
                  parts={data.parts}
                  shotUser={data.user.id}
                  me={me}
                  shotID={data.id}
                  lessonID={lesson.id}
                  title={data.title}
                  name={data.name}
                  userData={[]}
                  story={false}
                  getResult={getResult}
                />
              </>
            )}
          </>
        )}
        {type.toLowerCase() == "problem" && (
          <>
            {!isSaved && el.id == undefined && (
              <CreateProblem
                simulationStory={simulationStory}
                lessonID={lesson.id}
                getResult={getResult}
                lesson={lesson}
                me={me}
              />
            )}
            {(isSaved || d != null) && data && data.__typename == "Problem" && (
              <Problem
                key={data.id}
                problem={data}
                complexity={data.complexity}
                // context={data.context}
                lessonID={lesson.id}
                name={lesson.name}
                context={lesson.context}
                me={me}
                lesson={lesson}
                miniforum={lesson.miniforums.find((m) => m.value == data.id)}
                getResult={getResult}
              />
            )}
          </>
        )}
        {type.toLowerCase() == "newtest" && (
          <>
            {!isSaved && d == null && (
              <CreateNewTest
                lessonID={lesson.id}
                getResult={getResult}
                isSaved={isSaved}
              />
            )}

            {(isSaved || d != null) && data && data.__typename == "NewTest" && (
              <SingleTest
                key={data.id}
                id={data.id}
                complexTestAnswers={data.complexTestAnswers}
                testID={data.id}
                author={lesson.user}
                context={lesson.context}
                complexity={data.complexity}
                question={data.question}
                answers={data.answers}
                comments={data.comments}
                true={data.correct}
                name={data.name}
                instructorName={data.instructorName}
                image={data.image}
                goal={data.goal}
                user={data.user.id}
                user_name={data.user}
                type={data.type}
                ifRight={data.ifRight}
                ifWrong={data.ifWrong}
                me={me}
                lessonID={lesson.id}
                length={Array(data.correct.length).fill(false)}
                story={false}
                miniforum={lesson.miniforums.find((m) => m.value == el.id)}
                getResult={getResult}
              />
            )}
          </>
        )}
        {type.toLowerCase() == "quiz" && (
          <>
            {!isSaved && d == null && (
              <CreateQuiz
                lessonID={lesson.id}
                getResult={getResult}
                isSaved={isSaved}
              />
            )}
            {(isSaved || d != null) && data && data.__typename == "Quiz" && (
              <SingleQuiz
                key={data.id}
                id={data.id}
                complexity={data.complexity}
                question={data.question}
                answer={data.answer}
                answers={data.answers}
                context={lesson.context}
                isOrderOfAnswersImportant={data.isOrderOfAnswersImportant}
                shouldAnswerSizeMatchSample={data.shouldAnswerSizeMatchSample}
                isScoringShown={data.isScoringShown}
                type={data.type}
                goalType={data.goalType}
                check={data.check}
                me={me}
                ifRight={data.ifRight}
                ifWrong={data.ifWrong}
                name={data.name}
                instructorName={data.instructorName}
                image={data.image}
                hidden={true}
                lesson={lesson}
                lessonID={lesson.id}
                quizID={data.id}
                user={data.user.id}
                story={false}
                user_name={data.user}
                author={lesson.user}
                miniforum={lesson.miniforums.find((m) => m.value == el.id)}
                getResult={getResult}
              />
            )}
          </>
        )}

        {type.toLowerCase() == "offer" && (
          <>
            {!isSaved && d == null && (
              <CreateOffer
                lessonId={lesson.id}
                getResult={getResult}
                isSaved={isSaved}
              />
            )}
            {(isSaved || d != null) && data && data.__typename == "Offer" && (
              <BannerOffer
                key={data.id}
                id={data.id}
                offer={data}
                me={me}
                coursePage={lesson.coursePage}
                coursePageId={lesson.coursePage.id}
                lessonId={lesson.id}
                user={data.user.id}
                story={false}
                updateMode={true}
                getResult={getResult}
              />
            )}
          </>
        )}

        {type.toLowerCase() == "testpractice" && (
          <>
            {!isSaved && d == null && (
              <CreateTestBlock
                lessonId={lesson.id}
                getResult={getResult}
                isSaved={isSaved}
                lesson={lesson}
              />
            )}
            {(isSaved || d != null) &&
              data &&
              data.__typename == "TestPractice" && (
                <TestPractice
                  key={data.id}
                  lessonID={lesson.id}
                  me={me}
                  context={lesson.context}
                  testPractice={data}
                  quizes={lesson.quizes}
                  tests={lesson.newTests}
                  lesson={lesson}
                  story={true}
                />
              )}
          </>
        )}

        {type.toLowerCase() == "teamquest" && (
          <>
            {!isSaved && d == null && (
              <CreateTeamQuest
                lessonId={lesson.id}
                getResult={getResult}
                isSaved={isSaved}
                lesson={lesson}
              />
            )}
            {(isSaved || d != null) &&
              data &&
              data.__typename == "TeamQuest" && (
                <TeamQuest
                  key={data.id}
                  lessonID={lesson.id}
                  me={me}
                  teamQuest={data}
                  quizes={lesson.quizes}
                  tests={lesson.newTests}
                  lesson={lesson}
                  story={true}
                />
              )}
          </>
        )}

        {type.toLowerCase() == "chat" && (
          <>
            {!isSaved && d == null && (
              <CreateChat
                lessonID={lesson.id}
                lessonData={lessonData}
                getResult={getResult}
                isSaved={isSaved}
                me={me}
                prompt={props.prompt}
                simulationStory={simulationStory}
                initial_data={
                  initial_data && initial_data.format == "chat"
                    ? initial_data
                    : null
                }
              />
            )}
            {(isSaved || d != null) && data && data.__typename == "Chat" && (
              <Chat
                name={data.name}
                me={me}
                author={lesson.user}
                isSecret={data.isSecret}
                type={data.type}
                user={lesson.user.id}
                messages={data.messages}
                id={data.id}
                lessonId={lesson.id}
                getResult={getResult}
                library={lesson.notes}
              />
            )}
          </>
        )}
        {type.toLowerCase() == "texteditor" && (
          <>
            {!isSaved && d == null && (
              <CreateTextEditor
                lessonID={lesson.id}
                getResult={getResult}
                isSaved={isSaved}
                simulationStory={simulationStory}
              />
            )}
            {(isSaved || d != null) &&
              data &&
              data.__typename == "TextEditor" && (
                <>
                  <TextEditor
                    key={data.id}
                    id={data.id}
                    text={data.text}
                    complexity={data.complexity}
                    name={data.name}
                    context={data.context}
                    textEditor={data}
                    lesson={lesson}
                    me={me}
                    story={false}
                    lessonID={lesson.id}
                    getResult={getResult}
                  />
                </>
              )}
          </>
        )}
        {type.toLowerCase() == "document" && (
          <>
            {!isSaved && d == null && (
              <CreateDocument
                lessonID={lesson.id}
                getResult={getResult}
                isSaved={isSaved}
              />
            )}
            {(isSaved || d != null) &&
              data &&
              data.__typename == "Document" && (
                <>
                  <Document
                    key={data.id}
                    id={data.id}
                    clauses={data.clauses}
                    complexity={data.complexity}
                    title={data.title}
                    me={me}
                    documentID={data.id}
                    user={lesson.user.id}
                    lessonID={lesson.id}
                  />
                </>
              )}
          </>
        )}
        {type.toLowerCase() == "construction" && (
          <>
            {!isSaved && d == null && (
              <CreateConstructor
                lessonID={lesson.id}
                getResult={getResult}
                isSaved={isSaved}
              />
            )}
            {(isSaved || d != null) &&
              data &&
              data.__typename.toLowerCase() == "construction" && (
                <>
                  {data.elements == null && (
                    <SingleConstructor
                      key={data.id}
                      lessonID={lesson.id}
                      complexity={data.complexity}
                      construction={data}
                      context={data.context}
                      variants={data.variants}
                      me={me}
                      arr={Array(data.answer.length).fill("")}
                    />
                  )}
                  {data.elements !== null && (
                    <NewConstructor
                      key={data.id}
                      lessonID={lesson.id}
                      construction={data}
                      elements={data.elements.elements}
                      complexity={data.complexity}
                      lesson={lesson}
                      me={me}
                      story={false}
                      getResult={getResult}
                    />
                  )}
                </>
              )}
          </>
        )}
        {type.toLowerCase() == "processmanager" && (
          <>
            {!isSaved && d == null && (
              <CreateProcessManager
                lessonId={lesson.id}
                getResult={getResult}
                isSaved={isSaved}
              />
            )}
            {(isSaved || d != null) &&
              data &&
              data.__typename.toLowerCase() == "processmanager" && (
                <ProcessManager
                  key={data.id}
                  id={data.id}
                  processManager={data}
                  me={me}
                  lessonID={lesson.id}
                  getResult={getResult}
                  i_am_author={i_am_author}
                />
              )}
          </>
        )}
        {type.toLowerCase() == "forum" && (
          <>
            {!isSaved && d == null && (
              <CreateForum
                lesson={lesson.id}
                forum={lesson.forum}
                getResult={getResult}
              />
            )}
            {(isSaved || d != null) && data && data.__typename == "Forum" && (
              <ChangeForum lesson={lesson.id} forum={lesson.forum} />
            )}
          </>
        )}
        {type.toLowerCase() == "addold" && (
          <>
            <Block
              // plus={plus}
              // minus={minus}
              getOldResult={getOldResult}
              // key={i}
              // i={i}
              // value={el}
              tests={lesson.newTests}
              quizes={lesson.quizes}
              notes={lesson.notes}
              chats={lesson.chats}
              shots={lesson.shots}
              offers={lesson.offers}
              problems={lesson.problems}
              texteditors={lesson.texteditors}
              constructions={lesson.constructions}
              testPractices={lesson.testPractices}
              exams={lesson.exams}
              documents={lesson.documents}
              forum={lesson.forum}
            />
          </>
        )}

        <CommentSection
          comments={lesson.comments.filter((c) => c.blockId == el.id)}
          lessonId={lesson.id}
          blockId={el.id}
          me={me}
        />

        <Buttons>
          <div className="first">
            {" "}
            <SecondaryButton
              onClick={(e) => {
                if (confirm("Are you sure?")) {
                  props.remove(idNum);
                }
              }}
            >
              {t("remove_block")}
            </SecondaryButton>
          </div>
          {isSaved && (
            <div>
              <SecondaryButton
                onClick={(e) => {
                  props.addPlace(idNum);
                }}
              >
                {t("new_block")}
              </SecondaryButton>
            </div>
          )}
        </Buttons>
      </Styles>
    </>
  );
};

export default LessonBlock;
