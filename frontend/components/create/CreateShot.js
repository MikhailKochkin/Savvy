import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import { Message } from "../styles/Button";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";
import dynamic from "next/dynamic";

const CREATE_SHOTS_MUTATION = gql`
  mutation CREATE_SHOTS_MUTATION(
    $title: String!
    $parts: [String!]
    $comments: [String!]
    $lessonID: ID!
  ) {
    createShot(
      title: $title
      parts: $parts
      comments: $comments
      lessonID: $lessonID
    ) {
      id
    }
  }
`;

const TestCreate = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1% 2%;
  margin-bottom: 5%;
  input {
    align-self: flex-start;
    margin-bottom: 3%;
    border-radius: 5px;
    font-family: Montserrat;
    border: 1px solid #c4c4c4;
    width: 90%;
    height: 40px;
    padding: 1.5% 20px;
    font-size: 1.6rem;
    outline: 0;
  }
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

const Frame = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  width: 90%;
  margin-bottom: 3%;
  padding: 0 1%;
  .com {
    border-top: 1px solid #c4c4c4;
  }
`;

const More = styled.div`
  align-self: flex-start;
  background: #ffffff;
  margin-top: 2.5%;
  border: 1px solid #112a62;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5% 1.5%;
  color: #112a62;
  cursor: pointer;
  &:active {
    border: 2px solid #112a62;
  }
`;

const Remove = styled.div`
  align-self: flex-start;
  background: #ffffff;
  margin-top: 2.5%;
  border: 1px solid #de6b48;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5% 1.5%;
  color: #de6b48;
  cursor: pointer;
  &:active {
    border: 2px solid #de6b48;
  }
`;

const Save = styled.div`
  padding: 1.5% 3%;
  align-self: flex-start;
  margin-top: 2.5%;
  font-size: 1.6rem;
  font-weight: 600;
  color: #fffdf7;
  background: ${(props) => props.theme.green};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:active {
    background: ${(props) => props.theme.darkGreen};
  }
`;

const Advice = styled.p`
  font-size: 1.5rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2%;
  margin: 30px 2%;
  width: 80%;
`;

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  padding: 2%;
  padding-top: 0;
`;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

class CreateShot extends Component {
  state = {
    final_p: [],
    final_c: [],
    steps: 1,
  };

  myCallback = (dataFromChild, name) => {
    let st = name;
    this.setState({
      [st]: dataFromChild,
    });
  };

  more = () => {
    this.setState((prev) => ({ steps: prev.steps + 1 }));
  };

  remove = () => {
    if (this.state.steps > 1) {
      this.setState({
        [`comment${this.state.steps}`]: undefined,
        [`part${this.state.steps}`]: undefined,
      });
      this.setState((prev) => ({ steps: prev.steps - 1 }));
    }
  };

  save = () => {
    let parts = [];
    let comments = [];
    Object.entries(this.state)
      .filter((text) => text[0].includes("part"))
      .map((t) => parts.push(t[1]));
    Object.entries(this.state)
      .filter((text) => text[0].includes("comment"))
      .map((t) => comments.push(t[1]));
    parts = parts.filter((el) => el !== undefined);
    comments = comments.filter((el) => el !== undefined);
    this.setState({
      final_p: parts,
      final_c: comments,
    });
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    let rows = [];
    let part;
    let comment;
    _.times(this.state.steps, (i) => {
      part = `part${i + 1}`;
      comment = `comment${i + 1}`;
      rows.push(
        <Row>
          <Frame>
            <DynamicLoadedEditor
              index={i + 1}
              name={part}
              getEditorText={this.myCallback}
              placeholder={`Часть ${i + 1}`}
            />
            <div className="com">
              <DynamicLoadedEditor
                index={i + 1}
                name={comment}
                placeholder={`Комментарий к части ${i + 1}`}
                getEditorText={this.myCallback}
              />
            </div>
          </Frame>
        </Row>
      );
    });
    return (
      <>
        <Advice>
          Составьте алгоритм. Для этого опишите каждый его элемент в разделе
          "Часть". Объяснить особенности каждого элемента можно в разделе
          "Комментарий". Количество элементов не ограничено.
        </Advice>
        <Title>Новый алгоритм</Title>
        <Mutation
          mutation={CREATE_SHOTS_MUTATION}
          variables={{
            lessonID: this.props.lessonID,
            parts: this.state.final_p,
            comments: this.state.final_c,
            title: this.state.title,
          }}
          refetchQueries={() => [
            {
              query: SINGLE_LESSON_QUERY,
              variables: { id: this.props.lessonID },
            },
          ]}
          awaitRefetchQueries={true}
        >
          {(createShot, { loading, error }) => (
            <TestCreate>
              <input
                id="title"
                name="title"
                spellCheck={true}
                placeholder="Название документа"
                autoFocus
                required
                value={this.state.title}
                onChange={this.handleChange}
              />
              {rows.map((row) => row)}
              <More onClick={this.more}>Новый блок</More>
              <Remove onClick={this.remove}>Убрать блок</Remove>
              <Save
                onClick={async (e) => {
                  e.preventDefault();
                  document.getElementById("Message").style.display = "block";
                  setTimeout(function () {
                    document.getElementById("Message")
                      ? (document.getElementById("Message").style.display =
                          "none")
                      : "none";
                  }, 2500);
                  if (
                    this.state.comment1 === undefined ||
                    this.state.part1 === undefined
                  ) {
                    alert("В вашем документе недостаточно частей");
                  } else {
                    const res = await this.save();
                    const res2 = await createShot();
                  }
                }}
              >
                {loading ? "Сохраняем..." : "Сохранить"}
              </Save>
              <Message id="Message">Вы создали новый вопрос!</Message>
            </TestCreate>
          )}
        </Mutation>
      </>
    );
  }
}

export default CreateShot;
