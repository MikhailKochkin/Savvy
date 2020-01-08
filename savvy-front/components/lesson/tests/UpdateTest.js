import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Option from "../Option";

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

const UPDATE_TEST_MUTATION = gql`
  mutation UPDATE_TEST_MUTATION($id: ID!, $next: Json) {
    updateNewTest(id: $id, next: $next) {
      id
    }
  }
`;
class UpdateTest extends Component {
  state = {};
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
    const { testID, tests, quizes, notes } = this.props;
    return (
      <div>
        <h2>Выберите задания для формата "Экзамен":</h2>
        <h3>Вопросы:</h3>
        {quizes.map(quiz => (
          <Option key={quiz.id} quiz={quiz} getData={this.myCallback2} />
        ))}
        <h3>Заметки:</h3>
        {notes.map(note => (
          <Option key={note.id} note={note} getData={this.myCallback2} />
        ))}
        <h3>Тесты:</h3>
        {tests.map(test => (
          <Option key={test.id} test={test} getData={this.myCallback2} />
        ))}
        <Button2 onClick={this.onSave}>Compile</Button2>
        <Mutation
          mutation={UPDATE_TEST_MUTATION}
          variables={{
            id: testID,
            ...this.state
          }}
          //   refetchQueries={() => [
          //     {
          //       query: PAGE_LESSONS_QUERY,
          //       variables: { id: lessonID }
          //     }
          //   ]}
        >
          {(updateNewTest, { loading, error }) => (
            <Button
              onClick={async e => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await updateNewTest();
              }}
            >
              {loading ? "Сохраняем..." : "Сохранить"}
            </Button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default UpdateTest;
