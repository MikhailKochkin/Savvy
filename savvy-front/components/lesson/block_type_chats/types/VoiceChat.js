import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import Message from "../functions/Message";
import { MicroButton } from "../../styles/DevPageStyles";
import Loading from "../../../layout/Loading";
import Transcribe from "../functions/Transcribe";

const VoiceChat = ({ messages, me, id, author }) => {
  const [conversation, setConversation] = useState([messages.messagesList[0]]);
  const [generatingResponse, setGeneratingResponse] = useState(false);
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
  const testTTS = async () => {
    console.log(0, new Date());

    const sampleText = "Hey, I am Candy. How can I help?";
    const audioUrl = await fetchTTS(sampleText);
    console.log(1, new Date());
    if (audioUrl) {
      const audio = new Audio(audioUrl);

      audio.play();
    }
  };

  const generateResponse = async (text) => {
    const chatPrompt = `
        You are a character in a story. 

        **Your Role:**  
        - This is your description and all the knowledge you possess (your knowledge hub): "${JSON.stringify(
          messages.messagesList[1]
        )}".
        – Allowed topics are those within the context of the dialogue
        - When answering any questions, stick strictly to the knowledge provided.  

        **User Information:**  
        - Details about the user you are talking to: "${JSON.stringify(
          messages.messagesList[2]
        )}".
        - You are speaking with the user named: """${me.name}""".
        – Make it super short: no more than 2 senten

        **Context:**  

        - The student's question or response is: """${text}""".

        **Instructions:**  
        1. If the student's question or response relates to the allowed topics, generate a reply using the information from your knowledge hub and the dialogue history.  
        2. Provide the response in JSON format as follows:  
          {
            "author": "author",
            "text": "" // Response generated by the AI based on the student's input,
            "name": "" // Name of the character,
            "image": "" // URL of the image of the character
          }
        3. If the question is outside the allowed topics, respond with the message: "Sorry, I can’t respond."  
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
        // setDialogueMessages((prevMessages) => [...prevMessages, newMessage]);
        return newMessage;
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
    console.log("newMessage", newMessage);
    setConversation((prev) => [...prev, newMessage]);
    const generatedResponse = await generateResponse(text);
    console.log("generatedResponse", generatedResponse);
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
      <div>
        {console.log("conversation", conversation)}
        {conversation.map((m, i) => (
          <div key={i}>
            <Message role={m.author} m={m} me={me} />
            {m.audio && <audio controls autoPlay src={m.audio} />}
          </div>
        ))}
      </div>

      {generatingResponse && <Loading />}

      <MicroButton onClick={testTTS}>Test TTS</MicroButton>

      <Transcribe passTranscribedText={getTranscribedText} />
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
