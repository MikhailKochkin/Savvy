import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "../User";
import WideSignIn from "./WideSignIn";
import WideSignUp from "./WideSignUp";
import WideRequestReset from "./WideRequestReset";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  #content {
    pointer-events: none;
  }
`;

const Title = styled.p`
  font-size: 1.8rem;
  width: 33%;
  text-align: center;
  @media (max-width: 600px) {
    width: 90%;
  }
`;

class PleaseSignIn extends Component {
  state = {
    auth: "signin"
  };
  changeState = dataFromChild => {
    this.setState({
      auth: dataFromChild
    });
  };
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data }, loading) => {
          if (loading) return <p>Loading...</p>;
          if (!data.me) {
            return (
              <Styles>
                <div id="content">{this.props.children}</div>
                <Title>
                  Не нажимаются кнопки? Просто зарегистрируйтесь или войдите в
                  аккаунт и все заработает! 😉
                </Title>
                {this.state.auth === "signin" && (
                  <WideSignIn getData={this.changeState} />
                )}
                {this.state.auth === "signup" && (
                  <WideSignUp getData={this.changeState} />
                )}
                {this.state.auth === "reset" && (
                  <WideRequestReset getData={this.changeState} />
                )}
              </Styles>
            );
          }
          return this.props.children;
        }}
      </Query>
    );
  }
}

export default PleaseSignIn;
