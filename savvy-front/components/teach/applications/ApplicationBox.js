import React, { Component } from "react";
import styled from "styled-components";
import AcceptApplication from "./AcceptApplication";
import RejectApplication from "./RejectApplication";

const Styles = styled.div`
  padding: 0 2%;
  width: 100%;
  display: flex;
  flex-direction: column;
  display: ${(props) => (props.hide ? "none" : "block")};
  a {
    background: #3498db;
    background-image: -webkit-linear-gradient(top, #3498db, #2980b9);
    background-image: -moz-linear-gradient(top, #3498db, #2980b9);
    background-image: -ms-linear-gradient(top, #3498db, #2980b9);
    background-image: -o-linear-gradient(top, #3498db, #2980b9);
    background-image: linear-gradient(to bottom, #3498db, #2980b9);
    -webkit-border-radius: 28;
    -moz-border-radius: 28;
    border-radius: 28px;
    font-family: Arial;
    color: #ffffff;
    font-size: 16px;
    padding: 5px 15px 5px 15px;
    text-decoration: none;
    margin-bottom: 20px;
  }
  a:hover {
    background: #3cb0fd;
    background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
    background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
    background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
    background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
    background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
    text-decoration: none;
  }
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
    accept: "no",
  };
  myCallback = (dataFromChild) => {
    this.setState({
      accept: dataFromChild,
    });
  };
  render() {
    return (
      <Styles>
        <>
          <h3>
            {this.props.user.name} {this.props.user.surname}{" "}
            {this.props.user.email}
          </h3>
          <a href={`mailto:${this.props.user.email}`}>Отправить email</a>
          <div>Номер платежа: {this.props.paymentID}</div>
          <div>Номер заявки: {this.props.orderID}</div>
          {/* <div>Оплачено: {this.props.isPaid}</div> */}
          <div>{this.props.date}</div>
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
