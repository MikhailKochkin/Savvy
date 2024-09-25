import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

import UpdateNote from "./UpdateNote";
import DeleteNote from "../../delete/DeleteNote";
import Longread from "./Longread";
import Email from "./Email";
import MiniNote from "./MiniNote";

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`;

const ArrowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .arrow_box {
    cursor: pointer;
    padding: 10px 2%;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
    &:hover {
      background: #dde1f8;
    }
  }
  .arrow {
    width: 25px;
    height: 25px;
  }
`;

const Note = (props) => {
  const [update, setUpdate] = useState(false);
  const [moved, setMoved] = useState(false);
  const [isRevealed, setIsRevealed] = useState(!props.note.isSecret);
  const { t } = useTranslation("lesson");

  const push = () => {
    if (moved == false) {
      props.getData(props.next ? [true, props.next.true] : [true, undefined]);
    }
    setMoved(true);
  };
  const {
    exam,
    story,
    me,
    author,
    text,
    note,
    name,
    complexity,
    id,
    miniforum,
    getData,
    lessonID,
    isFinal,
  } = props;
  let width;
  if (props.problem) {
    width = "100%";
  } else if (props.story) {
    width = "100%";
  } else {
    width = "90%";
  }

  const getResult = (data) => {
    props.getResult(data);
  };

  const switchUpdate = () => {
    setUpdate(!update);
  };
  return (
    <>
      {!story && (
        <Buttons>
          {!exam && !story && (
            <button onClick={(e) => setUpdate(!update)}>
              {!update ? t("update") : t("back")}
            </button>
          )}
          {me && !props.story && !props.exam && (
            <DeleteNote me={me.id} noteID={id} lessonID={lessonID} />
          )}
        </Buttons>
      )}
      {!update && (
        <>
          {!note?.type ||
          note?.type?.toLowerCase() == "longread" ||
          note?.type?.toLowerCase() == "library" ? (
            <Longread
              story={story}
              isRevealed={isRevealed}
              text={text}
              id={id}
              getData={getData}
              isFinal={isFinal}
              problem={props.problem}
              note={note}
              experience={props.experience}
              total={props.total}
            />
          ) : null}
          {note?.type?.toLowerCase() == "email" ? (
            <Email
              story={story}
              isRevealed={isRevealed}
              text={text}
              id={id}
              getData={getData}
              isFinal={isFinal}
              problem={props.problem}
              note={note}
              experience={props.experience}
              total={props.total}
              author={author}
              me={me}
            />
          ) : null}{" "}
          {note?.type?.toLowerCase() == "mininote" ? (
            <MiniNote text={text} id={id} />
          ) : null}
        </>
      )}
      {console.log("getData", id == "clvm6aovi000bt8khm97llgb7" ? !moved : " ")}
      {getData && !isFinal && !moved && (
        <ArrowContainer>
          <div className="arrow_box" onClick={(e) => push()}>
            <img className="arrow" src="../../static/down-arrow.svg" />
          </div>
        </ArrowContainer>
      )}
      {/* {miniforum && <Chat me={me} miniforum={miniforum} />} */}
      {update && !story && !exam && (
        <UpdateNote
          text={text}
          isSecret={note.isSecret}
          complexity={complexity}
          id={id}
          next={props.next}
          name={name}
          lessonID={lessonID}
          getResult={getResult}
          switchUpdate={switchUpdate}
        />
      )}
    </>
  );
};

export default Note;
