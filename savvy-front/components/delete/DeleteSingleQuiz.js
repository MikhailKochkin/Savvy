import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Icon from "react-icons-kit";
import { remove } from "react-icons-kit/fa/remove";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const DELETE_QUIZ_MUTATION = gql`
  mutation DELETE_QUIZ_MUTATION($id: ID!) {
    deleteQuiz(id: $id) {
      id
    }
  }
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
`;

const Delete = styled.div`
  color: black;
  &:hover {
    color: red;
  }
`;

class DeleteSingleQuiz extends Component {
  //   update = async (cache, payload) => {
  //     // manually update the cache on the client, so it matches the server
  //     // 1. Read the cache for the items we want
  //     const data = cache.readQuery({
  //       query: SINGLE_LESSON_QUERY,
  //       variables: { id: this.props.lessonID }
  //     });
  //     console.log(data.lesson.quizes, payload.data.deleteQuiz.id);

  //     // 2. Filter the deleted itemout of the page
  //     data.lesson = data.lesson.quizes.filter(
  //       item => item.id !== payload.data.deleteQuiz.id
  //     );
  //     // 3. Put the items back!
  //     console.log(data.lesson);
  //     const res = await cache.writeQuery({
  //       query: SINGLE_LESSON_QUERY,
  //       variables: { id: this.props.lessonID },
  //       data: data.lesson
  //     });
  //   };
  render() {
    const { quizID, lessonID } = this.props;
    return (
      <Mutation
        mutation={DELETE_QUIZ_MUTATION}
        variables={{ id: quizID }}
        // update={this.update}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: lessonID }
          }
        ]}
      >
        {(deleteQuiz, { error, loading }) => (
          <Button
            onClick={() => {
              if (
                confirm(
                  "Вы точно хотите удалить этот вопрос? Вопрос исчезнет после перезагрузки страницы."
                )
              ) {
                deleteQuiz().catch(error => {
                  alert(error.message);
                });
              }
            }}
          >
            <Delete id="remove">
              {loading ? "Удаляем..." : <Icon size={20} icon={remove} />}
            </Delete>
          </Button>
        )}
      </Mutation>
    );
  }
}

export default DeleteSingleQuiz;
