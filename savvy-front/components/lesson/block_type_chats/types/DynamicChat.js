import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import PropTypes from "prop-types"; // Add this import
import Message from "../functions/Message"; // Add this import at the top of the Chat component file
import { autoResizeTextarea } from "../../SimulatorDevelopmentFunctions";
import { MicroButton } from "../../styles/DevPageStyles";
import Loading from "../../../layout/Loading";

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

const MessageRow = styled.div`
  display: flex;
  transition: 0.2s ease-out;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 20px;
  /* Add slide-in animation */
  opacity: 0;
  transform: translateX(-50px);
  animation: animate-slide-in-from-left 0.8s forwards;
  /* Animation from the right */
  @keyframes animate-slide-in-from-right {
    0% {
      opacity: 0;
      transform: translateX(70px);
    }
    50% {
      transform: translateX(-30px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Animation from the left */
  @keyframes animate-slide-in-from-left {
    0% {
      opacity: 0;
      transform: translateX(-70px);
    }
    50% {
      transform: translateX(30px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

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
      margin: 5px 0;
      &.button_box {
        margin: 30px 0;
        display: flex;
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
      font-size: 1.6rem;
    }
  }

  .student_text {
    width: 60%;
    background: #fff;
    outline: 0;

    padding: 0px 15px;

    margin-bottom: 20px;
    textarea {
      padding: 15px;
      width: 100%;
      outline: 0;
      border: 2px solid #e5e5e5;
      border-radius: 20px;
      font-size: 1.6rem;
      font-weight: 500;
      font-family: Montserrat;
      resize: none;
      margin-bottom: 10px;
      line-height: 1.6;
    }
    @media (max-width: 800px) {
      font-size: 1.6rem;
    }
  }
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
    line-height: 1.4;
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

const Messages = styled.div`
  margin: 0 10px;
`;

const DynamicChat = (props) => {
  const { messages, me, id, author } = props;
  const [dialogueMessages, setDialogueMessages] = useState([
    messages.messagesList[0],
  ]);
  const [studentResponse, setStudentResponse] = useState("");
  const [generatingResponse, setGeneratingResponse] = useState(false);

  const generateStudentResponse = async () => {
    setDialogueMessages((prevMessages) => [
      ...prevMessages,
      {
        author: "student",
        text: studentResponse,
        name: me.name,
      },
    ]);
    setStudentResponse("");

    const chatPrompt = `
      You are a character in a story. 
      This is your description and all the knowledge you have (your knowledge hub): "${
        messages.messagesList[1]
      }". When asnwering any questions, stick strictly to the knowledge you have.

      Allowed topics are: Biology and Chemistry.
      You are talking to the user: """${me.name}"""
      Your dialogue history is: """${JSON.stringify(dialogueMessages)}"""

      The student's response or question is: """${studentResponse}"""

      If the answer to the student question is within the allowed topics, generate and return in JSON format a new message based on the student's response/questions and the current dialogue messages.
      if the naswer is not within the allowed topics, return a message: "Sorry, I can;t respond".

      The result must look like this:

      {
        "author": "author",
        "text": "" // response generated by the AI,
        "name": "" // name of the character,
      },

    `;

    try {
      const response = await fetch("/api/generateJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: chatPrompt }),
      });
      const data = await response.json();
      if (response.ok) {
        let newMessage = JSON.parse(data.result.content);
        console.log("newMessage", newMessage);
        setDialogueMessages((prevMessages) => [...prevMessages, newMessage]);
        return data;
      } else {
        throw new Error(
          data.error.message || "An error occurred during your request."
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <Messages>
        {dialogueMessages.map((m, i) => {
          if (m.author === "author") {
            return (
              <Message
                id={"messagee" + i + id}
                key={i}
                time={i}
                role="author"
                m={m}
                me={me}
                author={author}
              />
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
              />
            );
          }
        })}
      </Messages>
      {generatingResponse && <Loading />}
      <MessageRow>
        <IconBlock>
          <Icon className="icon2" background={"student"}>
            {me.image && <img className="icon" src={me.image} />}
          </Icon>
          <div className="name">{me.name}</div>
        </IconBlock>
        <div className="student_text">
          <textarea
            placeholder={""}
            value={studentResponse}
            onChange={(e) => {
              setStudentResponse(e.target.value);
              autoResizeTextarea(e);
            }}
          />
        </div>
        <MicroButton
          onClick={async (e) => {
            setGeneratingResponse(true);
            await generateStudentResponse();
            setGeneratingResponse(false);
          }}
        >
          {generatingResponse ? "..." : "Send"}
        </MicroButton>
      </MessageRow>
    </>
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
