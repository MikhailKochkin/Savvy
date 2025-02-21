import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

import UpdateNote from "./UpdateNote";
import DeleteNote from "./DeleteNote";
import Longread from "./types/Longread";
import Email from "./types/Email";
import MiniNote from "./types/MiniNote";
import Picture from "./types/Picture";
import Doc from "./types/Doc";
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
  // State for update mode and whether the note has been "moved" (next step triggered)
  const [update, setUpdate] = useState(false);
  const [moved, setMoved] = useState(false);

  const { t } = useTranslation("lesson");

  // Destructure props here as you prefer
  const {
    exam,
    story,
    me,
    author,
    text,
    note,
    type,
    name,
    complexity,
    id,
    miniforum,
    pushNextElementToProblem,
    lessonID,
    isFinal,
    instructorId,
    may_i_edit,
    next,
    problem,
    experience,
    total,
    getResult: parentGetResult,
  } = props;

  // Determine the width based on the context (problem/story/general)
  const width = problem || story ? "100%" : "90%";

  // Handlers

  // Toggle update mode
  const toggleUpdate = () => setUpdate((prev) => !prev);

  // Trigger the next element in the problem flow
  const handlePushNextElement = () => {
    if (!moved) {
      pushNextElementToProblem(next ? [true, next.true] : [true, undefined]);
      setMoved(true);
    }
  };

  // Pass result up to parent component if needed
  const handleGetResult = (data) => {
    if (parentGetResult) {
      parentGetResult(data);
    }
  };

  // Pass generated data up if needed in the future
  const passGeneratedData = (data) => {
    // Placeholder - if needed later
  };

  return (
    <>
      {/* Edit and Delete Controls */}
      {may_i_edit && (
        <Buttons>
          <SecondaryButton onClick={toggleUpdate}>
            {update ? t("back") : t("update")}
          </SecondaryButton>
          <DeleteNote me={me.id} noteID={id} lessonID={lessonID} />
        </Buttons>
      )}

      {/* Update/Edit Mode */}
      {update && !story && !exam && note && (
        <UpdateNote
          text={text}
          isSecret={note?.isSecret}
          complexity={complexity}
          id={id}
          type={note?.type}
          next={next}
          vertical_image={note?.vertical_image}
          horizontal_image={note?.horizontal_image}
          name={name}
          instructorId={note?.instructorId}
          lessonID={lessonID}
          getResult={handleGetResult}
          switchUpdate={toggleUpdate}
          passGeneratedData={passGeneratedData}
        />
      )}

      {/* Display Content Mode */}
      {!update && (
        <>
          {/* Longread or Library Type */}
          {(!note?.type ||
            note?.type.toLowerCase() === "longread" ||
            note?.type.toLowerCase() === "library") && (
            <Longread
              story={story}
              text={text}
              id={id}
              getData={pushNextElementToProblem}
              isFinal={isFinal}
              problem={problem}
              note={note}
              experience={experience}
              total={total}
            />
          )}

          {/* Email Type */}
          {note?.type?.toLowerCase() === "email" && (
            <Email
              story={story}
              text={text}
              id={id}
              name={name}
              instructorId={instructorId}
              getData={pushNextElementToProblem}
              isFinal={isFinal}
              problem={problem}
              note={note}
              experience={experience}
              total={total}
              author={author}
              me={me}
            />
          )}

          {/* Doc Type */}
          {note?.type?.toLowerCase() === "doc" && (
            <Doc
              story={story}
              text={text}
              id={id}
              name={name}
              instructorId={instructorId}
              isFinal={isFinal}
              problem={problem}
              note={note}
              experience={experience}
              total={total}
              author={author}
              me={me}
            />
          )}

          {/* MiniNote Type */}
          {note?.type?.toLowerCase() === "mininote" && (
            <MiniNote text={text} id={id} />
          )}

          {/* Picture Type */}
          {note?.type?.toLowerCase() === "picture" && (
            <Picture
              story={story}
              horizontal_image={note.horizontal_image}
              vertical_image={note.vertical_image}
              text={text}
              id={id}
            />
          )}
        </>
      )}

      {/* "Next Step" Arrow - For progressing to the next element in a problem */}
      {pushNextElementToProblem && !isFinal && !moved && (
        <ArrowContainer>
          <div className="arrow_box" onClick={handlePushNextElement}>
            <img
              className="arrow"
              src="../../static/down-arrow.svg"
              alt="Next"
            />
          </div>
        </ArrowContainer>
      )}
    </>
  );
};

export default Note;
