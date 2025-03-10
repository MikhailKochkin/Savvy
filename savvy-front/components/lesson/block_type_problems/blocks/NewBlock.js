import { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "next-i18next";

import CreateNote from "../../block_type_notes/CreateNote";
import Note from "../../block_type_notes/Note";

import CreateNewTest from "../../block_type_tests/CreateNewTest";
import SingleTest from "../../block_type_tests/SingleTest";

import CreateQuiz from "../../block_type_quizes/CreateQuiz";
import SingleQuiz from "../../block_type_quizes/SingleQuiz";

import CreateChat from "../../block_type_chats/CreateChat";
import Chat from "../../block_type_chats/Chat";

import Block from "./Block";

const Styles = styled.div`
  font-size: 1.5rem;
  margin: 1% 4%;
  /* border: 1px solid #dee2e6; */
  border-radius: 10px;
  margin: 30px 0;
  width: 100%;
`;

const NewBlock = (props) => {
  const [type, setType] = useState(props.type);
  const [data, setData] = useState(null);
  const [saved, setSaved] = useState(false);
  // const getData = (d) => props.getData(d);
  const { t } = useTranslation("lesson");
  const add = () => {
    props.add(props.obj.id, props.obj.index);
  };
  useEffect(() => {
    setData(props.data);
    setSaved(props.data ? true : false);
  }, [props.data]);

  const { lesson, me, generatedInfo } = props;

  const getOldResult = (type, id) => {
    setSaved(true);
    let newData = null;
    setType(type);
    if (type.toLowerCase() == "note") {
      newData = lesson.notes.find((n) => n.id == id);
    } else if (type.toLowerCase() == "newtest") {
      newData = lesson.newTests.find((n) => n.id == id);
    } else if (type.toLowerCase() == "quiz") {
      newData = lesson.quizes.find((q) => q.id == id);
    } else if (type.toLowerCase() == "chat") {
      newData = lesson.chats.find((ch) => ch.id == id);
    }
    setData((prevData) => {
      return newData;
    });

    // If you still need to pass the data to the parent component
    if (newData) {
      props.getData(newData.id, newData.__typename);
    }
  };

  const getResult = async (res) => {
    setSaved(true);

    let newData = null;

    if (res.data.createNote) {
      setType("Note");
      newData = res.data.createNote;
    } else if (res.data.updateNote) {
      setType("Note");
      newData = res.data.updateNote;
    } else if (res.data.createNewTest) {
      setType("NewTest");
      newData = res.data.createNewTest;
    } else if (res.data.updateNewTest) {
      setType("NewTest");
      newData = res.data.updateNewTest;
    } else if (res.data.createQuiz) {
      setType("Quiz");
      newData = res.data.createQuiz;
    } else if (res.data.updateQuiz) {
      setType("Quiz");
      newData = res.data.updateQuiz;
    } else if (res.data.createChat) {
      setType("Chat");
      newData = res.data.createChat;
    } else if (res.data.updateChat) {
      setType("Chat");
      newData = res.data.updateChat;
    }
    setData((prevData) => {
      return newData;
    });

    // If you still need to pass the data to the parent component
    if (newData) {
      props.getData(newData.id, newData.__typename);
    }
  };

  return (
    <Styles>
      {!saved && type == "Note" && (
        <CreateNote lessonID={lesson.id} getResult={getResult} />
      )}
      {saved && type == "Note" && data && (
        <Note
          text={data.text}
          me={me}
          clicks={data.link_clicks}
          user={lesson.user.id}
          note={data}
          id={data.id}
          complexity={data.complexity}
          lessonID={lesson.id}
          getResult={getResult}
          may_i_edit={true}
        />
      )}
      {type == "Note" && (
        <Block getOldResult={getOldResult} notes={lesson.notes} />
      )}
      {!saved && type == "Chat" && (
        <CreateChat
          lessonID={lesson.id}
          getResult={getResult}
          characters={props.characters}
        />
      )}
      {saved && type == "Chat" && data && (
        <Chat
          messages={data.messages}
          name={data.name}
          me={me}
          type={data.type}
          characters={props.characters}
          clicks={data.link_clicks}
          user={lesson.user.id}
          id={data.id}
          complexity={data.complexity}
          lessonId={lesson.id}
          getResult={getResult}
          library={props.library}
          may_i_edit={true}
        />
      )}
      {type == "Chat" && (
        <Block getOldResult={getOldResult} chats={lesson.chats} />
      )}
      {!saved && type == "NewTest" && (
        <CreateNewTest
          lessonID={lesson.id}
          getResult={getResult}
          generatedInfo={generatedInfo}
        />
      )}
      {saved && type == "NewTest" && data && (
        <SingleTest
          id={data.id}
          testID={data.id}
          question={data.question}
          type={data.type}
          answers={data.answers}
          name={data.name}
          complexTestAnswers={data.complexTestAnswers}
          image={data.image}
          true={data.correct}
          comments={data.comments}
          complexity={data.complexity}
          ifRight={data.ifRight}
          ifWrong={data.ifWrong}
          next={data.next}
          user={data.user.id}
          user_name={data.user}
          me={me}
          lessonID={lesson.id}
          length={Array(data.correct.length).fill(false)}
          getResult={getResult}
          may_i_edit={true}
        />
      )}
      {type == "NewTest" && (
        <Block getOldResult={getOldResult} tests={lesson.newTests} />
      )}
      {!saved && type == "Quiz" && (
        <CreateQuiz
          lessonID={lesson.id}
          getResult={getResult}
          generatedInfo={generatedInfo}
        />
      )}
      {saved && type == "Quiz" && data && (
        <SingleQuiz
          id={data.id}
          quizID={data.id}
          question={data.question}
          type={data.type}
          answer={data.answer}
          answers={data.answers}
          true={data.correct}
          goalType={data.goalType}
          check={data.check}
          characters={props.characters}
          comments={data.comments}
          complexity={data.complexity}
          ifRight={data.ifRight}
          ifWrong={data.ifWrong}
          name={data.name}
          instructorId={data.instructorId}
          isScoringShown={data.isScoringShown}
          image={data.image}
          next={data.next}
          user={data.user.id}
          user_name={data.user}
          author={lesson.user}
          me={me}
          lessonID={lesson.id}
          getResult={getResult}
          may_i_edit={true}
        />
      )}
      {type == "Quiz" && (
        <Block getOldResult={getOldResult} quizes={lesson.quizes} />
      )}
    </Styles>
  );
};

export default NewBlock;
