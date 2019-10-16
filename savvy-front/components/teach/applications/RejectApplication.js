import React, { Component } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import { DELETE_APPLICATION_MUTATION } from "./AcceptApplication";

const Button = styled.button`
  background: ${props => props.theme.red};
  border-radius: 5px;
  width: 110px;
  height: 38px;
  outline: 0;
  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  &:active {
    background-color: ${props => props.theme.darkRed};
  }
`;

class RejectApplication extends Component {
  removeApplication = () => {
    this.props.getData(true);
  };
  onClick = async (e, deleteApplication) => {
    e.preventDefault();
    this.props.getData("reject");
    deleteApplication({
      variables: {
        id: this.props.applicationId
      }
    });
  };
  render() {
    return (
      <div>
        <Mutation mutation={DELETE_APPLICATION_MUTATION}>
          {deleteApplication => (
            <Button red onClick={e => this.onClick(e, deleteApplication)}>
              Отклонить
            </Button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default RejectApplication;
