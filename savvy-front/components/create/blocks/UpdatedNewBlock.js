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

const UpdatedNewBlock = (props) => {
  const [type, setType] = useState(props.type);
  const [data, setData] = useState(null);
  const [saved, setSaved] = useState(false);
  const getData = (d) => props.getData(d);
  const { t } = useTranslation("lesson");
  const add = () => {
    props.add(props.obj.id, props.obj.index);
  };
  const remove = () => {
    props.remove(props.obj.id);
  };

  useEffect(() => {
    setData(props.data);
    setSaved(props.data ? true : false);
  }, [props.data]);

  const passUpdated = () => {
    // setSaved(false);
  };

  const { lesson, me } = props;

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
      setSaved(true);
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
    }

    setData((prevData) => {
      // ... Your logic here
      return newData;
    });

    // If you still need to pass the data to the parent component
    if (newData) {
      props.getData(newData.id, newData.__typename, props.obj.index);
    }
  };

  return (
    <Block>
      <h3>{t("guiding_questions")}</h3>
      {!saved && type == "Note" && (
        <CreateNote lessonID={lesson.id} getResult={getResult} />
      )}
      {saved && type == "Note" && data && (
        <Note
          key={data.id}
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
          key={data.id}
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
          key={data.id}
          id={data.id}
          testID={data.id}
          question={data.question}
          type={data.type}
          answer={data.answer}
          true={data.correct}
          comments={data.comments}
          complexity={data.complexity}
          ifRight={data.ifRight}
          ifWrong={data.ifWrong}
          next={data.next}
          user={data.user.id}
          user_name={data.user}
          me={me}
          getResult={getResult}
          passUpdated={passUpdated}
          lessonID={lesson.id}
        />
      )}
      {!saved && (
        <>
          <ButtonTwo onClick={(e) => setType("Note")}>
            {t("add_note")}{" "}
          </ButtonTwo>
          <ButtonTwo onClick={(e) => setType("NewTest")}>
            {t("add_test")}
          </ButtonTwo>
          <ButtonTwo onClick={(e) => setType("Quiz")}>
            {t("add_quiz")}
          </ButtonTwo>
          <ButtonTwo onClick={(e) => remove()}>Remove</ButtonTwo>
        </>
      )}
      {saved && (
        <>
          <ButtonTwo onClick={(e) => add()}>Add Block</ButtonTwo>
          <ButtonTwo onClick={(e) => remove()}>Remove</ButtonTwo>
        </>
      )}
    </Block>
  );
};

export default UpdatedNewBlock;
