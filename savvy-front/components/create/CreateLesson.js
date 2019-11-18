import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import { NavButton, SubmitButton } from "../styles/Button";
import AreYouATeacher from "../auth/AreYouATeacher";
import PleaseSignIn from "../auth/PleaseSignIn";
import { CURRENT_USER_QUERY } from "../User";
import { PAGE_LESSONS_QUERY } from "../course/CoursePage";

const CREATE_LESSON_MUTATION = gql`
  mutation CREATE_LESSON_MUTATION(
    $name: String!
    $number: Int
    $text: String!
    $description: String!
    $coursePageID: ID!
  ) {
    createLesson(
      name: $name
      number: $number
      text: $text
      description: $description
      coursePageID: $coursePageID
    ) {
      id
    }
  }
`;

const Width = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 3%;
`;

const Container = styled.div`
  width: 40%;
  margin: 3% 0;
  input {
    height: 50%;
    width: 100%;
    margin: 1% 0;
    border: 1px solid #e5e5e5;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.6rem;
    outline: 0;
  }
  @media (max-width: 850px) {
    width: 85%;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 2%;
  div {
    font-weight: bold;
    color: #112a62;
    margin-left: 15px;
    padding: 10px;
    cursor: pointer;
  }
`;

const Button = styled.button`
  padding: 1.5% 3%;
  font-size: 1.6rem;
  width: 23%;
  font-weight: 600;
  color: #fffdf7;
  background: ${props => props.theme.green};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:active {
    background: ${props => props.theme.darkGreen};
  }
  @media (max-width: 850px) {
    width: 40%;
  }
`;

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
`;

const Editor = styled.div`
  margin-top: 1%;
`;

const Frame = styled.div`
  height: 60%;
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

const DynamicLoadedEditor = dynamic(import("../editor/LessonEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false
});

const DynamicHoverEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false
});

export default class CreateLesson extends Component {
  state = {
    name: "",
    text: "",
    number: 0,
    published: false
  };
  handleName = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleNumber = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const val = Math.round(value);
    this.setState({ [name]: val });
  };

  myCallback = dataFromChild => {
    this.setState({
      text: dataFromChild
    });
  };

  myCallback2 = (dataFromChild, name) => {
    let st = name;
    this.setState({
      [st]: dataFromChild
    });
  };

  render() {
    const { id } = this.props;
    return (
      <PleaseSignIn>
        <AreYouATeacher subject={this.props.id}>
          <Width>
            <Container>
              <Title>Новый урок</Title>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Название"
                value={this.state.name}
                onChange={this.handleName}
              />

              <input
                type="number"
                id="number"
                name="number"
                placeholder="Номер"
                onChange={this.handleNumber}
              />

              <Frame>
                <DynamicHoverEditor
                  index={1}
                  name="description"
                  getEditorText={this.myCallback2}
                  placeholder="Описание"
                />
              </Frame>

              <Editor>
                <DynamicLoadedEditor getEditorText={this.myCallback} />
              </Editor>
              <Mutation
                mutation={CREATE_LESSON_MUTATION}
                variables={{
                  coursePageID: id,
                  ...this.state
                }}
                refetchQueries={() => [
                  {
                    query: PAGE_LESSONS_QUERY,
                    variables: { id: this.props.id }
                  },
                  { query: CURRENT_USER_QUERY }
                ]}
                awaitRefetchQueries={true}
              >
                {(createLesson, { loading, error }) => (
                  <Buttons>
                    <Button
                      onClick={async e => {
                        e.preventDefault();
                        const res = await createLesson();
                        Router.push({
                          pathname: "/lesson",
                          query: {
                            id: res.data.createLesson.id,
                            type: "regular"
                          }
                        });
                      }}
                    >
                      {loading ? "Сохраняем..." : "Cохранить"}
                    </Button>
                    <Link
                      href={{
                        pathname: "/coursePage",
                        query: { id }
                      }}
                    >
                      <div>Вернуться на страницу урока</div>
                    </Link>
                  </Buttons>
                )}
              </Mutation>
            </Container>
            <div id="root"></div>
          </Width>
        </AreYouATeacher>
      </PleaseSignIn>
    );
  }
}
