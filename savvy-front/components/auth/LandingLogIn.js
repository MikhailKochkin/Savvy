import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import Router from "next/router";
import { CURRENT_USER_QUERY } from "../User";
import Error from "../ErrorMessage";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
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
  padding: 3% 4%;
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
  @media (max-width: 600px) {
    margin-top: 2%;
  }
`;

const Form = styled.div`
  width: 450px;
  min-height: 350px;
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
  margin-bottom: 4%;
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

class LandingLogIn extends Component {
  state = {
    password: "",
    email: "",
  };
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSteps = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => (
          <Black>
            <>
              <Form data-tut="fifth-step">
                <Header>
                  Приобретайте юридические навыки онлайн, используя технологии и
                  уникальные материалы{" "}
                </Header>
                <Error error={error} />
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
                <SubmitButton
                  onClick={async (e) => {
                    e.preventDefault();
                    await signin();
                  }}
                >
                  {loading ? "Вхожу..." : "Войти"}
                </SubmitButton>
              </Form>
            </>
          </Black>
        )}
      </Mutation>
    );
  }
}

export default LandingLogIn;
