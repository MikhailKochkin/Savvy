import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import smoothscroll from "smoothscroll-polyfill";

import MiniPrompt from "./MiniPrompt";
import FullPrompt from "./FullPrompt";

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
    ) {
      id
    }
  }
`;

const Prompt = (props) => {
  const {
    id,
    author,
    me,
    story,
    name,
    image,
    openQuestionType,
    studentAnswerPassedFromAnotherComponent,
  } = props;

  const [answerText, setAnswerText] = useState(""); // The answer provided by the student

  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });

  useEffect(() => {
    setAnswerText(studentAnswerPassedFromAnotherComponent);
  }, [studentAnswerPassedFromAnotherComponent]);

  const [createQuizResult, { data, loading, error }] = useMutation(
    CREATE_QUIZRESULT_MUTATION
  );

  const getAnswerText = (textValue) => {
    setAnswerText(textValue);
  };

  const generateFeedback = async (e) => {
    e.preventDefault();
    let prompt = `
      The question is: """${props.question}"""
      The details on how to evaluate the question are: """${props.answer}"""
      The student answer is: """${answerText}"""

      Provide feedback to the student answer based on these rules:

      1. The language of feedback is the same as the languiage of the student answer.
      2. The feedback is in second person. Address the student as "You".
      3. Use simple and plain language, act as a helpful mentor, your job is to increase motvation and provide valuable insights.

      Return the feedback in JSON format like this: 
      { 
      "feedback": "" // your feedback
      }
    `;
    console.log("prompt", prompt);
    try {
      const response = await fetch("/api/generateJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      if (response.status !== 200) {
        throw (
          (await response.json()).error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      const data = await response.json();
      if (response.ok) {
        let feedback = JSON.parse(data.result.content);
        console.log("feedback", feedback);
        createQuizResult({
          variables: {
            quiz: props.quizId,
            lessonId: props.lessonId,
            answer: answerText,
            correct: true,
            explanation: feedback.feedback,
            comment: `This question was evaluated by GenAI.`,
          },
        });
        return feedback;
      } else {
        throw new Error(
          data.error.message || "An error occurred during your request."
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return openQuestionType == "mini" ? (
    <MiniPrompt
      id={id}
      author={author}
      me={me}
      story={story}
      name={name}
      image={image}
      question={props.question}
      passAnswerText={getAnswerText}
      answerText={answerText}
      generateFeedback={generateFeedback}
      studentAnswerPassedFromAnotherComponent={
        studentAnswerPassedFromAnotherComponent
      }
    />
  ) : (
    <FullPrompt
      id={id}
      author={author}
      me={me}
      story={story}
      name={name}
      image={image}
      question={props.question}
      passAnswerText={getAnswerText}
      answerText={answerText}
      generateFeedback={generateFeedback}
    />
  );
};

export default Prompt;
