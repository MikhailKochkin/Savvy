import { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { useMutation, gql } from "@apollo/client";
import _ from "lodash";

import UpdateChat from "./UpdateChat";
import DeleteChat from "./DeleteChat";
import Reaction from "./Reaction";
import ChangeForum from "../forum/ChangeForum";
import Message from "./Message"; // Add this import at the top of the Chat component file

const UPDATE_CHAT_MUTATION = gql`
  mutation UPDATE_CHAT_MUTATION($id: String!, $link_clicks: Int) {
    updateChat(id: $id, link_clicks: $link_clicks) {
      id
    }
  }
`;

const Buttons = styled.div``;

const Styles = styled.div`
  width: 570px;
  margin: 20px 0;
  font-weight: 500;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  img {
    display: block;
    width: 100%;
    max-height: 50em;
    box-shadow: "0 0 0 2px blue;";
  }
  .video {
    height: 489px;
    width: 275px;
    iframe {
      width: 100%;
      border: none;
      height: 100%;
      border-radius: 15px;
    }
  }
  table {
    width: 100%;
    border: 1px solid #edefed;
    border-collapse: collapse;
    tr {
      border: 1px solid #d0d0d0;
      line-height: 1.6;
      vertical-align: text-top;
    }
    thead {
      background: #f5f5f5;
      font-weight: bold;
      vertical-align: text-top;
      line-height: 1.6;
    }
    thead th {
      padding: 20px 0px;
    }
    th {
      border: 1px solid #d0d0d0;
    }
    td {
      border: 1px solid #d0d0d0;
      border-top: none;
      border-bottom: none;
      border-right: none;
      padding: 0% 2.5%;
      position: relative;
      width: 5%;
      padding: 10px 10px;
    }
  }
  a {
    border-bottom: 2px solid #26ba8d;
    padding: 0%;
    transition: 0.3s;
    cursor: pointer;
  }
  @media (max-width: 800px) {
    width: 100%;
    font-size: 1.6rem;
    .video {
      height: 356px;
      width: 200px;
    }
  }
`;

const ArrowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  }
`;

const Next = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  button {
    width: 100px;
    border: 1px solid #cacaca;
    background: none;
    padding: 8px 15px;
    font-family: Montserrat;
    border-radius: 15px;
    cursor: pointer;
    color: black;
    transition: 0.3s;
    animation-duration: 1s;
    animation-name: animate-fade;
    animation-fill-mode: both;
    @keyframes animate-fade {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    &:hover {
      background: #f4f4f4;
    }
  }
`;

const Messages = styled.div`
  margin: 0 10px;
  filter: ${(props) => (props.isRevealed ? "blur(0px)" : "blur(4px)")};
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
    box-shadow: 4px 4px 5px 5px rgba(166, 166, 166, 0.24);
    -webkit-box-shadow: 4px 4px 5px 5px rgba(166, 166, 166, 0.24);
    -moz-box-shadow: 4px 4px 5px 5px rgba(166, 166, 166, 0.24);
    border-radius: 10px;
    top: 20px;
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
  @media (max-width: 800px) {
    #open {
      left: 50px;
    }
  }
`;

const Chat = (props) => {
  const [update, setUpdate] = useState(false);
  const [num, setNum] = useState(1);
  const [moved, setMoved] = useState(false);

  const [clicks, setClicks] = useState(props.clicks);
  const [isRevealed, setIsRevealed] = useState(!props.isSecret);
  const [shiver, setShiver] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const { t } = useTranslation("lesson");
  const [updateChat, { data, loading, error }] =
    useMutation(UPDATE_CHAT_MUTATION);
  const { name, messages, me, story, lessonId, id, author, getData } = props;
  const getResult = (data) => {
    props.getResult(data);
  };

  const passTextToBeTranslated = (text) => {
    props.passTextToBeTranslated(text);
  };

  const passUpdated = () => {
    props.passUpdated(true);
  };

  const switchUpdate = () => {
    setUpdate(!update);
  };

  const push = () => {
    if (moved == false) {
      props.getData(
        props.next ? [true, props.next.true] : [true, { type: "finish" }]
      );
    }
    setMoved(true);
  };

  useEffect(() => {
    const elements = document.getElementById(id).querySelectorAll("#user_name");
    elements.forEach((element) => {
      let name = me.name;
      element.innerHTML = name;
    });
  }, [num]);

  useEffect(() => {
    if (messages.messagesList.length == 1 && props.moveNext) {
      props.moveNext(props.id);
    }
    const elements = document.getElementById(id).querySelectorAll("#user_name");
    let p;
    elements.forEach((element) => {
      let name = me.name;
      element.innerHTML = name;
    });
    document.addEventListener("keydown", detectKeyDown, true);
    return () => {
      document.removeEventListener("click", detectKeyDown);
    };
  }, []);

  const detectKeyDown = (e) => {
    if (e.key === "n") {
      setNum((num) => num + 1);
    } else if (e.key === "b") {
      setNum((num) => num - 1);
    } else if (e.key === "s") {
      setShowButton((showButton) => !showButton);
    }
  };

  let width;
  if (props.problem) {
    width = "50%";
  } else if (props.story) {
    width = "50%";
  } else {
    width = "90%";
  }
  return (
    <Styles
      id={id}
      width={width}
      onClick={async (e) => {
        if (e.target.className === "button") {
          const res = await updateChat({
            variables: {
              id: id,
              link_clicks: clicks + 1,
            },
          });
          setClicks(clicks + 1);
        }
      }}
    >
      <Buttons>
        {!story && (
          <button onClick={(e) => setUpdate(!update)}>{t("update")}</button>
        )}
        {me && !story && (
          <DeleteChat me={me.id} chatId={id} lessonId={lessonId} />
        )}
      </Buttons>
      {!isRevealed && (
        <Secret shiver={shiver}>
          <Messages isRevealed={isRevealed}>
            {!update &&
              messages.messagesList.slice(0, num).map((m, i) => {
                if (m.author === "author") {
                  return (
                    <>
                      <Message
                        id={"message" + i + id}
                        key={i}
                        time={i}
                        className="author"
                        shouldSlide={true}
                        m={m}
                        me={me}
                        author={author}
                        passTextToBeTranslated={passTextToBeTranslated}
                      />
                      {m.reactions && m.reactions.length > 0 && (
                        <Reaction
                          reactions={m.reactions}
                          me={me}
                          m={m}
                          author={author}
                          initialQuestion={m.text}
                        />
                      )}
                    </>
                  );
                } else {
                  return (
                    <>
                      <Message
                        id={"message" + i + id}
                        key={i}
                        time={i}
                        className="student"
                        shouldSlide={true}
                        m={m}
                        me={me}
                        author={author}
                        passTextToBeTranslated={passTextToBeTranslated}
                      />
                    </>
                  );
                }
              })}
          </Messages>
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
      {isRevealed && !update && (
        <Messages isRevealed={isRevealed}>
          {messages.messagesList.slice(0, num).map((m, i) => {
            if (m.author === "author") {
              return (
                <>
                  <Message
                    id={"messagee" + i + id}
                    key={i}
                    time={i}
                    className="author"
                    shouldSlide={true}
                    m={m}
                    me={me}
                    author={author}
                    passTextToBeTranslated={passTextToBeTranslated}
                  />
                  {m.reactions && m.reactions.length > 0 && (
                    <Reaction
                      reactions={m.reactions}
                      me={me}
                      author={author}
                      m={m}
                      author_image={m.image}
                      author_name={m.name}
                      initialQuestion={m.text}
                    />
                  )}
                </>
              );
            } else {
              return (
                <Message
                  id={"message" + i + id}
                  key={i}
                  time={i}
                  className="student"
                  shouldSlide={true}
                  m={m}
                  me={me}
                  author={author}
                  passTextToBeTranslated={passTextToBeTranslated}
                />
              );
            }
          })}
        </Messages>
      )}
      {showButton && !update && num < messages.messagesList.length && (
        <Next>
          <button
            onClick={(e) => {
              // if (num == messages.messagesList.length - 1) {
              //   props.getShowArrow(true);
              // }

              if (num == messages.messagesList.length - 1 && props.moveNext)
                props.moveNext(props.id);
              setNum(num + 1);
            }}
          >
            {t("next")}
          </button>
        </Next>
      )}
      {console.log("num", num, messages.messagesList.length)}
      {getData &&
        props.next.true.value &&
        !moved &&
        num == messages.messagesList.length && (
          <ArrowBox>
            <div className="arrow_box" onClick={(e) => push()}>
              <img className="arrow" src="../../static/down-arrow.svg" />
            </div>
          </ArrowBox>
        )}
      {update && (
        <UpdateChat
          id={id}
          name={name}
          me={me}
          isSecret={props.isSecret}
          messages={messages}
          lessonId={lessonId}
          getResult={getResult}
          switchUpdate={switchUpdate}
          passUpdated={passUpdated}
        />
      )}
    </Styles>
  );
};

export default Chat;
