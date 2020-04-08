import React, { Component } from "react";
import Element from "./Element";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { SINGLE_LESSON_QUERY } from "./SingleLesson";

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

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 2%;
`;

const Block = styled.div`
  /* border-bottom: 1px solid black; */
`;

const Advice = styled.p`
  font-size: 1.5rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2%;
  margin: 30px 0;
  width: 80%;
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
          refetchQueries={() => [
            {
              query: SINGLE_LESSON_QUERY,
              variables: { id: lesson.id }
            }
          ]}
        >
          {(updateLesson, { loading, error }) => (
            <>
              <Advice>
                <div>
                  Урок строится из последовательности материалов и заданий. Вам
                  эту последовательность нужно задать самостоятельно. Для этого
                  поочередно нажимайте на кнопку "Выбрать" под соответствующими
                  заданиями. Выберите только те задания, которые вам нужны в
                  уроке. Для вашего удобства, выбранные уроки исчезают. Если
                  допустили ошибку, просто откройте вкладку "Модель урока", а
                  затем вернитесь во вкладку "Изменить урок".
                </div>
              </Advice>
              <Title>Выстроить структуру урока</Title>
              <Block>
                {lesson.notes.map(t => (
                  <Element data={t} getData={this.myCallback} />
                ))}
              </Block>
              <Block>
                {lesson.shots.map(t => (
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
              <Block>
                {lesson.constructions.map(t => (
                  <Element data={t} getData={this.myCallback} />
                ))}
              </Block>
              <Block>
                {lesson.exams.map(t => (
                  <Element data={t} getData={this.myCallback} />
                ))}
              </Block>
              <Block>
                {lesson.documents.map(t => (
                  <Element data={t} getData={this.myCallback} />
                ))}
              </Block>
              <Button
                onClick={async e => {
                  // Stop the form from submitting
                  e.preventDefault();
                  // call the mutation
                  const res = await updateLesson();
                  alert(
                    "Готово! Перейдите в режим истории и посмотрите, что у вас получилось."
                  );
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
