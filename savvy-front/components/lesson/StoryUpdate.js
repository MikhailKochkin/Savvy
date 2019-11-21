import React, { Component } from "react";
import Element from "./Element";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const UPDATE_LESSON_MUTATION = gql`
  mutation UPDATE_LESSON_MUTATION($id: ID!, $map: [Json]) {
    updateLesson(id: $id, map: $map) {
      id
    }
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

const Block = styled.div`
  /* border-bottom: 1px solid black; */
`;

class StoryUpdate extends Component {
  state = {
    list: [],
    value: ""
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

  myCallback = async dataFromChild => {
    const res = await this.setState({
      value: dataFromChild
    });
    this.onAddItem();
  };

  render() {
    const { lesson } = this.props;
    return (
      <>
        <Mutation
          mutation={UPDATE_LESSON_MUTATION}
          variables={{
            id: lesson.id,
            map: this.state.list
          }}
        >
          {(updateLesson, { loading, error }) => (
            <>
              <h2>Выстроить структуру урока</h2>
              <h3>Список заданий</h3>
              <Block>
                {lesson.notes.map(t => (
                  <Element data={t} getData={this.myCallback} />
                ))}
              </Block>
              <Block>
                {lesson.newTests.map(t => (
                  <Element data={t} getData={this.myCallback} />
                ))}
              </Block>
              <Block>
                {lesson.quizes.map(t => (
                  <Element data={t} getData={this.myCallback} />
                ))}
              </Block>
              <Block>
                {lesson.texteditors.map(t => (
                  <Element data={t} getData={this.myCallback} />
                ))}
              </Block>
              <Block>
                {lesson.problems.map(t => (
                  <Element data={t} getData={this.myCallback} />
                ))}
              </Block>
              <Button
                onClick={async e => {
                  // Stop the form from submitting
                  e.preventDefault();
                  // call the mutation
                  const res = await updateLesson();
                  alert("!!!");
                  // change the page to the single case page
                }}
              >
                Изменить
              </Button>
            </>
          )}
        </Mutation>
      </>
    );
  }
}

export default StoryUpdate;
