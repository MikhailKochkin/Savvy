import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Button from "@material-ui/core/Button";
// import { withStyles } from "@material-ui/core/styles";
import { useTranslation } from "next-i18next";
import moment from "moment";
import parse from "html-react-parser";

import UpdateNote from "./UpdateNote";
import DeleteNote from "../../delete/DeleteNote";
import Chat from "../questions/Chat";

// const StyledButton = withStyles({
//   root: {
//     width: "140px",
//     height: "45px",
//     marginRight: "2%",
//     fontSize: "1.6rem",
//     textTransform: "none",
//   },
// })(Button);

const Body = styled.div``;

const Container = styled.div`
  width: ${(props) => props.width};
  font-size: 1.6rem;
  margin-bottom: 100px;
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
    /* text-fill-color: transparent; */
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
  .black_back_square {
    background-image: url("/static/pattern.svg");
    width: 100vw;
    padding: 10% 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      width: 70%;
      max-width: 700px;
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
  .black_back {
    background-image: url("/static/pattern.svg");
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
    font-size: 1.6rem;
    .black_back {
      padding: 20px 0;
      img {
        width: 360px;
      }
    }
    .black_back_square {
      padding: 20px 0;
      img {
        width: 360px;
        height: 360px;
        /* width: 50vw; */
      }
    }
  }
`;

const Secret = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
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
    z-index: 300;
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

const NoteStyles = styled.div`
  max-width: 660px;
  background: #fff;
  margin: 2% 0 0 0;
  filter: ${(props) => (props.isRevealed ? "blur(0px)" : "blur(4px)")};
  .video-container {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  video {
    max-width: 100%;
    height: auto;
  }
  .video-fit {
    width: 400px;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 800px) {
    .video-container {
      width: 350px;
    }
    .video-fit {
      width: 350px;
      height: 100%;
    }
  }
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
  blockquote {
    font-size: 1.6rem;
    width: 100%;
    margin: 0;
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

const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 540px;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const EmailForm = styled.div`
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 20px;
`;

const Header = styled.div``;

const EmailInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  border-bottom: 1px solid #a2a2a2;
  padding-bottom: 20px;
  margin-bottom: 20px;
  .image_column {
    width: 10%;
    .circle {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      color: #fff;
      border-radius: 50%;
      background: #485563; /* fallback for old browsers */
      background: -webkit-linear-gradient(
        to right,
        #29323c,
        #485563
      ); /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(
        to right,
        #29323c,
        #485563
      ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
  }
  .names_column {
    width: 40%;
    .sender_name {
      font-size: 2rem;
    }
  }
  .times_column {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
    color: #a2a2a2;
  }
  @media (max-width: 800px) {
    .image_column {
      width: 15%;
    }
    .names_column {
      width: 55%;
      .sender_name {
        font-size: 1.8rem;
      }
    }
    .times_column {
      width: 30%;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-end;
      color: #a2a2a2;
    }
  }
`;

const Note = (props) => {
  const [update, setUpdate] = useState(false);
  const [moved, setMoved] = useState(false);
  const [isRevealed, setIsRevealed] = useState(!props.note.isSecret);
  const [shiver, setShiver] = useState(false);

  const { t } = useTranslation("lesson");
  moment.locale("ru");
  function getFormattedToday() {
    return moment().format("D MMMM YYYY [at] HH:mm");
  }

  const todaysDate = getFormattedToday();
  useEffect(() => {
    let el3 = document.getElementById("wide_square");
    if (el3 && props.story) {
      let img_div = document.createElement("div");
      let new_img = document.createElement("img");
      new_img.src = el3.src;
      img_div.className = "black_back_square";
      img_div.appendChild(new_img);
      el3.remove();
      const box = document.getElementById(props.id);
      box.prepend(img_div);
    }

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
    author,
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
    width = "100%";
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
      {!update &&
        (note.type == "email" ? (
          <EmailContainer>
            <EmailForm>
              <Header></Header>
              <EmailInfo>
                <div className="image_column">
                  <div className="circle">
                    {author.name[0]}
                    {author.surname[0]}
                  </div>
                </div>
                <div className="names_column">
                  <div className="sender_name">
                    {author.name} {author.surname}
                  </div>
                  <div>Re: Help ASAP</div>
                  <div>
                    To: {me.name} {me.surname}
                  </div>
                </div>
                <div className="times_column">{todaysDate}</div>
              </EmailInfo>
              <Body>{parse(text)}</Body>
            </EmailForm>
          </EmailContainer>
        ) : (
          <Container id={id} width={width}>
            <div className="text">
              {!update && (
                <>
                  {isRevealed && (
                    <NoteStyles story={story} isRevealed={isRevealed}>
                      {parse(text)}
                    </NoteStyles>
                  )}
                  {!isRevealed && (
                    <Secret shiver={shiver}>
                      <NoteStyles story={story} isRevealed={isRevealed}>
                        {parse(text)}
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
                          {/* {t("toOpen")} */}
                          Открыть
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
            {/* <NoteStyles>{parse(text)}</NoteStyles> */}
          </Container>
        ))}
      {/* {miniforum && <Chat me={me} miniforum={miniforum} />} */}
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
