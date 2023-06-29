import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";

const CREATE_APPLICATION_MUTATION = gql`
  mutation CREATE_APPLICATION_MUTATION(
    $applicantId: ID!
    $applicantName: String!
    $message: String
    $coursePageID: ID!
  ) {
    createApplication(
      applicantId: $applicantId
      applicantName: $applicantName
      message: $message
      coursePageID: $coursePageID
    ) {
      id
    }
  }
`;

const Input = styled.input`
  height: 50%;
  width: 80%;
  border: 1px solid #ccc;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3.5px;
  padding: 2%;
  font-size: 1.4rem;
`;

class Application extends Component {
  state = {
    message: "",
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  concealApplication = () => {
    alert(
      "Ваша заявка отправлена. В ближайшее время преподаватель рассмотрит ее и предоставит вам доступ к курсу."
    );
    this.props.getInputReveal(false);
  };
  render() {
    return (
      <div>
        Отправьте сообщение, если это необходимо.
        <Input
          type="text"
          name="message"
          placeholder="Сообщение..."
          value={this.state.message}
          onChange={this.handleChange}
        />
        <Mutation
          mutation={CREATE_APPLICATION_MUTATION}
          variables={{
            applicantId: this.props.meData.id,
            applicantName: this.props.meData.name,
            coursePageID: this.props.coursePageId,
            ...this.state,
          }}
        >
          {(createApplication, { loading, error }) => (
            <button
              onClick={async (e) => {
                e.preventDefault;
                this.concealApplication();
                const res = await createApplication();
              }}
            >
              Отправить
            </button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default Application;
export { CREATE_APPLICATION_MUTATION };
