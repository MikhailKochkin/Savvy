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
  p {
    margin-top: 5%;
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
                <Title>
                  Пожалуйста, зарегистрируйтесь или войдите в свой аккаунт перед
                  тем, как работать с этой страницей.
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

auth: "signin";

export default PleaseSignIn;
