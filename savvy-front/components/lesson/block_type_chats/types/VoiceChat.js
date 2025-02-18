import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";

import Message from "../functions/Message";
import Loading from "../../../layout/Loading";
import Transcribe from "../functions/Transcribe";
import { autoResizeTextarea } from "../../SimulatorDevelopmentFunctions";
import { MicroButton, Buttons } from "../../styles/DevPageStyles";

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

const Messages = styled.div`
  margin: 0 10px;
`;

const removePTags = (str) => str.replace(/<\/?p>/g, "");

const VoiceChat = ({ messages, me, id, author, flowFurther }) => {
  const [conversation, setConversation] = useState([messages.messagesList[0]]);
  const [generatingResponse, setGeneratingResponse] = useState(false);
  const [studentResponse, setStudentResponse] = useState("");
  const [isConversationOver, setIsConversationOver] = useState(false);

  const [audioSrc, setAudioSrc] = useState(null);
  const { t } = useTranslation("lesson");

  /**
   * Calls the /api/tts endpoint to generate speech from text.
   * @param {string} text - The text to convert to speech.
   */
  const fetchTTS = async (text) => {
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice: "fable" }),
      });

      if (!res.ok) throw new Error("TTS request failed");

      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);
      setAudioSrc(audioUrl);
      return audioUrl;
    } catch (err) {
      console.error("TTS Error:", err);
      return null;
    }
  };

  /**
   * Plays a sample TTS response.
   */
  // const testTTS = async () => {
  //   console.log(0, new Date());

  //   const sampleText = "Hey, I am Candy. How can I help?";
  //   const audioUrl = await fetchTTS(sampleText);
  //   console.log(1, new Date());
  //   if (audioUrl) {
  //     const audio = new Audio(audioUrl);

  //     audio.play();
  //   }
  // };

  const validateStatement = async (studentQuestion, chatTopic) => {
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

  // Helper function to check offensiveness using Perspective API
  const checkOffensiveness = async (text) => {
    // const apiKey = process.env.NEXT_PUBLIC_PERSPECTIVE_API_KEY; // ensure your API key is available
    const apiKey = "AIzaSyDwjkAYv_obPFZNgOWtZ_HZfH6oaiPJ_lo";
    const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${apiKey}`;
    const body = {
      comment: { text },
      languages: ["en"],
      requestedAttributes: { TOXICITY: {} },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      // Retrieve the toxicity score (value between 0 and 1)
      const score = data.attributeScores.TOXICITY.summaryScore.value;
      return score;
    } catch (error) {
      console.error("Error checking offensiveness:", error);
      return 0; // default to safe if an error occurs
    }
  };

  const generateResponse = async () => {
    setConversation((prevMessages) => [
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

      ## Your Personality
      ${JSON.stringify(messages.messagesList[1])}

      ## User Personality:
      ${JSON.stringify(messages.messagesList[2])}

      ## Dialogue History:
      ${JSON.stringify(conversation)}

      ## New User Input:
      ${studentResponse}

      ## Rules:
      1. React to the user input in accordance with this information: ${JSON.stringify(
        messages.messagesList[3]
      )}
      2. Answer in a natural, conversational tone. Keep it short and to the point.
      3. React in accordance with your Personality.

      Finally, respond in JSON:
      {
        "author": "author", // do not change this!
        "text": "... your answer ...",
        "name": "..."
        "image": "..."
        "validation": "yes" // if the New User Input aligns Expected User Input:
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

  const generateCommentToUnrelatedStatement = async () => {
    setConversation((prevMessages) => [
      ...prevMessages,
      {
        author: "student",
        text: studentResponse,
        name: me.name,
      },
    ]);
    // console.log("studentResponse", studentResponse);
    let offensivenessTest = await checkOffensiveness(studentResponse);
    // console.log("offensivenessTest", offensivenessTest);
    setStudentResponse("");

    const chatPrompt = `
      You are a character in a story.

      ## Your Personality:
      ${JSON.stringify(messages.messagesList[1])}

      ## Dialogue History:
      ${JSON.stringify(conversation)}

      ## New User Input:
      """ ${studentResponse}. """
      
      This response is ${
        offensivenessTest > 0.7
          ? "offensive and toxic"
          : "unexpected and unrelated"
      } to the conversation. React naturally according to your personality and to the situation. 
      For example:
        – If user says something impolite –> Don't be polite. Be angry! Show how irritated you are! Stop the conversation immediately.
        – If user says something threatening -> Don't be polite. Say that you are stopping the discussion immediately. Stop the conversation immediately.
        – If user says something unrelated to the discussion -> say that you can't help.
        - If the response is offensive or toxic, just say "bye, the conversation is over."

      Finally, respond in JSON:
      {
        "author": "author", // do not change this!
        "text": "... your reaction ...",
        "name": "..."
        "image": "..."
        "validation": "yes" // if the New User Input aligns Expected User Input:
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
        if (offensivenessTest > 0.7) {
          setIsConversationOver(true);
        }
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

  const getTranscribedText = async (text) => {
    const newMessage = {
      text: text,
      name: me.name,
      author: "student",
      image: me.image,
    };
    setConversation((prev) => [...prev, newMessage]);
    const generatedResponse = await generateResponse(text);
    const nextMessage = {
      text: generatedResponse.text,
      name: generatedResponse.name,
      author: "author",
      image: generatedResponse.image,
    };
    setConversation((prev) => [...prev, nextMessage]);
  };

  return (
    <>
      {console.log("conversation", conversation)}
      {/* {conversation[0].text !== "" && ( */}
      <Messages>
        {conversation
          .filter((m) => m.text !== "")
          .map((m, i) => {
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
      {/* )} */}

      {generatingResponse && <Loading />}
      {!isConversationOver && (
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
            <Buttons margin="0px" gap="0px">
              <MicroButton
                onClick={async (e) => {
                  setGeneratingResponse(true);
                  let generatedMessage;
                  let validationResult = await validateStatement(
                    studentResponse,
                    messages.messagesList[4].text
                  );
                  if (parseInt(validationResult.res) < 25) {
                    generatedMessage =
                      await generateCommentToUnrelatedStatement();
                  } else {
                    generatedMessage = await generateResponse();
                  }
                  let newMessage = JSON.parse(generatedMessage.result.content);
                  let haveFoundTheRightResponse = await validateStatement(
                    removePTags(newMessage.text),
                    removePTags(messages.messagesList[3].text)
                  );

                  if (
                    // parseInt(validationResult.res) > 25 &&
                    parseInt(haveFoundTheRightResponse.res) > 25
                  ) {
                    setIsConversationOver(true);
                    flowFurther();
                  }
                  setConversation((prevMessages) => [
                    ...prevMessages,
                    newMessage,
                  ]);
                  setGeneratingResponse(false);
                }}
              >
                {generatingResponse ? "..." : t("send")}
              </MicroButton>
            </Buttons>
          ) : null}
        </MessageRow>
      )}
      {/* <div>
        {console.log("conversation", conversation)}
        {conversation.map((m, i) => (
          <div key={i}>
            <Message role={m.author} m={m} me={me} />
            {m.audio && <audio controls autoPlay src={m.audio} />}
          </div>
        ))}
      </div> */}

      {/* {generatingResponse && <Loading />} */}

      {/* <MicroButton onClick={testTTS}>Test TTS</MicroButton> */}

      {/* <Transcribe passTranscribedText={getTranscribedText} /> */}
    </>
  );
};

VoiceChat.propTypes = {
  messages: PropTypes.shape({
    messagesList: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        name: PropTypes.string,
        author: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  me: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
};

export default VoiceChat;
