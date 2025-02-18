// 7. Listening functionaluty

export const startListening = () => {
  const newRecognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition)();
  newRecognition.lang =
    guessAlphabet(question) == "Cyrillic" ? "ru-RU" : "en-US";
  newRecognition.interimResults = false;
  newRecognition.maxAlternatives = 1;

  newRecognition.start();
  setStartSpeech(true);

  newRecognition.onresult = function (event) {
    setAnswer(answer + " " + event.results[0][0].transcript);
  };

  newRecognition.onspeechend = function () {
    newRecognition.stop();
  };

  newRecognition.onerror = function (event) {
    console.error("Error occurred in recognition: " + event.error);
  };

  //   setRecognition(newRecognition);
};

export const stopListening = () => {
  //   setStartSpeech(false);

  if (recognition) {
    recognition.stop();
  }
};

export const getScore = (idea, overallResults) => {
  const resultObj =
    overallResults && overallResults.find((res) => res.idea == idea);
  if (resultObj && resultObj.result) {
    return parseFloat(resultObj.result).toFixed(0);
  }
  return "0";
};

export const getInputColor = (score, goalType) => {
  const numericScore = Number(score);
  if (goalType !== "ASSESS" && numericScore > 65) {
    return "#D0EADB";
  } else if (goalType !== "ASSESS" && numericScore < 65 && numericScore > 58) {
    return "#ffd166";
  } else {
    return "#F3F3F3";
  }
};
