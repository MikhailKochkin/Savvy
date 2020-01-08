import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const Box = styled.div`
  border-bottom: 1px solid #edefed;
  padding: 1%;
  padding-bottom: 2%;
  padding-top: 4%;
  background: ${props =>
    props.color === "true" ? "rgba(50, 172, 102, 0.05)" : "none"};
  .question {
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

const Button = styled.button`
  background: none;
  font-style: Montserrat;
  font-size: 1.6rem;
  padding: 1%;
  width: 120px;
  outline: 0;
  margin-top: 3%;
`;

const CREATE_EXAM_MUTATION = gql`
  mutation CREATE_EXAM_MUTATION($lesson: ID!, $nodeID: ID!, $nodeType: String) {
    createExam(lesson: $lesson, nodeID: $nodeID, nodeType: $nodeType) {
      id
    }
  }
`;

class CreateExam extends Component {
  state = {
    nodeID: "",
    nodeType: ""
  };

  handleChange = e => {
    let nodeID = e.target.getAttribute("nodeid");
    let nodeType = e.target.getAttribute("nodetype");
    // console.log(nodeID, nodeType);
    this.setState({
      nodeID,
      nodeType
    });
  };
  render() {
    const { lesson } = this.props;
    return (
      <>
        <h3>Выберите первый вопрос, с которого начнется экзамен.</h3>
        {lesson.quizes.map(q => (
          <Box key={q.id} color={(this.state.nodeID === q.id).toString()}>
            <div className="question">{q.question}</div>
            <div className="answer">{q.answer}</div>
            <button nodeid={q.id} nodetype="quiz" onClick={this.handleChange}>
              Выбрать
            </button>
          </Box>
        ))}
        <div>
          Впоследствии, в каждом из заданий вам будет необходимо выбрать, куда
          они будут двигаться в случе правильного или неправильного ответа.
        </div>
        <Mutation
          mutation={CREATE_EXAM_MUTATION}
          variables={{
            lesson: lesson.id,
            ...this.state
          }}
        >
          {(createExam, { loading, error }) => (
            <Button
              onClick={async e => {
                e.preventDefault();
                const res = await createExam();
              }}
            >
              Создать
            </Button>
          )}
        </Mutation>
      </>
    );
  }
}

export default CreateExam;
