import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import { Unis } from "../../config";
import { CURRENT_USER_QUERY } from "../User";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    $isFamiliar: Boolean!
    $status: Status!
    $uniID: ID
    $careerTrackID: ID
  ) {
    signup(
      email: $email
      name: $name
      password: $password
      isFamiliar: $isFamiliar
      status: $status
      uniID: $uniID
      careerTrackID: $careerTrackID
    ) {
      id
      email
      name
    }
  }
`;

const Black = styled.div`
  position: absolute;
  top: 12%;
  left: 15%;
  display: flex;
  width: 70%;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 1300px) {
    width: 70%;
    left: 10%;
  }
  @media (max-width: 1000px) {
    left: 20%;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 12%;
    left: 5%;
    width: 90%;
  }
`;

const SubmitButton = styled.button`
  background: #84bc9c;
  border-radius: 5px;
  border: none;
  padding: 3%;
  margin-top: 5%;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1.4rem;
  color: #ffffff;
  cursor: pointer;
  outline: none;
  &:hover {
    background: #32ac66;
  }
`;

const Button = styled.button`
  font-size: 1.6rem;
  width: 450px;
  padding: 1% 0;
  border-radius: 5px;
  opacity: 0.92;
  border: 1px solid white;
  background: white;
  -webkit-box-shadow: 0px -1px 5px 1px rgba(171, 171, 171, 0.63);
  -moz-box-shadow: 0px -1px 5px 1px rgba(171, 171, 171, 0.63);
  box-shadow: 0px -1px 5px 1px rgba(171, 171, 171, 0.63);
  border: none;
  margin-top: 2%;
  line-height: 1.2;
  font-weight: 600;
  outline: 0;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  &:active {
    border: 1px solid #c4c4c4;
  }
  @media (max-width: 600px) {
    width: 95%;
    margin-top: 4%;
    padding: 2%;
  }
`;

const Form = styled.div`
  width: 450px;
  min-height: 450px;
  border: none;
  border-radius: 7px;
  background: white;
  padding: 2%;
  overflow: auto;
  -webkit-box-shadow: 0px -1px 5px 1px rgba(171, 171, 171, 0.63);
  -moz-box-shadow: 0px -1px 5px 1px rgba(171, 171, 171, 0.63);
  box-shadow: 0px -1px 5px 1px rgba(171, 171, 171, 0.63);
  @media (max-width: 1200px) {
    left: 50%;
  }
  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
    padding: 15px 20px;
  }
`;

const Header = styled.div`
  font-size: 2rem;
  line-height: 1.3;
  font-weight: 600;
  width: 100%;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 3%;
  font-size: 1.4rem;
  border: 1px solid #c5c5c5;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 3%;
  outline: none;
  &:focus {
    border: 1px solid #112a62;
  }
`;

const Label = styled.label`
  margin-bottom: 10px;
  .select-css {
    margin-bottom: 10px;
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
    background: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }
`;

const Name = styled.p`
  font-size: 1.4rem;
  margin: 1% auto;
  font-weight: 600;
`;

class LandingRegister extends Component {
  state = {
    status: "STUDENT",
    uniID: "cjyimfz2e00lp07174jpder3m",
    careerTrackID: "cjwx78u7700rb07121pelqctm",
  };

  onSwitch = (e) => {
    e.preventDefault();
    const name = e.target.getAttribute("name");
    this.setState({ status: name });
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  saveToStateBoolean = (e) => {
    if (e.target.value === "true") {
      this.setState({ isFamiliar: true });
    }
  };

  handleSteps = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={{
          isFamiliar: true,
          ...this.state,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <Black>
            <>
              {this.state.status === "STUDENT" && (
                <Form data-tut="fifth-step">
                  <Header>
                    Приобретайте юридические навыки онлайн, используя технологии
                    и уникальные материалы{" "}
                  </Header>
                  <Label>
                    <Name>Имя и фамилия</Name>
                    <Input
                      className="name"
                      type="text"
                      name="name"
                      placeholder="Имя и фамилия"
                      value={this.state.name}
                      onChange={this.saveToState}
                    />
                  </Label>
                  <Label>
                    <Name>Электронная почта</Name>
                    <Input
                      className="email"
                      type="email"
                      name="email"
                      placeholder="Почта"
                      value={this.state.email}
                      onChange={this.saveToState}
                    />
                  </Label>
                  <Label>
                    <Name>Пароль</Name>
                    <Input
                      className="password"
                      type="password"
                      name="password"
                      placeholder="Пароль"
                      value={this.state.password}
                      onChange={this.saveToState}
                    />
                  </Label>
                  <Label>
                    <Name>Карьерный трек</Name>
                    <select
                      class="select-css"
                      name="careerTrackID"
                      value={this.state.careerTrackID}
                      onChange={this.handleSteps}
                    >
                      <option value="cjwx78u7700rb07121pelqctm">
                        Старт карьеры. Корпоративное право
                      </option>
                      <option value="cjwx79iaj00rk0712tz12j7vi">
                        Старт карьеры. Право и технологии
                      </option>
                    </select>
                  </Label>
                  <Label className="isFamiliar">
                    <select
                      name="isFamiliar"
                      className="isFamiliar"
                      // value={this.state.isFamiliar}
                      // onChange={this.saveToState}
                    >
                      <option value="false">
                        Согласие на обработку персональных данных?
                      </option>
                      <option value="true">Да</option>
                    </select>
                  </Label>
                  <SubmitButton
                    onClick={async (e) => {
                      e.preventDefault();
                      await signup();
                    }}
                  >
                    {loading ? "Регистрируем..." : "Зарегистрироваться"}
                  </SubmitButton>
                </Form>
              )}
              {this.state.status === "AUTHOR" && (
                <Form>
                  <Header>
                    Начните обучать юристов, используя современные технологии
                  </Header>
                  <Label>
                    <Name>Имя и фамилия</Name>
                    <Input
                      className="name"
                      type="text"
                      name="name"
                      placeholder="Имя и фамилия"
                      value={this.state.name}
                      onChange={this.saveToState}
                    />
                  </Label>
                  <Label>
                    <Name>Электронная почта</Name>
                    <Input
                      className="email"
                      type="email"
                      name="email"
                      placeholder="Почта"
                      value={this.state.email}
                      onChange={this.saveToState}
                    />
                  </Label>
                  <Label>
                    <Name>Пароль</Name>
                    <Input
                      className="password"
                      type="password"
                      name="password"
                      placeholder="Пароль"
                      value={this.state.password}
                      onChange={this.saveToState}
                    />
                  </Label>
                  <Label>
                    <Name>Где вы преподаете?</Name>
                    <select
                      className="select-css"
                      name="uniID"
                      value={this.state.uniID}
                      onChange={this.handleSteps}
                    >
                      {Unis.map((uni) => (
                        <option value={Object.values(uni)[0]}>
                          {Object.keys(uni)[0]}
                        </option>
                      ))}
                    </select>
                  </Label>
                  <Label>
                    <select name="isFamiliar">
                      <option value={false}>
                        Согласие на обработку персональных данных
                      </option>
                      <option value={true}>Да</option>
                    </select>
                  </Label>
                  <SubmitButton
                    onClick={async (e) => {
                      e.preventDefault();
                      await signup();
                      setTimeout(
                        () => Router.push({ pathname: "/educator" }),
                        2000
                      );
                    }}
                  >
                    {loading ? "Регистрируем..." : "Зарегистрироваться"}
                  </SubmitButton>
                </Form>
              )}
              {this.state.status === "STUDENT" && (
                <Button name="AUTHOR" onClick={this.onSwitch}>
                  Я преподаватель
                </Button>
              )}
              {this.state.status === "AUTHOR" && (
                <Button name="STUDENT" onClick={this.onSwitch}>
                  Я ученик
                </Button>
              )}
            </>
          </Black>
        )}
      </Mutation>
    );
  }
}

export default LandingRegister;
