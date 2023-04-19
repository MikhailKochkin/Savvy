import { useState, useEffect } from "react";
import CreateNewTest from "../create/CreateNewTest";
import SingleTest from "./tests/SingleTest";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

import Block from "./Block";

import CreateQuiz from "../create/CreateQuiz";
import SingleQuiz from "./quizes/SingleQuiz";

import CreateTestBlock from "./testblocks/CreateTestBlock";
import TestPractice from "./testblocks/TB";

import CreateOffer from "./offers/CreateOffer";
import BannerOffer from "./offers/BannerOffer";

import CreateTeamQuest from "./teamQuests/CreateTeamQuest";
import TeamQuest from "./teamQuests/TeamQuest";

import CreateShot from "../create/CreateShot";
import Shots from "./shots/Shots";

import CreateConstructor from "../create/CreateConstructor";

import NewConstructor from "./constructions/NewConstructor";
import SingleConstructor from "./constructions/SingleConstructor";

import CreateTextEditor from "../create/CreateTextEditor";
import TextEditor from "./textEditors/SingleTextEditor";

import CreateProblem from "../create/CreateProblem";
import Problem from "./problems/SingleProblem";

import CreateNote from "../create/CreateNote";
import Note from "./notes/Note";

import CreateChat from "./chat/CreateChat";
import Chat from "./chat/Chat";

import CreateForum from "./forum/CreateForum";
import ChangeForum from "./forum/ChangeForum";
import SingleLesson_MobileMenu from "./SingleLesson_MobileMenu";
import SingleLesson_Menu from "./SingleLesson_Menu";
import CreateDocument from "./documents/CreateDocument";
import renderHTML from "react-render-html";

const ButtonTwo = styled.button`
  background: none;
  padding: 10px 20px;
  border: 2px solid #69696a;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #323334;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  transition: 0.3s;
  &:hover {
    background: #f4f4f4;
  }
`;

const ButtonThree = styled.button`
  background: none;
  padding: 10px 20px;
  border: 2px solid #69696a;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #323334;
  cursor: pointer;
  margin: 30px 0;
  transition: 0.3s;
  &:hover {
    background: #f4f4f4;
  }
`;

const Menu = styled.div`
  border-bottom: 1px solid #adb5bd;
  width: 100%;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const Box = styled.div`
  padding: 20px;
  border: ${(props) =>
    props.isAdded ? "1px solid #adb5bd" : "1px dashed #dee2e6"};
  border-bottom: none;
  width: 60%;
  background: #f8f8f8;
  margin-top: 20px;
  margin-right: 10px;
`;

const Styles = styled.div`
  padding: 20px;
  border: ${(props) =>
    props.isAdded ? "1px solid #adb5bd" : "1px dashed #dee2e6"};
  width: ${(props) => (props.width ? "75vw" : "660px")};
  margin-bottom: 100px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 15px 10px;
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
  const { el, lesson, index, me, el_type, el_id, saved, template } = props;
  const [isSaved, setIsSaved] = useState(saved);
  const [isAdded, setIsAdded] = useState(saved);
  const [updated, setUpdated] = useState(false);
  const { t } = useTranslation("lesson");

  let d;

  if (el.type && el.type.toLowerCase() == "note" && !el.data && !updated) {
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
  } else if (el.type && el.type.toLowerCase() == "construction" && !el.data) {
    d = lesson.constructions.find((n) => n.id == el.id);
  } else if (el.type && el.type.toLowerCase() == "shot" && !el.data) {
    d = lesson.shots.find((n) => n.id == el.id);
  } else if (el.type && el.type.toLowerCase() == "teamquest" && !el.data) {
    d = lesson.teamQuests.find((n) => n.id == el.id);
  } else if (el.type && el.type.toLowerCase() == "offer" && !el.data) {
    d = lesson.offers.find((n) => n.id == el.id);
  } else if (el.data) {
    d = el.data;
  } else {
    d = null;
  }
  const [data, setData] = useState(d);
  const [type, setType] = useState(props.el_type ? props.el_type : "");
  const [idNum, setIdNum] = useState(props.el_id ? props.el_id : "");

  useEffect(() => {
    setData(d);
    if (props.updateTemplate) setType(props.el_type ? props.el_type : "");
  });

  // useEffect(() => {
  //   console.log("type");
  //   setType(props.el_type ? props.el_type : "");
  // }, []);

  const addBlock = (type) => {
    setType(type);
    // console.log("type", type);
  };

  const getResults = (el) => {
    return null;
  };

  const passUpdated = () => {
    setUpdated(true);
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
    }
    setIsSaved(true);
  };
  return (
    <>
      {props.index == 0 && (
        <ButtonThree
          onClick={(e) => {
            props.addPlace(0);
          }}
        >
          {t("add_first")}
        </ButtonThree>
      )}
      {props.comment && <Box>{renderHTML(props.comment)}</Box>}
      {type}
      <Styles
        id={props.id}
        isAdded={isAdded}
        width={
          type.toLowerCase() == "texteditor" ||
          type.toLowerCase() == "construction"
        }
      >
        {!isSaved && (
          <Menu>
            <ButtonTwo onClick={(e) => addBlock("Chat")}>{t("Chat")}</ButtonTwo>
            <ButtonTwo onClick={(e) => addBlock("Note")}>{t("Note")}</ButtonTwo>
            <ButtonTwo onClick={(e) => addBlock("Shot")}>{t("Shot")}</ButtonTwo>
            <ButtonTwo onClick={(e) => addBlock("NewTest")}>
              {t("NewTest")}
            </ButtonTwo>
            <ButtonTwo onClick={(e) => addBlock("Quiz")}>{t("Quiz")}</ButtonTwo>
            <ButtonTwo onClick={(e) => addBlock("TestPractice")}>
              {t("TestPractice")}
            </ButtonTwo>
            <ButtonTwo onClick={(e) => addBlock("Problem")}>
              {t("Problem")}
            </ButtonTwo>
            <ButtonTwo onClick={(e) => addBlock("TextEditor")}>
              {t("TextEditor")}
            </ButtonTwo>
            <ButtonTwo onClick={(e) => addBlock("Construction")}>
              {t("Construction")}
            </ButtonTwo>
            <ButtonTwo onClick={(e) => addBlock("Forum")}>
              {t("Forum")}
            </ButtonTwo>
            <ButtonTwo onClick={(e) => addBlock("addOld")}>
              {t("AddOld")}
            </ButtonTwo>
            <ButtonTwo onClick={(e) => addBlock("TeamQuest")}>
              Team Quest
            </ButtonTwo>
            <ButtonTwo onClick={(e) => addBlock("Offer")}>Offer</ButtonTwo>
          </Menu>
        )}
        {type.toLowerCase() == "note" && (
          <>
            {!isSaved && el.id == undefined && (
              <CreateNote
                lessonID={lesson.id}
                getResult={getResult}
                isSaved={isSaved}
              />
            )}
            {(isSaved || d != null) && data && data.__typename == "Note" && (
              <Note
                text={data.text}
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
                passUpdated={passUpdated}
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
                  userData={[]}
                  story={false}
                  getResult={getResult}
                  passUpdated={passUpdated}
                />
              </>
            )}
          </>
        )}
        {type.toLowerCase() == "problem" && (
          <>
            {!isSaved && el.id == undefined && (
              <CreateProblem
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
                lessonID={lesson.id}
                me={me}
                lesson={lesson}
                miniforum={lesson.miniforums.find((m) => m.value == data.id)}
                getResults={getResults}
                passUpdated={passUpdated}
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
                getResults={getResults}
                testID={data.id}
                author={lesson.user}
                complexity={data.complexity}
                question={data.question}
                answers={data.answers}
                comments={data.comments}
                true={data.correct}
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
                passUpdated={passUpdated}
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
                type={data.type}
                check={data.check}
                me={me}
                ifRight={data.ifRight}
                ifWrong={data.ifWrong}
                hidden={true}
                lessonID={lesson.id}
                quizID={data.id}
                user={data.user.id}
                story={false}
                user_name={data.user}
                author={lesson.user}
                miniforum={lesson.miniforums.find((m) => m.value == el.id)}
                getResults={getResults}
                passUpdated={passUpdated}
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
                getResults={getResults}
                passUpdated={passUpdated}
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
                  getResults={getResults}
                  me={me}
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
                  // getResults={getResults}
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
                getResult={getResult}
                isSaved={isSaved}
              />
            )}
            {(isSaved || d != null) && data && data.__typename == "Chat" && (
              <Chat
                name={data.name}
                me={me}
                author={lesson.user}
                isSecret={data.isSecret}
                user={lesson.user.id}
                messages={data.messages}
                id={data.id}
                lessonId={lesson.id}
                passUpdated={passUpdated}
                getResult={getResult}
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
                    textEditor={data}
                    me={me}
                    story={false}
                    lessonID={lesson.id}
                    getResults={getResults}
                    getResult={getResult}
                    passUpdated={passUpdated}
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
                      getResults={getResults}
                      construction={data}
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
                      me={me}
                      story={false}
                      getResults={getResults}
                      getResult={getResult}
                      passUpdated={passUpdated}
                    />
                  )}
                </>
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

        <Buttons>
          <div className="first">
            {" "}
            <ButtonTwo
              onClick={(e) => {
                if (confirm("Are you sure?")) {
                  props.remove(idNum);
                }
              }}
            >
              {t("remove_block")}
            </ButtonTwo>
          </div>
          {isSaved && (
            <div>
              <ButtonTwo
                onClick={(e) => {
                  props.addPlace(idNum);
                }}
              >
                {t("new_block")}
              </ButtonTwo>
            </div>
          )}
        </Buttons>
      </Styles>
    </>
  );
};

export default LessonBlock;
