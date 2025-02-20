import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

import { SINGLE_LESSON_QUERY } from "./SingleLesson";
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

const UPDATE_LESSON_USER_MUTATION = gql`
  mutation UPDATE_LESSON_USER_MUTATION($id: String!, $ownerEmail: String) {
    updateLessonUser(id: $id, ownerEmail: $ownerEmail) {
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
  const [ownerEmail, setOwnerEmail] = useState(props.ownerEmail);
  const [copyLesson, { data: copyData }] = useMutation(COPY_LESSON_MUTATION);

  const { t } = useTranslation("lesson");

  const [updateLesson, { loading }] = useMutation(UPDATE_LESSON_MUTATION);

  const [updateLessonUser, { loading: loadingUser }] = useMutation(
    UPDATE_LESSON_USER_MUTATION
  );

  useEffect(() => {
    // Update lessonData whenever name or description changes

    props.onUpdateLessonData({ name, description });
  }, [name, description]);

  const myCallback2 = (dataFromChild, name) => {
    setDescription(dataFromChild);
  };

  const { lessonId, lesson, change, i_built_this_lesson } = props;
  return (
    <Styles>
      <Container>
        <Title>{t("settings")}</Title>
        <Row descriptionWidth="30%" actionAreawidth="70%">
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
        <Row descriptionWidth="30%" actionAreawidth="70%">
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

        <Row descriptionWidth="30%" actionAreawidth="70%">
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
              {t("copy_lesson")}
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
        {}
        <Row descriptionWidth="30%" actionAreawidth="70%">
          <div className="description">
            {" "}
            <SecondaryButton
              onClick={async (e) => {
                e.preventDefault();
                if (!ownerEmail) {
                  alert("Set the new sim owner!");
                  return;
                }
                const res = await updateLessonUser({
                  variables: { id: lessonId, ownerEmail: ownerEmail },
                });
                alert("Changed!");
              }}
            >
              {t("change_owner")}
            </SecondaryButton>
          </div>
          <div className="action_area">
            <input
              placeholder="Simulator owner email"
              defaultValue={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
            />
          </div>
        </Row>
        <Row descriptionWidth="30%" actionAreawidth="70%">
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
        <Row descriptionWidth="30%" actionAreawidth="70%">
          <div className="description">{t("set_goal")}</div>
          <div className="action_area">
            <input
              type="text"
              id="goal"
              name="goal"
              defaultValue={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
            <div className="explainer">{t("lesson_goal_explainer")}</div>
          </div>
        </Row>
        <Row descriptionWidth="30%" actionAreawidth="70%">
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
        <Row descriptionWidth="30%" actionAreawidth="70%">
          <div className="description">{t("type")}</div>
          <div className="action_area">
            <select
              name="type"
              defaultValue={lesson.type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="REGULAR">{t("regular")}</option>
              <option value="STORY">{t("story")}</option>
              {/* <option value="CHALLENGE">{t("challenge")}</option> */}
            </select>
            <div className="explainer">{t("status_explainer")}</div>
          </div>
        </Row>
        {type === "CHALLENGE" && (
          <Row descriptionWidth="30%" actionAreawidth="70%">
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
        <Row descriptionWidth="30%" actionAreawidth="70%">
          <div className="description">{t("context")}</div>
          <div className="action_area">
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
            <div className="explainer">{t("context_rules")}</div>
          </div>
        </Row>
        {i_built_this_lesson && (
          <Row descriptionWidth="30%" actionAreawidth="70%">
            <div className="description">
              <DeleteSingleLesson
                lessonId={lessonId}
                coursePageId={props.coursePageId}
              />
            </div>
            <div className="action_area">
              <div className="element_info">{t("danger_zone")}</div>
            </div>
          </Row>
        )}
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
