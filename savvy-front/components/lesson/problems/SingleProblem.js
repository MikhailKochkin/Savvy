import { useState, useEffect } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
// import Button from "@material-ui/core/Button";
// import { withStyles } from "@material-ui/core/styles";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import DeleteSingleProblem from "../../delete/DeleteSingleProblem";
import Interactive from "./Interactive";
import NewInteractive from "./NewInteractive";
import UpdateProblem from "./UpdateProblem";

const CREATE_PROBLEMRESULT_MUTATION = gql`
  mutation CREATE_PROBLEMRESULT_MUTATION(
    $answer: String
    $lessonId: String
    $revealed: [String]
    $problemID: String
  ) {
    createProblemResult(
      answer: $answer
      lessonId: $lessonId
      revealed: $revealed
      problemID: $problemID
    ) {
      id
    }
  }
`;

const TextBar = styled.div`
  /* width: ${(props) => (props.story ? "100vw" : "100%")}; */
  /* max-width: 540px; */
  width: 570px;

  font-size: 1.6rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2%;
  margin-bottom: 3%;
  .article {
    font-size: 1.6rem;
    width: 100%;
    margin: 1% 1%;
    padding: 1% 4%;
    border-left: 3px solid #0094c6;
    /* line-height: 1.6; */
    p {
      margin: 10px 0;
      line-height: 1.4;
    }
  }
  #text {
    width: 100%;
  }
  .hint {
    color: #333a8a;
    text-decoration: underline;
    cursor: pointer;
  }
  p {
    line-height: 1.6;
    font-weight: 500;
  }
  h2 p {
    line-height: 1.2;
    width: 80%;
    font-size: 3.2rem;
    font-weight: 700;
  }
  img {
    display: block;
    max-width: 100%;
    max-height: 20em;
    border-radius: 20px;
    @media (max-width: 750px) {
      width: 100%;
      height: auto;
    }
  }
  iframe {
    width: 100%;
    height: 400px;
    @media (max-width: 800px) {
      width: 100%;
      height: auto;
    }
  }
  .question {
    background: #f5f5f5;
    padding: 15px 20px;
    border-radius: 20px;
    .line_top {
      border-top: 1px solid #d0d0d0;
      padding-top: 20px;
    }
  }
  #question {
    background: #f5f5f5;
    padding: 15px 20px;
    border-radius: 20px;
    .line_top {
      border-top: 1px solid #d0d0d0;
      padding-top: 20px;
    }
  }
  #conceal {
    margin: 16px 0;
    cursor: pointer;
    color: rgb(51, 58, 138);
    text-decoration: underline;
  }
  @media (max-width: 800px) {
    width: 90%;
    padding: 2%;
    font-size: 1.6rem;
    #text {
      width: 100%;
    }
  }
`;

const ResponseArea = styled.div`
  width: 100%;
  h2 {
    line-height: 1.2;
  }
`;

const BlueButton = styled.button`
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
  font-family: Montserrat;
  @media (max-width: 800px) {
    min-width: 100px;
    margin-right: 10px;
    padding: 10px 15px;
    height: auto;

    white-space: normal;
    text-align: left;
  }
`;

const Frame = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  width: 100%;
  margin: 1.5% 0;
  min-height: 120px;
  padding: 0% 3%;
  .com {
    border-top: 1px solid #c4c4c4;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
  /* pointer-events: ${(props) => (props.block ? "none" : "auto")}; */
  @media (max-width: 800px) {
    width: 50%;
  }
`;

const Button2 = styled.div`
  min-width: 170px;
  text-align: center;
  box-sizing: border-box;
  border-radius: 10px;
  background: #000000;
  margin-left: 2%;
  padding: 10px 10px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  @media (max-width: 800px) {
    width: 65%;
  }
  transition: 0.3s;
  &:hover {
    background: #444444;
  }
`;

// const StyledButton = withStyles({
//   root: {
//     margin: "4% 0",
//     fontSize: "1.6rem",
//     borderRadius: "10px",
//     fontFamily: "Montserrat",
//     fontWeight: "600",
//     textTransform: "none",
//     padding: "10px",
//     width: "140px",
//     height: "45px",
//   },
// })(Button);

const DynamicHoverEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const SingleProblem = (props) => {
  const [update, setUpdate] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showAnswerButton, setShowAnswerButton] = useState(false);
  const [showAnswerText, setShowAnswerText] = useState(false);
  const [teacherAnswer, setTeacherAnswer] = useState("");
  const [isOldFinished, setIsOldFinished] = useState(false);
  const [isNewFinished, setIsNewFinished] = useState(false);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const { t } = useTranslation("lesson");

  const myCallback = (dataFromChild, name) => {
    setAnswer(dataFromChild);
  };

  const onFinish = (status, type) => {
    props.updateArray ? props.updateArray(true) : null;
    if (type == "old") {
      setIsOldFinished(true);
    } else if (type == "new") {
      setIsNewFinished(true);
    }
  };

  const onMouseClick = (e) => {
    let answer = e.target.innerHTML.toLowerCase().trim();
    if (
      e.target.getAttribute("concealed") === "true" &&
      ((answer.toLowerCase() !== "ответ" &&
        answer.toLowerCase() !== "ответ." &&
        answer.toLowerCase() !== "ответ:" &&
        answer.toLowerCase() !== "answer") ||
        revealAnswer)
    ) {
      e.target.id = "no-conceal";
      e.target.innerHTML = e.target.getAttribute("data");
      e.target.setAttribute("concealed", "false");
    } else if (e.target.parentElement.getAttribute("concealed") === "false") {
      e.target.parentElement.id = "conceal";
      e.target.parentElement.setAttribute("concealed", "true");
      e.target.parentElement.innerHTML =
        e.target.parentElement.getAttribute("data-text");
    }
  };

  useEffect(() => {
    const elements = document
      .getElementById(props.problem.id)
      .querySelectorAll("#conceal");
    let p;
    elements.forEach((element) => {
      if (element.getAttribute("data-text")) {
        let answer = element.getAttribute("data-text").toLowerCase();
        if (
          element.getAttribute("concealed") === "true" ||
          (answer !== "ответ" && answer !== "ответ." && answer !== "ответ:")
        ) {
          let data = element.innerHTML;
          let hint = element.getAttribute("data-text");
          element.innerHTML = hint;
          element.setAttribute("data", data);
          element.setAttribute("concealed", true);
          element.addEventListener("click", onMouseClick);
        } else {
          setTeacherAnswer(element.innerHTML);
          element.style.display = "none";
        }
      }
    });
  }, []);

  const { problem, me, lesson, story, complexity, author } = props;

  const switchUpdate = () => {
    setUpdate(!update);
  };

  const getResult = (data) => {
    props.getResult(data);
  };

  const passUpdated = () => {
    props.passUpdated(true);
  };

  const getSteps = (val) => {
    props.getSteps(val);
  };

  return (
    <>
      <Buttons>
        {me && !story && (
          <button onClick={(e) => setUpdate(!update)}>
            {!update ? t("update") : t("back")}
          </button>
        )}
        {me && !story ? (
          <DeleteSingleProblem id={problem.id} lessonId={props.lessonID} />
        ) : null}
      </Buttons>
      {/* <div>{problem.id}</div> */}
      {!update && (
        <TextBar id={problem.id} story={story}>
          <div id="text">{parse(problem.text)}</div>
          {problem.nodeID && (
            <Interactive
              lesson={lesson}
              me={me}
              problem={problem}
              story={story}
              author={author}
              onFinish={onFinish}
            />
          )}
          {problem.steps && problem.steps.problemItems.length >= 1 && (
            <NewInteractive
              lesson={lesson}
              me={me}
              problem={problem}
              story={story}
              author={author}
              onFinish={onFinish}
            />
          )}
          {console.log("problem", !problem.steps)}
          {!problem.steps && (
            <ResponseArea>
              <h2>{t("write_answer")}</h2>
              <Frame story={story}>
                <DynamicHoverEditor
                  index={1}
                  name="answer"
                  getEditorText={myCallback}
                  placeholder={`Write something`}
                />
              </Frame>
              <>
                <Mutation
                  mutation={CREATE_PROBLEMRESULT_MUTATION}
                  variables={{
                    lessonId: props.lessonID,
                    answer: answer,
                    revealed: [],
                    problemID: props.problem.id,
                  }}
                >
                  {(createProblemResult, { loading, error }) => (
                    <Buttons story={story} block={revealAnswer}>
                      <BlueButton
                        variant="contained"
                        color="primary"
                        onClick={async (e) => {
                          // Stop the form from submitting
                          e.preventDefault();
                          // call the mutation
                          if (answer !== "") {
                            const res = await createProblemResult();
                            props.getResults(3);
                            setShowAnswerButton(true);
                            setRevealAnswer(true);
                          } else {
                            console.log("No");
                          }
                        }}
                      >
                        {loading ? t("checking") : t("check")}
                      </BlueButton>
                      {showAnswerButton && (
                        <Button2
                          onClick={(e) => setShowAnswerText(!showAnswerText)}
                        >
                          {t("show_answer")}
                        </Button2>
                      )}
                    </Buttons>
                  )}
                </Mutation>
                {showAnswerText && (
                  <div>
                    <h2>{t("answer")}</h2>
                    {parse(teacherAnswer)}
                  </div>
                )}
              </>
            </ResponseArea>
          )}
          {teacherAnswer.length > 0 &&
            problem.steps &&
            problem.steps.problemItems.length >= 1 &&
            (isNewFinished || isOldFinished) && (
              <ResponseArea>
                <h2>{t("write_answer")}</h2>
                <Frame story={story}>
                  <DynamicHoverEditor
                    index={1}
                    name="answer"
                    getEditorText={myCallback}
                    placeholder={`Write something`}
                  />
                </Frame>
                <>
                  <Mutation
                    mutation={CREATE_PROBLEMRESULT_MUTATION}
                    variables={{
                      lessonId: props.lessonID,
                      answer: answer,
                      revealed: [],
                      problemID: props.problem.id,
                    }}
                  >
                    {(createProblemResult, { loading, error }) => (
                      <Buttons story={story} block={revealAnswer}>
                        <BlueButton
                          variant="contained"
                          color="primary"
                          onClick={async (e) => {
                            // Stop the form from submitting
                            e.preventDefault();
                            // call the mutation
                            if (answer !== "") {
                              const res = await createProblemResult();
                              props.getResults(3);
                              setShowAnswerButton(true);
                              setRevealAnswer(true);
                            } else {
                              console.log("No");
                            }
                          }}
                        >
                          {loading ? t("checking") : t("check")}
                        </BlueButton>
                        {showAnswerButton && (
                          <Button2
                            onClick={(e) => setShowAnswerText(!showAnswerText)}
                          >
                            {t("show_answer")}
                          </Button2>
                        )}
                      </Buttons>
                    )}
                  </Mutation>
                  {showAnswerText && (
                    <div>
                      <h2>{t("answer")}</h2>
                      {parse(teacherAnswer)}
                    </div>
                  )}
                </>
              </ResponseArea>
            )}
        </TextBar>
      )}
      {update && (
        <>
          <UpdateProblem
            id={problem.id}
            text={problem.text}
            lessonID={props.lessonID}
            nodeID={problem.nodeID ? problem.nodeID : null}
            nodeType={problem.nodeType ? problem.nodeType : null}
            complexity={complexity}
            quizes={lesson.quizes}
            newTests={lesson.newTests}
            notes={lesson.notes}
            goal={problem.goal}
            getResult={getResult}
            switchUpdate={switchUpdate}
            passUpdated={passUpdated}
            steps={problem.steps}
            lesson={lesson}
            problem={problem}
            story={story}
            author={author}
            me={me}
            getSteps={getSteps}
          />
        </>
      )}
    </>
  );
};
SingleProblem.propTypes = {
  lessonID: PropTypes.string,
  story: PropTypes.string,
  problem: PropTypes.object.isRequired,
  me: PropTypes.object,
  lesson: PropTypes.object,
};

export default SingleProblem;
