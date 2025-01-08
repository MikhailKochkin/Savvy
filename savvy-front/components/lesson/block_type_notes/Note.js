import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

import UpdateNote from "./UpdateNote";
import DeleteNote from "./DeleteNote";
import Longread from "./types/Longread";
import Email from "./types/Email";
import MiniNote from "./types/MiniNote";
import Picture from "./types/Picture";
import { SecondaryButton } from "../styles/DevPageStyles";

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 20px;
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
    instructorName,
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
    if (props.getResult) props.getResult(data);
  };

  const switchUpdate = () => {
    setUpdate(!update);
  };

  const passGeneratedData = (data) => {
    // if (props.passGeneratedData) props.passGeneratedData(data);
  };
  return (
    <>
      {!story && (
        <Buttons>
          {!exam && !story && (
            <SecondaryButton onClick={(e) => setUpdate(!update)}>
              {!update ? t("update") : t("back")}
            </SecondaryButton>
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
              name={name}
              instructorName={instructorName}
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
          {note?.type?.toLowerCase() == "picture" ? (
            <Picture
              story={story}
              horizontal_image={note.horizontal_image}
              vertical_image={note.vertical_image}
              text={text}
              id={id}
            />
          ) : null}{" "}
        </>
      )}
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
          type={note.type}
          next={props.next}
          vertical_image={note.vertical_image}
          horizontal_image={note.horizontal_image}
          name={name}
          instructorName={note.instructorName}
          lessonID={lessonID}
          getResult={getResult}
          switchUpdate={switchUpdate}
          passGeneratedData={passGeneratedData}
        />
      )}
    </>
  );
};

export default Note;
