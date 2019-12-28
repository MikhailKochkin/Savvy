import React from "react";
import styled from "styled-components";
import Signup from "../auth/Signup";
import Signin from "../auth/Signin";
import RequestReset from "../auth/RequestReset";
import Modal from "styled-react-modal";

const Button = styled.button`
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
    background-color: ${props => props.theme.darkGreen};
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
    width: 90%;
  }
`;

class BuyDummy extends React.Component {
  state = {
    loading: false,
    isOpen: false,
    auth: "signin"
  };
  toggleModal = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };
  render() {
    return (
      <>
        <Button onClick={this.toggleModal}>{this.props.children}</Button>
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

export default BuyDummy;
