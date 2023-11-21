import { useState, useEffect, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { useRouter } from "next/router";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import parse from "html-react-parser";
import { InfinitySpin, TailSpin } from "react-loader-spinner";
import { useTranslation } from "next-i18next";
import smoothscroll from "smoothscroll-polyfill";

import DeleteSingleQuiz from "../../delete/DeleteSingleQuiz";
import UpdateQuiz from "./UpdateQuiz";
import { CURRENT_USER_QUERY } from "../../User";
import Chat from "../questions/Chat";
import NextQuestions from "./NextQuestions";

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

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: 650px;
  min-width: 510px; */
  width: 570px;
  font-weight: 500;
  margin-bottom: 3%;
  font-size: 1.6rem;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    font-size: 1.6rem;
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  /* min-width: 60%;
  max-width: 80%; */
  width: 100%;
  margin-bottom: 20px;
  /* border: 1px solid blue; */
`;

const Option = styled.div`
  display: inline-block;
  vertical-align: middle;
  border: 1px solid #c4c4c4;
  padding: 10px 15px;
  cursor: pointer;
  margin-right: 3%;
  margin-bottom: 2%;
  height: 50px;
  transition: 0.3s;
  &:hover {
    border: 1px solid #3f51b5;
  }
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

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const Ideas = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
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

const Block = styled.div`
  display: ${(props) => (props.display === "true" ? "block" : "none")};
  #comment {
    margin-bottom: 2%;
  }
`;

const SingleQuiz = (props) => {
  const [answer, setAnswer] = useState(""); // The answer provided by the student
  const [correct, setCorrect] = useState(""); // is the answer by the student correct?
  const [ideas, setIdeas] = useState([""]);
  const [nextQuestions, setNextQuestions] = useState();
  const [correctIdeas, setCorrectIdeas] = useState([]);
  const [update, setUpdate] = useState(false);
  const [comment, setComment] = useState();
  const [sent, setSent] = useState(false);
  const [hidden, setHidden] = useState(true); // is the answer to the question hidden?
  const [hint, setHint] = useState(null); // give the hint to the student
  const [showComment, setShowComment] = useState(false); // give the comment to the answer of the student
  const [progress, setProgress] = useState("false");
  const [inputColor, setInputColor] = useState("#f3f3f3");
  const [isExperienced, setIsExperienced] = useState(false);
  const [message, setMessage] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [startSpeech, setStartSpeech] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatingExplanation, setGeneratingExplanation] = useState(false);
  const [generatingImprovement, setGeneratingImprovement] = useState(null); // give the hint to the student
  const [AIhint, setAIHint] = useState(""); // give the hint to the student
  const [AIExplanation, setAIExplanation] = useState("");
  const [AIImprovement, setAIImprovement] = useState("");
  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });

  const [createQuizResult, { data, loading, error }] = useMutation(
    CREATE_QUIZRESULT_MUTATION
  );

  const { t } = useTranslation("lesson");
  const router = useRouter();

  const slide = () => {
    var my_element = document.getElementById(`ideal_answer_${props.id}`);
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  function guessAlphabet(str) {
    // Removing <p> at the beginning of the string if it exists
    if (str.startsWith("<p>")) {
      str = str.slice(3);
    }

    // Limiting the check to the first 5 characters
    for (let i = 0; i < Math.min(str.length, 5); i++) {
      let code = str.charCodeAt(i);
      if (code >= 65 && code <= 122) return "Latin";
      if (code >= 1040 && code <= 1103) return "Cyrillic";
    }

    return "Unknown";
  }

  function handleIdeaChange(event, index) {
    // Copy the current state of ideas
    const updatedIdeas = [...ideas];

    // Update the idea at the specific index with the new value
    updatedIdeas[index] = event.target.value;

    // Update the state with the modified ideas array
    setIdeas(updatedIdeas);
  }

  const getHint = async (event) => {
    event.preventDefault();
    // setGenerating(true);
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
          explain in 3 sentences why this answer is incorrect in comparison to the correct answer. Write in second person. Adress the student as "you". 
          Do not use the words from the correct answer. Be very polite and careful.
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
          The mentor's comment is: ${props.ifWrong}
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
        onMove("true");
      } else {
        setCorrect("false");
        if (props.goalType !== "ASSESS")
          setInputColor("rgba(222, 107, 72, 0.5)");
        onMove("false");
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
          if (parseFloat(res.res) > 65) {
            setCorrect("true");
            onMove("true");
            if (props.goalType !== "ASSESS")
              setInputColor("rgba(50, 172, 102, 0.25)");
            createQuizResult({
              variables: {
                quiz: props.quizID,
                lessonId: props.lessonID,
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
            onMove("true");
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
                quiz: props.quizID,
                lessonId: props.lessonID,
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
                quiz: props.quizID,
                lessonId: props.lessonID,
                answer: answer,
                correct: false,
                hint: AIhint,
                explanation: AIExplanation,
                improvement: AIImprovement,
                comment: `Result: ${parseFloat(res.res)}%`,
              },
            });
            onMove("false");
          }
        })
        .catch((err) => console.log(err));
    }
    setProgress("false");
  };

  const onSend = async (e) => {
    setProgress("true");
    let data1 = {
      answer1: props.answer.toLowerCase(),
      answer2: answer.toLowerCase(),
    };
    if (props.check === "WORD") {
      if (props.answer.toLowerCase() === answer.toLowerCase()) {
        setCorrect("true");
        onMove("true");
      } else {
        setCorrect("false");
        onMove("false");
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
          if (parseFloat(res.res) > 70) {
            setCorrect("true");
            onMove("true");
          } else if (parseFloat(res.res) > 60 && parseFloat(res.res) <= 70) {
            setCorrect("looks_true");
            onMove("true");
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
                quiz: props.quizID,
                lessonId: props.lessonID,
                answer: answer,
                correct: true,
                hint: AIhint,
                explanation: AIExplanation,
                improvement: AIImprovement,
                comment: ``,
              },
            });
          } else {
            setCorrect("false");
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
            onMove("false");
            createQuizResult({
              variables: {
                quiz: props.quizID,
                lessonId: props.lessonID,
                answer: answer,
                correct: false,
                hint: AIhint,
                explanation: AIExplanation,
                improvement: AIImprovement,
                comment: ``,
              },
            });
          }
        })
        .catch((err) => console.log(err));
    }
    setProgress("false");
  };

  const onMove = (result) => {
    // 1. if the data is sent for the first time
    if (!sent) {
      // 2. and if we get the right answer
      if (result === "true" && props.getData) {
        // 3. and if this quiz is a part of an exam
        props.getData(
          props.next && props.next.true
            ? [true, props.next.true]
            : [true, { type: "finish" }],
          "true"
        );
      }
      // 2. and if we get the wrong answer
      else if (result === "false" && props.getData) {
        // 3. and if this quiz is a part of an exam
        // 4. we transfer the "false" data to the exam component
        props.getData(
          props.next && props.next.false
            ? [false, props.next.false]
            : [false, { type: "finish" }]
        );
      }
      setSent(true);
    }
  };

  const getMatchingAnswers = async () => {
    let matchedAnswers = [];
    setProgress("true");

    // 1. Get sample answers for this task
    let answers = props.answers.answerElements;

    // 2. Create a set to hold the indexes of matched answers
    //           an array to list the ideas that are more than 65
    //           a result array to store the results of checking student's every idea
    let matchedIndexes = new Set();
    let correctIdeasList = [];
    let results = [];

    // 3. Iterate over each idea
    for (let idea of ideas) {
      // For each idea, iterate over each answer
      for (let answer of answers) {
        let data1 = {
          answer1: answer.answer,
          answer2: idea,
        };

        try {
          const response = await fetch(
            "https://arcane-refuge-67529.herokuapp.com/checker",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data1),
            }
          );
          // get the result
          const res = await response.json();

          let new_obj = {
            idea: idea,
            result: res.res,
            next_id: parseFloat(res.res) > 60 ? answer.next_id : null,
            next_type: parseFloat(res.res) > 60 ? answer.next_type : null,
          };
          // save the results to the array with all other results
          results.push(new_obj);

          // If res.res is more than 60 and the answer's index is not in the set, add the answer to the matchedAnswers array
          if (res.res > 60 && !matchedIndexes.has(answer.index)) {
            matchedAnswers.push(answer);
            matchedIndexes.add(answer.index);
          }
          if (res.res > 60) {
            correctIdeasList.push(idea);
          }
        } catch (error) {
          console.error("There was an error:", error);
        }
      }
    }
    // console.log("results", results);
    // console.log("matched Answers / Indexes", matchedAnswers, matchedIndexes);

    let unique_values = [];
    results.forEach((item) => {
      const existingItem = unique_values.find((uv) => uv.idea === item.idea);
      if (!existingItem) {
        let new_item = item;
        unique_values.push(new_item);
      } else if (parseFloat(item.result) > parseFloat(existingItem.result)) {
        if (item.next_id && item.next_type) {
          existingItem.next_id = item.next_id;
          existingItem.result = item.result;
          existingItem.next_type = item.next_type;
        }
      }
    });

    setNextQuestions(matchedAnswers);
    setCorrectIdeas(correctIdeasList);
    setProgress("false");

    createQuizResult({
      variables: {
        quiz: props.quizID,
        lessonId: props.lessonID,
        ideasList: { quizIdeas: unique_values },
        comment: ``,
      },
    });

    return matchedAnswers;
  };

  const autoResizeTextarea = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
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

  const {
    me,
    user,
    exam,
    story,
    complexity,
    ifWrong,
    ifRight,
    check,
    miniforum,
    lesson,
    author,
    answers,
  } = props;

  const getResult = (data) => {
    props.getResult(data);
  };

  const passUpdated = () => {
    props.passUpdated(true);
  };

  const switchUpdate = () => {
    setUpdate(!update);
  };

  let width;
  if (props.problem) {
    width = "50%";
  } else if (props.story) {
    width = "50%";
  } else {
    width = "100%";
  }
  return (
    <Styles width={width}>
      {/* 1. Settings part */}
      <Buttons>
        {!exam && !story && (
          <button onClick={(e) => setUpdate(!update)}>
            {!update ? t("update") : t("back")}
          </button>
        )}
        {me && !props.exam && !props.story ? (
          <DeleteSingleQuiz
            id={me.id}
            quizID={props.quizID}
            lessonID={props.lessonID}
          />
        ) : null}
      </Buttons>
      {!update && (
        <>
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
            {props.type?.toLowerCase() !== "generate" && (
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
                {startSpeech && (
                  <Group>{<p>📣 {t("start_speaking")}..</p>}</Group>
                )}
                <Progress display={progress}>
                  <InfinitySpin width="200" color="#2E80EC" />
                </Progress>
                <Group progress={progress} correct={correct}>
                  <Button1
                    inputColor={inputColor}
                    onClick={async (e) => {
                      e.preventDefault();
                      if (props.type === "FORM") {
                        const res1 = await onSend();
                      } else {
                        const res = await onAnswer();
                      }
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
            )}
            {/* 3.5. Generate ideas */}
            {props.type?.toLowerCase() == "generate" && (
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
                  <Ideas>
                    {ideas.map((idea, index) => {
                      let inputColor;

                      if (
                        props.goalType !== "ASSESS" &&
                        correctIdeas.includes(idea)
                      ) {
                        inputColor = "#D0EADB";
                      } else {
                        inputColor = "#f3f3f3";
                      }
                      return (
                        <Answer_text
                          key={index}
                          type="text"
                          required
                          inputColor={inputColor}
                          value={idea}
                          onChange={(e) => handleIdeaChange(e, index)}
                          onInput={autoResizeTextarea}
                          placeholder="..."
                        />
                      );
                    })}
                  </Ideas>
                </div>
                <Progress display={progress}>
                  <InfinitySpin width="200" color="#2E80EC" />
                </Progress>
                {/* 4. Answer buttons */}
                <Group progress={progress} correct={correct}>
                  <Button1
                    inputColor={inputColor}
                    onClick={async (e) => {
                      e.preventDefault();
                      getMatchingAnswers(answer);
                    }}
                  >
                    {t("evaluate_ideas")}
                  </Button1>
                  {/* <Button1
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
                  </Button1> */}
                  <Circle onClick={() => setIdeas(ideas.slice(0, -1))}>
                    -1
                  </Circle>
                  <Circle onClick={(e) => setIdeas([...ideas, ""])}>+1</Circle>
                  {/* <button onClick={startListening}>Start listening</button> */}
                </Group>
                {nextQuestions && nextQuestions.length > 0 && (
                  <div className="question_box">
                    <div className="question_text">
                      <p>{t("ideas_result")}</p>
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
            {/* 4. Reaction to answer part */}
            {/* 4.1 If true / looks true */}
            {(correct === "true" || correct === "looks_true") &&
              props.goalType !== "ASSESS" && (
                <>
                  <div className="question_box">
                    <div className="question_text">
                      {!props.type != "FORM" &&
                        correct === "true" &&
                        "🎉 " + t("correct") + "!"}
                      {!props.type != "FORM" &&
                        correct === "looks_true" &&
                        hint !== null &&
                        hint !== 0 &&
                        props.type != "FORM" && <p>{hint}</p>}
                      {!props.type != "FORM" &&
                        correct === "looks_true" &&
                        "👋 " + t("looks_true")}
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

                  {/* {!props.challenge && !props.type != "FORM" && (
                  <div className="question_box">
                    <div className="question_text">{t("show_correct")}</div>

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
                )} */}
                </>
              )}
            {/* 4.2 If false */}
            {correct === "false" && (
              <>
                <div className="question_box">
                  <div className="question_text">
                    {props.type != "FORM" &&
                      props.goalType !== "ASSESS" &&
                      "🔎  " + t("wrong") + "..."}
                    {hint !== null &&
                      hint !== 0 &&
                      props.type != "FORM" &&
                      props.goalType !== "ASSESS" && <p>{hint}</p>}
                    {props.goalType == "ASSESS" && (
                      <p>We saved your answer. Please proceed.</p>
                    )}
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

            {!props.challenge &&
              correct !== "" &&
              props.type != "FORM" &&
              props.goalType !== "ASSESS" && (
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
                          <img
                            className="icon"
                            src="../../static/hipster.svg"
                          />
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
                  {AIImprovement &&
                    (correct == "true" || correct == "looks_true") && (
                      <div className="question_box">
                        <div className="question_text">
                          <p>{AIImprovement}</p>
                        </div>
                        <IconBlock>
                          {author && author.image != null ? (
                            <img className="icon" src={author.image} />
                          ) : (
                            <img
                              className="icon"
                              src="../../static/hipster.svg"
                            />
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
              <div className="question_box" id={`ideal_answer_${props.id}`}>
                <div className="question_text">
                  <b>{t("correct_answer")}:</b> {parse(props.answer)}
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
        </>
      )}
      {nextQuestions && nextQuestions.length > 0 && (
        <NextQuestions
          nextQuestions={nextQuestions}
          lesson={lesson}
          me={me}
          author={author}
        />
      )}
      {update && (
        <UpdateQuiz
          quizId={props.id}
          lessonID={props.lessonID}
          answer={props.answer}
          answers={props.answers}
          lesson={props.lesson}
          question={props.question}
          type={props.type}
          goalType={props.goalType}
          complexity={complexity}
          ifRight={ifRight}
          ifWrong={ifWrong}
          next={props.next}
          check={check}
          getResult={getResult}
          switchUpdate={switchUpdate}
          passUpdated={passUpdated}
        />
      )}
    </Styles>
  );
};

export default SingleQuiz;
