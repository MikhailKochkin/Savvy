import { useState, useEffect, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import parse from "html-react-parser";
import { InfinitySpin, TailSpin } from "react-loader-spinner";
import { useTranslation } from "next-i18next";
import smoothscroll from "smoothscroll-polyfill";
import { useRouter } from "next/router";
import {
  guessAlphabet,
  autoResizeTextarea,
} from "../../SimulatorDevelopmentFunctions";
import {
  IconBlock,
  Question,
  Answer_text,
  ResultCircle,
  Button1,
  Circle,
  Frame,
  Option,
  OptionsGroup,
} from "../../styles/commonElements/QuestionStyles";
import { generateHint2 } from "../functions/AIQuestionFunctions";

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
    $ideasList: QuizIdeasInput
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

const Ideas = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const Generate = (props) => {
  const { author, me, story, ifRight, ifWrong, quizId, isScoringShown } = props;
  const [answer, setAnswer] = useState(""); // The answer provided by the student
  const [ideas, setIdeas] = useState([""]);
  const [nextQuestions, setNextQuestions] = useState();
  const [correctIdeas, setCorrectIdeas] = useState([]);
  const [progress, setProgress] = useState("false");
  const [inputColor, setInputColor] = useState("#f3f3f3");
  const [generating, setGenerating] = useState(false);
  const [areIdeasShown, setAreIdeasShown] = useState(false);
  const [overallResults, setOverallResults] = useState(null); // results of checking the ideas
  const [expectedAnswers, setExpectedAnswers] = useState(
    new Array(props.answers?.answerElements?.length).fill(null)
  );
  const [isFeedbackShown, setIsFeedbackShown] = useState(false);
  const [AIhint, setAIHint] = useState(null);

  const [createQuizResult, { data, loading, error }] = useMutation(
    CREATE_QUIZRESULT_MUTATION
  );

  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });

  const { t } = useTranslation("lesson");
  const router = useRouter();

  function handleIdeaChange(event, index) {
    // Copy the current state of ideas
    const updatedIdeas = [...ideas];

    // Update the idea at the specific index with the new value
    updatedIdeas[index] = event.target.value;

    // Update the state with the modified ideas array
    setIdeas(updatedIdeas);
  }

  const getMatchingAnswers = async () => {
    let matchedAnswers = [];
    setProgress("true");

    // 1. Get sample answers for this task
    let answers = props.answers.answerElements;
    let matchedIndexes = new Set();
    let newCorrectIdeas = [];
    let new_results = [];
    let old_results = [];
    let updatedExpectedAnswers = [...expectedAnswers];

    // 2. Iterate over each idea
    for (let idea of ideas) {
      // Check if the idea has already been evaluated
      let existingResult =
        overallResults && overallResults.find((res) => res.idea === idea);
      if (existingResult) {
        old_results.push(existingResult);
        continue;
      }

      // Store the best match for this idea
      let bestMatch = {
        result: 0,
        matchedText: null, // This will store the best-matching string
      };

      for (let answer of answers) {
        // Combine main answer text with related answers
        let textsToCheck = [answer.answer, ...(answer.relatedAnswers || [])];

        let fetchPromises = textsToCheck.map((text) => {
          return fetch("https://arcane-refuge-67529.herokuapp.com/checker", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              answer1: text,
              answer2: idea,
            }),
          });
        });

        try {
          // Evaluate all texts for the current answer
          let responses = await Promise.all(fetchPromises);
          let jsonResults = await Promise.all(
            responses.map((res) => res.json())
          );

          // Find the highest result and track the corresponding text
          jsonResults.forEach((r, index) => {
            const val = parseFloat(r.res);
            if (val > bestMatch.result) {
              bestMatch.result = val;
              bestMatch.matchedText = textsToCheck[index];
            }
          });
        } catch (error) {
          console.error("Error comparing answers:", error);
        }
      }

      // Add the best match for this idea
      let new_obj = {
        idea,
        result: bestMatch.result,
        matchedAnswer: bestMatch.matchedText, // Include only the best-matching string
      };
      new_results.push(new_obj);

      // If the best match exceeds the threshold, track it as a correct idea
      if (bestMatch.result > 57 && bestMatch.matchedText) {
        newCorrectIdeas.push({
          idea,
          matchedAnswer: bestMatch.matchedText,
        });
      }
    }

    // Merge results and keep the highest match for each idea
    let unique_values = [];
    [...old_results, ...new_results].forEach((item) => {
      const existingItem = unique_values.find((uv) => uv.idea === item.idea);
      if (!existingItem) {
        unique_values.push({ ...item });
      } else if (parseFloat(item.result) > parseFloat(existingItem.result)) {
        existingItem.result = item.result;
        existingItem.matchedAnswer = item.matchedAnswer;
      }
    });

    // Update state
    setOverallResults(unique_values);
    setProgress("false");
    setCorrectIdeas([...correctIdeas, ...newCorrectIdeas]);
    setIsFeedbackShown(true);
    setExpectedAnswers(updatedExpectedAnswers);

    let quizIdeas = unique_values.map((uv) => ({
      ...uv,
      result: String(uv.result), // convert numeric to string
    }));

    // Persist the quiz result with the matched answer included
    createQuizResult({
      variables: {
        quiz: props.quizId,
        lessonId: props.lessonId,
        hint: AIhint,
        type: "answer",
        ideasList: { quizIdeas }, // Includes matchedAnswer for each idea
        comment: ``,
      },
    });

    // Pass the result based on the problem type
    if (props.problemType === "ONLY_CORRECT") {
      if (newCorrectIdeas.length >= props.answers.answerElements.length) {
        props.passResult("true");
      }
    } else {
      props.passResult("true");
    }
  };

  const hasNonEmptyNextIdAndType = (array) => {
    return array.some(
      (element) => element.next_id !== "" && element.next_type !== ""
    );
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
              let score = null;
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
              let inputColor;
              if (props.goalType !== "ASSESS" && score >= 65) {
                inputColor = "#D0EADB";
              } else if (
                props.goalType !== "ASSESS" &&
                score < 65 &&
                score > 58
              ) {
                inputColor = "#ffd166";
              } else {
                inputColor = "#F3F3F3";
              }
              return (
                <Frame inputColor={inputColor}>
                  <Answer_text
                    key={index}
                    type="text"
                    required
                    inputColor={inputColor}
                    value={idea}
                    onChange={(e) => {
                      if (e.target.value.length <= 200) {
                        handleIdeaChange(e, index);
                      }
                    }}
                    onInput={(e) => {
                      autoResizeTextarea(e);
                      if (e.target.value.length >= 200) {
                        e.target.setCustomValidity(
                          "Maximum 200 characters allowed"
                        );
                        e.target.reportValidity();
                      } else {
                        e.target.setCustomValidity("");
                      }
                    }}
                    placeholder="..."
                  />

                  {score && isScoringShown && (
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
              );
            })}
          </Ideas>
        </div>
        <Progress display={progress}>
          <InfinitySpin width="200" color="#2E80EC" />
        </Progress>
        {/* 4. Answer buttons */}
        <Group progress={progress}>
          <Button1
            inputColor={inputColor}
            onClick={async (e) => {
              e.preventDefault();
              getMatchingAnswers(answer);
            }}
          >
            {t("evaluate_ideas")}
          </Button1>
          {props.goalType !== "ASSESS" && (
            <Button1
              inputColor={inputColor}
              onClick={async (e) => {
                e.preventDefault();
                // getHint(e);
                setGenerating(true);
                setAIHint(null);
                const res = await generateHint2(
                  router.locale,
                  props.question,
                  props.answers,
                  overallResults,
                  correctIdeas
                );
                setAIHint(res);
                setGenerating(false);
                createQuizResult({
                  variables: {
                    quiz: props.quizId,
                    lessonId: props.lessonId,
                    hint: res,
                    type: "hint",
                    comment: `Student asked for a hint`,
                  },
                });
              }}
            >
              {overallResults && overallResults.length > 0
                ? t("help_with_next_one")
                : t("where_to_start")}
            </Button1>
          )}
          <Circle onClick={() => setIdeas(ideas.slice(0, -1))}>-1</Circle>
          <Circle onClick={(e) => setIdeas([...ideas, ""])}>+1</Circle>
        </Group>
        {/* 5. The hint that helps find correct answers */}
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
        {/* 6. Bubble with buttons for additional questions available to the student  */}
        {isFeedbackShown && (
          <>
            <div className="question_box">
              <div className="question_text">
                <p>{correctIdeas.length > 0 && `🎉 ${t("great_job")}`}</p>
                <p>{correctIdeas.length == 0 && `🤔 ${t("none_correct")}`}</p>
                {/* <p>
                  {correctIdeas.length < props.answers.answerElements.length
                    ? t("not_all_answers")
                    : null}{" "}
                  {t("what_are_we_doing_next")}
                </p> */}
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
                <Option
                  onClick={(e) => {
                    setAreIdeasShown(true);
                    setAIHint(null);
                    createQuizResult({
                      variables: {
                        quiz: props.quizId,
                        lessonId: props.lessonId,
                        hint: AIhint,
                        ideasList: { quizIdeas: overallResults },
                        comment: `Student opened correct answer`,
                        type: "answerReveal",
                      },
                    });
                  }}
                >
                  {t("show_other_answers")}
                </Option>
              </OptionsGroup>
            </div>
          </>
        )}
        {areIdeasShown && (
          <div className="question_box">
            <div className="question_text">
              <p>These are my ideas:</p>
              <ul>
                {props.answers.answerElements.map((idea) => (
                  <li>{idea.answer}</li>
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

        {nextQuestions &&
          nextQuestions.length > 0 &&
          (hasNonEmptyNextIdAndType(nextQuestions) ? (
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
          ) : (
            <>
              <div className="question_box">
                <div className="question_text">
                  <p>🎉 Great job!</p>
                  <p>
                    Would you like to take a look at other ideas I have come up
                    with?
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
                </IconBlock>{" "}
                <OptionsGroup>
                  <Option
                    onClick={(e) => {
                      setAreIdeasShown(true);
                      // setHidden(false);
                    }}
                  >
                    {t("yes")}
                  </Option>
                </OptionsGroup>
              </div>
            </>
          ))}
      </>
    </Question>
  );
};

export default Generate;
