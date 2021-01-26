import React, { Component } from "react";
import styled from "styled-components";
import Signup from "../components/auth/Signup";
import Signin from "../components/auth/Signin";
import RequestReset from "../components/auth/RequestReset";

const Button = styled.button`
  background-color: ${props => (props.active ? "#122557" : "white")};
  color: ${props => (props.active ? "white" : "black")};
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: ${props => (props.active ? "#444B6E" : "#F8F8F8")};
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  button {
    width: 25%;
  }
  margin-bottom: 5%;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    button {
      width: 90%;
      font-size: 0.8rem;
      margin-top: 2%;
    }
  }
`;

class SignupPage extends Component {
  state = {
    page: "reset",
    button1: true,
    button2: false,
    button3: false
  };
  

  onSignup = () => {
    this.setState({
      page: "signup",
      button1: true,
      button2: false,
      button3: false
    });
  };
  onLogin = () => {
    this.setState({
      page: "login",
      button1: false,
      button2: true,
      button3: false
    });
  };
  onReset = () => {
    this.setState({
      page: "reset",
      button1: false,
      button2: false,
      button3: true
    });
  };

  render() {
    switch (this.state.page) {
      case "signup":
        this.pageView = <Signup />;
        break;
      case "login":
        this.pageView = <Signin />;
        break;
      case "reset":
        this.pageView = <RequestReset />;
        break;
      default:
        this.pageView = <Signup />;
        break;
    }
    return <></>;
  }
}

export default SignupPage;
