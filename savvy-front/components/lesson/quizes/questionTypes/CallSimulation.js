import { useState } from "react";
import styled, { keyframes } from "styled-components";
import parse from "html-react-parser";
import { set } from "lodash";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 450px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  position: relative; /* Add position relative to allow absolute positioning of children */
  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    position: relative; /* Add position relative to allow absolute positioning of the animation */
  }
  .name {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative; /* Ensure image stays on top of animation */
  z-index: 2; /* Ensure image is displayed on top of animation */
  border: 2px solid;
  background: 2px solid;
  border-color: ${(props) =>
    props.waves ? "rgba(112, 0, 255, 0.5);" : "white"};
`;

const waveAnimation = keyframes`
  0% { transform: scale(1); }
  5% { transform: scale(1.02); }
  10% { transform: scale(1.08); }
  15% { transform: scale(1.15); }
  20% { transform: scale(1.2); }
  25% { transform: scale(1.15); }
  30% { transform: scale(1.2); }
  35% { transform: scale(1.15); }
  40% { transform: scale(1.2); }
  45% { transform: scale(1.25); }
  50% { transform: scale(1.5); }
  55% { transform: scale(1.35); }
  60% { transform: scale(1.3); }
  65% { transform: scale(1.25); }
  70% { transform: scale(1.3); }
  75% { transform: scale(1.15); }
  80% { transform: scale(1.1); }
  85% { transform: scale(1.05); }
  90% { transform: scale(1.1); }
  95% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const WaveAnimation = styled.div`
  position: absolute;
  height: 200px;
  width: 200px;
  border-radius: 120px;
  background-color: rgba(
    112,
    0,
    255,
    0.1
  ); /* Change background color as per your preference */

  animation: ${waveAnimation} 2s ease-in-out infinite;
  z-index: 1; /* Ensure animation is displayed behind the image */
`;

const SimpleButton = styled.button`
  flex: 1;
  height: 40px;
  background: none;
  padding: 5px 10px;
  border: 2px solid #69696a;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #323334;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #f4f4f4;
  }
`;

const CallSimulation = (props) => {
  const [waves, setWaves] = useState(false);
  const [speaking, setSpeaking] = useState(false); // Track if speech is currently being spoken
  const [recording, setRecording] = useState(false); // Track if audio recording is in progress
  const [recognition, setRecognition] = useState(null);
  const [listening, setListening] = useState(false);

  const [answer, setAnswer] = useState(""); // The answer provided by the student

  const { author, question } = props;
  let speech;
  const lang = "en-US";

  const removeHtmlTags = (str) => {
    return str.replace(/<[^>]*>/g, ""); // Replace all HTML tags with an empty string
  };

  // Function to speak out the question
  const speakQuestion = () => {
    const cleanedQuestion = removeHtmlTags(question);
    const speech = new SpeechSynthesisUtterance(cleanedQuestion);
    const availableVoices = window.speechSynthesis.getVoices();
    const englishVoices = availableVoices.filter(
      (voice) => voice.lang === lang
    );
    if (englishVoices.length > 0) {
      const activeVoice = englishVoices.filter(
        (voice) => voice.name === "Aaron"
      )[0];
      console.log(activeVoice);
      speech.voice = activeVoice;
    } else {
      console.error("No English voices available");
    }

    speech.onend = () => {
      setWaves(false); // Set waves to false when speech ends
      setSpeaking(false); // Update state to indicate speech has stopped
    };

    window.speechSynthesis.speak(speech);

    setWaves(true); // Start wave animation
    setSpeaking(true); // Update state to indicate speech is being spoken
  };

  // Function to stop speech
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setWaves(false); // Stop wave animation
    setSpeaking(false); // Update state to indicate speech has stopped
  };

  const startListening = () => {
    setListening(true);
    const newRecognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)();
    newRecognition.lang = lang;
    newRecognition.interimResults = false;
    newRecognition.maxAlternatives = 1;

    newRecognition.start();
    // setStartSpeech(true);

    newRecognition.onresult = function (event) {
      setAnswer(answer + " " + event.results[0][0].transcript);
    };

    newRecognition.onspeechend = function () {
      newRecognition.stop();
    };

    newRecognition.onerror = function (event) {
      console.error("Error occurred in recognition: " + event.error);
    };

    setRecognition(newRecognition);
  };

  const stopListening = () => {
    setListening(false);

    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <Styles>
      <Container>
        <div className="image">
          {waves && <WaveAnimation />}
          <Image src={author.image} alt="author" />
        </div>
        <div className="name">
          {author.name} {author.surname}
        </div>
        <div className="question">
          {/* Display stop button only when speaking */}
          <SimpleButton onClick={(e) => startListening()} disabled={listening}>
            Start Listening
          </SimpleButton>
          <SimpleButton onClick={(e) => stopListening()} disabled={!listening}>
            Stop Listening
          </SimpleButton>
          <SimpleButton onClick={speakQuestion}>Start Answering</SimpleButton>
          {speaking && (
            <SimpleButton onClick={stopSpeaking}>Stop Speaking</SimpleButton>
          )}{" "}
          <div>Answer: {answer}</div>
        </div>
      </Container>
    </Styles>
  );
};

export default CallSimulation;
