import React, { Component } from "react";
import { Query, Mutation } from "@apollo/client/react/components";
import dynamic from "next/dynamic";
import gql from "graphql-tag";
import styled from "styled-components";
import renderHTML from "react-render-html";

const Button = styled.button`
  background: ${(props) => props.theme.green};
  border-radius: 5px;
  width: 200px;
  height: 38px;
  outline: 0;
  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  &:active {
    background-color: ${(props) => props.theme.darkGreen};
  }
`;

const Styles = styled.div`
  width: 90%;
  padding: 3% 0;
`;

const Title = styled.div`
  font-size: 1.8rem;
`;

const Question = styled.div`
  background: white;
  font-size: 1.6rem;
  width: 100%;
  padding: 4%;
  margin-bottom: 3%;
  img {
    display: block;
    max-width: 100%;
    max-height: 20em;
    box-shadow: "0 0 0 2px blue;";
    border: 2px solid #f4f4f4;
  }
  iframe {
    width: 100%;
    height: 400px;
    @media (max-width: 800px) {
      width: 100%;
      height: auto;
    }
  }
`;

const CREATE_EXAM_ANSWER_MUTATION = gql`
  mutation CREATE_EXAM_ANSWER_MUTATION($answer: String!, $examQuestionID: ID!) {
    createExamAnswer(answer: $answer, examQuestionID: $examQuestionID) {
      id
    }
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/LessonEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false,
});

class ExamAnswer extends Component {
  state = {
    text: "",
    sent: false,
  };
  myCallback = (dataFromChild) => {
    this.setState({
      text: dataFromChild,
    });
  };
  render() {
    const { question } = this.props;
    return (
      <>
        <Styles>
          <Question>
            <Title>Финальное задание</Title>
            {renderHTML(question.question)}
          </Question>
          <DynamicLoadedEditor getEditorText={this.myCallback} />
          <Mutation
            mutation={CREATE_EXAM_ANSWER_MUTATION}
            variables={{
              examQuestionID: question.id,
              answer: this.state.text,
            }}
          >
            {(createExamAnswer, { loading, error }) => (
              <>
                <Button
                  onClick={async (e) => {
                    // Stop the form from submitting
                    e.preventDefault();
                    // call the mutation
                    const res = await createExamAnswer();
                    this.setState({ sent: true });
                    // change the page to the single case page
                  }}
                >
                  {loading ? "Сохраняем ответ..." : "Сохранить ответ"}
                </Button>
              </>
            )}
          </Mutation>
        </Styles>
      </>
    );
  }
}

export default ExamAnswer;
