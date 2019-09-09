import React, { Component } from "react";
import styled from "styled-components";
import User from "./User";
import Account from "./Account";
import PleaseSignIn from "./auth/PleaseSignIn";

const Styles = styled.div`
  display: flex;
  margin: 3% 0;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  @media (max-width: 800px) {
    width: 95%;
    flex-direction: column;
  }
`;

const Menu = styled.div`
  flex: 15%;
  padding: 2%;
  div {
    font-size: 1.6rem;
    margin-bottom: 13px;
    cursor: pointer;
    padding-right: 15px;
    border-right: 1px solid white;
    &:hover {
      border-right: 1px solid #112a62;
    }
  }
  @media (max-width: 800px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    div {
      &:hover {
        border-right: 1px solid white;
        border-bottom: 1px solid #112a62;
      }
    }
  }
`;

const Data = styled.div`
  flex: 85%;
`;

class AccountPage extends Component {
  state = {
    page: "account"
  };

  onSwitch = e => {
    e.preventDefault();
    const name = e.target.getAttribute("name");
    this.setState({ page: name });
  };

  render() {
    return (
      <PleaseSignIn>
        <Styles>
          <Container>
            <Menu>
              <div name="account" onClick={this.onSwitch}>
                Аккаунт
              </div>
              <div name="portfolio" onClick={this.onSwitch}>
                Портфолио
              </div>
            </Menu>
            <Data>
              <User>
                {({ data: { me } }) =>
                  this.state.page === "account" && (
                    <Account me={me} id={this.props.id} />
                  )
                }
              </User>
            </Data>
          </Container>
        </Styles>
      </PleaseSignIn>
    );
  }
}

export default AccountPage;
