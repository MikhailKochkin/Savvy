import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import smoothscroll from "smoothscroll-polyfill";
import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";

import FullOpenQuestion from "./FullOpenQuestion";
import MiniQuestion from "./MiniQuestion";
import {
  generateHint,
  generateExplanation,
  generateImprovement,
  checkAnswer,
  reflectOnExplanation,
  checkNewWording,
  rephraseAnswer,
} from "../functions/AIQuestionFunctions";
import {
  removeSpecialChars,
  removeSpecialChars2,
} from "../../SimulatorDevelopmentFunctions";

const CREATE_QUIZRESULT_MUTATION = gql`
  mutation CREATE_QUIZRESULT_MUTATION(
    $answer: String
    $quiz: String
    $lessonId: String
    $result: String
    $type: String
    $correct: Boolean
    $comment: String
    $hint: String
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
      type: $type
      result: $result
      hint: $hint
      explanation: $explanation
      improvement: $improvement
      ideasList: $ideasList
    ) {
      id
    }
  }
`;

const OpenQuestion = (props) => {
  const {
    id,
    author,
    question,
    me,
    story,
    ifRight,
    ifWrong,
    quizId,
    goalType,
    challenge,
    openQuestionType,
    studentAnswerPassedFromAnotherComponent,
    isScoringShown,
    instructorName,
    context,
    image,
    jsonStoryString,
  } = props;
  const [answer, setAnswer] = useState(""); // The answer provided by the student
  const [previousAnswers, setPreviousAnswers] = useState([]); // The answers provided by the student
  // const [correct, setCorrect] = useState(""); // is the answer by the student correct? Used to communicate with the student
  const [correctnessLevel, setCorrectnessLevel] = useState(); // more deep understanding of the correctness. Used to generate prompts
  const [result, setResult] = useState(null); // student's grade
  const [results, setResults] = useState([]); // student's sciring for all elements from semantic cloud
  const [isAnswerBeingChecked, setIsAnswerBeingChecked] = useState(false);
  const [inputColor, setInputColor] = useState("#f3f3f3");
  const [serverComment, setServerComment] = useState(null);

  const [hints, setHints] = useState([]); // all AI generated hints

  const [explanations, setExplanantions] = useState([]); // all AI generated explanations
  const [explanationsNum, setExplanationsNum] = useState(0); // how many explanations the student asked for

  const [improvements, setImprovements] = useState([]); // all AI generated improvements
  const [improvementsNum, setImprovementsNum] = useState(0); // how many improvements the student asked for

  const { passResult } = props;
  const router = useRouter();
  const { t } = useTranslation("lesson");

  const [createQuizResult, { data, loading, error }] = useMutation(
    CREATE_QUIZRESULT_MUTATION
  );

  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });

  // 1. PassAnswer

  const passAnswer = (val) => {
    setAnswer(val);
    setInputColor("#f3f3f3");
    setResult(null);
  };

  // 2. Check student's answer

  const onAnswer = async (e) => {
    setIsAnswerBeingChecked(true);
    setExplanationsNum(0);
    setImprovementsNum(0);

    const processResult = (
      result,
      correctnessLevel,
      color,
      comment,
      isCorrect
    ) => {
      setResult(result);
      if (goalType !== "ASSESS") setInputColor(color);
      comment ? setServerComment(comment.length > 5 ? comment : null) : null;
      passResult(isCorrect ? "true" : "false");

      createQuizResult({
        variables: {
          quiz: props.quizId,
          lessonId: props.lessonId,
          answer: answer,
          correct: isCorrect,
          type: "answer",
          hint: hints.length > 0 ? hints[hints.length - 1] : null,
          result: result.toString(),
          explanation:
            explanations.length > 0
              ? explanations[explanations.length - 1]
              : null,
          improvement:
            improvements.length > 0
              ? improvements[improvements.length - 1]
              : null,
          comment: `${comment}. ${
            isCorrect ? "Looks true" : "Result"
          }: ${result}%`,
        },
      });
    };

    const handleCorrectnessLevel = (
      correctnessLevel,
      result,
      color,
      comment
    ) => {
      switch (correctnessLevel) {
        case "correct":
          processResult(
            result,
            correctnessLevel,
            "rgba(50, 172, 102, 0.25)",
            comment,
            true
          );
          break;
        case "looks_true":
        case "has_flaws":
          processResult(result, correctnessLevel, color, comment, true);
          break;
        default:
          processResult(result, correctnessLevel, color, comment, false);
          break;
      }
    };

    const evaluateAnswers = async (sampleAnswers) => {
      let results = [];
      await Promise.all(
        sampleAnswers.map(async (el) => {
          // First, check el.answer
          const initialCheck = await checkAnswer(
            e,
            removeSpecialChars2(el.answer),
            answer,
            props.check
          );

          // Deconstruct to get initial values
          const {
            result: initialResult,
            correctnessLevel: initialCL,
            color: initialColor,
            comment: initialComment,
          } = initialCheck;

          // By default, we'll assume the final check is just the initial one
          let finalResult = initialResult;
          let finalCL = initialCL;
          let finalColor = initialColor;
          let finalComment = initialComment;
          let finalAnswer = el.answer;

          // If initial result is <= 65, we check el.relatedAnswers
          if (initialResult <= 65 && Array.isArray(el.relatedAnswers)) {
            // Iterate through relatedAnswers and pick the highest result
            for (const relatedAnswer of el.relatedAnswers) {
              const relatedCheck = await checkAnswer(
                e,
                removeSpecialChars2(relatedAnswer),
                answer,
                props.check
              );

              const {
                result: relatedResult,
                correctnessLevel: relatedCL,
                color: relatedColor,
                comment: relatedComment,
              } = relatedCheck;

              // If this related answer's result is better than our current finalResult, replace
              if (relatedResult > finalResult) {
                finalResult = relatedResult;
                finalCL = relatedCL;
                finalColor = relatedColor;
                finalComment = relatedComment;
                finalAnswer = relatedAnswer;
              }
            }
          }

          // Push the best result (between el.answer and relatedAnswers)
          results.push({
            answer: finalAnswer,
            result: finalResult,
            correctnessLevel: finalCL,
            color: finalColor,
            comment: finalComment,
          });
        })
      );

      setResults(results);

      // Find the highest result overall
      const highestResult = results.reduce((max, current) =>
        current.result > max.result ? current : max
      );

      const { result, correctnessLevel, color, comment } = highestResult;

      // Your existing calls
      setCorrectnessLevel(correctnessLevel);
      handleCorrectnessLevel(correctnessLevel, result, color, comment);
    };
    if (
      props.answers?.answerElements?.length > 0 &&
      props.answers?.answerElements[0].answer !== ""
    ) {
      await evaluateAnswers(props.answers.answerElements);
    } else {
      try {
        const { result, correctnessLevel, color, comment } = await checkAnswer(
          e,
          removeSpecialChars2(props.answer),
          answer,
          props.check
        );

        // Resolve correctnessLevel if it's a Promise
        const resolvedCorrectnessLevel = await correctnessLevel;

        setCorrectnessLevel(resolvedCorrectnessLevel);
        handleCorrectnessLevel(
          resolvedCorrectnessLevel,
          result,
          color,
          comment
        );
      } catch (error) {
        console.error(error);
      }
    }
    setPreviousAnswers([...previousAnswers, answer]);

    setIsAnswerBeingChecked(false);
  };

  const challengeAnswer = async (e) => {
    let new_wording = await rephraseAnswer(answer, props.answer);

    const { result, correctnessLevel, color, comment } = await checkAnswer(
      e,
      removeSpecialChars2(props.answer),
      new_wording,
      props.check
    );

    // console.log("result", result);
    setInputColor(color);
    setResult(result);
    createQuizResult({
      variables: {
        quiz: props.quizId,
        lessonId: props.lessonId,
        answer: new_wording,
        correct: result > 58 ? true : false,
        type: "challenge",
        hint: null,
        result: result.toString(),
        explanation: null,
        improvement: null,
        comment: `The student challenged the answer.`,
      },
    });
    return {
      result,
      new_wording,
    };
  };

  // 3. Provide hints to the student

  const getHint = async (event) => {
    const hintGenerationResult = await generateHint(
      event,
      "openai",
      props.question,
      removeSpecialChars(props.answer),
      ifWrong,
      hints,
      router,
      context,
      jsonStoryString
    );
    if (hintGenerationResult?.newHint !== null) {
      setHints([...hints, hintGenerationResult.newHint]);
      createQuizResult({
        variables: {
          quiz: props.quizId,
          lessonId: props.lessonId,
          answer: answer,
          correct: false,
          type: "hint",
          hint: hintGenerationResult.newHint,
          explanation:
            explanations.length > 0
              ? explanations[explanations.length - 1]
              : null,
          improvement:
            improvements.length > 0
              ? improvements[improvements.length - 1]
              : null,
          comment: `Student asked for a hint`,
        },
      });
    }
  };

  // 4. Explain what is wrong with the answer based on the score of the student's answer

  const getExplanation = async (event) => {
    let loopsNum = 2;
    let explanationGenerationResult = await generateExplanation(
      event,
      "openai",
      props.question,
      removeSpecialChars(props.answer),
      answer,
      correctnessLevel,
      ifWrong,
      ifRight,
      explanations,
      router,
      t("simple_explanation"),
      explanationsNum,
      context
    );

    let answerToReflectOn = explanationGenerationResult.newExplanation;

    // for (let i = 0; i < loopsNum; i++) {
    //   answerToReflectOn = await reflectOnExplanation(answerToReflectOn);
    //   console.log("answerToReflectOn", answerToReflectOn);
    // }

    setExplanationsNum(explanationsNum + 1);
    setExplanantions([...explanations, answerToReflectOn]);

    createQuizResult({
      variables: {
        quiz: props.quizId,
        lessonId: props.lessonId,
        answer: answer,
        type: "explanation",
        correct: false,
        hint: hints.length > 0 ? hints[hints.length - 1] : null,
        explanation: explanationGenerationResult.newExplanation,
        improvement:
          improvements.length > 0
            ? improvements[improvements.length - 1]
            : null,
        comment: `Student asked for explanations`,
      },
    });
  };

  // 5. Explain how to improve existing answer to get a higher score

  const getImprovements = async (event) => {
    const improvementGenerationResult = await generateImprovement(
      event,
      "openai",
      props.question,
      props.answer,
      answer,
      correctnessLevel,
      ifRight,
      improvements,
      router,
      context
    );
    setImprovementsNum(improvementsNum + 1);
    setImprovements([
      ...improvements,
      improvementGenerationResult.newImprovement,
    ]);
    createQuizResult({
      variables: {
        quiz: props.quizId,
        lessonId: props.lessonId,
        answer: answer,
        type: "improvement",
        correct: false,
        hint: hints.length > 0 ? hints[hints.length - 1] : null,
        explanation:
          explanations.length > 0
            ? explanations[explanations.length - 1]
            : null,
        improvement: improvementGenerationResult.newImprovement,
        comment: `Student asked for improvements`,
      },
    });
  };

  // 6. Reveal correct answer

  const revealCorrectAnswer = () => {
    createQuizResult({
      variables: {
        quiz: props.quizId,
        lessonId: props.lessonId,
        answer: answer,
        correct: false,
        type: "answerReveal",
        hint: hints.length > 0 ? hints[hints.length - 1] : null,
        explanation:
          explanations.length > 0
            ? explanations[explanations.length - 1]
            : null,
        improvement:
          improvements.length > 0
            ? improvements[improvements.length - 1]
            : null,
        comment: `Student opened correct answer`,
      },
    });
  };

  // 7. Double check
  const doubleCheck = async (value) => {
    let results = [];
    let new_wording = await checkNewWording(value, props.answer);
    let new_result;
    if (
      props.answers?.answerElements?.length > 0 &&
      props.answers?.answerElements[0].answer !== ""
    ) {
      await Promise.all(
        props.answers.answerElements.map(async (el) => {
          const { result, correctnessLevel, color, comment } =
            await checkAnswer(
              true,
              removeSpecialChars2(el.answer),
              new_wording,
              props.check
            );

          // Ensure correctnessLevel is resolved
          const resolvedCorrectnessLevel = await correctnessLevel;

          results.push({
            result,
            correctnessLevel: resolvedCorrectnessLevel,
            color,
            comment,
          });
        })
      );

      const new_result = results.reduce((max, current) =>
        current.result > max.result ? current : max
      );
      return new_result;
    } else {
      new_result = await checkAnswer(
        value,
        removeSpecialChars2(props.answer),
        new_wording,
        props.check
      );
    }
    return {
      new_result: new_result,
      new_wording: new_wording,
    };
  };
  return openQuestionType == "mini" ? (
    <MiniQuestion
      id={id}
      author={author}
      question={question}
      story={story}
      inputColor={inputColor}
      correctAnswer={props.answer}
      answer={answer}
      onAnswer={onAnswer}
      passAnswer={passAnswer}
      sampleAnswer={props.answer}
      me={me}
      result={result}
      isAnswerBeingChecked={isAnswerBeingChecked}
      correctnessLevel={correctnessLevel}
      hints={hints}
      getHint={getHint}
      explanations={explanations}
      getExplanation={getExplanation}
      improvements={improvements}
      getImprovements={getImprovements}
      goalType={goalType}
      challenge={challenge}
      revealCorrectAnswer={revealCorrectAnswer}
      studentAnswerPassedFromAnotherComponent={
        studentAnswerPassedFromAnotherComponent
      }
      explanationsNum={explanationsNum}
      improvementsNum={improvementsNum}
      isScoringShown={isScoringShown}
      challengeAnswer={challengeAnswer}
    />
  ) : (
    <FullOpenQuestion
      id={id}
      lessonId={props.lessonId}
      author={author}
      question={question}
      story={story}
      inputColor={inputColor}
      correctAnswer={props.answer}
      answer={answer}
      previousAnswers={previousAnswers}
      sampleAnswer={props.answer}
      onAnswer={onAnswer}
      passAnswer={passAnswer}
      me={me}
      result={result}
      isAnswerBeingChecked={isAnswerBeingChecked}
      correctnessLevel={correctnessLevel}
      hints={hints}
      getHint={getHint}
      explanations={explanations}
      getExplanation={getExplanation}
      improvements={improvements}
      getImprovements={getImprovements}
      goalType={goalType}
      challenge={challenge}
      revealCorrectAnswer={revealCorrectAnswer}
      serverComment={serverComment}
      isScoringShown={isScoringShown}
      image={image}
      instructorName={instructorName}
      doubleCheck={doubleCheck}
      challengeAnswer={challengeAnswer}
    />
  );
};

OpenQuestion.propTypes = {
  author: PropTypes.object.isRequired, // Information about the author of the question
  me: PropTypes.object.isRequired, // Information about the current user
  story: PropTypes.bool.isRequired, // Determine the format of the component
  ifRight: PropTypes.string.isRequired, // Prompt to follow if the answer is correct
  ifWrong: PropTypes.string.isRequired, // Prompt to follow if the answer is incorrect
  passResult: PropTypes.func.isRequired, // Function to pass the result
  quizId: PropTypes.string.isRequired, // ID of the quiz
  lessonId: PropTypes.string.isRequired, // ID of the lesson
};

export default OpenQuestion;
