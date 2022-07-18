import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { SINGLE_LESSON_QUERY } from "./SingleLesson";
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
    width: 40%;
    line-height: 1.4;
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

export default class UpdateLesson extends Component {
  state = {
    challenge_num: this.props.lesson.challenge_num,
    type: this.props.lesson.type,
    assignment: this.props.lesson.assignment,
    text: this.props.lesson.text,
  };
  handleName = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleBoolean = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value === "true" });
  };
  handleNumber = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const val = Math.round(value);
    this.setState({ [name]: val });
  };

  myCallback = (dataFromChild) => {
    this.setState({
      text: dataFromChild,
    });
  };

  myCallback2 = (dataFromChild, name) => {
    let st = name;
    this.setState({
      [st]: dataFromChild,
    });
  };

  render() {
    const { lessonID, description, lesson, change } = this.props;
    return (
      <Styles>
        <Container>
          <Title>Настройки урока</Title>
          <Row>
            <div className="description">Название</div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Название урока"
              defaultValue={lesson.name}
              onChange={this.handleName}
            />
          </Row>
          <Row>
            <div className="description">Номер</div>
            <input
              type="number"
              id="number"
              name="number"
              placeholder="Номер урока"
              defaultValue={lesson.number}
              onChange={this.handleNumber}
            />
          </Row>
          <Row>
            <div className="description">Урок</div>
            <select
              name="open"
              defaultValue={lesson.open === true}
              onChange={this.handleBoolean}
            >
              <option value={true}>Открытый</option>
              <option value={false}>Закрытый</option>
            </select>
          </Row>
          <Row>
            <div className="description">Режим урока</div>
            <select
              name="type"
              defaultValue={lesson.type}
              onChange={this.handleName}
            >
              <option value="REGULAR">Разработка</option>
              <option value="STORY">История</option>
              <option value="CHALLENGE">Испытание</option>
            </select>
          </Row>
          <Row>
            <div className="description">Практическое задание</div>
            <select
              name="assignment"
              defaultValue={lesson.assignment == true}
              onChange={this.handleBoolean}
            >
              <option value={true}>Да</option>
              <option value={false}>Нет</option>
            </select>
          </Row>
          <Row>
            <div className="description">Игра в уроке</div>
            <select
              name="hasSecret"
              defaultValue={lesson.hasSecret === true}
              onChange={this.handleBoolean}
            >
              <option value={true}>Да</option>
              <option value={false}>Нет</option>
            </select>
          </Row>
          <Row>
            <div className="description">Очки в игре</div>
            <input
              type="number"
              id="totalPoints"
              name="totalPoints"
              placeholder="# для открытия секретов"
              defaultValue={lesson.totalPoints}
              onChange={this.handleNumber}
            />
          </Row>
          {this.state.type === "CHALLENGE" && (
            <Row>
              <div className="description"># заданий в испытании</div>
              <input
                type="number"
                id="challenge_num"
                name="challenge_num"
                placeholder="Количество заданий"
                defaultValue={this.state.challenge_num}
                onChange={this.handleNumber}
              />
            </Row>
          )}
          <Row>
            <div className="description">Описание урока</div>
            <Frame>
              <DynamicHoverEditor
                index={1}
                name="description"
                getEditorText={this.myCallback2}
                placeholder="Описание"
                value={description}
              />
            </Frame>
          </Row>
          {/* <Frame>
            <DynamicHoverEditor
              index={1}
              name="change"
              getEditorText={this.myCallback2}
              placeholder="Как измениться ученик после прохождения урока"
              value={change}
            />
          </Frame> */}
          <Row>
            <div className="description">Комментарии</div>
            <Frame>
              <DynamicHoverEditor
                value={this.state.text}
                getEditorText={this.myCallback}
                previousText={lesson.text}
              />
            </Frame>
          </Row>
          <Mutation
            mutation={UPDATE_LESSON_MUTATION}
            variables={{
              id: lessonID,
              ...this.state,
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
                {loading ? "Сохраняем..." : "Сохранить"}
              </ButtonTwo>
            )}
          </Mutation>
        </Container>
        {/* <StoryUpdate lesson={lesson} />
        <ShortStoryUpdate lesson={lesson} /> */}
      </Styles>
    );
  }
}
