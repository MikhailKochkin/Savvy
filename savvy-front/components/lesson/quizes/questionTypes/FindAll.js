import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import { InfinitySpin, TailSpin } from "react-loader-spinner";
import { useTranslation } from "next-i18next";
import smoothscroll from "smoothscroll-polyfill";
import PropTypes from "prop-types";
import { generateHint2 } from "../functions/AIQuestionFunctions";

import { autoResizeTextarea } from "../../SimulatorDevelopmentFunctions";
import {
  IconBlock,
  Question,
  Answer_text,
  ResultCircle,
  Button1,
  Circle,
  Frame,
  OptionsGroup,
  Option,
} from "../QuestionStyles";

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

const FindAll = (props) => {
  const { author, me, story, ifRight, ifWrong, isScoringShown } = props;

  const [ideas, setIdeas] = useState([""]); // ideas provided by the student
  const [correctIdeas, setCorrectIdeas] = useState([]); // ideas that match the correct answers
  const [overallResults, setOverallResults] = useState(null); // results of checking the ideas

  const [progress, setProgress] = useState("false");
  const [inputColor, setInputColor] = useState("#f3f3f3");
  const [generating, setGenerating] = useState(false);

  const [areIdeasShown, setAreIdeasShown] = useState(false);
  const [isAnswerCountShown, setIsAnswerCountShown] = useState(false);
  const [answerCountText, setAnswerCountText] = useState("");
  const [isFeedbackShown, setIsFeedbackShown] = useState(false);
  const [AIhint, setAIHint] = useState(null);
  const [expectedAnswers, setExpectedAnswers] = useState(
    new Array(props.answers?.answerElements?.length).fill(null)
  );

  const [createQuizResult, { data, loading, error }] = useMutation(
    CREATE_QUIZRESULT_MUTATION
  );

  useEffect(() => {
    smoothscroll.polyfill();
  });

  const { t } = useTranslation("lesson");
  const router = useRouter();

  // 1. Save all ideas put down by students in forms
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
    setProgress("true");
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
            if (res.res > 65 && !matchedIndexes.has(answer.index)) {
              matchedAnswers.push(answer);
              matchedIndexes.add(answer.index);
            }
            if (res.res > 65) {
              newCorrectIdeas.push({
                idea: idea,
                matchedAnswer: answer,
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

    setOverallResults(unique_values);
    setProgress("false");
    setCorrectIdeas([...correctIdeas, ...newCorrectIdeas]);
    setIsFeedbackShown(true);
    setExpectedAnswers(updatedExpectedAnswers); // Update state with accumulated changes

    createQuizResult({
      variables: {
        quiz: props.quizId,
        lessonId: props.lessonId,
        hint: AIhint,
        type: "answer",
        ideasList: { quizIdeas: unique_values },
        comment: ``,
      },
    });
    if (props.problemType === "ONLY_CORRECT") {
      if (newCorrectIdeas.length >= props.answers.answerElements.length) {
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
        <p>${t("number_of_correct_guesses")} – ${correctIdeas.length}.</p>
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
        hint: AIhint,
        type: "hint",
        ideasList: { quizIdeas: overallResults },
        comment: `Student asked for remaining options`,
      },
    });
  };

  // 4. Generate a hint for the student

  return (
    <Question story={story}>
      {/* 2 Question bubble */}
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

      <>
        {/* 3. Forms for writing down ideas / answers */}

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
              if (props.goalType !== "ASSESS" && score > 65) {
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
                    disabled={parseInt(score) > 65 ? true : false}
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

        {/* 4. Answer and Hint buttons */}
        <Group progress={progress}>
          <Button1
            inputColor={inputColor}
            onClick={async (e) => {
              e.preventDefault();
              getMatchingAnswers();
              setIsAnswerCountShown(false);
            }}
          >
            {t("check")}
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
        {/* 4.1 loading sign while the answera are being checked*/}
        {generating && (
          <Progress2>
            <TailSpin width="50" color="#2E80EC" />
          </Progress2>
        )}

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
                  {correctIdeas.length < props.answers.answerElements.length
                    ? t("not_all_answers")
                    : null}{" "}
                  {t("what_are_we_doing_next")}
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
                  <Option onClick={(e) => generateAnswerCountComment(e)}>
                    {t("how_many_options_are_left")}
                  </Option>
                )}
                <Option
                  onClick={(e) => {
                    setIsAnswerCountShown(false);
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
                  {t("show_correct_answers")}
                </Option>
              </OptionsGroup>
            </div>
          </>
        )}

        {/* 7. Additional information bubbles  */}

        {isAnswerCountShown && (
          <div className="question_box">
            <div className="question_text">{parse(answerCountText)}</div>
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

FindAll.propTypes = {
  author: PropTypes.object.isRequired, // Information about the author
  me: PropTypes.object.isRequired, // Information about the current user
  story: PropTypes.bool.isRequired, // Determine the format of the component
  ifRight: PropTypes.string.isRequired, // Prompt to follow if the answer is correct
  ifWrong: PropTypes.string.isRequired, // Prompt to follow if the answer is incorrect
  passResult: PropTypes.func.isRequired, // Function to pass the result
  quizId: PropTypes.string.isRequired, // ID of the quiz
  lessonId: PropTypes.string.isRequired, // ID of the lesson
};

export default FindAll;
