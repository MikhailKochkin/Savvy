import React, { useState } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import UpdateNote from "./UpdateNote";
import DeleteNote from "../../delete/DeleteNote";
import { withTranslation } from "../../../i18n";

const StyledButton = withStyles({
  root: {
    width: "15%",
    height: "45px",
    marginRight: "2%",
    fontSize: "1.6rem",
    textTransform: "none",
  },
})(Button);

const Container = styled.div`
  width: 650px;
  font-size: 1.6rem;
  margin: 20px 0;
  /* display: flex;
  flex-direction: row; */
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
  }
  a {
    width: 30%;
  }

  .text {
    flex-basis: 90%;
    border: 1px solid #f3f3f3;
    padding: 1% 2%;
    border-radius: 25px;
  }
  .author {
    flex-basis: 10%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    .icon {
      margin: 5px;
      border-radius: 50%;
      height: 55px;
      width: 55px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .name {
      font-size: 1.2rem;
      text-align: center;
      color: #8f93a3;
    }
  }
  @media (max-width: 800px) {
    flex-direction: row;
    width: 100%;
  }
`;

const NoteStyles = styled.div`
  /* width: 650px; */
  margin: 2% 0 0 0;
  font-size: 1.6rem;
  @media (max-width: 800px) {
    font-size: 1.6rem;
    width: 100%;
    order: 3;
    h2 {
      font-size: 2.2rem;
      line-height: 1.4;
    }
  }
  h2 {
    font-size: 2.6rem;
    line-height: 1.4;
  }
  img {
    display: block;
    width: 100%;
    max-height: 50em;
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
    border-bottom: 2px solid #26ba8d;
    padding: 0%;
    transition: 0.3s;
    cursor: pointer;
  }
  .flag {
    color: #008489;
    font-size: 2rem;
    width: 100%;
    margin: 3% 0;
    padding: 3% 8%;
    background-color: #f2fafb;
    border-radius: 5px;
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

const MiniButton = styled.div`
  border: none;
  background: none;
  cursor: pointer;
  margin: 1.5% 0;
  &:hover {
    text-decoration: underline;
  }
`;

const Note = (props) => {
  const [update, setUpdate] = useState(false);
  const [moved, setMoved] = useState(false);

  const push = () => {
    if (moved == false) {
      props.getData(
        props.next ? [true, props.next.true] : [true, { type: "finish" }]
      );
    }
    setMoved(true);
  };
  const {
    exam,
    story,
    me,
    text,
    note,
    complexity,
    id,
    author,
    user,
    getData,
    lessonID,
  } = props;
  let width;
  if (props.problem) {
    width = "50%";
  } else if (props.story) {
    width = "50%";
  } else {
    width = "90%";
  }
  return (
    <>
      <Buttons>
        {!exam && !story && me.id === note.user.id && (
          <StyledButton onClick={(e) => setUpdate(!update)}>
            {!update ? props.t("update") : props.t("back")}
          </StyledButton>
        )}
        {me && me.id === user && !props.story && !props.exam && (
          <DeleteNote me={me.id} noteID={id} lessonID={lessonID} />
        )}
      </Buttons>
      {!update && (
        <Container width={width}>
          <div className="text">
            {!update && (
              <NoteStyles story={story}>{renderHTML(text)}</NoteStyles>
            )}
            {getData && (
              // <MiniButton onClick={push}>{props.t("next")}</MiniButton>
              <div className="arrow_box" onClick={(e) => push()}>
                <img className="arrow" src="../../static/down-arrow.svg" />
              </div>
            )}
          </div>
          <div className="author">
            <div className="author_info">
              {author && author.image != null ? (
                <img className="icon" src={author.image} />
              ) : (
                <img className="icon" src="../../static/hipster.svg" />
              )}
              <div className="name">
                {author && author.name ? author.name : "BeSavvy"}
              </div>
            </div>
          </div>
          {/* <NoteStyles>{renderHTML(text)}</NoteStyles> */}
        </Container>
      )}
      {update && !story && !exam && (
        <UpdateNote
          text={text}
          complexity={complexity}
          id={id}
          next={props.next}
          lessonID={lessonID}
        />
      )}
    </>
  );
};

export default withTranslation("tasks")(Note);
