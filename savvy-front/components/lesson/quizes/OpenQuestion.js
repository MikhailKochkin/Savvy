import { useState, useEffect, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { useRouter } from "next/router";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import parse from "html-react-parser";
import { InfinitySpin, TailSpin } from "react-loader-spinner";
import { useTranslation } from "next-i18next";
import smoothscroll from "smoothscroll-polyfill";
import { guessAlphabet, autoResizeTextarea } from "./quiz_functions";

const CREATE_QUIZRESULT_MUTATION = gql`
  mutation CREATE_QUIZRESULT_MUTATION(
    $answer: String
    $quiz: String
    $lessonId: String
    $correct: Boolean
    $comment: String
    $hint: String
    $explanation: String
    $improvement: String
    $ideasList: QuizIdeas
  ) {
    createQuizResult(
      answer: $answer
      quiz: $quiz
      lessonId: $lessonId
      correct: $correct
      comment: $comment
      hint: $hint
      explanation: $explanation
      improvement: $improvement
      ideasList: $ideasList
    ) {
      id
    }
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 20px;
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .icon {
    margin: 5px;
    border-radius: 50%;
    height: 55px;
    width: 55px;
    display: flex;
    object-fit: cover;

    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .icon2 {
    margin: 5px;
    border-radius: 50%;
    background: #cb2d3e; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      #ef473a,
      #cb2d3e
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      #ef473a,
      #cb2d3e
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

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
  }
  .name {
    font-size: 1.2rem;
    text-align: center;
    color: #8f93a3;
    max-width: 80px;
    margin: 0 7px;
  }
`;

const Question = styled.div`
  display: flex;
  flex-direction: column;
  flex: 50%;
  margin-bottom: 3%;
  margin-top: ${(props) => (props.story ? "2%" : "0%")};

  p {
    margin: 5px 0;
  }
  a {
    border-bottom: 2px solid #26ba8d;
    padding: 0%;
    transition: 0.3s;
    cursor: pointer;
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
  .question_box {
    display: flex;
    background: #ffffff;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 20px;

    /* Add slide-in animation from bottom */
    opacity: 0;
    transform: translateY(30px); /* Start below */

    animation: animate-slide-in-from-bottom 0.8s forwards;

    /* Animation from the bottom */
    @keyframes animate-slide-in-from-bottom {
      0% {
        opacity: 0;
        transform: translateY(50px); /* Start below */
      }
      50% {
        transform: translateY(-10px); /* Move up */
      }
      100% {
        opacity: 1;
        transform: translateY(0); /* Rest position */
      }
    }
  }
  .question_name {
    margin-left: 5px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2% 3%;
    height: 55px;
    width: 55px;
    object-fit: cover;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .question_text {
    background: #f3f3f3;
    color: black;
    border-radius: 25px;
    padding: 2% 5%;
    min-width: 40%;
    max-width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .answer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .answer_name {
    margin-right: 10px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2%;
    height: 55px;
    width: 55px;
    object-fit: cover;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .answer_test {
    width: 50%;
    border: 2px solid;
    border-color: #f3f3f3;
    border-radius: 25px;
    padding: 2% 5%;
    margin-bottom: 20px;
  }
  button {
    width: 30%;
    padding: 2%;
    margin-top: 5%;
  }
  @media (max-width: 800px) {
    padding: 0%;
    margin-bottom: 5%;
    button {
      width: 50%;
      padding: 3%;
    }
    .video {
      height: 356px;
      width: 200px;
    }
  }
`;

const Answer_text = styled.textarea`
  height: 120px;
  min-width: 60%;
  max-width: 70%;
  border: 2px solid;
  border: ${(props) =>
    props.inputColor == "#D0EADB" ? "3px solid" : "2px solid"};
  border-color: ${(props) => props.inputColor};
  outline: 0;
  resize: none;
  border-radius: 25px;
  padding: 3% 4%;
  line-height: 1.8;
  font-family: Montserrat;
  font-size: 1.6rem;
  margin-bottom: 20px;
`;

const Group = styled.div`
  flex-direction: row;
  justify-content: center;
  background: ${(props) => props.inputColor};
  width: 100%;
  pointer-events: ${(props) => (props.progress === "true" ? "none" : "auto")};
  display: ${(props) => (props.correct === "true" ? "none" : "flex")};
  padding: 0.5% 0;
  margin-bottom: 20px;
`;

const Group2 = styled.div`
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  background: ${(props) => props.inputColor};
  width: 90%;
  pointer-events: auto;
  display: flex;
  padding: 0.5% 0;
  margin-bottom: 20px;
`;

const Button1 = styled.div`
  min-width: 200px;
  line-height: 1.6;
  margin-right: 20px;
  text-align: left;
  background: #d2edfd;
  border-radius: 5px;
  padding: 10px 30px;
  margin-bottom: 15px;
  /* height: 45px; */
  cursor: pointer;
  color: #000a60;
  border: none;
  white-space: nowrap;
  font-size: 1.6rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: ${(props) => (props.correct === "true" ? "none" : "flex")};
  pointer-events: ${(props) => (props.correct === "true" ? "none" : "auto")};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #a5dcfe;
  }
  @media (max-width: 800px) {
    min-width: 100px;
    margin-right: 10px;
    padding: 10px 15px;
    height: auto;

    white-space: normal;
    text-align: left;
  }
`;

const Progress = styled.div`
  display: ${(props) => (props.display === "true" ? "flex" : "none")};
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Progress2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 10px;
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  cursor: pointer;
  transition: ease-in 0.4s;
  &:hover {
    border: 1px solid blue;
  }
  @media (max-width: 800px) {
    margin-left: 5px;
    display: none;
  }
`;

const OpenQuestion = (props) => {
  const { author, me, story, ifRight, ifWrong, quizId } = props;
  const [answer, setAnswer] = useState(""); // The answer provided by the student
  const [correct, setCorrect] = useState(""); // is the answer by the student correct?
  const [hidden, setHidden] = useState(true); // is the answer to the question hidden?
  const [hint, setHint] = useState(null); // give the hint to the student
  const [progress, setProgress] = useState("false");
  const [inputColor, setInputColor] = useState("#f3f3f3");
  const [isExperienced, setIsExperienced] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [startSpeech, setStartSpeech] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatingExplanation, setGeneratingExplanation] = useState(false);
  const [generatingImprovement, setGeneratingImprovement] = useState(null); // give the hint to the student
  const [AIhint, setAIHint] = useState(""); // give the hint to the student
  const [AIExplanation, setAIExplanation] = useState("");
  const [AIImprovement, setAIImprovement] = useState("");

  const { passResult } = props;
  const router = useRouter();

  const [createQuizResult, { data, loading, error }] = useMutation(
    CREATE_QUIZRESULT_MUTATION
  );

  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });

  const { t } = useTranslation("lesson");

  const getHint = async (event) => {
    event.preventDefault();
    setGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
          You are a law professor. You help your student answer this question ${
            props.question
          }
          The correct answer is:  ${props.answer}
          Give a hint to the student in a Socratic manner what is the correct answer to help them answer the question. Do not use the words from the correct answer.
          Answer in ${
            router.locale == "ru" ? "Russian" : "English"
          }. Answer in second person.`,
          //  Make the answer at least 3 sentences long.
          // The mentor's comment is: ${props.ifWrong}
        }),
      });

      if (response.status !== 200) {
        throw (
          (await response.json()).error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      const data = await response.json();
      if (data.result.content) {
        setAIHint(data.result.content);
      } else {
        setAIHint("Sorry, you are on your own");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    setGenerating(false);
  };

  const getExplanation = async (event) => {
    event.preventDefault();
    setGeneratingExplanation(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
          You are a law professor. You ask your student the question: ${
            props.question
          }
          Your student's answer is: ${answer}. It is not correct.
          Use the information about the correct answer:${props.answer}
          and information from the lesson: ${props.ifWrong} to
          explain in 3 sentences why this answer is incorrect in comparison to the correct answer. Give hints on how to make the answer better. Write in second person. Adress the student as "you". 
          DO NOT USE the words from the correct answer!!! Be very polite and careful.
          Answer in ${
            router.locale == "ru" ? "Russian" : "English"
          }Make the answer at least 2 sentences long.`,
        }),
      });

      if (response.status !== 200) {
        throw (
          (await response.json()).error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      const data = await response.json();
      if (data.result.content) {
        setAIExplanation(data.result.content);
      } else {
        setAIExplanation("Sorry, you are on your own");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    setGeneratingExplanation(false);
  };

  const getImprovements = async (event) => {
    event.preventDefault();
    setGeneratingImprovement(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
          You are a mentor and a teacher. You ask your student the question: ${
            props.question
          }
          The correct answer is:  ${props.answer}. 
          The mentor's comment is: ${ifWrong}
          Your student's answer is: ${answer}
          Explain in 3 sentences how this answer can be improved using the correct answer as the foundation. 
          Write in second person. Adress the student as "you". Do not use the words from the correct answer.
          Answer in ${
            router.locale == "ru" ? "Russian" : "English"
          }Make the answer at least 3 sentences long.`,
        }),
      });

      if (response.status !== 200) {
        throw (
          (await response.json()).error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      const data = await response.json();
      if (data.result.content) {
        setAIImprovement(data.result.content);
      } else {
        setAIImprovement("Sorry, we are disconnected.");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    setGeneratingImprovement(false);
  };

  const getMoreImprovements = async (event) => {
    event.preventDefault();
    setGeneratingImprovement(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
          You are a mentor and a teacher. 
          Use this script: ${props.ifRight} to improve the student's answer.
          Your student's answer is: ${answer}
          The initial question is: ${props.question}
          Write in second person. Adress the student as "you".
          Answer in ${
            router.locale == "ru" ? "Russian" : "English"
          }Make the answer at least 3 sentences long.`,
        }),
      });

      if (response.status !== 200) {
        throw (
          (await response.json()).error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      const data = await response.json();
      if (data.result.content) {
        setAIImprovement(data.result.content);
      } else {
        setAIImprovement("Sorry, we are disconnected.");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    setGeneratingImprovement(false);
  };

  const onAnswer = async (e) => {
    setProgress("true");
    let data1 = {
      answer1: props.answer.toLowerCase(),
      answer2: answer.toLowerCase(),
    };
    if (props.check === "WORD") {
      if (props.answer.toLowerCase() === answer.toLowerCase()) {
        if (!isExperienced) {
          props.getResults(2);
          setIsExperienced(true);
        }
        setCorrect("true");
        if (props.goalType !== "ASSESS")
          setInputColor("rgba(50, 172, 102, 0.25)");
        passResult("true");
      } else {
        setCorrect("false");
        if (props.goalType !== "ASSESS")
          setInputColor("rgba(222, 107, 72, 0.5)");
        passResult("false");
      }
    } else {
      const r = await fetch(
        "https://arcane-refuge-67529.herokuapp.com/checker",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data1),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          console.log("res.res", res.res);
          if (parseFloat(res.res) > 65) {
            setCorrect("true");
            passResult("true");
            if (props.goalType !== "ASSESS") {
              setInputColor("rgba(50, 172, 102, 0.25)");
            }
            createQuizResult({
              variables: {
                quiz: props.quizId,
                lessonId: props.lessonId,
                answer: answer,
                correct: true,
                hint: AIhint,
                explanation: AIExplanation,
                improvement: AIImprovement,
                comment: `Result: ${parseFloat(res.res)}%`,
              },
            });
          } else if (parseFloat(res.res) > 58 && parseFloat(res.res) <= 65) {
            setCorrect("looks_true");
            if (props.goalType !== "ASSESS") setInputColor("#ffd166");
            passResult("true");
            if (typeof res.comment === "string") {
              if (router.locale == "ru") {
                setHint(res.comment);
              } else {
                if (res.comment == "Дайте более развернутый ответ") {
                  setHint("Try giving a more detailed answer.");
                } else {
                  setHint("Try giving a shorter answer.");
                }
              }
            }
            createQuizResult({
              variables: {
                quiz: props.quizId,
                lessonId: props.lessonId,
                answer: answer,
                correct: true,
                hint: AIhint,
                explanation: AIExplanation,
                improvement: AIImprovement,
                comment: `Looks true: ${parseFloat(res.res)}%`,
              },
            });
          } else {
            setCorrect("false");
            if (props.goalType !== "ASSESS")
              setInputColor("rgba(222, 107, 72, 0.5)");
            if (typeof res.comment === "string") {
              if (router.locale == "ru") {
                setHint(res.comment);
              } else {
                if (res.comment == "Дайте более развернутый ответ") {
                  setHint("Try giving a more detailed answer.");
                } else {
                  setHint("Try giving a shorter answer.");
                }
              }
            }
            createQuizResult({
              variables: {
                quiz: props.quizId,
                lessonId: props.lessonId,
                answer: answer,
                correct: false,
                hint: AIhint,
                explanation: AIExplanation,
                improvement: AIImprovement,
                comment: `Result: ${parseFloat(res.res)}%`,
              },
            });
            passResult("false");
          }
        })
        .catch((err) => console.log(err));
    }
    setProgress("false");
  };

  const removeSpecialChars = (text) => {
    // Define the pattern to match the specified characters
    const pattern = /[\[\]\|*<>]/g;
    // Replace all matches of the pattern in the text with an empty string
    const result = text.replace(pattern, "");
    return result;
  };

  const startListening = () => {
    const newRecognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)();
    newRecognition.lang =
      guessAlphabet(props.question) == "Cyrillic" ? "ru-RU" : "en-US";
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

    setRecognition(newRecognition);
  };

  const stopListening = () => {
    setStartSpeech(false);

    if (recognition) {
      recognition.stop();
    }
  };

  const slide = () => {
    var my_element = document.getElementById(`ideal_answer_${props.id}`);
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <Question story={story}>
      {/* 2.1 Question part */}
      <div className="question_box">
        <div className="question_text">{parse(props.question)}</div>
        <IconBlock>
          {author && author.image != null ? (
            <img className="icon" src={author.image} />
          ) : (
            <img className="icon" src="../../static/hipster.svg" />
          )}{" "}
          <div className="name">
            {author && author.name ? author.name : "BeSavvy"}
          </div>
        </IconBlock>{" "}
      </div>
      {generating && (
        <Progress2>
          <TailSpin width="50" color="#2E80EC" />
        </Progress2>
      )}
      {/* 2.2 If AI hint */}
      {AIhint && (
        <div className="question_box">
          <div className="question_text">
            <p>{AIhint}</p>
          </div>
          <IconBlock>
            {author && author.image != null ? (
              <img className="icon" src={author.image} />
            ) : (
              <img className="icon" src="../../static/hipster.svg" />
            )}{" "}
            <div className="name">
              {author && author.name ? author.name : "BeSavvy"}
            </div>
          </IconBlock>
        </div>
      )}
      {/* 3. Answer bubble part */}
      <>
        <div className="answer">
          <IconBlock>
            <div className="icon2">
              {me && me.image ? (
                <img className="icon" src={me.image} />
              ) : me.surname ? (
                `${me.name[0]}${me.surname[0]}`
              ) : (
                `${me.name[0]}${me.name[1]}`
              )}
            </div>{" "}
            <div className="name">{me.name}</div>
          </IconBlock>{" "}
          <Answer_text
            type="text"
            required
            inputColor={inputColor}
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              autoResizeTextarea(e);
            }}
            onInput={autoResizeTextarea}
            placeholder="..."
          />
        </div>
        {startSpeech && <Group>{<p>📣 {t("start_speaking")}..</p>}</Group>}
        <Progress display={progress}>
          <InfinitySpin width="200" color="#2E80EC" />
        </Progress>
        <Group progress={progress} correct={correct}>
          <Button1
            inputColor={inputColor}
            onClick={async (e) => {
              e.preventDefault();
              const res = await onAnswer();
              setProgress("false");
            }}
            correct={correct}
          >
            {t("check")}
          </Button1>
          {props.goalType !== "ASSESS" && (
            <Button1
              inputColor={inputColor}
              onClick={async (e) => {
                e.preventDefault();
                getHint(e);
              }}
              correct={correct}
            >
              {AIhint && AIhint.length > 0
                ? t("i_need_another_hint")
                : t("i_need_a_hint")}
            </Button1>
          )}
          <Circle onClick={startListening}>
            <BiMicrophone
              className="icon"
              value={{ className: "react-icons" }}
            />
          </Circle>
          <Circle onClick={stopListening} disabled={!recognition}>
            <BiMicrophoneOff
              className="icon"
              value={{ className: "react-icons" }}
            />
          </Circle>
        </Group>
      </>
      {/* 4. Reaction to answer part */}
      {/* 4.1 If true / looks true */}
      {(correct === "true" || correct === "looks_true") &&
        props.goalType !== "ASSESS" && (
          <>
            <div className="question_box">
              <div className="question_text">
                {correct === "true" && "🎉 " + t("correct") + "!"}
                {correct === "looks_true" && hint !== null && hint !== 0 && (
                  <p>{hint}</p>
                )}
                {correct === "looks_true" && "👋 " + t("looks_true")}
              </div>
              <IconBlock>
                {author && author.image != null ? (
                  <img className="icon" src={author.image} />
                ) : (
                  <img className="icon" src="../../static/hipster.svg" />
                )}{" "}
                <div className="name">
                  {author && author.name ? author.name : "BeSavvy"}
                </div>
              </IconBlock>
            </div>
          </>
        )}
      {/* 4.2 If false */}
      {correct === "false" && (
        <>
          <div className="question_box">
            <div className="question_text">
              {props.goalType !== "ASSESS" && "🔎  " + t("wrong") + "..."}
              {hint !== null && hint !== 0 && props.goalType !== "ASSESS" && (
                <p>{hint}</p>
              )}
              {props.goalType == "ASSESS" && <p>{t("saved_answer")}</p>}
              {/* <p>{ifWrong && ifWrong !== "<p></p>" && parse(ifWrong)} </p> */}
            </div>
            <IconBlock>
              {author && author.image != null ? (
                <img className="icon" src={author.image} />
              ) : (
                <img className="icon" src="../../static/hipster.svg" />
              )}{" "}
              <div className="name">
                {author && author.name ? author.name : "BeSavvy"}
              </div>
            </IconBlock>
          </div>
        </>
      )}

      {/* 5. Show correct answer button */}

      {!props.challenge && correct !== "" && props.goalType !== "ASSESS" && (
        <>
          <div className="answer">
            <IconBlock>
              <div className="icon2">
                {me && me.image ? (
                  <img className="icon" src={me.image} />
                ) : me.surname ? (
                  `${me.name[0]}${me.surname[0]}`
                ) : (
                  `${me.name[0]}${me.name[1]}`
                )}
              </div>{" "}
              <div className="name">{me.name}</div>
            </IconBlock>{" "}
            {/* {correct == "false" && ( */}
            <Options>
              <Group2 progress={progress} correct={correct}>
                {correct == "false" && (
                  <Button1
                    onClick={async (e) => {
                      e.preventDefault();
                      setAIExplanation("...");
                      getExplanation(e);
                    }}
                  >
                    {t("explain_what_is_wrong_with_my_answer")}
                  </Button1>
                )}
                {correct == "looks_true" && (
                  <Button1
                    onClick={async (e) => {
                      e.preventDefault();
                      getImprovements(e);
                    }}
                  >
                    {t("what_can_i_improve")}
                  </Button1>
                )}
                <Button1
                  onClick={async (e) => {
                    e.preventDefault();
                    setHidden(false);
                    slide();
                  }}
                >
                  {t("show_an_ideal_answer")}
                </Button1>
                {correct == "true" && ifRight && (
                  <Button1
                    onClick={async (e) => {
                      e.preventDefault();
                      getMoreImprovements(e);
                    }}
                  >
                    {t("more_improvements")}
                  </Button1>
                )}
              </Group2>
            </Options>
          </div>
          {generatingExplanation && (
            <Progress2>
              <TailSpin width="50" color="#2E80EC" />
            </Progress2>
          )}
          {AIExplanation && correct !== "true" && (
            <div className="question_box">
              <div className="question_text">
                <p>{AIExplanation}</p>
              </div>
              <IconBlock>
                {author && author.image != null ? (
                  <img className="icon" src={author.image} />
                ) : (
                  <img className="icon" src="../../static/hipster.svg" />
                )}{" "}
                <div className="name">
                  {author && author.name ? author.name : "BeSavvy"}
                </div>
              </IconBlock>
            </div>
          )}
          {generatingImprovement && (
            <Progress2>
              <TailSpin width="50" color="#2E80EC" />
            </Progress2>
          )}
          {AIImprovement && (correct == "true" || correct == "looks_true") && (
            <div className="question_box">
              <div className="question_text">
                <p>{AIImprovement}</p>
              </div>
              <IconBlock>
                {author && author.image != null ? (
                  <img className="icon" src={author.image} />
                ) : (
                  <img className="icon" src="../../static/hipster.svg" />
                )}{" "}
                <div className="name">
                  {author && author.name ? author.name : "BeSavvy"}
                </div>
              </IconBlock>
            </div>
          )}
        </>
      )}
      {/* 6. Show correct answer bubble */}
      <div id={`ideal_answer_${props.id}`}></div>
      {!hidden && (
        <div className="question_box">
          <div className="question_text">
            <b>{t("correct_answer")}:</b>{" "}
            {parse(removeSpecialChars(props.answer))}
            {ifRight && ifRight !== "<p></p>" && parse(ifRight)}{" "}
          </div>
          <IconBlock>
            {author && author.image != null ? (
              <img className="icon" src={author.image} />
            ) : (
              <img className="icon" src="../../static/hipster.svg" />
            )}{" "}
            <div className="name">
              {author && author.name ? author.name : "BeSavvy"}
            </div>
          </IconBlock>{" "}
        </div>
      )}
    </Question>
  );
};

export default OpenQuestion;
