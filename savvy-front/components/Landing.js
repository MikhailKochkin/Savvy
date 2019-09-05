import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ReactResizeDetector from "react-resize-detector";
import { Unis } from "../config";
import { CURRENT_USER_QUERY } from "./User";
import User from "./User";
import LandingCareerTrack from "./LandingCareerTrack";

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

const Image = styled.div`
  background: black;
  content: url("../static/amsterdam.jpg");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Nav = styled.div`
  position: absolute;
  top: 5%;
  left: 60%;
  width: 30%;
  display: flex;
  font-size: 2rem;
  color: black;
  flex-direction: row;
  justify-content: space-between;
  a {
    color: white;
    cursor: pointer;
    padding-bottom: 25px;
    &:hover {
      border-bottom: 2px solid white;
    }
  }
  @media (max-width: 1300px) {
    width: 32%;
    left: 55%;
  }
  @media (max-width: 1000px) {
    top: 3%;
    left: 0%;
    width: 100%;
    justify-content: flex-end;
    padding-right: 5%;
    font-weight: bold;
    color: black;
    span {
      cursor: pointer;
    }
  }
`;

const Black = styled.div`
  position: absolute;
  top: 15%;
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
  width: 430px;
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
  width: 430px;
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

const Logo = styled.p`
  font-size: 2rem;
  color: white;
  font-weight: 600;
  position: absolute;
  padding: 0;
  top: 5%;
  left: 5%;
  margin: 0;
  @media (max-width: 1000px) {
    top: 3%;
  }
`;

const FYI = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 2% 4%;
`;

class LandingPage extends Component {
  state = {
    width: 1,
    status: "STUDENT"
  };

  onResize = width => {
    this.setState({ width });
  };

  onSwitch = e => {
    e.preventDefault();
    const name = e.target.getAttribute("name");
    this.setState({ status: name });
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSteps = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Mutation
            mutation={SIGNUP_MUTATION}
            variables={this.state}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {(signup, { error, loading }) => (
              <>
                <ReactResizeDetector
                  handleWidth
                  handleHeight
                  onResize={this.onResize}
                />
                <Logo>Savvvy App</Logo>
                <Nav>
                  <span>
                    <Link prefetch href="/courses">
                      <a>Курсы</a>
                    </Link>
                  </span>

                  {this.state.height > 1000 && me && me.status === "AUTHOR" && (
                    <span>
                      <Link prefetch href="/educator">
                        <a>Кабинет</a>
                      </Link>
                    </span>
                  )}

                  {this.state.width > 1000 &&
                    me &&
                    me.status === "SAVVY_AUTHOR" && (
                      <span>
                        <Link prefetch href="/educator">
                          <a>Кабинет</a>
                        </Link>
                      </span>
                    )}
                  {this.state.width > 1000 && (
                    <span>
                      <a href="mailto:mi.kochkin@ya.ru?cc=valvin2000@ya.ru&subject=Проблема%20с%20сайтом">
                        Поддержка
                      </a>
                    </span>
                  )}
                </Nav>
                <Black>
                  <>
                    {this.state.status === "STUDENT" && (
                      <Form>
                        <Header>
                          Приобретайте юридические навыки онлайн, используя
                          технологии и уникальные материалы{" "}
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
                            name="career"
                            value={this.state.career}
                            onChange={this.handleSteps}
                          >
                            <option value="NAN">Не выбран</option>
                            <option value="cjymyvxjqqsoh0b53wtdnpzkk">
                              Старт карьеры. Корпоративное право
                            </option>
                            <option value="jymywj43tg8c0b36c762ii0w">
                              Старт карьеры. Право и технологии
                            </option>
                          </select>
                        </Label>
                        <SubmitButton
                          onClick={async e => {
                            e.preventDefault();
                            await signup();
                            setTimeout(
                              () => Router.push({ pathname: "/courses" }),
                              2000
                            );
                          }}
                        >
                          Зарегистрироваться
                        </SubmitButton>
                      </Form>
                    )}
                    {this.state.status === "AUTHOR" && (
                      <Form>
                        <Header>
                          Начните обучать юристов, используя современные
                          технологии
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
                            class="select-css"
                            name="careerTrackID"
                            value={this.state.careerTrackID}
                            onChange={this.handleSteps}
                          >
                            {Unis.map(uni => (
                              <option value={Object.values(uni)[0]}>
                                {Object.keys(uni)[0]}
                              </option>
                            ))}
                          </select>
                        </Label>
                        <SubmitButton
                          onClick={async e => {
                            e.preventDefault();
                            await signup();
                            setTimeout(
                              () => Router.push({ pathname: "/educator" }),
                              2000
                            );
                          }}
                        >
                          Зарегистрироваться
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
                <Image />
                <FYI>
                  <LandingCareerTrack />
                </FYI>
              </>
            )}
          </Mutation>
        )}
      </User>
    );
  }
}

export default LandingPage;
