import React, { Component } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import gql from "graphql-tag";
import Router from "next/router";
import Error from "../ErrorMessage";
import { CURRENT_USER_QUERY } from "../User";
import { Unis } from "../../config";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    $isFamiliar: Boolean!
    $status: Status!
    $uniID: ID
  ) {
    signup(
      email: $email
      name: $name
      password: $password
      isFamiliar: $isFamiliar
      status: $status
      uniID: $uniID
    ) {
      id
      email
      name
    }
  }
`;

const SubmitButton = styled.button`
  background-color: #008cba;
  border: none;
  border-radius: 6px;
  color: white;
  padding: 2%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 600;
  width: 50%;
  cursor: pointer;
  &:hover {
    background: #0b3954;
  }
  @media (max-width: 800px) {
    margin-top: 5%;
    width: 80%;
  }
`;

const Form = styled.form`
  width: 50%;
  margin: 50%;
  margin: 0 auto;
  font-size: 1.6rem;
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  padding: 4%;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: repeat(3 70px);
  .email {
    grid-area: first;
  }
  .name {
    grid-area: second;
  }
  .password {
    grid-area: third;
  }
  .status {
    grid-area: fourth;
  }
  .uni {
    grid-area: fifth;
  }
  .checked {
    grid-area: sixth;
  }
  grid-template-areas:
    "first   "
    "second   "
    "third   "
    "fourth   "
    "fifth   "
    "sixth   ";
  @media (max-width: 800px) {
    margin-bottom: 5%;
  }
`;

const Label = styled.label`
  display: grid;
  grid-template-columns: 35% 65%;
  grid-template-rows: 100%;
  justify-items: center;
  align-items: center;
  .first {
    grid-area: first;
  }
  .second {
    grid-area: second;
  }
  grid-template-areas: "first second";
  p {
    text-align: center;
  }
  select {
    font-size: 1.4rem;
    background: white;
  }
  input {
    height: 50%;
    width: 80%;
    border: 1px solid #ccc;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.4rem;
  }
  .checkedStyle {
    height: 60px;
    width: 60px;
    border: none;
    box-shadow: none;
  }
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    .checkedStyle {
      height: 30px;
      width: 30px;
      border: none;
      box-shadow: none;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2%;
  padding: 3%;
  border-top: solid 1px #f0f0f0;
`;

const LoggedIn = styled.p`
  background-color: #00ff7f;
  font-size: 1.8rem;
  padding: 1% 2%;
  border-radius: 10px;
  width: 45%;
  text-align: center;
`;

class Signup extends Component {
  state = {
    name: "",
    password: "",
    email: "",
    status: "STUDENT",
    uniID: "cjymz9pazr0ib0b53v38d401g",
    isFamiliar: false,
    loggedIn: false
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signup();
              this.setState({
                name: "",
                email: "",
                password: "",
                loggedIn: true
              });
              this.state.status === "STUDENT" &&
                setTimeout(
                  () => Router.push({ pathname: "/chooseCareer" }),
                  2000
                );
              this.state.status === "AUTHOR" &&
                setTimeout(() => Router.push({ pathname: "/educator" }), 2000);
            }}
          >
            <Fieldset disabled={loading} aria-busy={loading}>
              <h2>Зарегистрируйтесь на Savvvy.app</h2>
              <Error error={error} />
              {this.state.loggedIn && (
                <LoggedIn>Вы успешно зарегистрировались!</LoggedIn>
              )}
              <Container>
                <Label className="email" htmlFor="email">
                  <p className="first">Электронная почта</p>
                  <input
                    className="second"
                    type="email"
                    name="email"
                    placeholder="Почта"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </Label>
                <Label className="name" htmlFor="name">
                  <p className="first">Имя и фамилия</p>
                  <input
                    className="second"
                    type="text"
                    name="name"
                    placeholder="Имя и фамилия"
                    value={this.state.name}
                    onChange={this.saveToState}
                  />
                </Label>
                <Label className="status" htmlFor="status">
                  <p className="first">Ваш статус</p>
                  <select
                    name="status"
                    value={this.state.status}
                    onChange={this.saveToState}
                  >
                    <option value="STUDENT">Студент</option>
                    <option value="AUTHOR">Преподаватель</option>
                    {/* <option value="HR">HR</option> */}
                  </select>
                </Label>
                <Label className="uni" htmlFor="uni">
                  <p className="first">Университет</p>
                  <select
                    name="uniID"
                    value={this.state.uni}
                    onChange={this.saveToState}
                  >
                    {Unis.map(uni => (
                      <option value={Object.values(uni)[0]}>
                        {Object.keys(uni)[0]}
                      </option>
                    ))}
                  </select>
                </Label>
                <Label className="checked" htmlFor="checked">
                  <p className="first">
                    Согласие на обработку персональных данных
                  </p>
                  <input
                    className="checkedStyle"
                    type="checkbox"
                    name="isFamiliar"
                    value={true}
                    checked={this.state.isFamiliar}
                    onChange={this.handleInputChange}
                  />
                </Label>
                <Label className="password" htmlFor="password">
                  <p className="first">Пароль</p>
                  <input
                    className="third"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </Label>
              </Container>
              <Buttons>
                <SubmitButton type="submit">
                  {loading ? "Регистрируюсь" : "Зарегистрироваться"}
                </SubmitButton>
              </Buttons>
            </Fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signup;
export { SIGNUP_MUTATION };
