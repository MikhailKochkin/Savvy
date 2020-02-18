import React, { useState } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import UpdateNote from "./UpdateNote";
import DeleteNote from "../../delete/DeleteNote";

const StyledButton = withStyles({
  root: {
    width: "15%",
    height: "45px",
    marginRight: "2%",
    fontSize: "1.6rem",
    textTransform: "none"
  }
})(Button);

const Container = styled.div`
  width: ${props => (props.story ? "100%" : "95%")};
  font-size: 1.6rem;
  margin: 20px 0;
`;

const NoteStyles = styled.div`
  width: ${props => (props.story ? "100%" : "95%")};
  margin: 2% 0 0 0;
  padding: 0% 2%;
  font-size: 1.6rem;
  border: ${props => (props.story ? null : "1px solid #e4e4e4")};
  border-radius: 8px;
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
  img {
    display: block;
    max-width: 100%;
    max-height: 20em;
    box-shadow: "0 0 0 2px blue;";
  }
  iframe {
    width: 100%;
    height: 400px;
    @media (max-width: 800px) {
      width: 100%;
      height: auto;
    }
  }
  a {
    color: #112b62;
    &:hover {
      text-decoration: underline;
    }
  }
  pre {
    background: #282c34;
    color: white;
    padding: 2% 4%;
    line-height: 1;
    font-size: 1.4rem;
    border-radius: 10px;
    overflow-x: scroll;
  }
  table {
    width: 100%;
    border: 1px solid #edefed;
    border-collapse: collapse;
    tr {
      border: 1px solid #edefed;
    }
    thead {
      background: #f5f5f5;
      font-weight: bold;
    }
    th {
      border: 1px solid #edefed;
    }
    td {
      border: 1px solid #edefed;
      border-top: none;
      border-bottom: none;
      border-right: none;
      padding: 0% 2.5%;
      position: relative;
      width: 5%;
    }
  }
`;

const Buttons = styled.div`
  margin-top: 3%;
`;

const Dots = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 90px;
  width: 100%;
  margin-bottom: 5%;
  .group {
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: space-between;
    margin-top: 5%;
  }
  .dot {
    width: 12px;
    height: 12px;
    background: #c4c4c4;
    border-radius: 50%;
  }
`;

const MiniButton = styled.div`
  border: none;
  background: none;
  cursor: pointer;
  margin: 1.5% 0;
  &:hover {
    text-decoration: underline;
  }
`;

const Note = props => {
  const [update, setUpdate] = useState(false);

  const push = () => {
    props.exam
      ? props.getData(props.next ? props.next.true : { finish: 0 }, "true")
      : null;
  };

  const {
    exam,
    story,
    me,
    text,
    notes,
    note,
    tests,
    quizes,
    id,
    user,
    getData,
    lessonID
  } = props;
  return (
    <>
      <Buttons>
        {!exam && !story && me.id === note.user.id && (
          <StyledButton onClick={e => setUpdate(!update)}>
            {!update ? "Настройки" : "Заметка"}
          </StyledButton>
        )}
        {me && me.id === user && !props.story && !props.exam && (
          <DeleteNote me={me.id} noteID={id} lessonID={lessonID} />
        )}
      </Buttons>
      <Container story={story}>
        {!update && <NoteStyles story={story}>{renderHTML(text)}</NoteStyles>}
        {getData && <MiniButton onClick={push}>Далее</MiniButton>}
        {update && !story && !exam && (
          <UpdateNote
            notes={notes}
            text={text}
            tests={tests}
            id={id}
            quizes={quizes}
            next={props.next}
            lessonID={lessonID}
          />
        )}
      </Container>
      {exam && (
        <Dots>
          <div className="group">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </Dots>
      )}
    </>
  );
};

export default Note;
