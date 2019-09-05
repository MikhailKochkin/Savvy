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
`;

const Fieldset = styled.fieldset`
  width: 85%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  padding: 4%;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: repeat(3 70px);
  .name {
    grid-area: first;
  }
  .email {
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
  .career {
    grid-area: sixth;
  }
  .checked {
    grid-area: seventh;
  }
  grid-template-areas:
    "first   "
    "second   "
    "third   "
    "fourth   "
    "fifth   "
    "sixth   "
    "seventh   ";
  @media (max-width: 800px) {
    margin-bottom: 5%;
  }
  input {
    width: 100%;
    border: 1px solid #ccc;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 1.5%;
    font-size: 1.4rem;
    margin-bottom: 10px;
    outline: 0;
  }
  select {
    width: 100%;
    font-size: 1.4rem;
    outline: none;
    line-height: 1.3;
    padding: 0.6em 1.4em 0.5em 0.8em;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
    margin-bottom: 10px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2%;
  padding: 3%;
  border-bottom: solid 1px #f0f0f0;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 10px;
`;

const Comment = styled.div`
  font-size: 1.2rem;
  color: #767676;
  padding: 0 1%;
  line-height: 1.4;
  margin-bottom: 5px;
  a {
    color: #112a62;
    font-weight: 600;
  }
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

class Signup extends Component {
  state = {
    name: "",
    password: "",
    email: "",
    status: "STUDENT",
    uniID: "cjymz9pazr0ib0b53v38d401g",
    isFamiliar: true,
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

  switch = e => {
    const name = e.target.getAttribute("name");
    this.props.getData(name);
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
              this.props.closeNavBar(true);
              this.setState({
                name: "",
                email: "",
                password: "",
                loggedIn: true
              });
              this.state.status === "AUTHOR" &&
                setTimeout(() => Router.push({ pathname: "/educator" }), 2000);
            }}
          >
            <Fieldset disabled={loading} aria-busy={loading}>
              <Title>Зарегистрируйтесь на Savvvy.app</Title>
              <Error error={error} />
              <Container>
                <input
                  className="name"
                  type="text"
                  name="name"
                  placeholder="Имя и фамилия"
                  value={this.state.name}
                  onChange={this.saveToState}
                />
                <input
                  className="email"
                  type="email"
                  name="email"
                  placeholder="Почта"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
                <input
                  className="password"
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
                <select
                  className="status"
                  name="status"
                  value={this.state.status}
                  onChange={this.saveToState}
                >
                  <option value="STUDENT">Студент</option>
                  <option value="AUTHOR">Преподаватель</option>
                  {/* <option value="HR">HR</option> */}
                </select>

                <select
                  className="uni"
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
                <label className="career">
                  <select
                    name="career"
                    value={this.state.career}
                    onChange={this.saveToState}
                  >
                    <option value="STUDENT">Корпоративное право</option>
                    <option value="AUTHOR">Право и технологии</option>
                    {/* <option value="HR">HR</option> */}
                  </select>
                  <Comment>
                    Карьерный трек необходим для составления плана карьерного
                    развития, поиска курсов и предложений работы.
                  </Comment>
                  <Comment>
                    Если вы не знаете, какой карьерный трек выбрать,
                    воспользуйтесь <a href="#">карьерным помощником.</a>
                  </Comment>
                </label>

                <select
                  name="isFamiliar"
                  className="isFamiliar"
                  // value={this.state.isFamiliar}
                  // onChange={this.saveToState}
                >
                  <option value={false}>
                    Согласие на обработку персональных данных
                  </option>
                  <option value={true}>Да</option>
                  {/* <option value="HR">HR</option> */}
                </select>
              </Container>
              <Buttons>
                <SubmitButton type="submit">
                  {loading ? "Регистрируюсь" : "Зарегистрироваться"}
                </SubmitButton>
              </Buttons>
              <Transit>
                У вас уже есть аккаунт на Savvvy?{" "}
                <span name="signin" onClick={this.switch}>
                  Войти
                </span>
              </Transit>
            </Fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signup;
export { SIGNUP_MUTATION };
