import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { useMutation, gql } from "@apollo/client";
import _ from "lodash";
import PropTypes from "prop-types"; // Add this import

import { generateDiscussion } from "../functions/AIChatFunctions";

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
`;

const DynamicChat = (props) => {
  const { messages, me, lessonId, id, author, library } = props;

  const chatRef = useRef(null);
  const { t } = useTranslation("lesson");

  // the logic benhind building a dynamic chat powered by GenAI
  // 1. The chat start with an opening message. Such a message only requires context to be generated
  // 2. Next messages are generated from context + previous messages + user input
  // 3. The chat is finished pnce a certain number of messages are generated
  // 4. The chat can be restarted by clicking on a button

  // Questions:
  // - How do we know when the chat is finished?
  // - Do we need different functions for starting the dialogue and continuing it?

  //   const [createChatResult, { data: data2, loading: loading2, error: error2 }] =
  //     useMutation(CREATE_CHATRESULT_MUTATION);

  //   useEffect(() => {
  //     const observer = new IntersectionObserver(
  //       ([entry]) => {
  //         if (props.story && entry.isIntersecting && !hasCreatedInitialResult) {
  //           setHasCreatedInitialResult(true);
  //           const res = createChatResult({
  //             variables: {
  //               text: messages.messagesList[0].text,
  //               name: messages.messagesList[0].name
  //                 ? messages.messagesList[0].name
  //                 : messages.messagesList[0].author,
  //               lessonId: lessonId,
  //               chatId: id,
  //             },
  //           });
  //           // Perform any actions you need when the component becomes visible
  //         }
  //       },
  //       {
  //         root: null,
  //         threshold: 0.1, // Trigger when 10% of the component is visible
  //       }
  //     );

  //     if (chatRef.current) {
  //       observer.observe(chatRef.current);
  //     }

  //     return () => {
  //       if (chatRef.current) {
  //         observer.unobserve(chatRef.current);
  //       }
  //     };
  //   }, [chatRef, hasCreatedInitialResult]);

  return (
    <Messages>
      <div>DynamicChat</div>
      <button
        onClick={async (e) => {
          let res = await generateDiscussion(messages.messagesList[0].text, []);
          console.log("res", res);
        }}
      >
        Start
      </button>
      {/* {messages.messagesList.slice(0, num).map((m, i) => {
        if (m.author === "author") {
          return (
            <>
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
            </>
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
      })} */}
    </Messages>
  );
};

DynamicChat.propTypes = {
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
  passTextToBeTranslated: PropTypes.func.isRequired,
};

export default DynamicChat;