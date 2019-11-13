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
  width: 15%;
`;

const Block = styled.div`
  border-bottom: 1px solid black;
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
              <button
                onClick={async e => {
                  // Stop the form from submitting
                  e.preventDefault();
                  // call the mutation
                  const res = await updateLesson();
                  // change the page to the single case page
                }}
              >
                Update
              </button>
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
            </>
          )}
        </Mutation>
      </>
    );
  }
}

export default StoryUpdate;
