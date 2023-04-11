import React, { useState, useEffect } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { useTranslation } from "next-i18next";

import UpdateNote from "./UpdateNote";
import DeleteNote from "../../delete/DeleteNote";
import Chat from "../questions/Chat";

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
  width: ${(props) => props.width};
  font-size: 1.6rem;
  margin: 20px 0;
  .animated {
    /* text-transform: uppercase; */
    background-image: linear-gradient(
      -225deg,
      #231557 0%,
      #44107a 29%,
      #ff1361 67%
    );
    background-size: auto auto;
    background-clip: border-box;
    background-size: 200% auto;
    color: #fff;
    background-clip: text;
    text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    font-size: 5rem;
    font-weight: 800;
    animation: 2s anim-lineUp ease-out;
    animation: textclip 2s linear infinite;
    p {
      line-height: 1.3;
    }
  }
  @keyframes textclip {
    to {
      background-position: 200% center;
    }
  }
  @keyframes anim-lineUp {
    0% {
      opacity: 0;
      transform: translateY(80%);
    }
    20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
      transform: translateY(0%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
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
  .black_back {
    background: #000000;
    width: 100vw;
    padding: 10% 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      width: 70%;
      object-fit: cover;
      max-height: 50em;
      box-shadow: "0 0 0 2px blue;";
      /* width: 50vw; */
    }
    iframe {
      width: 50%;
      height: 400px;
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    font-weight: 500;
    padding: 1% 2%;
    max-width: 100vw;
    min-width: 360px;
    line-height: 1.6;
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
      object-fit: cover;

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
    font-size: 1.4rem;
  }
`;

const Secret = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 540px;
  position: relative;

  #open {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    position: absolute;
    border: 1px solid #04377f;
    border-radius: 10px;
    top: 150px;
    left: 25%;
    img {
      width: 200px;
      margin: 20px 0;
      /* Start the shake animation and make the animation last for 0.5 seconds */
    }
    img {
      /* Start the shake animation and make the animation last for 0.5 seconds */
      animation: ${(props) => (props.shiver ? "shake 1s" : "none")};
    }
    @keyframes shake {
      0% {
        transform: translate(1px, 1px) rotate(0deg);
      }
      10% {
        transform: translate(-1px, -2px) rotate(-1deg);
      }
      20% {
        transform: translate(-3px, 0px) rotate(1deg);
      }
      30% {
        transform: translate(3px, 2px) rotate(0deg);
      }
      40% {
        transform: translate(1px, -1px) rotate(1deg);
      }
      50% {
        transform: translate(-1px, 2px) rotate(-1deg);
      }
      60% {
        transform: translate(-3px, 1px) rotate(0deg);
      }
      70% {
        transform: translate(3px, 1px) rotate(-1deg);
      }
      80% {
        transform: translate(-1px, -1px) rotate(1deg);
      }
      90% {
        transform: translate(1px, 2px) rotate(0deg);
      }
      100% {
        transform: translate(1px, -2px) rotate(-1deg);
      }
    }
    #button {
      margin-bottom: 20px;
      border: 1px solid #04377f;
      padding: 5px;
      border-radius: 10px;
      cursor: pointer;
    }
  }
  /* justify-content: center; */
`;
const Screen = styled.div`
  max-width: 720px;
  box-shadow: 0px 0px 4px 3px rgba(202, 202, 202, 0.61);
  -webkit-box-shadow: 0px 0px 4px 3px rgba(202, 202, 202, 0.61);
  -moz-box-shadow: 0px 0px 4px 3px rgba(202, 202, 202, 0.61);
  padding: 50px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

const NoteStyles = styled.div`
  max-width: 570px;
  background: #fff;
  margin: 2% 0 0 0;
  filter: ${(props) => (props.isRevealed ? "blur(0px)" : "blur(4px)")};
  @media (max-width: 800px) {
    font-size: 1.6rem;
    width: 90%;
    order: 3;
    h2 {
      font-size: 2.2rem;
      line-height: 1.4;
    }
  }
  .header {
    background: #e0e0e0;
  }
  h2 {
    font-size: 3.2rem;
    font-weight: 600;
    line-height: 1.4;
  }
  img {
    display: block;
    width: 100%;
    /* max-height: 50em; */
    box-shadow: "0 0 0 2px blue;";
    object-fit: contain;
  }
  p {
    margin: 20px 0;
  }
  iframe {
    min-width: 600px;
    width: 100%;
    height: 400px;
    @media (max-width: 800px) {
      min-width: 300px;
      min-height: 200px;
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
    font-size: 1.8rem;
    width: 100%;
    margin: 3% 0;
    padding: 3% 8%;
    background-color: #f2fafb;
    border-radius: 5px;
  }
  .article {
    font-size: 1.6rem;
    width: 100%;
    margin: 1% 1%;
    padding: 1% 4%;
    border-left: 3px solid #0094c6;
    /* line-height: 1.6; */
    p {
      margin: 10px 0;
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
    font-size: 1.4rem;
    tr {
      border: 1px solid #edefed;
    }
    tr:nth-child(even) {
      background: #f8f8f8;
    }
    thead {
      background: #36304a;
      color: #fff;
    }
    th {
      border: 1px solid #edefed;
      padding: 15px 0;
    }
    td {
      border: 1px solid #edefed;
      border-top: none;
      border-bottom: none;
      border-right: none;
      padding: 0% 2.5%;
      position: relative;
      padding: 15px 15px;
    }
  }
`;

const Buttons = styled.div`
  margin-top: 3%;
  display: flex;
  flex-direction: row;
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
  const [isRevealed, setIsRevealed] = useState(!props.note.isSecret);
  const [shiver, setShiver] = useState(false);

  const { t } = useTranslation("lesson");

  useEffect(() => {
    let el = document.getElementById("wide");
    if (el && props.story) {
      let img_div = document.createElement("div");
      let new_img = document.createElement("img");
      new_img.src = el.src;
      img_div.className = "black_back";
      img_div.appendChild(new_img);
      el.remove();
      const box = document.getElementById(props.id);
      box.prepend(img_div);
    }

    let el2 = document.getElementById("blackvideo");
    if (el2 && props.story) {
      let video_div = document.createElement("div");
      let new_video = document.createElement("iframe");
      new_video.src = el2.src;
      new_video.frameborder = "0";
      new_video.tabindex = "0";
      new_video.allow = "autoplay";
      new_video.allowfullscreen = "true";

      video_div.className = "black_back";
      video_div.appendChild(new_video);
      el2.remove();
      const box = document.getElementById(props.id);
      box.prepend(video_div);
    }
  });

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
    miniforum,
    getData,
    lessonID,
  } = props;
  let width;
  if (props.problem) {
    width = "100%";
  } else if (props.story) {
    width = "100vw";
  } else {
    width = "90%";
  }

  const getResult = (data) => {
    props.getResult(data);
  };

  const passUpdated = () => {
    props.passUpdated(true);
  };

  const switchUpdate = () => {
    setUpdate(!update);
  };
  return (
    <>
      <Buttons>
        {!exam && !story && (
          <StyledButton onClick={(e) => setUpdate(!update)}>
            {!update ? t("update") : t("back")}
          </StyledButton>
        )}
        {me && !props.story && !props.exam && (
          <DeleteNote me={me.id} noteID={id} lessonID={lessonID} />
        )}
      </Buttons>
      {!update && (
        <Container id={id} width={width}>
          <div className="text">
            {!update && (
              <>
                {isRevealed && (
                  <NoteStyles story={story} isRevealed={isRevealed}>
                    {/* <div className="header">Меню</div> */}
                    {renderHTML(text)}
                  </NoteStyles>
                )}
                {!isRevealed && (
                  <Secret shiver={shiver}>
                    <NoteStyles story={story} isRevealed={isRevealed}>
                      {renderHTML(text)}
                    </NoteStyles>
                    <div id="open">
                      <img src="static/lock.svg" />
                      <div
                        id="button"
                        onClick={(e) => {
                          if (props.experience >= props.total) {
                            setIsRevealed(true);
                          } else {
                            setShiver(true);
                            setTimeout(() => {
                              setShiver(false);
                            }, 1000);
                          }
                        }}
                      >
                        {t("toOpen")}
                      </div>
                    </div>
                  </Secret>
                )}
              </>
            )}
            {getData && (
              <div className="arrow_box" onClick={(e) => push()}>
                <img className="arrow" src="../../static/down-arrow.svg" />
              </div>
            )}
          </div>
          {/* <div className="author">
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
          </div> */}
          {/* <NoteStyles>{renderHTML(text)}</NoteStyles> */}
        </Container>
      )}
      {miniforum && <Chat me={me} miniforum={miniforum} />}
      {update && !story && !exam && (
        <UpdateNote
          text={text}
          isSecret={note.isSecret}
          complexity={complexity}
          id={id}
          next={props.next}
          lessonID={lessonID}
          getResult={getResult}
          switchUpdate={switchUpdate}
          passUpdated={passUpdated}
        />
      )}
    </>
  );
};

export default Note;
