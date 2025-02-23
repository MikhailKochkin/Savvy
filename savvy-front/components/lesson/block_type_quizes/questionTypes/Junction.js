import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import parse from "html-react-parser";
import { InfinitySpin, TailSpin } from "react-loader-spinner";
import smoothscroll from "smoothscroll-polyfill";
import { autoResizeTextarea } from "../../SimulatorDevelopmentFunctions";
import {
  Question,
  Answer_text,
  Button1,
  Frame,
} from "../../styles/commonElements/QuestionStyles";
import IconBlockElement from "../../styles/commonElements/IconBlockElement";
import { getMatchingAnswers } from "../functions/AIQuestionFunctions";

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

const Junction = (props) => {
  const { author, me, story, quizId, lessonId, passQuizDataToParent } = props;
  const [ideas, setIdeas] = useState([""]);
  const [progress, setProgress] = useState("false");
  const [inputColor, setInputColor] = useState("#f3f3f3");
  const [generating, setGenerating] = useState(false);
  const [overallResults, setOverallResults] = useState(null); // results of checking the ideas
  const [expectedAnswers, setExpectedAnswers] = useState(
    new Array(props.answers?.answerElements?.length).fill(null)
  );
  const [createQuizResult, { data, loading, error }] = useMutation(
    CREATE_QUIZRESULT_MUTATION
  );

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  const handleIdeaChange = (event, index) => {
    // Copy the current state of ideas
    const updatedIdeas = [...ideas];

    // Update the idea at the specific index with the new value
    updatedIdeas[index] = event.target.value;

    // Update the state with the modified ideas array
    setIdeas(updatedIdeas);
  };

  return (
    <Question story={story}>
      {/* 2.1 Question part */}
      <div className="question_box">
        <div className="question_text">{parse(props.question)}</div>
        <IconBlockElement
          instructorId={instructorId}
          author={author}
          characters={characters}
        />
      </div>
      {generating && (
        <Progress2>
          <TailSpin width="50" color="#2E80EC" />
        </Progress2>
      )}
      {/* 3.5. Generate ideas */}
      <>
        <div className="answer">
          <IconBlockElement me={me} />
          <Ideas>
            {ideas.map((idea, index) => {
              let inputColor = "#F3F3F3";
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
          {progress == "false" ? (
            <Button1
              inputColor={inputColor}
              onClick={async (e) => {
                e.preventDefault();
                setProgress("true");
                // 1. We assess the ideas
                const results = await getMatchingAnswers(
                  props.answers.answerElements,
                  ideas,
                  expectedAnswers,
                  overallResults
                );
                // 2. We find the most matching idea
                const highestResult = results.overallResults.reduce(
                  (max, current) =>
                    current.result > max.result ? current : max,
                  { result: 0 }
                );
                // 3. Pass it problem
                passQuizDataToParent([true, highestResult.id], "branch");
                setProgress("false");

                const createdQuizResult = await createQuizResult({
                  variables: {
                    quiz: quizId,
                    lessonId,
                    type: "answer",
                    ideasList: { quizIdeas: results.overallResults },
                    comment: "",
                  },
                });
              }}
            >
              Send
            </Button1>
          ) : null}
        </Group>
      </>
    </Question>
  );
};

export default Junction;
