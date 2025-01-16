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
  const { author, me, story, isScoringShown } = props;
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
    smoothscroll.polyfill();
  }, []);

  const { t } = useTranslation("lesson");
  const router = useRouter();

  const handleIdeaChange = (event, index) => {
    // Copy the current state of ideas
    const updatedIdeas = [...ideas];

    // Update the idea at the specific index with the new value
    updatedIdeas[index] = event.target.value;

    // Update the state with the modified ideas array
    setIdeas(updatedIdeas);
  };

  const compareAnswers = async (idea, answer) => {
    try {
      const response = await fetch(
        "https://arcane-refuge-67529.herokuapp.com/checker",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answer1: answer?.answer ? answer?.answer : answer,
            answer2: idea,
          }),
        }
      );
      const result = await response.json();
      return parseFloat(result.res) || 0;
    } catch (error) {
      console.error("Error comparing answers:", error);
      return 0;
    }
  };

  const getMatchingAnswers = async (answers) => {
    // Use a Set to keep track of answers that are “used” if they exceed the threshold
    const usedAnswers = new Set();

    let newCorrectIdeas = []; // correct ideas dound during this check
    let new_results = []; // results of current checking the ideas
    let old_results = []; // results of previous checking the ideas
    let updatedExpectedAnswers = [...expectedAnswers]; //

    // 1️⃣ FIRST LOOP. Going through each student idea
    for (let idea of ideas) {
      // 🔥 TESTS TO MAKE SURE THAT WE ARE NOT DOING UNNECESSARY WORK

      // 1. Skip empty ideas (null, undefined, or blank string)
      if (!idea || !idea.trim()) {
        continue;
      }

      // 2. Check if the idea has already been evaluated during previous student answers
      // No need to evaluate this idea again
      let existingResult =
        overallResults && overallResults.find((res) => res.idea === idea);
      if (existingResult) {
        old_results.push(existingResult);
        continue;
      }

      // Keep track of the best match for the current idea.
      // We now include a feedback property to store the feedback from the matched answer.
      let bestMatch = {
        result: 0,
        matchedText: null,
        feedback: null,
      };

      // 2️⃣ SECOND LOOP. We compace active idea with sample answers we have
      for (let answer of answers) {
        // 🔥 TESTS TO MAKE SURE THAT WE ARE NOT DOING UNNECESSARY WORK
        // 1. Skip if this answer has already been matched with the previous idea
        if (usedAnswers.has(answer)) {
          continue;
        }

        // 2. If best match is already >= 65, skip checking more answers
        if (bestMatch.result >= 65) {
          break;
        }

        // 3️⃣. The first round of checks start. We compare main answers

        const mainScore = await compareAnswers(idea, answer);

        // Update best match if main answer is better than current best
        if (mainScore > bestMatch.result) {
          bestMatch.result = mainScore;
          bestMatch.matchedText = answer.answer;
          bestMatch.feedback = answer.feedback;
        }

        // If the main score is below 25, skip checking related answers
        if (mainScore < 25) {
          continue;
        }

        // If mainScore is above 65, mark this entire answer as “used” and stop checking it
        if (mainScore > 65) {
          usedAnswers.add(answer);
          break;
        } else {
          // If we are between 25 and 65, let's check each related answer
          let fetchPromises = [];
          let textsToFetch = [];
          (answer.relatedAnswers || []).forEach((relAns) => {
            fetchPromises.push(compareAnswers(relAns, idea));
            textsToFetch.push(relAns);
          });

          try {
            const responses = await Promise.all(fetchPromises);
            const jsonResults = responses;

            // Update best match based on related answers
            jsonResults.forEach((r, index) => {
              let val = parseFloat(r) || 0;
              if (val > bestMatch.result) {
                bestMatch.result = val;
                bestMatch.matchedText = textsToFetch[index];
                bestMatch.feedback = answer.feedback;
              }
            });

            // If any related answer is above 65, mark this entire answer as used
            if (bestMatch.result > 65) {
              usedAnswers.add(answer);
              break;
            }
          } catch (error) {
            console.error("Error comparing related answers:", error);
            // Continue to the next answer
          }
        }
      } // end of answers loop
      // Build the result object. Add feedback property only if bestMatch.result is higher than 57.
      let new_obj = {
        idea,
        result: bestMatch.result,
        matchedAnswer: bestMatch.matchedText,
      };
      if (bestMatch.result > 57) {
        new_obj.feedback = bestMatch.feedback;
      }
      new_results.push(new_obj);

      // If the best match exceeds threshold, track as correct, including feedback conditionally.
      if (bestMatch.result > 57 && bestMatch.matchedText) {
        let correctIdea = {
          idea,
          matchedAnswer: bestMatch.matchedText,
        };
        if (bestMatch.result > 57) {
          correctIdea.feedback = bestMatch.feedback;
        }
        newCorrectIdeas.push(correctIdea);
      }
    }

    // Merge results with old_results
    let unique_values = [];
    [...old_results, ...new_results].forEach((item) => {
      const existingItem = unique_values.find((uv) => uv.idea === item.idea);
      if (!existingItem) {
        unique_values.push({ ...item });
      } else if (parseFloat(item.result) > parseFloat(existingItem.result)) {
        existingItem.result = item.result;
        existingItem.matchedAnswer = item.matchedAnswer;
        if (item.result > 57) {
          existingItem.feedback = item.feedback;
        }
      }
    });

    // Update state
    setOverallResults(unique_values);
    setCorrectIdeas([...correctIdeas, ...newCorrectIdeas]);
    setIsFeedbackShown(true);
    setExpectedAnswers(updatedExpectedAnswers);

    let quizIdeas = unique_values.map((uv) => ({
      ...uv,
      result: String(uv.result),
    }));

    // Persist the quiz result with the matched answer included
    createQuizResult({
      variables: {
        quiz: props.quizId,
        lessonId: props.lessonId,
        type: "answer",
        ideasList: { quizIdeas },
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
              setProgress("true");
              await getMatchingAnswers(props.answers.answerElements);
              setProgress("false");
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
                <p>
                  {overallResults.filter((el) => el.feedback).length > 0 ? (
                    <>
                      <p>I have some comments:</p>
                      <ul>
                        {overallResults
                          .filter((el) => el.feedback)
                          .map((el, index) => (
                            <li key={index}>
                              <b>{el.idea}</b>: {el.feedback}
                              <br />
                            </li>
                          ))}
                      </ul>
                    </>
                  ) : null}
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
                <Option
                  onClick={(e) => {
                    setAreIdeasShown(true);
                    setAIHint(null);
                    createQuizResult({
                      variables: {
                        quiz: props.quizId,
                        lessonId: props.lessonId,
                        hint: AIhint,
                        ideasList: {
                          quizIdeas: overallResults.map((idea) => ({
                            ...idea,
                            result: idea.result.toString(),
                          })),
                        },
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
      </>
    </Question>
  );
};

export default Generate;
