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
    $ideasList: QuizIdeas
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
  } = props;

  const [answer, setAnswer] = useState(""); // The answer provided by the student
  const [previousAnswers, setPreviousAnswers] = useState([]); // The answer provided by the student
  // const [correct, setCorrect] = useState(""); // is the answer by the student correct? Used to communicate with the student
  const [correctnessLevel, setCorrectnessLevel] = useState(); // more deep understanding of the correctness. Used to generate prompts
  const [result, setResult] = useState(null); // student's grade
  const [isAnswerBeingChecked, setIsAnswerBeingChecked] = useState(false);
  const [inputColor, setInputColor] = useState("#f3f3f3");
  const [serverComment, setServerComment] = useState(null);
  // const [isExperienced, setIsExperienced] = useState(false); // set to false once we get the student answer

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
  };

  // 2. Check student's answer

  const onAnswer = async (e) => {
    setIsAnswerBeingChecked(true);
    setExplanationsNum(0);
    setImprovementsNum(0);
    try {
      const { result, correctnessLevel, color, comment } = await checkAnswer(
        e,
        removeSpecialChars(props.answer),
        answer,
        props.check
      );

      setCorrectnessLevel(correctnessLevel, () => {
        // console.log("correctnessLevel after setState", correctnessLevel);
      });

      if (correctnessLevel === "correct") {
        // if (!isExperienced) {
        //   if (props.getResults) props.getResults(2);
        //   setIsExperienced(true);
        // }
        setResult(result);
        if (goalType !== "ASSESS") setInputColor("rgba(50, 172, 102, 0.25)");
        passResult("true");
      } else if (
        correctnessLevel === "looks_true" ||
        correctnessLevel === "has_flaws"
      ) {
        setResult(result);
        if (goalType !== "ASSESS") setInputColor(color);
        passResult("true");
        createQuizResult({
          variables: {
            quiz: props.quizId,
            lessonId: props.lessonId,
            answer: answer,
            correct: true,
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
            comment: `${comment}. Looks true: ${result}%`,
          },
        });
      } else {
        setResult(result);
        setServerComment(comment.length > 5 ? comment : null);

        if (goalType !== "ASSESS") setInputColor(color);
        createQuizResult({
          variables: {
            quiz: props.quizId,
            lessonId: props.lessonId,
            answer: answer,
            correct: false,
            hint: hints.length > 0 ? hints[hints.length - 1] : null,
            type: "answer",
            result: result.toString(),
            explanation:
              explanations.length > 0
                ? explanations[explanations.length - 1]
                : null,
            improvement:
              improvements.length > 0
                ? improvements[improvements.length - 1]
                : null,
            comment: `${comment}. Result: ${result}%`,
          },
        });
        passResult("false");
      }

      setIsAnswerBeingChecked(false);
    } catch (error) {
      console.error(error);
      setIsAnswerBeingChecked(false);
    }
    setPreviousAnswers([...previousAnswers, answer]);
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
      router
    );
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
      explanationsNum
    );

    let answerToReflectOn = explanationGenerationResult.newExplanation;
    console.log("answerToReflectOn", answerToReflectOn);

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
      router
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
    />
  ) : (
    <FullOpenQuestion
      id={id}
      author={author}
      question={question}
      story={story}
      inputColor={inputColor}
      correctAnswer={props.answer}
      answer={answer}
      previousAnswers={previousAnswers}
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
