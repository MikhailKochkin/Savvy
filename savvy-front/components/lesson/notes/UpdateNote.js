import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Option from "../Option";
import { PAGE_LESSONS_QUERY } from "../../course/CoursePage";
import AreYouATeacher from "../../auth/AreYouATeacher";
import PleaseSignIn from "../../auth/PleaseSignIn";

const SINGLE_NOTE_QUERY = gql`
  query SINGLE_NOTE_QUERY($id: ID!) {
    note(where: { id: $id }) {
      id
      text
    }
  }
`;

const UPDATE_NOTE_MUTATION = gql`
  mutation UPDATE_NOTE_MUTATION($id: ID!, $text: String, $next: Json) {
    updateNote(id: $id, text: $text, next: $next) {
      id
      text
      next
    }
  }
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  margin: 1% 0 0 0;
  margin-top: 5%;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3 70px);
  grid-template-areas:
    "explain"
    "first   ";
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
    padding: 0.5%;
    height: 75%;
    width: 100%;
    outline: 0;
    border: 1px solid #ccc;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.4rem;
  }
`;

const Button = styled.button`
  padding: 0.5% 1%;
  background: ${props => props.theme.green};
  width: 25%;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 2% 0;
  cursor: pointer;
  outline: 0;
  &:active {
    background-color: ${props => props.theme.darkGreen};
  }
`;

const Button2 = styled.button`
  font-family: Montserrat;
  /* color: #112a62; */
  padding: 0.5% 1%;
  font-size: 1.6rem;
  background: #ffffff;
  /* border: 1px solid #112a62; */
  border-radius: 5px;
  outline: 0;
  margin-top: 3%;
  width: 25%;
`;

const DynamicLoadedEditor = dynamic(import("../../editor/LessonEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false
});

export default class UpdateNote extends Component {
  state = {};
  handleName = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  myCallback = dataFromChild => {
    this.setState({
      text: dataFromChild
    });
  };

  myCallback2 = async (type, data) => {
    const res = await this.setState({
      [type]: data
    });
  };

  onAddItem = () => {
    this.setState(state => {
      const list = [...state.list, state.value];
      return {
        list,
        value: ""
      };
    });
  };

  onSave = () => {
    this.setState({
      next: {
        true: this.state.true,
        false: this.state.false
      }
    });
  };

  render() {
    const { notes, text, quizes, id, tests } = this.props;
    return (
      <>
        <Container>
          <DynamicLoadedEditor
            getEditorText={this.myCallback}
            previousText={text}
          />
          <h3>Выберите задания для формата "Экзамен":</h3>
          <h3>Вопросы:</h3>
          {quizes.map(quiz => (
            <Option quiz={quiz} getData={this.myCallback2} />
          ))}
          <h3>Заметки:</h3>
          {notes.map(note => (
            <Option note={note} getData={this.myCallback2} />
          ))}
          <h3>Тесты:</h3>
          {tests.map(test => (
            <Option key={test.id} test={test} getData={this.myCallback2} />
          ))}
          <Button2 onClick={this.onSave}>Compile</Button2>
          <Mutation
            mutation={UPDATE_NOTE_MUTATION}
            variables={{
              id,
              ...this.state
            }}
            //   refetchQueries={() => [
            //     {
            //       query: PAGE_LESSONS_QUERY,
            //       variables: { id: lessonID }
            //     }
            //   ]}
          >
            {(updateNote, { loading, error }) => (
              <Button
                onClick={async e => {
                  // Stop the form from submitting
                  e.preventDefault();
                  // call the mutation
                  const res = await updateNote();
                }}
              >
                {loading ? "Сохраняем..." : "Сохранить"}
              </Button>
            )}
          </Mutation>
          {/* </Group> */}
        </Container>
      </>
    );
  }
}
