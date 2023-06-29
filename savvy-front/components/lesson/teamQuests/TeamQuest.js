import { useState, useEffect } from "react";

import styled from "styled-components";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useQuery, useMutation, gql } from "@apollo/client";
import parse from 'html-react-parser';

import Interactive from "./Interactive";

const CREATE_TQR_MUTATION = gql`
  mutation CREATE_TQR_MUTATION(
    $answer: String
    $lessonId: String
    $teamQuestId: String
  ) {
    createTeamQuestResult(
      answer: $answer
      lessonId: $lessonId
      teamQuestId: $teamQuestId
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  margin-bottom: 20px;
  width: 570px;
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
    width: 100%;
    padding: 2%;
    font-size: 1.4rem;
    #text {
      width: 100%;
    }
  }
`;

const ResponseArea = styled.div`
  width: 100%;
`;

const Answer = styled.div`
  width: 570px;
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
  /* pointer-events: ${(props) => (props.block ? "none" : "auto")}; */
  @media (max-width: 800px) {
    width: 50%;
  }
`;

const Message = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  width: 550px;
  margin: 1.5% 0;
  padding: 15px;
  font-weight: 700;
  text-align: center;
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

const StyledButton = withStyles({
  root: {
    margin: "4% 0",
    fontSize: "1.6rem",
    borderRadius: "10px",
    fontFamily: "Montserrat",
    fontWeight: "600",
    textTransform: "none",
    padding: "10px",
    width: "170px",
  },
})(Button);

const DynamicHoverEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const TeamQuest = (props) => {
  const [update, setUpdate] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showAnswerButton, setShowAnswerButton] = useState(false);
  const [showAnswerText, setShowAnswerText] = useState(false);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [revealAnswerBox, setRevealAnswerBox] = useState(false);
  const { teamQuest, story, me, lesson } = props;
  const { t } = useTranslation("lesson");

  const [createTeamQuestResult, { data, loading, error }] =
    useMutation(CREATE_TQR_MUTATION);

  const my_team = me.myTeams[0];
  const myCallback = (dataFromChild, name) => {
    setAnswer(dataFromChild);
  };
  const getResults = (value) => {
    let status = 0;
    teamQuest.tasks.questElements.map((ql) => {
      if (ql.type == "Quiz") {
        let quizResults = value.quizResults.filter(
          (ct) => ct.quiz.id == ql.value
        );
        if (quizResults.length > 0) status += 1;
      } else if (ql.type == "NewTest") {
        let testResults = value.testResults.filter(
          (ct) => ct.test.id == ql.value
        );
        if (testResults.length > 0) status += 1;
      }
    });
    setRevealAnswerBox(
      status == teamQuest.tasks.questElements.length ? true : false
    );
  };
  return (
    <Styles>
      <TextBar>{parse(teamQuest.introduction)}</TextBar>
      <Interactive
        tasks={teamQuest.tasks.questElements}
        my_team={my_team}
        lesson={lesson}
        me={me}
        getResults={getResults}
      />
      <ResponseArea>
        {revealAnswerBox ? (
          <>
            <h2>{t("write_answer")}</h2>
            <Frame story={story}>
              <DynamicHoverEditor
                index={1}
                name="answer"
                getEditorText={myCallback}
                placeholder={`Write something`}
              />
            </Frame>
            <Buttons story={story} block={revealAnswer}>
              <StyledButton
                variant="contained"
                color="primary"
                onClick={async (e) => {
                  // Stop the form from submitting
                  e.preventDefault();
                  // call the mutation
                  if (answer !== "") {
                    const res = await createTeamQuestResult({
                      variables: {
                        answer: answer,
                        teamQuestId: teamQuest.id,
                        lessonId: lesson.id,
                      },
                    });
                    // props.getResults(3);
                    setShowAnswerButton(true);
                    setRevealAnswer(true);
                  } else {
                    console.log("No");
                  }
                }}
              >
                {loading ? t("checking") : t("check")}
              </StyledButton>
              {showAnswerButton && (
                <Button2 onClick={(e) => setShowAnswerText(!showAnswerText)}>
                  {t("show_answer")}
                </Button2>
              )}
            </Buttons>
          </>
        ) : (
          <Message>
            Get answers to all the questions to finish this exercise and learn
            the solution to the problem.
          </Message>
        )}

        {showAnswerText && (
          <Answer>
            <h2>{t("answer")}</h2>
            {parse(teamQuest.solution)}
          </Answer>
        )}
      </ResponseArea>
    </Styles>
  );
};

export default TeamQuest;
