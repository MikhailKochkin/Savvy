import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import DeleteSingleShot from "./DeleteSingleShot";
import UpdateShots from "./UpdateShots";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { CURRENT_USER_QUERY } from "../../User";
import { SecondaryButton, Buttons } from "../styles/DevPageStyles";

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
  padding: 10px 15px;
  margin-bottom: 40px;
  border: 3px solid #f3f3f3;
  border-radius: 25px;
`;

const Text = styled.div`
  margin-top: 20px;
  font-size: 1.6rem;
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
  @media (max-width: 800px) {
    img {
      max-width: 100%;
    }
  }
`;

const NavButtons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 40px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Styles = styled.div`
  font-weight: 500;
  padding: 15px;
  font-size: 1.6rem;
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
  img {
    width: 100%;
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

  const {
    comments,
    parts,
    shotID,
    lessonID,
    me,
    shotUser,
    title,
    userData,
    name,
  } = props;

  const [createShotResult] = useMutation(CREATE_SHOTRESULT_MUTATION, {
    refetchQueries: [
      {
        query: SINGLE_LESSON_QUERY,
        variables: { id: props.lessonID },
      },
      {
        query: CURRENT_USER_QUERY,
      },
    ],
  });

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
  };

  const switchUpdate = () => {
    setUpdate(!update);
  };

  return (
    <Styles width={width} id={shotID}>
      <Buttons>
        {me && !props.story && (
          <SecondaryButton name="update" onClick={(e) => setUpdate(!update)}>
            {update ? t("back") : t("update")}
          </SecondaryButton>
        )}
        {me && !props.story && (
          <DeleteSingleShot shotID={shotID} lessonID={lessonID} />
        )}
      </Buttons>

      {!update && (
        <>
          <NavButtons>
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
                    e.preventDefault();
                    setNum(num + 1);
                    if (num + 1 === parts.length) {
                      const res = await createShotResult({
                        variables: {
                          lessonId: lessonID,
                          shotId: shotID,
                          answer: "Looked through",
                        },
                      });
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
          </NavButtons>
          <>
            {parts[num - 1] && (
              <Text>
                <div key={num - 1}>{parse(parts[num - 1])}</div>
              </Text>
            )}
            {comments.length > 0 && (
              <>
                {comments[num - 1] ? (
                  <Commentary>
                    {comments[num - 1] ? parse(comments[num - 1]) : ""}
                  </Commentary>
                ) : null}
              </>
            )}
          </>
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
            name={name}
            getResult={getResult}
            switchUpdate={switchUpdate}
          />
        </>
      )}
    </Styles>
  );
};

export default Shots;
