import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { InfinitySpin } from "react-loader-spinner";
import { useTranslation } from "next-i18next";
import smoothscroll from "smoothscroll-polyfill";
import {
  removeSpecialChars,
  autoResizeTextarea,
} from "../../SimulatorDevelopmentFunctions";

import {
  Question,
  IconBlock,
  Button1,
  ResultCircle,
} from "../../styles/commonElements/QuestionStyles";

const CREATE_QUIZRESULT_MUTATION = gql`
  mutation CREATE_QUIZRESULT_MUTATION(
    $answer: String
    $quiz: String
    $lessonId: String
    $correct: Boolean
    $comment: String
    $hint: String
    $type: String
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
      type: $type
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

const HeadAnswerRow = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.4rem;
  #your_answers {
    width: 200px;
    border: 2px solid #f3f3f3;
    background: #f3f3f3;
    padding: 10px 20px;
    border-bottom: none;
    border-top-left-radius: 25px;
  }
  #system_feedback {
    width: 250px;
    border: 2px solid #f3f3f3;
    background: #f3f3f3;
    padding: 10px 20px;
    border-bottom: none;
    border-left: none;
    border-top-right-radius: 25px;
  }
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
  width: 200px;
  border-width: ${(props) => (props.inputColor === "#D0EADB" ? "3px" : "2px")};
  border-style: solid;
  border-color: ${(props) => props.inputColor};
  padding: 10px 15px;
  line-height: 1.6;
  background: #fff;
  border-bottom-left-radius: ${(props) => (props.last ? "25px" : "0")};
  border-bottom-width: ${(props) =>
    props.last && props.inputColor === "#D0EADB" ? "3px" : "1px"};
  border-bottom: ${(props) => (props.last ? "2px solid #f3f3f3;" : "none")};
  border-bottom-color: ${(props) =>
    props.last && props.inputColor === "#D0EADB"
      ? props.inputColor
      : "#F3F3F3"};
  .com {
    border-top: 1px solid #f3f3f3;
  }
`;

const CommentFrame = styled.div`
  background: #fff;
  padding: 10px 15px;
  font-size: 1.4rem;
  line-height: 1.6;
  border-top: 2px solid #f3f3f3;
  border-bottom: ${(props) => (props.last ? "2px solid #f3f3f3;" : "none")};
  border-bottom-right-radius: ${(props) => (props.last ? "25px" : "0")};
  border-right: 2px solid #f3f3f3;
  font-weight: 400;
  color: #000000;
  width: 250px;
`;

const Answer_text = styled.textarea`
  width: 95%;
  outline: 0;
  resize: none;
  line-height: 1.6;
  font-family: Montserrat;
  font-size: 1.4rem;
  border: none;
  &:disabled {
    background-color: #fff; // or any other color you want
  }
`;

const ComplexQuestion = (props) => {
  const { author, me, story } = props;
  const [ideas, setIdeas] = useState([""]); // ideas provided by the student
  const [correctIdeas, setCorrectIdeas] = useState([]); // ideas that match the correct answers
  const [overallResults, setOverallResults] = useState(null); // results of checking the ideas
  const [feedbackList, setFeedbackList] = useState(
    new Array(props.answers.answerElements.length).fill(" ")
  );

  const [isAnswerBeingChecked, setIsAnswerBeingChecked] = useState(false);
  const [areIdeasShown, setAreIdeasShown] = useState(false);
  const [isFeedbackShown, setIsFeedbackShown] = useState(false);

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
    let answers = props.answers.answerElements;

    const promiseResults = await Promise.all(
      ideas.map(async (idea, ideaIndex) => {
        let data1 = {
          answer1: answers[ideaIndex].answer,
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
          const res = await response.json();
          return {
            index: ideaIndex,
            idea: idea,
            result: res.res,
            next_id: null,
            next_type: null,
          };
        } catch (error) {
          console.error("There was an error:", error);
          return null;
        }
      })
    );

    const new_results = promiseResults.filter((result) => result !== null);
    setOverallResults(new_results.sort((a, b) => a.index - b.index));
    setIsFeedbackShown(true);
    props.passResult("true");
    createQuizResult({
      variables: {
        quiz: props.quizId,
        lessonId: props.lessonId,
        type: "answer",
        ideasList: { quizIdeas: new_results.map(({ index, ...rest }) => rest) },
        comment: ``,
      },
    });
    return new_results; // Return the results if needed
  };

  const generateExplainer = async (event, sampleAnswer, studentAnswer) => {
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
    explainerPrompt = `You are an experienced professional helping a student answer a question.
      The student has provided the following incorrect answer: "${studentAnswer}". 
      The correct answer is: "${sampleAnswer}".
      In 2 sentences, guide the student toward the correct answer using clear and simple language. 
      Focus on addressing where they went wrong based on this information: ${props.ifWrong}.`;
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
        body: JSON.stringify({ prompt: explainerPrompt }),
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
    }
  };

  const getFeedbackOnIdeas = async (event, allResults) => {
    event.preventDefault(); // Ensure event.preventDefault is called if necessary
    // Use map to create an array of promises
    const feedbackPromises = ideas.map(async (idea, i) => {
      if (idea == "") {
        let res =
          "Please break down your answer into several parts and complete this form as well.";
        return res;
      }
      if (allResults && parseFloat(allResults[i].result) > 65) {
        let res = `Part ${i + 1} is complete.`;
        return res;
      }
      let res = await generateExplainer(
        event,
        props.answers.answerElements[i].answer,
        idea,
        i + 1
      );
      return res; // Return the result from generateExplainer
    });

    try {
      // Wait for all feedback promises to resolve
      const newFeedbackList = await Promise.all(feedbackPromises);
      // Update state with all feedback
      setFeedbackList(newFeedbackList);
      return newFeedbackList;
    } catch (error) {
      console.error("Error fetching feedback:", error);
      // Optionally handle errors
    } finally {
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
            <HeadAnswerRow>
              <div id="your_answers">Your answer</div>
              <div id="system_feedback">Feedback</div>
            </HeadAnswerRow>
            {ideas.map((idea, index) => {
              let answerPosition;
              let score = null;
              let inputColor;
              // 1. Calculate the score of the idea
              if (
                overallResults &&
                overallResults.find((res) => res.idea == idea)?.result
              ) {
                score = parseFloat(
                  overallResults.find((res) => res.idea == idea)?.result
                ).toFixed(0);
              } else {
                score = "0";
              }
              // 2. Determine the number

              if (props.goalType !== "ASSESS" && score > 65) {
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
                    <Frame
                      inputColor={inputColor}
                      last={index == ideas.length - 1}
                      first={index == 0}
                      width={feedbackList.filter((f) => f !== " ").length > 0}
                    >
                      <Answer_text
                        key={index}
                        type="text"
                        required
                        analyzed={
                          feedbackList.filter((f) => f !== " ").length > 0
                        }
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
                      width={feedbackList.filter((f) => f !== " ").length > 0}
                    >
                      {feedbackList[index]}
                    </CommentFrame>
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
              onClick={async (e) => {
                e.preventDefault();
                setIsAnswerBeingChecked(true);
                const results = await getMatchingAnswers();
                const results2 = await getFeedbackOnIdeas(e, results);
                setIsAnswerBeingChecked(false);
              }}
            >
              {t("check")}
            </Button1>
          )}
        </Group>

        {/* 6. Bubble with buttons for additional questions available to the student  */}
        {isFeedbackShown && (
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
              </IconBlock>
              <OptionsGroup>
                <Option
                  onClick={(e) => {
                    setAreIdeasShown(true);
                    createQuizResult({
                      variables: {
                        quiz: props.quizId,
                        lessonId: props.lessonId,
                        ideasList: {
                          quizIdeas: overallResults.map(
                            ({ index, ...rest }) => rest
                          ),
                        },
                        // comment: `Student opened correct answer`,
                        type: "answerReveal",
                        comment: `Student opened correct answer`,
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

        {areIdeasShown && (
          <div className="question_box">
            <div className="question_text">
              <p>This is my answer / variant:</p>
              {props.answers.answerElements.map((idea) => (
                <p>{removeSpecialChars(idea.answer)}</p>
              ))}
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