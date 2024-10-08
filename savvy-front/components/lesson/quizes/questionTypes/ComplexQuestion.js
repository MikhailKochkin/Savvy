import { useState, useEffect, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { InfinitySpin, TailSpin } from "react-loader-spinner";
import { useTranslation } from "next-i18next";
import smoothscroll from "smoothscroll-polyfill";
import {
  guessAlphabet,
  autoResizeTextarea,
  removeSpecialChars,
} from "../../SimulatorDevelopmentFunctions";
import { checkAnswer } from "../functions/AIQuestionFunctions";

// import { generateImprovement } from "../functions/AIQuestionFunctions";

import {
  Question,
  Answer_text,
  IconBlock,
  Button1,
  Circle,
  ResultCircle,
  PositionCircle,
  MiniCircle,
} from "../QuestionStyles";

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

const Progress = styled.div`
  display: flex;
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

const Ideas = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-bottom: 20px;
`;

const OptionsGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 60%;
  max-width: 80%;
  margin-bottom: 20px;
`;

const Option = styled.div`
  display: inline-block;
  vertical-align: middle;
  border: 1px solid #c4c4c4;
  padding: 10px 15px;
  background: #fff;
  cursor: pointer;
  margin-right: 3%;
  margin-bottom: 2%;
  transition: 0.3s;
  &:hover {
    border: 1px solid #3f51b5;
  }
`;

const AnswerRow = styled.div`
  display: flex;
  flex-direction: row;
  .buttonsColumn {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-left: 10px;
    margin-bottom: 10px;
  }
`;

const Frame = styled.div`
  position: relative;
  min-width: 60%;
  max-width: 70%;
  border-width: ${(props) => (props.inputColor === "#D0EADB" ? "3px" : "2px")};
  border-style: solid;
  border-color: ${(props) => props.inputColor};

  background: #fff;
  padding: 0 2%;
  border-top-left-radius: ${(props) => (props.first ? "25px" : "0")};
  /* border-top-right-radius: ${(props) => (props.first ? "25px" : "0")}; */
  border-bottom-left-radius: ${(props) => (props.last ? "25px" : "0")};
  /* border-bottom-right-radius: ${(props) => (props.last ? "25px" : "0")}; */
  /* border-top-right-radius: ${(props) => (props.first ? "25px" : "0")}; */
  border-bottom-width: ${(props) =>
    props.last && props.inputColor === "#D0EADB" ? "3px" : "1px"};
  border-bottom: ${(props) => (props.last ? "2px solid #f3f3f3;" : "none")};
  border-bottom-color: ${(props) =>
    props.last && props.inputColor === "#D0EADB"
      ? props.inputColor
      : "#F3F3F3"};
  /* border-bottom-style: solid; */
  .com {
    border-top: 1px solid #f3f3f3;
  }
`;

const CommentFrame = styled.div`
  background: #fff;
  padding: 22px 10px;
  font-size: 1.4rem;
  line-height: 1.3;
  border-top: 2px solid #f3f3f3;
  border-bottom: ${(props) => (props.last ? "2px solid #f3f3f3;" : "none")};
  border-bottom-right-radius: ${(props) => (props.last ? "25px" : "0")};
  border-top-right-radius: ${(props) => (props.first ? "25px" : "0")};
  border-right: 2px solid #f3f3f3;
  font-weight: 400;
`;

const ComplexQuestion = (props) => {
  const {
    author,
    me,
    story,
    ifRight,
    ifWrong,
    quizId,
    isOrderOfAnswersImportant,
  } = props;
  const [answersNum, setAnswersNum] = useState(0);
  const [ideas, setIdeas] = useState([""]); // ideas provided by the student
  const [correctIdeas, setCorrectIdeas] = useState([]); // ideas that match the correct answers
  const [overallResults, setOverallResults] = useState(null); // results of checking the ideas
  const [feedbackList, setFeedbackList] = useState(
    new Array(props.answers.answerElements.length).fill(" ")
  );

  const [isAnswerBeingChecked, setIsAnswerBeingChecked] = useState(false);
  const [inputColor, setInputColor] = useState("#f3f3f3");
  const [generating, setGenerating] = useState(false);

  const [areIdeasShown, setAreIdeasShown] = useState(false);
  const [isAnswerCountShown, setIsAnswerCountShown] = useState(false);
  const [answerCountText, setAnswerCountText] = useState("");
  const [isFeedbackShown, setIsFeedbackShown] = useState(false);
  const [hints, setHints] = useState([]);
  const [explanation, setExplanation] = useState();
  const [expectedAnswers, setExpectedAnswers] = useState(
    new Array(props.answers?.answerElements?.length).fill(null)
  );
  const router = useRouter();

  const [createQuizResult, { data, loading, error }] = useMutation(
    CREATE_QUIZRESULT_MUTATION
  );

  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });

  useEffect(() => {
    setIdeas(new Array(props.answers.answerElements.length).fill(""));
  }, [props.answers.answerElements]);

  const { t } = useTranslation("lesson");

  const handleIdeaChange = (event, index) => {
    // Copy the current state of ideas
    const updatedIdeas = [...ideas];

    // Update the idea at the specific index with the new value
    updatedIdeas[index] = event.target.value;

    // Update the state with the modified ideas array
    setIdeas(updatedIdeas);
  };

  // 2. Evaluate the ideas and find matching answers from the list of correct answers
  const getMatchingAnswers = async () => {
    let matchedAnswers = [];
    // 1. Get sample answers for this task
    let answers = props.answers.answerElements;
    // 2. Create a set to hold the indexes of matched answers
    //    an array to list the ideas that are more than 65
    //    a result array to store the results of checking student's every idea
    let matchedIndexes = new Set();
    let newCorrectIdeas = [];
    let new_results = [];
    let old_results = [];
    let updatedExpectedAnswers = [...expectedAnswers]; // Initialize temporary array

    // 3. Iterate over each idea
    for (let idea of ideas) {
      // if the idea has already been evaluated, we skip it and save its old evaluation
      if (overallResults && overallResults.find((res) => res.idea === idea)) {
        old_results.push(overallResults.find((res) => res.idea === idea));
        continue;
      } else {
        // For each not evaulated idea, iterate over each answer
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
              next_id: parseFloat(res.res) > 65 ? answer.next_id : null,
              next_type: parseFloat(res.res) > 65 ? answer.next_type : null,
            };
            // save the results to the array with all other results
            new_results.push(new_obj);

            // If res.res is more than 60 and the answer's index is not in the set, add the answer to the matchedAnswers array
            if (res.res > 60 && !matchedIndexes.has(answer.index)) {
              matchedAnswers.push(answer);
              matchedIndexes.add(answer.index);
            }
            if (res.res > 60) {
              newCorrectIdeas.push({
                idea: idea,
                matchedAnswer: answer,
                result: res.res,
              });
              updatedExpectedAnswers[answer.index] = answer; // Accumulate changes
            }
          } catch (error) {
            console.error("There was an error:", error);
          }
        }
      }
    }

    let unique_values = [];
    [...old_results, ...new_results].forEach((item) => {
      const existingItem = unique_values.find((uv) => uv.idea === item.idea);
      if (!existingItem) {
        unique_values.push({ ...item }); // Add a copy of the item if it doesn't exist
      } else if (parseFloat(item.result) > parseFloat(existingItem.result)) {
        existingItem.result = item.result;
        existingItem.next_id = item.next_id;
        existingItem.next_type = item.next_type;
      }
    });

    const filteredIdeas = [...correctIdeas, ...newCorrectIdeas].reduce(
      (acc, curr) => {
        const existingAnswer = acc.find((obj) => obj.idea === curr.idea);
        const currResult = parseFloat(curr.result);

        if (!existingAnswer || currResult > parseFloat(existingAnswer.result)) {
          if (existingAnswer) {
            acc = acc.filter((obj) => obj.idea !== curr.idea);
          }
          acc.push({ ...curr, result: currResult });
        }
        return acc;
      },
      []
    );

    setOverallResults(unique_values);
    // if (unique_values.filter((el) => el.result > 65).length == 0) {
    //   setIdeas([
    //     ...ideas,
    //     ...Array(props.answers.answerElements.length - ideas.length).fill(""),
    //   ]);
    // }
    setCorrectIdeas(filteredIdeas);
    setIsFeedbackShown(true);
    setExpectedAnswers(updatedExpectedAnswers); // Update state with accumulated changes
    createQuizResult({
      variables: {
        quiz: props.quizId,
        lessonId: props.lessonId,
        hint: hints[hints.length - 1],
        type: "answer",
        ideasList: { quizIdeas: unique_values },
        comment: ``,
      },
    });
    if (props.problemType === "ONLY_CORRECT") {
      if (filteredIdeas.length >= props.answers.answerElements.length) {
        props.passResult("true");
      }
    } else {
      props.passResult("true");
    }
  };

  // 3. Generate a comment with the number of correct answers and the ideas that match them
  const generateAnswerCountComment = (e) => {
    e.preventDefault();
    setAreIdeasShown(false);
    let comment = `
        <p>You have written ${correctIdeas.length}/${
      props.answers.answerElements.length
    } of the correct answer.</p>
        <ol>
        ${expectedAnswers
          .map((an, i) => {
            if (an == null) {
              return `<li>??</li>`;
            } else {
              return `<li>${
                correctIdeas.find((el) => el.matchedAnswer.answer == an.answer)
                  ? correctIdeas.find(
                      (el) => el.matchedAnswer.answer == an.answer
                    ).idea
                  : "??"
              }</li>`;
            }
          })
          .join("")}
        </ol>
    
    `;
    setAnswerCountText(comment);
    setIsAnswerCountShown(true);

    createQuizResult({
      variables: {
        quiz: props.quizId,
        lessonId: props.lessonId,
        hint: hints[hints.length - 1],
        type: "hint",
        ideasList: { quizIdeas: overallResults },
        comment: `Student asked for remaining options`,
      },
    });
  };

  // 4. Generate a hint for the student
  const generateHint = async (event) => {
    setGenerating(true);
    let hintPrompt;
    let url;
    let result;
    let AItype = "openai";
    if (AItype == "claude") {
      url = "/api/generate2";
    } else {
      url = "/api/generate";
    }

    let intro = `You are a law professor. 
      You help your student answer this question ${props.question}.
        `;

    let recommendations = ` Answer in ${
      router.locale == "ru" ? "Russian" : "English"
    }. Answer in second person. Address the student as "You"! Limit your hint to 3 sentences.`;

    // if the student has already given some correct answers, we focus only on the ansers that have not yet been found
    if (overallResults && overallResults.length > 0) {
      hintPrompt = ` The student has already given these correct answers: """ ${correctIdeas
        .map((el) => el.idea)
        .join(", ")} """. But struggles to find the rest.
        Ask students questions in a Socratic manner that will help them find the remaining answers: """${props.answers.answerElements
          .filter(
            (el) =>
              correctIdeas.filter((c) => c.matchedAnswer.answer == el.answer)
                .length == 0
          )
          .map((el) => removeSpecialChars(el.answer))
          .join(", ")}""".
        DO NOT REVEAL THE ANSWER!!!`;

      // otherwise we give a hint for the first answer only
    } else {
      hintPrompt = `The student can't come up with any answers. 
                    Ask students questions in a Socratic manner that will help them find the first answer.
                    The first answer is: """ ${removeSpecialChars(
                      props.answers.answerElements[0].answer
                    )} """.
                    DO NOT REVEAL THE ANSWER!!!
                  `;
    }

    try {
      event.preventDefault();

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: intro + hintPrompt + recommendations,
        }),
      });

      if (response.status !== 200) {
        throw (
          (await response.json()).error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      const data = await response.json();
      if (AItype == "claude") {
        result = data.result.content[0].text;
      } else {
        result = data.result.content;
      }

      if (result) {
        setHints([...hints, result]);
        createQuizResult({
          variables: {
            quiz: props.quizId,
            lessonId: props.lessonId,
            hint: result,
            type: "hint",
            comment: `Student asked for a hint`,
          },
        });
        // }
      } else {
        setHints([...hints, "Sorry, you are on your own"]);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setGenerating(false);
    }
  };

  const generateExplainer = async (event, sampleAnswer, studentAnswer) => {
    setGenerating(true); // Assuming this is a state-setting function

    let explainerPrompt;
    let url;
    let result;
    const AItype = "openai"; // Consider making AItype dynamic if needed

    // Determine the API URL based on AItype
    if (AItype === "claude") {
      url = "/api/generate2";
    } else {
      url = "/api/generate";
    }

    // Create the prompt for the explainer
    const hintPrompt = `You are a law professor. 
    You help your student find this answer: ${sampleAnswer}.
    The student has given this answer ${studentAnswer} which is not correct.
    Write a 3 sentence explainer to help them find the answer.`;
    console.log("hintPrompt", hintPrompt);

    // Prevent default behavior if event is passed
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    try {
      // Make the API request
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: hintPrompt }),
      });

      // Check if the response is OK
      if (response.status !== 200) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Request failed with status ${response.status}`
        );
      }

      // Parse the response data
      const data = await response.json();
      if (AItype === "claude") {
        result = data.result.content[0].text;
      } else {
        result = data.result.content;
      }

      // Return the result or a default message
      return result || "No feedback generated ...";
    } catch (error) {
      // Optionally handle errors here if needed
      throw error; // Re-throwing the error if not handling
    } finally {
      // Ensure that the generating state is reset regardless of success or failure
      setGenerating(false);
    }
  };

  const getFeedbackOnIdeas = (event) => {
    let newFeedbackList = [];
    ideas.map(async (idea, i) => {
      console.log("idea", idea, props.answers.answerElements[i].answer);
      let res = await generateExplainer(
        event,
        props.answers.answerElements[i].answer,
        idea
      );
      console.log(res);
      newFeedbackList.push(res);
    });
    console.log("newFeedbackList", newFeedbackList);
    setFeedbackList(newFeedbackList);
  };

  const generateExplanationForComplexQuestion = async (event) => {
    event.preventDefault();
    setGenerating(true);
    let url;
    let result;
    let AItype = "openai";
    if (AItype == "claude") {
      url = "/api/generate2";
    } else {
      url = "/api/generate";
    }
    try {
      event.preventDefault();
      let answers = [];
      props.answers.answerElements.map((el, i) => {
        answers.push(`${i + 1}` + el.answer);
      });

      console.log(answers);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
            You are trying to explain the correct answer to the student. The answer consists of${props.answers.answerElements.length} parts.
            The answer parts are: ${answers}.
            Give a very short explanantion of every part of the answer without revealing the answer itself. Return every explanation as a separate paragraph wrapped in p tags.
           `,
        }),
      });

      if (response.status !== 200) {
        throw (
          (await response.json()).error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      const data = await response.json();
      if (AItype == "claude") {
        result = data.result.content[0].text;
      } else {
        result = data.result.content;
      }

      if (result) {
        setExplanation(result);
        console.log("result", result);
        //  createQuizResult({
        //    variables: {
        //      quiz: props.quizId,
        //      lessonId: props.lessonId,
        //      hint: result,
        //      type: "hint",
        //      comment: `Student asked for a hint`,
        //    },
        //  });
        // }
      } else {
        setExplanation("Sorry, you are on your own");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setGenerating(false);
    }
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
      {/* 3.5. Generate ideas */}
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
              let answerPosition;
              let score = null;
              let inputColor;
              let feedback = feedbackList[index];

              // 1. Calculate the score of the idea
              if (
                overallResults &&
                overallResults.find((res) => res.idea == idea)?.result
              ) {
                score = parseFloat(
                  overallResults.find((res) => res.idea == idea)?.result
                ).toFixed(0);
                // feedback = newfeedback;
              } else {
                score = "0";
              }
              // 2. Determine the number

              if (props.goalType !== "ASSESS" && score > 60) {
                inputColor = "#D0EADB";
              } else {
                inputColor = "#F3F3F3";
              }
              // 3. Determine the answer position.
              if (correctIdeas.find((el) => el.idea == idea)) {
                answerPosition =
                  correctIdeas.find((el) => el.idea == idea).matchedAnswer
                    .index + 1;
              } else {
                answerPosition = undefined;
              }
              return (
                <>
                  <AnswerRow>
                    {/* {isOrderOfAnswersImportant && answerPosition && (
                      <PositionCircle>{answerPosition}</PositionCircle>
                    )} */}
                    <Frame
                      inputColor={inputColor}
                      last={index == ideas.length - 1}
                      first={index == 0}
                    >
                      <Answer_text
                        key={index}
                        type="text"
                        required
                        disabled={parseInt(score) > 65 ? true : false}
                        value={idea}
                        onChange={(e) => {
                          handleIdeaChange(e, index);
                        }}
                        onInput={autoResizeTextarea}
                        placeholder="..."
                      />
                      {score && (
                        <ResultCircle
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content={t("answer_above_65")}
                          data-tooltip-place="right"
                          inputColor={inputColor}
                        >
                          {score}
                        </ResultCircle>
                      )}
                    </Frame>
                    <CommentFrame
                      inputColor={inputColor}
                      last={index == ideas.length - 1}
                      first={index == 0}
                    >
                      {feedback ? feedback : "..."}
                    </CommentFrame>
                    {/* <div className="buttonsColumn">
                      <MiniCircle
                        onClick={(e) => {
                          let newIdeas = [...ideas];
                          newIdeas.splice(index, 0, "");
                          setIdeas(newIdeas);
                        }}
                      >
                        ⬆
                      </MiniCircle>
                      <MiniCircle
                        onClick={(e) => {
                          let newIdeas = [...ideas];
                          newIdeas.splice(index, 1);
                          setIdeas(newIdeas);
                        }}
                      >
                        X
                      </MiniCircle>
                      <MiniCircle
                        onClick={(e) => {
                          let newIdeas = [...ideas];
                          newIdeas.splice(index + 1, 0, "");
                          setIdeas(newIdeas);
                        }}
                      >
                        ⬇
                      </MiniCircle>
                    </div> */}
                  </AnswerRow>
                </>
              );
            })}
          </Ideas>
        </div>

        {isAnswerBeingChecked && (
          <Progress>
            <InfinitySpin width="200" color="#2E80EC" />
          </Progress>
        )}
        {/* 4. Answer buttons */}
        <Group>
          {correctIdeas.length != props.answers.answerElements.length && (
            <Button1
              inputColor={inputColor}
              onClick={async (e) => {
                e.preventDefault();
                setIsAnswerBeingChecked(true);

                // if (answersNum == 0) {
                //   const res1 = await runInitialCheck();
                // } else {
                //   const res2 = await runInitialCheck();
                //   // getMatchingAnswers();
                // }
                const res = await getMatchingAnswers();
                setIsAnswerCountShown(false);
                setIsAnswerBeingChecked(false);
                setAnswersNum(answersNum + 1);
                getFeedbackOnIdeas(e);
              }}
            >
              {t("check")}
            </Button1>
          )}
          {/* {props.goalType !== "ASSESS" &&
            correctIdeas.length != props.answers.answerElements.length && (
              <Button1
                inputColor={inputColor}
                onClick={async (e) => {
                  e.preventDefault();
                  getHint(e);
                }}
              >
                {hints?.length == 0 && overallResults == null
                  ? t("where_to_start")
                  : null}
                {hints?.length > 0 || overallResults !== null
                  ? t("help_with_next_one")
                  : null}
              </Button1>
            )} */}
          {/* {ideas.filter((id) => id !== "").length > 0 && (
            <Button1
              inputColor={inputColor}
              onClick={async (e) => {
                e.preventDefault();
                console.log("ideas", ideas);
              }}
            >
              Improve answer
            </Button1>
          )} */}
        </Group>
        {/* 4.1 loading sign while the answera are being checked*/}
        {generating && (
          <Progress2>
            <TailSpin width="50" color="#2E80EC" />
          </Progress2>
        )}
        {/* 5. The hint that helps find correct answers */}
        {hints.length > 0 && (
          <div className="question_box">
            <div className="question_text">
              <p>{hints[hints.length - 1]}</p>
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

        {/* 6. Bubble with buttons for additional questions available to the student  */}
        {isFeedbackShown && (
          <>
            <div className="question_box">
              <div className="question_text">
                {/* <p>{correctIdeas.length > 0 && `🎉 ${t("great_job")}`}</p>
                <p>{correctIdeas.length == 0 && `🤔 ${t("none_correct")}`}</p>
                <p>
                  {correctIdeas.length !== 0 &&
                  correctIdeas.length < props.answers.answerElements.length
                    ? "You are on the right track but can you be more specific? Have a go at rewriting that answer to see if you can get closer to the correct answer"
                    : null}{" "}
                  {correctIdeas.length == props.answers.answerElements.length
                    ? "This is the correct answer. Well done!"
                    : null}{" "}
                  {t("what_are_we_doing_next")}
                </p> */}
                <p>
                  Your answer should consist of three parts. Think about what
                  parts they should be or ask for hints.
                </p>
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
              </IconBlock>
              <OptionsGroup>
                {correctIdeas.length < props.answers.answerElements.length && (
                  <Option
                    onClick={(e) => generateExplanationForComplexQuestion(e)}
                  >
                    {/* {t("how_many_options_are_left")} */}
                    Could you help?
                  </Option>
                )}
                <Option
                  onClick={(e) => {
                    setIsAnswerCountShown(false);
                    setAreIdeasShown(true);

                    createQuizResult({
                      variables: {
                        quiz: props.quizId,
                        lessonId: props.lessonId,
                        hint: hints[hints.length - 1],
                        ideasList: { quizIdeas: overallResults },
                        comment: `Student opened correct answer`,
                        type: "answerReveal",
                      },
                    });
                  }}
                >
                  {t("show_correct_answers")}
                </Option>
              </OptionsGroup>
            </div>
          </>
        )}

        {/* 7. Additional information bubbles  */}

        {explanation && explanation.length > 1 && (
          <div className="question_box">
            <div className="question_text">{parse(explanation)}</div>
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
        {areIdeasShown && (
          <div className="question_box">
            <div className="question_text">
              <p>{t("these_are_the_right_answers")}</p>
              <ul>
                {props.answers.answerElements.map((idea) => (
                  <li>{removeSpecialChars(idea.answer)}</li>
                ))}
              </ul>
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
    </Question>
  );
};

export default ComplexQuestion;
