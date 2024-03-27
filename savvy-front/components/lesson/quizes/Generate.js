import { useState, useEffect, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import parse from "html-react-parser";
import { InfinitySpin, TailSpin } from "react-loader-spinner";
import { useTranslation } from "next-i18next";
import smoothscroll from "smoothscroll-polyfill";
import { guessAlphabet, autoResizeTextarea } from "./quiz_functions";

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
  font-weight: 500;
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
  height: 50px;
  transition: 0.3s;
  &:hover {
    border: 1px solid #3f51b5;
  }
`;

const Generate = (props) => {
  const { author, me, story, ifRight, ifWrong, quizId } = props;
  const [answer, setAnswer] = useState(""); // The answer provided by the student
  const [ideas, setIdeas] = useState([""]);
  const [nextQuestions, setNextQuestions] = useState();
  const [correctIdeas, setCorrectIdeas] = useState([]);
  const [progress, setProgress] = useState("false");
  const [inputColor, setInputColor] = useState("#f3f3f3");
  const [generating, setGenerating] = useState(false);
  const [areIdeasShown, setAreIdeasShown] = useState(false);

  const [createQuizResult, { data, loading, error }] = useMutation(
    CREATE_QUIZRESULT_MUTATION
  );

  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });

  const { t } = useTranslation("lesson");

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
        quiz: props.quizId,
        lessonId: props.lessonId,
        ideasList: { quizIdeas: unique_values },
        comment: ``,
      },
    });
    props.passResult("true");

    return matchedAnswers;
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
              let inputColor;

              if (props.goalType !== "ASSESS" && correctIdeas.includes(idea)) {
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
          <Circle onClick={() => setIdeas(ideas.slice(0, -1))}>-1</Circle>
          <Circle onClick={(e) => setIdeas([...ideas, ""])}>+1</Circle>
        </Group>
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
          ))}
      </>
    </Question>
  );
};

export default Generate;
