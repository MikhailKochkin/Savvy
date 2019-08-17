import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import { NavButton, SubmitButton, Message } from "../styles/Button";
import AreYouATeacher from "../auth/AreYouATeacher";
import PleaseSignIn from "../auth/PleaseSignIn";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const CREATE_QUIZ_MUTATION = gql`
  mutation CREATE_QUIZ_MUTATION(
    $question: String!
    $answer: String!
    $lessonID: ID!
  ) {
    createQuiz(question: $question, answer: $answer, lessonID: $lessonID) {
      id
    }
  }
`;

const Form = styled.form`
  font-size: 1.8rem;
  fieldset {
    border: none;
    textarea {
      font-size: 1.8rem;
    }
  }
`;

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  padding: 2%;
`;

const CustomSelect = styled.div``;

const AnswerOption = styled.div`
  display: flex;
  flex-direction: column;
  select {
    width: 30%;
    font-size: 1.4rem;
    margin-top: 5%;
    margin: 3%;
  }
  ${CustomSelect} {
    width: 30%;
    border-radius: 3px;
  }
  ${CustomSelect} select {
    width: 100%;
    border: none;
    box-shadow: none;
    background: #0878c6;
    color: white;
  }
  ${CustomSelect} select:focus {
    outline: none;
  }
`;

class CreateQuiz extends Component {
  state = {
    question: "",
    answer: ""
  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    const { id } = this.props;
    return (
      <PleaseSignIn>
        <AreYouATeacher subject={this.props.id}>
          <Link
            href={{
              pathname: "/lesson",
              query: { id }
            }}
          >
            <a>
              <NavButton>К уроку</NavButton>
            </a>
          </Link>
          <Mutation
            mutation={CREATE_QUIZ_MUTATION}
            variables={{
              lessonID: id,
              ...this.state
            }}
            refetchQueries={() => [
              {
                query: SINGLE_LESSON_QUERY,
                variables: { id }
              }
            ]}
            awaitRefetchQueries={true}
          >
            {(createQuiz, { loading, error }) => (
              <Form
                onSubmit={async e => {
                  e.preventDefault();
                  this.setState({ question: "", answer: "" });
                  document.getElementById("Message").style.display = "block";
                  setTimeout(function() {
                    document.getElementById("Message")
                      ? (document.getElementById("Message").style.display =
                          "none")
                      : "none";
                  }, 1500);

                  const res = await createQuiz();
                }}
              >
                <fieldset>
                  <Answers>
                    <p>
                      Создайте новый вопрос. Введите сам вопрос и ответ на него.
                      Все очень просто.
                    </p>
                    <label htmlFor="question">
                      Вопрос
                      <AnswerOption>
                        <CustomSelect>
                          <textarea
                            cols={60}
                            rows={6}
                            id="question"
                            name="question"
                            required
                            value={this.state.question}
                            onChange={this.handleChange}
                          />
                        </CustomSelect>
                      </AnswerOption>
                    </label>

                    <label htmlFor="answer">
                      Ответ
                      <AnswerOption>
                        <CustomSelect>
                          <textarea
                            cols={60}
                            rows={6}
                            spellCheck={true}
                            id="answer"
                            name="answer"
                            // placeholder="Ответ..."
                            required
                            value={this.state.answer}
                            onChange={this.handleChange}
                          />
                        </CustomSelect>
                      </AnswerOption>
                    </label>
                    <SubmitButton type="submit">Создать</SubmitButton>
                    <Message id="Message">Вы создали новый вопрос!</Message>
                  </Answers>
                </fieldset>
              </Form>
            )}
          </Mutation>
        </AreYouATeacher>
      </PleaseSignIn>
    );
  }
}

export default CreateQuiz;
