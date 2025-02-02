import React, { useState, useEffect } from "react";
import { Mutation } from "@apollo/client/react/components";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { SINGLE_LESSON_QUERY } from "./SingleLesson";
import { useTranslation } from "next-i18next";

import DeleteSingleLesson from "./DeleteSingleLesson";
import { Title, Row, Frame, SecondaryButton } from "./styles/DevPageStyles";

const UPDATE_LESSON_MUTATION = gql`
  mutation UPDATE_LESSON_MUTATION(
    $id: String!
    $number: Int
    $name: String
    $text: String
    $goal: String
    $context: String
    $description: String
    $type: String
    $change: String
    $assignment: Boolean
    $challenge_num: Int
    $open: Boolean
    $hasSecret: Boolean
    $totalPoints: Int
  ) {
    updateLesson(
      id: $id
      number: $number
      name: $name
      text: $text
      goal: $goal
      context: $context
      description: $description
      type: $type
      change: $change
      assignment: $assignment
      challenge_num: $challenge_num
      open: $open
      hasSecret: $hasSecret
      totalPoints: $totalPoints
    ) {
      id
    }
  }
`;

const COPY_LESSON_MUTATION = gql`
  mutation CopyLesson($id: String!, $coursePageId: String!) {
    copyLesson(id: $id, coursePageId: $coursePageId) {
      id
    }
  }
`;

const Styles = styled.div`
  width: 660px;
  margin: 40px 0;
  padding: 20px;
  border: 2px solid #f1f1f1;
  background: #ffffff;
  border-radius: 20px;
`;

const Container = styled.div`
  width: 100%;
  margin: 5% 0;
  h4 {
    padding: 0% 5%;
  }
  p > a {
    font-weight: 700;
  }
  p > a:hover {
    text-decoration: underline;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
  input {
    padding: 1.5% 2%;
    width: 100%;
    outline: 0;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1.4rem;
    font-family: Montserrat;
  }
  textarea {
    width: 100%;
    min-height: 70px;
    border: none;
    outline: 0;
    font-size: 1.4rem;
    font-family: Montserrat;
    padding: 10px;
    font-weight: 500;
  }
  select {
    width: 100%;
    font-size: 1.4rem;
    outline: none;
    font-family: Montserrat;

    line-height: 1.3;
    padding: 1.5% 2%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
    background: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }
  .green {
    border: 2px solid #6a994e;
  }
`;

const ButtonTwo = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  border: 2px solid #3f51b5;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  transition: 0.3s;
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
`;

const DynamicHoverEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const UpdateLesson = (props) => {
  const [name, setName] = useState(props.lesson.name);
  const [number, setNumber] = useState(props.lesson.number);
  const [open, setOpen] = useState(props.lesson.open);
  const [challenge_num, setChallenge_num] = useState(
    parseInt(props.lesson.challenge_num)
  );
  const [type, setType] = useState(props.lesson.type);
  const [assignment, setAssignment] = useState(props.lesson.assignment);
  const [text, setText] = useState(props.lesson.text);
  const [goal, setGoal] = useState(props.lesson.goal);
  const [description, setDescription] = useState(props.lesson.description);
  const [hasSecret, setHasSecret] = useState(props.lesson.hasSecret);
  const [totalPoints, setTotalPoints] = useState(props.lesson.totalPoints);
  const [coursePageId, setCoursePageId] = useState(props.coursePageId);
  const [context, setContext] = useState(
    props.lesson.context ? props.lesson.context : ""
  );
  const [copyLesson, { data: copyData }] = useMutation(COPY_LESSON_MUTATION);

  const { t } = useTranslation("lesson");

  const [updateLesson, { loading }] = useMutation(UPDATE_LESSON_MUTATION);

  useEffect(() => {
    // Update lessonData whenever name or description changes

    props.onUpdateLessonData({ name, description });
  }, [name, description]);

  const myCallback2 = (dataFromChild, name) => {
    setDescription(dataFromChild);
  };

  const { lessonId, lesson, change } = props;
  return (
    <Styles>
      <Container>
        <Title>{t("settings")}</Title>
        <Row>
          <div className="description">{t("name")}</div>
          <div className="action_area">
            <input
              type="text"
              id="name"
              name="name"
              // placeholder="Название урока"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </Row>

        <Row>
          <div className="description">
            {" "}
            <SecondaryButton
              onClick={async (e) => {
                e.preventDefault();
                if (!coursePageId) {
                  alert("Set the target course page id");
                  return;
                }
                const res = await copyLesson({
                  variables: { id: lessonId, coursePageId: coursePageId },
                });
                alert("Copied!");
              }}
            >
              Copy Lesson
            </SecondaryButton>
          </div>
          <div className="action_area">
            <input
              placeholder="target coursePage Id"
              defaultValue={coursePageId}
              onChange={(e) => setCoursePageId(e.target.value)}
            />
          </div>
        </Row>
        <Row>
          <div className="description">{t("number")}</div>
          <div className="action_area">
            <input
              type="number"
              id="number"
              name="number"
              defaultValue={number}
              onChange={(e) => setNumber(parseInt(e.target.value))}
            />
          </div>
        </Row>
        <Row>
          <div className="description">{t("set_goal")}</div>
          <div className="action_area">
            <input
              type="text"
              id="goal"
              name="goal"
              defaultValue={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
        </Row>
        {/* <Row>
          <div className="description">{t("choose_template")}</div>
          <div className="input">
            <select
              name="open"
              className="green"
              defaultValue={"standard"}
              onChange={(e) => props.getTemplate(e.target.value)}
            >
              <option value={"standard"}>{t("standard_template")}</option>
              <option value={"memorize"}>{t("memorize_template")}</option>
            </select>
          </div>
        </Row> */}
        <Row>
          <div className="description">{t("lesson_status")}</div>
          <div className="action_area">
            <select
              name="open"
              defaultValue={open}
              onChange={(e) => setOpen(e.target.value == "true")}
            >
              <option value={true}>{t("open")}</option>
              <option value={false}>{t("closed")}</option>
            </select>
            <div className="explainer">{t("open_lesson")}</div>
          </div>
        </Row>
        <Row>
          <div className="description">Lesson type</div>
          <div className="action_area">
            <select
              name="type"
              defaultValue={lesson.type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="REGULAR">{t("regular")}</option>
              <option value="STORY">{t("story")}</option>
              <option value="CHALLENGE">{t("challenge")}</option>
            </select>
            <div className="explainer">{t("status_explainer")}</div>
          </div>
        </Row>
        {/* <Row>
          <div className="description">{t("assignment")}</div>
          <div className="input">
            <select
              name="assignment"
              defaultValue={assignment}
              onChange={(e) => setAssignment(e.target.value == "true")}
            >
              <option value={true}>{t("yes")}</option>
              <option value={false}>{t("no")}</option>
            </select>
          </div>
        </Row> */}
        {/* <Row>
          <div className="description">{t("lesson_has_bonus")}</div>
          <div className="input">
            <select
              name="hasSecret"
              defaultValue={hasSecret === true}
              onChange={(e) => {
                e.preventDefault();
                setHasSecret(e.target.value == "true");
              }}
            >
              <option value={true}>{t("yes")}</option>
              <option value={false}>{t("no")}</option>
            </select>
          </div>
        </Row> */}
        {/* {hasSecret && (
          <Row>
            <div className="description">{t("required_points")}</div>
            <div className="input">
              <input
                type="number"
                id="totalPoints"
                name="totalPoints"
                placeholder={0}
                defaultValue={totalPoints}
                onChange={(e) => setTotalPoints(parseInt(e.target.value))}
              />
            </div>
          </Row>
        )} */}
        {type === "CHALLENGE" && (
          <Row>
            <div className="description">{t("num_challenge")}</div>
            <div className="input">
              <input
                type="number"
                id="challenge_num"
                name="challenge_num"
                // placeholder="Количество заданий"
                defaultValue={challenge_num}
                onChange={(e) => setChallenge_num(e.target.value)}
              />
            </div>
          </Row>
        )}
        <Row>
          <div className="description">{t("description")}</div>
          <div className="action_area">
            <Frame>
              <DynamicHoverEditor
                index={1}
                name="description"
                getEditorText={myCallback2}
                value={description}
              />
            </Frame>
          </div>
        </Row>
        {/* <Frame>
            <DynamicHoverEditor
              index={1}
              name="change"
              getEditorText={myCallback2}
              placeholder="Как измениться ученик после прохождения урока"
              value={change}
            />
          </Frame> */}
        <Row>
          <div className="description">Context</div>
          <div className="action_area">
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>
        </Row>
        {/* <Row>
          <div className="description">{t("comments")}</div>
          <div className="input">
            <Frame>
              <DynamicHoverEditor value={text} getEditorText={myCallback} />
            </Frame>
          </div>
        </Row> */}
        <Row>
          <div className="description">
            <DeleteSingleLesson
              lessonId={lessonId}
              coursePageId={props.coursePageId}
            />
          </div>
          <div className="action_area">
            Danger zone. Avoid deleting the simulator unless you are 100% sure.
          </div>
        </Row>
        <ButtonTwo
          onClick={async (e) => {
            e.preventDefault();
            try {
              await updateLesson({
                variables: {
                  id: lessonId,
                  number,
                  name,
                  text,
                  description,
                  context,
                  type,
                  change,
                  goal,
                  assignment,
                  challenge_num: parseInt(challenge_num),
                  open,
                  hasSecret,
                  totalPoints,
                },
                refetchQueries: [
                  {
                    query: SINGLE_LESSON_QUERY,
                    variables: { id: lessonId },
                  },
                ],
              });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {loading ? t("saving") : t("save")}
        </ButtonTwo>
      </Container>
    </Styles>
  );
};

export default UpdateLesson;
