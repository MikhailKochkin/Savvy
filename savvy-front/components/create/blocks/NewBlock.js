import { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "next-i18next";

import CreateNote from "../CreateNote";
import Note from "../../lesson/notes/Note";

import CreateNewTest from "../CreateNewTest";
import SingleTest from "../../lesson/tests/SingleTest";

import CreateQuiz from "../CreateQuiz";
import SingleQuiz from "../../lesson/quizes/SingleQuiz";

const Block = styled.div`
  font-size: 1.5rem;
  margin: 1% 4%;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  padding: 2%;
  margin: 30px 0;
  width: 100%;
`;

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

const NewBlock = (props) => {
  const [type, setType] = useState();
  const [data, setData] = useState(null);
  const [saved, setSaved] = useState(false);
  const getData = (d) => props.getData(d);
  const { t } = useTranslation("lesson");

  const add = () => {
    props.add(props.obj.id, props.obj.index);
  };

  const passUpdated = () => {
    // setSaved(false);
  };

  const { lesson, me } = props;

  const getResult = async (res) => {
    setSaved(true);
    if (res.data.createNote) {
      setType("Note");
      setData(res.data.createNote);
      props.getData(
        res.data.createNote.id,
        res.data.createNote.__typename,
        props.obj.index
      );
    } else if (res.data.createNewTest) {
      setType("NewTest");
      setData(res.data.createNewTest);
      props.getData(
        res.data.createNewTest.id,
        res.data.createNewTest.__typename,
        props.obj.index
      );
    } else if (res.data.createQuiz) {
      setType("Quiz");
      setData(res.data.createQuiz);
      props.getData(
        res.data.createQuiz.id,
        res.data.createQuiz.__typename,
        props.obj.index
      );
    }
  };

  return (
    <Block>
      {/* <div>Index: {props.obj.index}</div>
      <div>ID: {props.obj.id}</div>
      <div>Next: {props.obj.next.true.value}</div> */}
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
          passUpdated={passUpdated}
        />
      )}

      {!saved && type == "NewTest" && (
        <CreateNewTest lessonID={lesson.id} getResult={getResult} />
      )}
      {saved && type == "NewTest" && data && (
        <SingleTest
          id={data.id}
          testID={data.id}
          question={data.question}
          type={data.type}
          answers={data.answers}
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
          getResult={getResult}
          passUpdated={passUpdated}
        />
      )}

      {!saved && type == "Quiz" && (
        <CreateQuiz lessonID={lesson.id} getResult={getResult} />
      )}
      {saved && type == "Quiz" && data && (
        <SingleQuiz
          id={data.id}
          testID={data.id}
          question={data.question}
          type={data.type}
          answers={data.answers}
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
        />
      )}
      {!saved && (
        <>
          <ButtonTwo onClick={(e) => setType("Note")}>
            Добавить заметку
          </ButtonTwo>
          <ButtonTwo onClick={(e) => setType("NewTest")}>
            Добавить тест
          </ButtonTwo>
          <ButtonTwo onClick={(e) => setType("Quiz")}>
            Добавить вопрос
          </ButtonTwo>
        </>
      )}
      {saved && <ButtonTwo onClick={(e) => add()}>Add Block</ButtonTwo>}
    </Block>
  );
};

export default NewBlock;
