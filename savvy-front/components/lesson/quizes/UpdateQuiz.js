import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Option from "../Option";

const UPDATE_QUIZ_MUTATION = gql`
  mutation UPDATE_QUIZ_MUTATION(
    $id: ID!
    $question: String
    $answer: String
    $next: Json
  ) {
    updateQuiz(id: $id, question: $question, answer: $answer, next: $next) {
      id
    }
  }
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
  textarea {
    padding: 1.5% 2%;
    margin-bottom: 1.5%;
    width: 100%;
    height: 100px;
    outline: 0;
    border: 1px solid #ccc;
    border-radius: 3.5px;
    font-size: 1.4rem;
  }
  select {
    width: 100%;
    font-size: 1.4rem;
    outline: none;
    line-height: 1.3;
    padding: 1.5% 2%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
    margin-bottom: 1.5%;
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
  background: ${props => props.theme.green};
  width: 20%;
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

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

class UpdateQuiz extends Component {
  state = {};

  handleName = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
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

  myCallback = async (type, data) => {
    const res = await this.setState({
      [type]: data
    });
    // this.onAddItem();
  };

  render() {
    const {
      lessonID,
      answer,
      question,
      quizID,
      quizes,
      notes,
      tests
    } = this.props;
    return (
      <Container>
        <textarea
          id="question"
          name="question"
          required
          placeholder="Название урока"
          defaultValue={question}
          onChange={this.handleName}
        />
        <textarea
          id="answer"
          name="answer"
          required
          placeholder="Номер урока"
          defaultValue={answer}
          onChange={this.handleName}
        />
        <h2>Выберите задания для формата "Экзамен":</h2>
        <h3>Вопросы:</h3>
        <Grid>
          {quizes.map(quiz => (
            <Option key={quiz.id} quiz={quiz} getData={this.myCallback} />
          ))}
        </Grid>
        <h3>Заметки:</h3>
        <Grid>
          {notes.map(note => (
            <Option key={note.id} note={note} getData={this.myCallback} />
          ))}
        </Grid>
        <h3>Тесты:</h3>
        <Grid>
          {tests.map(test => (
            <Option key={test.id} test={test} getData={this.myCallback} />
          ))}
        </Grid>
        <button onClick={this.onSave}>Compile</button>
        <Mutation
          mutation={UPDATE_QUIZ_MUTATION}
          variables={{
            id: quizID,
            ...this.state
          }}
          //   refetchQueries={() => [
          //     {
          //       query: PAGE_LESSONS_QUERY,
          //       variables: { id: lessonID }
          //     }
          //   ]}
        >
          {(updateQuiz, { loading, error }) => (
            <Button
              onClick={async e => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await updateQuiz();
              }}
            >
              {loading ? "Сохраняем..." : "Сохранить"}
            </Button>
          )}
        </Mutation>
      </Container>
    );
  }
}

export default UpdateQuiz;
