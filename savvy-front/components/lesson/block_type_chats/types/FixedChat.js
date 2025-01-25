import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { useMutation, gql } from "@apollo/client";
import _ from "lodash";
import PropTypes from "prop-types"; // Add this import

import Reaction from "../functions/Reaction";
import Message from "../functions/Message"; // Add this import at the top of the Chat component file
import AiAssistant from "../functions/AiAssistant";

const CREATE_CHATRESULT_MUTATION = gql`
  mutation CREATE_CHATRESULT_MUTATION(
    $text: String!
    $name: String!
    $lessonId: String!
    $chatId: String
  ) {
    createChatResult(
      text: $text
      name: $name
      lessonId: $lessonId
      chatId: $chatId
    ) {
      id
    }
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
  /* filter: ${(props) => (props.isRevealed ? "blur(0px)" : "blur(4px)")}; */
`;

const FixedChat = (props) => {
  const { messages, me, lessonId, author, id, library } = props;
  const [update, setUpdate] = useState(false);
  const [num, setNum] = useState(1);
  const [showButton, setShowButton] = useState(true);
  const [hasCreatedInitialResult, setHasCreatedInitialResult] = useState(false); // State to ensure function runs only once

  const chatRef = useRef(null);
  const { t } = useTranslation("lesson");

  const [createChatResult, { data: data2, loading: loading2, error: error2 }] =
    useMutation(CREATE_CHATRESULT_MUTATION);

  const passTextToBeTranslated = (text) => {
    props.passTextToBeTranslated(text);
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

    // document.addEventListener("keydown", detectKeyDown, true);
    // return () => {
    //   document.removeEventListener("click", detectKeyDown);
    // };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (props.story && entry.isIntersecting && !hasCreatedInitialResult) {
          setHasCreatedInitialResult(true);
          const res = createChatResult({
            variables: {
              text: messages.messagesList[0].text,
              name: messages.messagesList[0].name
                ? messages.messagesList[0].name
                : messages.messagesList[0].author,
              lessonId: lessonId,
              chatId: id,
            },
          });
          // Perform any actions you need when the component becomes visible
        }
      },
      {
        root: null,
        threshold: 0.1, // Trigger when 10% of the component is visible
      }
    );

    if (chatRef.current) {
      observer.observe(chatRef.current);
    }

    return () => {
      if (chatRef.current) {
        observer.unobserve(chatRef.current);
      }
    };
  }, [chatRef, hasCreatedInitialResult]);

  return (
    <>
      <Messages>
        {messages.messagesList.slice(0, num).map((m, i) => {
          if (m.author === "author") {
            return (
              <div key={i}>
                <Message
                  id={"messagee" + i + id}
                  key={i}
                  time={i}
                  role="author"
                  m={m}
                  me={me}
                  author={author}
                  passTextToBeTranslated={passTextToBeTranslated}
                />
                {console.log("author", author)}
                {m.reactions && m.reactions.length > 0 && (
                  <Reaction
                    reactions={m.reactions}
                    me={me}
                    author={author}
                    m={m}
                    author_image={m.image}
                    author_name={m.name}
                    initialQuestion={m.text}
                    lessonId={lessonId}
                    chatId={id}
                  />
                )}
                {m.isAiAssistantOn && (
                  <AiAssistant
                    id={id}
                    author={author}
                    me={me}
                    m={m}
                    library={library}
                    lessonId={lessonId}
                  />
                )}
              </div>
            );
          } else {
            return (
              <Message
                id={"message" + i + id}
                key={i}
                time={i}
                role="student"
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
      {showButton && !update && num < messages.messagesList.length && (
        <Next>
          <button
            onClick={async (e) => {
              if (props.story) {
                createChatResult({
                  variables: {
                    text: messages.messagesList[num].text,
                    name: messages.messagesList[num].name
                      ? messages.messagesList[num].name
                      : messages.messagesList[num].author,
                    lessonId: lessonId,
                    chatId: id,
                  },
                });
              }

              if (num == messages.messagesList.length - 1 && props.moveNext)
                props.moveNext(props.id);
              setNum(num + 1);
              props.passNum(num + 1);
            }}
          >
            {t("next")}
          </button>
        </Next>
      )}
    </>
  );
};

FixedChat.propTypes = {
  messages: PropTypes.shape({
    messagesList: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        name: PropTypes.string,
        author: PropTypes.string,
        reactions: PropTypes.array,
        isAiAssistantOn: PropTypes.bool,
      })
    ).isRequired,
  }).isRequired,
  me: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  lessonId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  library: PropTypes.object,
  isSecret: PropTypes.bool,
  moveNext: PropTypes.func,
  story: PropTypes.bool,
  passTextToBeTranslated: PropTypes.func,
};

export default FixedChat;
