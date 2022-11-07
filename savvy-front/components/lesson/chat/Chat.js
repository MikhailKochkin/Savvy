import { useState, useEffect } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import { useTranslation } from "next-i18next";
import { useMutation, gql } from "@apollo/client";
import _ from "lodash";

import UpdateChat from "./UpdateChat";
import DeleteChat from "./DeleteChat";
import Reaction from "./Reaction";

const UPDATE_CHAT_MUTATION = gql`
  mutation UPDATE_CHAT_MUTATION($id: String!, $link_clicks: Int) {
    updateChat(id: $id, link_clicks: $link_clicks) {
      id
    }
  }
`;
const Styles = styled.div`
  /* max-width: 650px;
  min-width: 510px; */
  width: 570px;
  margin: 20px 0;
  font-weight: 500;
  margin-bottom: 100px;
  img {
    display: block;
    width: 100%;
    max-height: 50em;
    box-shadow: "0 0 0 2px blue;";
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
    font-size: 1.4rem;
  }
`;

const Next = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  button {
    width: 200px;
    border: 1px solid #cacaca;
    background: none;
    padding: 8px 15px;
    font-family: Montserrat;
    border-radius: 15px;
    cursor: pointer;
    color: black;
    transition: 0.3s;
    &:hover {
      background: #f4f4f4;
    }
  }
`;

const Message = styled.div`
  display: flex;
  transition: 0.2s ease-out;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 20px;
  /* animation: show 750ms 350ms cubic-bezier(0.38, 0.97, 0.56, 0.76) forwards; */
  /* animation: show 450ms 150ms forwards; */
  /* animation: fadein 3000ms ease-in; */
  // Prestate
  /* opacity: 0; */
  // remove transform for just a fade-in
  /* transform: rotateX(90deg); */
  /* transform-origin: bottom center; */
  /* @keyframes show {
    100% {
      opacity: 1;
      transform: none;
    }
  } */

  p {
    margin: 5px 0;
  }
  &.student {
    justify-content: flex-start;
    justify-content: stretch;
  }
  .author_text {
    background: #f3f3f3;
    color: black;
    border-radius: 25px;
    padding: 2% 5%;
    display: flex;
    min-width: 20%;
    max-width: 70%;
    font-size: 1.6rem;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    p {
      margin: 10px 0;
      &.button_box {
        margin: 30px 0;
        displlay: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      a.button {
        border: none;
        background: #0084ff;
        color: #fff;
        border-radius: 25px;
        padding: 12px 20px;
        cursor: pointer;
        width: 100%;
        margin: 10px 0;
        transition: 0.3s;
        &:hover {
          background: #005fb8;
        }
        @media (max-width: 800px) {
          display: block;
          text-align: center;
          padding: 12px 20px;
          line-height: 1.2;
        }
      }
    }
    @media (max-width: 800px) {
      font-size: 1.4rem;
    }
  }

  .student_text {
    min-width: 20%;
    max-width: 70%;
    border: 2px solid;
    background: #2f80ed;
    color: #fff;
    outline: 0;
    resize: none;
    border-radius: 25px;
    padding: 3% 4%;
    line-height: 1.8;
    font-family: Montserrat;
    font-size: 1.6rem;
    margin-bottom: 20px;
    @media (max-width: 800px) {
      font-size: 1.4rem;
    }
  }
`;

const Messages = styled.div`
  margin: 0 10px;
  filter: ${(props) => (props.isRevealed ? "blur(0px)" : "blur(4px)")};
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 65px;
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
    max-width: 80px;
    margin: 0 7px;
  }
`;

const Icon = styled.div`
  margin: 5px;
  border-radius: 50%;
  background: #2f80ed; /* fallback for old browsers */

  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  height: 55px;
  width: 55px;
  object-fit: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
`;

const Chat = (props) => {
  const [update, setUpdate] = useState(false);
  const [num, setNum] = useState(1);
  const [clicks, setClicks] = useState(props.clicks);
  const [isRevealed, setIsRevealed] = useState(!props.isSecret);
  const [shiver, setShiver] = useState(false);

  const { t } = useTranslation("lesson");
  const [updateChat, { data, loading, error }] =
    useMutation(UPDATE_CHAT_MUTATION);
  const { name, messages, me, story, lessonId, id, author } = props;
  const getResult = (data) => {
    props.getResult(data);
  };

  const passUpdated = () => {
    props.passUpdated(true);
  };

  const switchUpdate = () => {
    setUpdate(!update);
  };

  // useEffect(() => {
  //   console.log("ShowArrow 0 false");
  //   props.getShowArrow(false);
  // }, []);

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
      {!story && (
        <button onClick={(e) => setUpdate(!update)}>{t("update")}</button>
      )}
      {me && !story && (
        <DeleteChat me={me.id} chatId={id} lessonId={lessonId} />
      )}
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
                      >
                        <div className="author_text">{renderHTML(m.text)}</div>
                        <IconBlock>
                          {m.image && <img className="icon" src={m.image} />}
                          {!m.image &&
                            (author && author.image ? (
                              <img className="icon" src={author.image} />
                            ) : (
                              <img
                                className="icon"
                                src="../../static/hipster.svg"
                              />
                            ))}
                          <div className="name">
                            {m.name && m.name.toLowerCase() !== "author"
                              ? m.name
                              : author && author.name
                              ? author.name
                              : "BeSavvy"}
                          </div>
                        </IconBlock>
                      </Message>
                      {m.reactions && m.reactions.length > 0 && (
                        <Reaction
                          reactions={m.reactions}
                          me={me}
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
                      >
                        <IconBlock>
                          <Icon className="icon2" background={m.author}>
                            {m.image && <img className="icon" src={m.image} />}
                            {me.image ? (
                              <img className="icon" src={me.image} />
                            ) : me.surname ? (
                              `${me.name[0]}${me.surname[0]}`
                            ) : (
                              `${me.name[0]}${me.name[1]}`
                            )}
                          </Icon>
                          <div className="name">
                            {m.name ? m.name : m.author}
                          </div>
                        </IconBlock>
                        <div className="student_text">{renderHTML(m.text)}</div>
                      </Message>
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
              Открыть материал
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
                    id={"message" + i + id}
                    key={i}
                    time={i}
                    className="author"
                  >
                    <div className="author_text">{renderHTML(m.text)}</div>
                    <IconBlock>
                      {m.image && <img className="icon" src={m.image} />}
                      {!m.image &&
                        (author && author.image ? (
                          <img className="icon" src={author.image} />
                        ) : (
                          <img
                            className="icon"
                            src="../../static/hipster.svg"
                          />
                        ))}
                      <div className="name">
                        {m.name && m.name.toLowerCase() !== "author"
                          ? m.name
                          : author && author.name
                          ? author.name
                          : "BeSavvy"}
                      </div>
                    </IconBlock>
                  </Message>
                  {m.reactions && m.reactions.length > 0 && (
                    <Reaction
                      reactions={m.reactions}
                      me={me}
                      author={author}
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
                >
                  <IconBlock>
                    <Icon className="icon2" background={m.author}>
                      {m.image && <img className="icon" src={m.image} />}
                      {!m.image &&
                        (me.image ? (
                          <img className="icon" src={me.image} />
                        ) : me.surname ? (
                          `${me.name[0]}${me.surname[0]}`
                        ) : (
                          `${me.name[0]}${me.name[1]}`
                        ))}
                    </Icon>
                    <div className="name">
                      {m.name && m.name !== "student" ? m.name : author.name}
                    </div>
                  </IconBlock>
                  <div className="student_text">{renderHTML(m.text)}</div>
                </Message>
              );
            }
          })}
        </Messages>
      )}
      {!update && num < messages.messagesList.length && (
        <Next>
          <button
            onClick={(e) => {
              // if (num == messages.messagesList.length - 1) {
              //   props.getShowArrow(true);
              // }
              setNum(num + 1);
            }}
          >
            Next
          </button>
        </Next>
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
