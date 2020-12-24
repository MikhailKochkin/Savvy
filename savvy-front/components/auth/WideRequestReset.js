import React, { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import Error from "../ErrorMessage";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const SubmitButton = styled.button`
  flex: 50%;
  background-color: #84bc9c;
  border: 1px solid white;
  border-radius: 6px;
  color: white;
  padding: 2%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  outline: 0;
  &:active {
    border: 1px solid black;
  }
  @media (max-width: 800px) {
    margin-top: 5%;
  }
`;

const Form = styled.form`
  font-size: 1.6rem;
  margin-bottom: 3%;
  width: 33%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Fieldset = styled.fieldset`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
`;

const Container = styled.div`
  input {
    width: 100%;
    border: 1px solid #ccc;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.4rem;
    margin-top: 10px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  margin-top: 2%;
  padding: 3%;
  border-top: solid 1px #f0f0f0;
  @media (max-width: 800px) {
    margin-top: 10%;
  }
  div {
    flex: 50%;
    color: #112a62;
    font-size: 1.4rem;
    padding-top: 1.5%;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 10px;
`;

const Message = styled.div`
  font-size: 1.4rem;
  margin-top: 10px;
`;

const Comment = styled.div`
  background: #fdf3c8;
  border-radius: 5px;
  padding: 1% 2%;
  font-size: 1.4rem;
`;

class WideRequestReset extends Component {
  state = {
    email: "",
  };
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  switch = (e) => {
    const name = e.target.getAttribute("name");
    this.props.getData(name);
  };
  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => (
          <Form
            method="post"
            data-test="form"
            onSubmit={async (e) => {
              e.preventDefault();
              await reset();
              this.setState({ email: "" });
            }}
          >
            <Fieldset disabled={loading} aria-busy={loading}>
              <Title>Восстановите пароль</Title>
              <Message>
                Введите адрес электронной почты, связанный с вашим аккаунтом на
                BeSavvy, и мы вышлем вам ссылку для изменения пароля.
              </Message>
              <Container>
                <Error error={error} />
                {!error && !loading && called && (
                  <Comment>
                    Нашли! На вашей почте должна быть ссылка для смены пароля!
                  </Comment>
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Электронная почта"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </Container>
              <Buttons>
                <div name="signin" onClick={this.switch}>
                  Вернуться ко входу
                </div>
                <SubmitButton type="submit">Отправить ссылку </SubmitButton>
              </Buttons>
            </Fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default WideRequestReset;
export { REQUEST_RESET_MUTATION };
