import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { SINGLE_LESSON_QUERY } from "./SingleLesson";
import { useTranslation } from "next-i18next";

import AreYouATeacher from "../auth/AreYouATeacher";
import PleaseSignIn from "../auth/PleaseSignIn";
import StoryUpdate from "./StoryUpdate";
import ShortStoryUpdate from "./ShortStoryUpdate";

const UPDATE_LESSON_MUTATION = gql`
  mutation UPDATE_LESSON_MUTATION(
    $id: String!
    $number: Int
    $name: String
    $text: String
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

const Styles = styled.div`
  width: 660px;
  border: 1px solid #adb5bd;
  margin: 40px 0;
  padding: 20px;
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
    border-radius: 3.5px;
    font-size: 1.4rem;
    font-family: Montserrat;
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
`;

const Button = styled.button`
  padding: 1% 2%;
  background: ${(props) => props.theme.green};
  width: 20%;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 2% 0;
  cursor: pointer;
  outline: 0;
  &:active {
    background-color: ${(props) => props.theme.darkGreen};
  }
`;

const Frame = styled.div`
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid #e5e5e5;
  border-radius: 3.5px;
  padding-left: 1%;
  font-size: 1.6rem;
  outline: 0;
  p {
    /* margin: 0.8%; */
    margin-left: 0.6%;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  .description {
    width: 25%;
    line-height: 1.4;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .input {
    width: 75%;
    .explainer {
      font-size: 1.2rem;
      color: #000000;
      margin-top: 5px;
    }

    input {
      padding: 10px;
      width: 100%;
      outline: 0;
      border: 1px solid #ccc;
      border-radius: 3.5px;
      font-size: 1.4rem;
      font-family: Montserrat;
    }
    select {
      width: 100%;
      font-size: 1.4rem;
      outline: none;
      font-family: Montserrat;
      line-height: 1.3;
      padding: 10px;
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
  }
`;

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  margin: 4% 0;
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

const DynamicLoadedEditor = dynamic(import("../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const DynamicHoverEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const UpdateLesson = (props) => {
  const [name, setName] = useState(props.lesson.name);
  const [number, setNumber] = useState(props.lesson.number);
  const [open, setOpen] = useState(props.lesson.open);
  const [challenge_num, setChallenge_num] = useState(
    props.lesson.challenge_num
  );
  const [type, setType] = useState(props.lesson.type);
  const [assignment, setAssignment] = useState(props.lesson.assignment);
  const [text, setText] = useState(props.lesson.text);
  const [description, setDescription] = useState(props.lesson.description);

  const { t } = useTranslation("lesson");

  // handleName = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value });
  // };
  // handleBoolean = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value === "true" });
  // };
  // handleNumber = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   const val = Math.round(value);
  //   this.setState({ [name]: val });
  // };

  const myCallback = (dataFromChild) => {
    setText(dataFromChild);
  };

  const myCallback2 = (dataFromChild, name) => {
    setDescription(dataFromChild);
  };

  const { lessonID, lesson, change } = props;
  return (
    <Styles>
      <Container>
        <Title>{t("settings")}</Title>
        <Row>
          <div className="description">{t("name")}</div>
          <div className="input">
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
          <div className="description">{t("number")}</div>
          <div className="input">
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
          <div className="description">{t("lesson")}</div>
          <div className="input">
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
          <div className="description">{t("lesson_status")}</div>
          <div className="input">
            <select
              name="type"
              defaultValue={lesson.type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="REGULAR">{t("regular")}</option>
              <option value="STORY">{t("story")}</option>
              <option value="CHALLENGE">{t("challenge")}</option>
              <option value="HIDDEN">{t("hidden")}</option>
            </select>
            <div className="explainer">{t("status_explainer")}</div>
          </div>
        </Row>
        <Row>
          <div className="description">Choose a template for this lesson</div>
          <div className="input">
            <select
              className="red"
              name="open"
              defaultValue={"standard"}
              onChange={(e) => props.getTemplate(e.target.value)}
            >
              <option value={"standard"}>Standard template</option>
              <option value={"memory"}>
                Help students memorize new material
              </option>
            </select>
            <div className="explainer">{t("open_lesson")}</div>
          </div>
        </Row>
        <Row>
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
        </Row>
        {/* <Row>
          <div className="description">Игра в уроке</div>
                    <div className="input">

          <select
            name="hasSecret"
            defaultValue={lesson.hasSecret === true}
            // onChange={this.handleBoolean}
          >
            <option value={true}>Да</option>
            <option value={false}>Нет</option>
          </select>
          </div>
        </Row>
        <Row>
          <div className="description">Очки в игре</div>
          <input
            type="number"
            id="totalPoints"
            name="totalPoints"
            placeholder="# для открытия секретов"
            defaultValue={lesson.totalPoints}
            // onChange={this.handleNumber}
          />
        </Row> */}
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
          <div className="input">
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
          <div className="description">{t("comments")}</div>
          <div className="input">
            <Frame>
              <DynamicHoverEditor value={text} getEditorText={myCallback} />
            </Frame>
          </div>
        </Row>
        <Mutation
          mutation={UPDATE_LESSON_MUTATION}
          variables={{
            id: lessonID,
            number,
            name,
            text,
            description,
            type,
            change,
            assignment,
            challenge_num,
            open,
            // hasSecret,
            // totalPoints
          }}
          refetchQueries={() => [
            {
              query: SINGLE_LESSON_QUERY,
              variables: { id: lessonID },
            },
          ]}
        >
          {(updateLesson, { loading, error }) => (
            <ButtonTwo
              onClick={async (e) => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await updateLesson();
                // change the page to the single case page
              }}
            >
              {loading ? t("saving") : t("save")}
            </ButtonTwo>
          )}
        </Mutation>
        {/* <StoryUpdate lesson={lesson} /> */}
      </Container>
    </Styles>
  );
};

export default UpdateLesson;
