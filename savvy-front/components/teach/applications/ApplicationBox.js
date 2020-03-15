import React, { Component } from "react";
import styled from "styled-components";
import AcceptApplication from "./AcceptApplication";
import RejectApplication from "./RejectApplication";

const Styles = styled.div`
  padding: 0 2%;
  width: 100%;
  display: flex;
  flex-direction: column;
  display: ${props => (props.hide ? "none" : "block")};
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 28%;
  justify-content: space-between;
  @media (max-width: 1300px) {
    width: 50%;
  }
`;

class ApplicationBox extends Component {
  state = {
    accept: "no"
  };
  myCallback = dataFromChild => {
    this.setState({
      accept: dataFromChild
    });
  };
  render() {
    return (
      <Styles>
        <>
          <h3>{this.props.user.name}</h3>
          <div>Номер платежа: {this.props.paymentID}</div>
          <div>Номер заявки: {this.props.orderID}</div>
          <div>Оплачено: {this.props.isPaid}</div>
          <Buttons>
            {this.state.accept === "no" && (
              <>
                <AcceptApplication
                  orderID={this.props.orderID}
                  getData={this.myCallback}
                  user={this.props.user}
                  coursePageID={this.props.coursePageID}
                />
                <RejectApplication
                  orderID={this.props.orderID}
                  getData={this.myCallback}
                />
              </>
            )}
            {this.state.accept === "accept" && <div>Заявка одобрена</div>}
            {this.state.accept === "reject" && <div>Заявка отклонена</div>}
          </Buttons>
        </>
      </Styles>
    );
  }
}

export default ApplicationBox;
