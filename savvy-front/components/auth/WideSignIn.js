import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import styled from "styled-components";
import Error from "../ErrorMessage";
import { CURRENT_USER_QUERY } from "../User";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

const SubmitButton = styled.button`
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
    margin-top: 1%;
  }
`;

const Form = styled.form`
  width: 33%;
  font-size: 1.6rem;
  margin-bottom: 5%;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  padding: 15px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: repeat(2 70px);
  .email {
    grid-area: first;
  }
  .password {
    grid-area: second;
  }
  input {
    width: 100%;
    /* font-size: ${props => (props.primary ? "2.2rem" : "1.6rem")}; */
    border: ${props =>
      props.primary ? "2px solid #84BC9C" : "1px solid #ccc"};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 1.5%;
    font-size: 1.4rem;
    margin-bottom: 15px;
    outline: 0;
  }
  grid-template-areas:
    "first   "
    "second   ";
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
  padding: 0 3% 2% 3%;
  border-bottom: solid 1px #f0f0f0;
  div {
    font-size: 1.3rem;
    color: #112a62;
    font-weight: 900;
    cursor: pointer;
    margin-top: 2%;
  }
  @media (max-width: 850px) {
    margin-top: 0.5%;
  }
`;

const LoggedIn = styled.p`
  background-color: #00ff7f;
  font-size: 1.8rem;
  padding: 1% 2%;
  border-radius: 10px;
  width: 45%;
  text-align: center;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 10px;
`;

const Transit = styled.div`
  margin-top: 3%;
  font-size: 1.4rem;
  span {
    color: #112a62;
    font-weight: 600;
    cursor: pointer;
  }
`;

class WideSignin extends Component {
  state = {
    password: "",
    email: "",
    loggedIn: true
  };
  saveToStateEmail = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  switch = e => {
    const name = e.target.getAttribute("name");
    this.props.getData(name);
  };
  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signin();
              this.setState({ email: "", password: "", loggedIn: true });
            }}
          >
            <Fieldset disabled={loading} aria-busy={loading}>
              <Title>Войдите на Savvvy App</Title>
              <Error error={error} />
              {/* {this.state.loggedIn && <LoggedIn>Вы вошли в аккаунт!</LoggedIn>} */}
              <Container>
                <input
                  primary={this.state.loggedIn}
                  type="email"
                  name="email"
                  placeholder="Электронная почта"
                  value={this.state.email}
                  onChange={this.saveToStateEmail}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </Container>
              <Buttons>
                <SubmitButton type="submit">
                  {loading ? "Вхожу" : "Войти"}
                </SubmitButton>
                <div name="reset" onClick={this.switch}>
                  Забыли пароль?
                </div>
              </Buttons>
              <Transit>
                Ещё не зарегистрированы на Savvvy?{" "}
                <span name="signup" onClick={this.switch}>
                  Зарегистрироваться
                </span>
              </Transit>
            </Fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default WideSignin;
export { SIGNIN_MUTATION };
