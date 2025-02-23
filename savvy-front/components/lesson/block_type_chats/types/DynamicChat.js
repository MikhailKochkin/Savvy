import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types"; // Add this import
import Message from "../functions/Message"; // Add this import at the top of the Chat component file
import { autoResizeTextarea } from "../../SimulatorDevelopmentFunctions";
import { MicroButton, Buttons } from "../../styles/DevPageStyles";
import Transcribe from "../functions/Transcribe";
import Loading from "../../../layout/Loading";

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
  background: ${({ hasImage }) => (hasImage ? "#fff" : "#2f80ed")};
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

const Messages = styled.div``;

const DynamicChat = (props) => {
  const { messages, me, id, author, previousStories, characters } = props;
  const [dialogueMessages, setDialogueMessages] = useState([
    messages.messagesList[0],
  ]);
  const [studentResponse, setStudentResponse] = useState("");
  const [generatingResponse, setGeneratingResponse] = useState(false);
  const router = useRouter();

  const { t } = useTranslation("lesson");

  const assessHowRelatedQuestionIs = async (studentQuestion, chatTopic) => {
    let result;
    try {
      const response = await fetch(
        "https://arcane-refuge-67529.herokuapp.com/checker",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answer1: studentQuestion,
            answer2: chatTopic,
          }),
        }
      );

      result = await response.json();
      return result;
    } catch (error) {
      console.error("Error comparing main answer:", error);
    }
  };

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

      ## Your Private Knowledge
      ${JSON.stringify(messages.messagesList[1])}

      ## Rules:
      1. Do NOT reveal your private knowledge unless it is relevant to the user’s question.
      2. Never dump the entire private knowledge. Only share the relevant pieces.
      3. If the user's question is unrelated, respond with "Sorry, I can’t respond."
      4. Answer in a natural, conversational tone. Keep it short and to the point.

      ## Dialogue Context:
      ${previousStories}

      ## User Info:
      ${JSON.stringify(messages.messagesList[2])}

      ## Dialogue History:
      ${JSON.stringify(dialogueMessages)}

      ## New User Input:
      ${studentResponse}

      Finally, respond in JSON:
      {
        "author": "author", // do not change this!
        "text": "... your answer ...",
        "name": "..."
        "image": "...",
        "characterId": "..." // do not change this!
      }
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

  const addCommentToUnrelatedQuestion = async () => {
    setDialogueMessages((prevMessages) => [
      ...prevMessages,
      {
        author: "student",
        text: studentResponse,
        name: me.name,
      },
      {
        author: "author",
        text:
          router.locale == "ru"
            ? "Хм. Не могу сейчас ответить на этот вопрос... Могу чем-то еще помочь?"
            : "Sorry, I can’t respond. Can I help with anything else?",
        name: messages.messagesList[0].name,
        image: messages.messagesList[0].image,
        characterId: messages.messagesList[0].characterId,
      },
    ]);
    setStudentResponse("");
  };

  const getTranscribedText = async (text) => {
    setStudentResponse(text);
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
                characters={characters}
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
                characters={characters}
              />
            );
          }
        })}
      </Messages>
      {generatingResponse && <Loading />}
      <MessageRow>
        <IconBlock>
          <Icon className="icon2" hasImage={me.image !== null}>
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
        {!generatingResponse ? (
          <Buttons margin="0px" gap="0px" width="10%">
            <MicroButton
              onClick={async (e) => {
                setGeneratingResponse(true);
                let relationTestResult = await assessHowRelatedQuestionIs(
                  studentResponse,
                  messages.messagesList[3].text
                );
                if (parseInt(relationTestResult.res) < 25) {
                  await addCommentToUnrelatedQuestion();
                } else {
                  await generateStudentResponse();
                }
                setGeneratingResponse(false);
              }}
            >
              {generatingResponse ? "..." : t("send")}
            </MicroButton>
            {id == "cm6xixyfm0025sg0yrldhr80h" && (
              <Transcribe passTranscribedText={getTranscribedText} />
            )}
          </Buttons>
        ) : null}
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
