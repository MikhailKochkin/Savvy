import { useState } from "react";
import CreateNewTest from "../create/CreateNewTest";
import SingleTest from "./tests/SingleTest";
import styled from "styled-components";

import CreateQuiz from "../create/CreateQuiz";
import CreateTestBlock from "./testblocks/CreateTestBlock";
import CreateShot from "../create/CreateShot";
import CreateConstructor from "../create/CreateConstructor";
import CreateTextEditor from "../create/CreateTextEditor";
import CreateProblem from "../create/CreateProblem";
import CreateNote from "../create/CreateNote";
import Note from "./notes/Note";

import CreateChat from "./chat/CreateChat";
import ChangeForum from "./forum/ChangeForum";
import SingleLesson_MobileMenu from "./SingleLesson_MobileMenu";
import SingleLesson_Menu from "./SingleLesson_Menu";
import CreateDocument from "./documents/CreateDocument";

const Styles = styled.div`
  border: 1px solid lightgrey;
  margin-bottom: 10px;
`;

const LessonBlock = (props) => {
  const { el, lesson, index, me, el_type, el_id, d } = props;

  const [saved, setSaved] = useState(false);
  const [data, setData] = useState(d);
  const [type, setType] = useState(props.type ? props.type : "");
  const [idNum, setIdNum] = useState(props.el_id ? props.el_id : "");

  const getResult = (res) => {
    console.log("res", res);
    if (res.data.createNote) {
      setData(res.data.createNote);
      setType("Note");
      setIdNum(res.data.createNote.id);
    } else if (res.data.createNewTest) {
      setData(res.data.createNewTest);
      setType("NewTest");
      setIdNum(res.data.createNewTest.id);
    }
    setSaved(true);
  };
  const isSaved = () => {};
  return (
    <Styles id={props.id}>
      {console.log("data", data.__typename)}
      {console.log("el.type", el.type)}
      {el.type == "Note" && (
        <>
          {!saved && d == null && (
            <CreateNote
              lessonID={lesson.id}
              getResult={getResult}
              isSaved={isSaved}
            />
          )}
          {(saved || d != null) && data.__typename == "Note" && (
            <Note
              text={data.text}
              me={me}
              clicks={data.link_clicks}
              user={lesson.user.id}
              note={data}
              id={data.id}
              complexity={data.complexity}
              lessonID={lesson.id}
            />
          )}
        </>
      )}
      {el.type == "NewTest" && <CreateNewTest lessonID={lesson.id} /> && (
        <>
          {!saved && d == null && data.__typename == "NewTest" && (
            <CreateNewTest
              lessonID={lesson.id}
              getResult={getResult}
              isSaved={isSaved}
            />
          )}

          {(saved || d != null) && (
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
            />
          )}
        </>
      )}
      {el == "quiz" && <CreateQuiz lessonID={lesson.id} />}
      <button onClick={(e) => props.remove(idNum)}>Remove</button>
      <button onClick={(e) => props.addToLesson(type, idNum, id)}>
        Добавить в урок
      </button>
      <button onClick={(e) => props.addPlace(idNum)}>
        Добавить элемент после этого
      </button>
    </Styles>
  );
};

export default LessonBlock;
