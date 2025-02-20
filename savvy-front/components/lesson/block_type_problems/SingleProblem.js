import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import DeleteSingleProblem from "./DeleteSingleProblem";
import Interactive from "./archive/Interactive";
import NewInteractive from "./functions/NewInteractive";
import FlowMode from "./functions/FlowMode";
import UpdateProblem from "./UpdateProblem";
import {
  SecondaryButton,
  Buttons,
  ActionButton,
  Frame,
} from "../styles/DevPageStyles";

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
    p {
      margin: 10px 0;
    }
  }
  blockquote {
    font-size: 1.6rem;
    width: 100%;
    margin: 0;
    padding: 1% 4%;
    border-left: 3px solid #0094c6;
    p {
      margin: 10px 0;
    }
  }
  a {
    border-bottom: 2px solid #26ba8d;
    padding: 0%;
    transition: 0.3s;
    cursor: pointer;
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
    width: 100%;
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
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1.4rem;
    margin-bottom: 20px;
    tbody {
      width: 100%;
    }
    tr {
      border: 1px solid #edefed;
    }
    thead {
      background: #36304a;
      color: #fff;
    }
    th {
      border: 1px solid #edefed;
      padding: 15px 0;
    }
    td {
      border: 1px solid #edefed;
      border-top: none;
      border-bottom: none;
      border-right: none;
      padding: 0% 2.5%;
      position: relative;
      padding: 15px 15px;
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
    margin-bottom: 20px;
    .line_top {
      border-top: 1px solid #d0d0d0;
      padding-top: 20px;
    }
  }
  #question {
    background: #f5f5f5;
    padding: 15px 20px;
    border-radius: 20px;
    margin-bottom: 20px;
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

const DynamicHoverEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const SingleProblem = (props) => {
  const { problem, me, lesson, story, complexity, author, may_i_edit } = props;

  const [update, setUpdate] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showAnswerButton, setShowAnswerButton] = useState(false);
  const [showAnswerText, setShowAnswerText] = useState(false);
  const [teacherAnswer, setTeacherAnswer] = useState("");
  const [revealAnswer, setRevealAnswer] = useState(false);
  const { t } = useTranslation("lesson");

  const {
    loading,
    error,
    mutate: createProblemResult,
  } = useMutation(CREATE_PROBLEMRESULT_MUTATION, {
    variables: {
      lessonId: props.lessonID,
      answer: answer,
      revealed: [],
      problemID: props.problem.id,
    },
  });
  //  const [showAnswerButton, setShowAnswerButton] = useState(false);

  const myCallback = (dataFromChild, name) => {
    setAnswer(dataFromChild);
  };

  const onFinish = (status, type) => {
    props.updateArray ? props.updateArray(true) : null;
    if (props.moveNext) props.moveNext(props.id);
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
    if (
      props.moveNext &&
      (problem?.steps?.problemItems?.length == 0 || !problem?.steps)
    )
      props.moveNext(props.id);
  }, []);

  const switchUpdate = () => {
    setUpdate(!update);
  };

  const getResult = (data) => {
    props.getResult(data);
  };

  const getSteps = (val) => {
    props.getSteps(val);
  };

  return (
    <>
      {may_i_edit && (
        <Buttons gap="10px" margin="0 0 20px 0">
          <SecondaryButton onClick={(e) => setUpdate(!update)}>
            {!update ? t("update") : t("back")}
          </SecondaryButton>
          <DeleteSingleProblem id={problem.id} lessonId={props.lessonID} />
        </Buttons>
      )}
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
          {problem.steps && problem.steps.problemItems?.length >= 1 && (
            <NewInteractive
              lesson={lesson}
              me={me}
              problem={problem}
              story={story}
              type={problem.type}
              jsonStoryString={props.jsonStoryString}
              author={author}
              onFinish={onFinish}
              context={lesson.context ? lesson.context : ""}
            />
          )}

          {(!problem.steps || problem.steps.problemItems?.length == 0) && (
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
                <Buttons
                  gap="10px"
                  margin="20px 0 20px 0"
                  story={story}
                  block={revealAnswer}
                >
                  <ActionButton
                    variant="contained"
                    color="primary"
                    onClick={async (e) => {
                      // Stop the form from submitting
                      e.preventDefault();
                      // call the mutation
                      if (answer !== "") {
                        const res = await createProblemResult();
                        setShowAnswerButton(true);
                        setRevealAnswer(true);
                      } else {
                        console.log("No");
                      }
                    }}
                  >
                    {loading ? t("checking") : t("check")}
                  </ActionButton>
                  {/* {showAnActionButtonswerButton && ( */}
                  <SecondaryButton
                    onClick={(e) => setShowAnswerText(!showAnswerText)}
                  >
                    {t("show_answer")}
                  </SecondaryButton>
                  {/* )} */}
                </Buttons>

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
            context={problem.context}
            name={problem.name}
            getResult={getResult}
            characters={props.characters}
            switchUpdate={switchUpdate}
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
