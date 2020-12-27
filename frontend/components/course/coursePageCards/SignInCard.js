import React, { Component } from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";
import Signup from "../../auth/Signup";
import Signin from "../../auth/Signin";
import RequestReset from "../../auth/RequestReset";
import { withTranslation } from "../../../i18n";

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  border-radius: 10px;
  width: 270px;
  min-height: 290px;
  padding: 2% 4%;
  .message {
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 15px;
  }
  span {
    text-decoration: underline;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const Header = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  font-style: italic;
  padding-bottom: 6%;
  padding-top: 4%;
  line-height: 1.4;
`;

const SmallButton = styled.button`
  transition: all 0.2s ease;
  background: #0846d8;
  border-radius: 5px;
  width: 100%;
  height: 38px;
  outline: 0;
  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  &:hover {
    background: rgba(8, 70, 216, 0.85);
  }
  &:active {
    background-color: ${(props) => props.theme.darkGreen};
  }
  &:disabled {
    &:hover {
      background-color: #84bc9c;
    }
  }
`;

const StyledModal = Modal.styled`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  max-width: 30%;
  @media (max-width: 800px) {
    max-width: 90%;
  }
`;

class RegisterCard extends Component {
  state = {
    isOpen: false,
    auth: "signin",
  };

  toggleModal = (e) => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  changeState = (dataFromChild) => {
    this.setState({
      auth: dataFromChild,
    });
  };

  render() {
    return (
      <>
        <Payment>
          <Header>{this.props.t("you_are_great")}</Header>
          {this.props.t("signin2")}
          <span>{this.props.t("access2")}</span>{" "}
          <SmallButton onClick={this.toggleModal}>
            {this.props.t("signin")}
          </SmallButton>
        </Payment>
        <StyledModal
          isOpen={this.state.isOpen}
          onBackgroundClick={this.toggleModal}
          onEscapeKeydown={this.toggleModal}
        >
          {this.state.auth === "signin" && (
            <Signin getData={this.changeState} closeNavBar={this.toggleModal} />
          )}
          {this.state.auth === "signup" && (
            <Signup getData={this.changeState} closeNavBar={this.toggleModal} />
          )}
          {this.state.auth === "reset" && (
            <RequestReset getData={this.changeState} />
          )}
        </StyledModal>
      </>
    );
  }
}

export default withTranslation("course")(RegisterCard);
