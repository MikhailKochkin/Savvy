import React, { useState } from "react";
import styled from "styled-components";

import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import DeleteSingleShot from "../../delete/DeleteSingleShot";
import UpdateShots from "./UpdateShots";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { CURRENT_USER_QUERY } from "../../User";

const CREATE_SHOTRESULT_MUTATION = gql`
  mutation CREATE_SHOTRESULT_MUTATION(
    $answer: String!
    $lessonId: String
    $shotId: String
  ) {
    createShotResult(answer: $answer, lessonId: $lessonId, shotId: $shotId) {
      id
    }
  }
`;

const Commentary = styled.div`
  padding: 1% 2%;
  margin-bottom: 40px;
`;

const Text = styled.div`
  margin-top: 20px;
  p {
    padding: 1% 2%;
    margin: 1% 0;
    font-style: italic;
  }
  img {
    display: block;
    max-width: 100%;
    max-height: 50em;
    box-shadow: "0 0 0 2px blue;";
  }
  ins {
    text-decoration: none;
    background: #edffe7;
    padding: 0.5% 0.3%;
  }
  del {
    background: #f29ca3;
    padding: 0.5% 0.3%;
  }
  /* span {
    padding: 0.5% 0.3%;
  } */
  /* .true {
    background: #edffe7;
    border-radius: 10px;
  } */
  @media (max-width: 800px) {
    img {
      max-width: 100%;
    }
  }
`;

const Title = styled.div`
  margin: 10px 0;
  line-height: 1.4;
  font-size: 2rem;
  font-weight: 600;
  width: 95%;
  span {
    font-weight: bold;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const SwitchButton = styled.div`
  background: white;
  border-radius: 5px;
  border: 1px solid #112a62;
  padding: 1%;
  margin-top: 5%;
  font-family: Montserrat;
  font-style: normal;
  font-size: 1.4rem;
  color: #112a62;
  width: 20%;
  margin-bottom: 20px;
  cursor: pointer;
  outline: none;
  text-align: center;
  @media (max-width: 800px) {
    width: 50%;
  }
`;

const Styles = styled.div`
  // border: 1px solid #d4d4d4;
  // box-shadow: rgba(118, 143, 255, 0.1) 0px 16px 24px 0px;
  // margin: 30px 0;
  // background: #fff;
  font-weight: 500;
  padding: 15px;
  min-height: 50vh;
  width: ${(props) => props.width};
  .bar {
    width: 70%;
    height: 7px;
    border-radius: 4px;
    background: #b6bce2;
  }
  .step {
    font-weight: 600;
  }
  @media (max-width: 800px) {
    width: 90%;
    .bar {
      width: 200px;
      height: 7px;
      background: #b6bce2;
    }
  }
`;

const Circle = styled.button`
  border: ${(props) =>
    props.color ? "2px solid #C4C4C4" : "2px solid #112a62"};
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  outline: 0;
  span {
    font-size: 1.8rem;
    font-weight: 600;
    color: ${(props) => (props.color ? "#C4C4C4" : "#112a62")};
  }
  &:active {
    border: ${(props) =>
      props.color ? "1px solid #C4C4C4" : "2px solid #112a62"};
    color: #112a62;
  }
`;

const Progress = styled.div`
  background: #3f51b5;
  width: ${(props) => props.progress};
  height: 7px;
  border-radius: 4px;
  transition: all 0.5s;
`;

const Shots = (props) => {
  const [num, setNum] = useState(1);
  const [update, setUpdate] = useState(false);
  const { t } = useTranslation("lesson");

  const { comments, parts, shotID, lessonID, me, shotUser, title, userData } =
    props;

  let width;
  if (props.problem) {
    width = "50%";
  } else if (props.story) {
    width = "540px";
  } else {
    width = "100%";
  }

  const getResult = (data) => {
    props.getResult(data);
    // console.log("shots", data);
  };

  const passUpdated = () => {
    props.passUpdated(true);
    // console.log("passUpdated");
  };

  const switchUpdate = () => {
    setUpdate(!update);
    // console.log("update");
  };

  return (
    <Styles width={width}>
      {me && !props.story && (
        <DeleteSingleShot shotID={shotID} lessonID={lessonID} />
      )}
      {me && !props.story && (
        <SwitchButton name="update" onClick={(e) => setUpdate(!update)}>
          {update ? t("back") : t("update")}
        </SwitchButton>
      )}

      {!update && (
        <>
          {/* <Title>{title}</Title> */}
          {/* <div className="step">Step {num}</div> */}
          <>
            {parts[num - 1] && (
              <Text>
                <div key={num - 1}>{parse(parts[num - 1])}</div>
              </Text>
            )}
            <Buttons>
              <Mutation
                mutation={CREATE_SHOTRESULT_MUTATION}
                variables={{
                  lessonId: lessonID,
                  shotId: shotID,
                  answer: "Looked through",
                }}
                refetchQueries={() => [
                  {
                    query: SINGLE_LESSON_QUERY,
                    variables: { id: props.lessonID },
                  },
                  {
                    query: CURRENT_USER_QUERY,
                  },
                ]}
              >
                {(createShotResult, { loading, error }) => (
                  <>
                    {num > 1 ? (
                      <Circle color={num < 2} onClick={(e) => setNum(num - 1)}>
                        <span>&#8249;</span>
                      </Circle>
                    ) : (
                      <Circle color={num < 2}>
                        <span>&#8249;</span>
                      </Circle>
                    )}

                    <div className="bar">
                      <Progress
                        className="progress"
                        progress={parseInt((100 * num) / parts.length) + "%"}
                      ></Progress>
                    </div>
                    {num < parts.length ? (
                      <Circle
                        color={num === parts.length}
                        onClick={async (e) => {
                          // Stop the form from submitting
                          e.preventDefault();
                          // call the mutation
                          setNum(num + 1);
                          if (num + 1 === parts.length) {
                            const res2 = await createShotResult();
                          }
                        }}
                      >
                        <span>&#8250;</span>
                      </Circle>
                    ) : (
                      <Circle color={true}>
                        <span>&#8250;</span>
                      </Circle>
                    )}
                  </>
                )}
              </Mutation>
            </Buttons>
            {comments.length > 0 && (
              <Commentary>
                <>{parse(comments[num - 1])}</>
              </Commentary>
            )}
          </>
          {/* <Buttons>
            <Mutation
              mutation={CREATE_SHOTRESULT_MUTATION}
              variables={{
                lessonId: lessonID,
                shotId: shotID,
                answer: "Looked through",
              }}
              refetchQueries={() => [
                {
                  query: SINGLE_LESSON_QUERY,
                  variables: { id: props.lessonID },
                },
                {
                  query: CURRENT_USER_QUERY,
                },
              ]}
            >
              {(createShotResult, { loading, error }) => (
                <>
                  {num > 1 ? (
                    <Circle color={num < 2} onClick={(e) => setNum(num - 1)}>
                      <span>&#8249;</span>
                    </Circle>
                  ) : (
                    <Circle color={num < 2}>
                      <span>&#8249;</span>
                    </Circle>
                  )}

                  <div className="bar">
                    <Progress
                      className="progress"
                      progress={parseInt((100 * num) / parts.length) + "%"}
                    ></Progress>
                  </div>
                  {num < parts.length ? (
                    <Circle
                      color={num === parts.length}
                      onClick={async (e) => {
                        // Stop the form from submitting
                        e.preventDefault();
                        // call the mutation
                        setNum(num + 1);
                        if (num + 1 === parts.length) {
                          const res2 = await createShotResult();
                        }
                      }}
                    >
                      <span>&#8250;</span>
                    </Circle>
                  ) : (
                    <Circle color={true}>
                      <span>&#8250;</span>
                    </Circle>
                  )}
                </>
              )}
            </Mutation>
          </Buttons> */}
        </>
      )}
      {update && (
        <>
          <UpdateShots
            shotID={shotID}
            lessonID={lessonID}
            parts={parts}
            comments={comments}
            title={title}
            getResult={getResult}
            switchUpdate={switchUpdate}
            passUpdated={passUpdated}
          />
        </>
      )}
    </Styles>
  );
};

export default Shots;
