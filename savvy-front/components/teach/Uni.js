import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";

const UniInfo = styled.div`
  width: 70%;
  max-width: 1200px;
  padding: 1.5%;
  flex-basis: 50%;
  height: 250px;
  @media (max-width: 850px) {
    width: 95%;
  }
`;

const Title = styled.p`
  font-size: ${props => (props.primary ? "2.2rem" : "1.6rem")};
  font-weight: ${props => (props.primary ? "700" : "100")};
  margin-top: 0;
  margin-bottom: ${props => (props.primary ? "0" : "0")};
`;

const Button = styled.button`
  margin-top: 2%;
  padding: 1% 2%;
  font-size: 1.6rem;
  background: white;
  color: #112a62;
  border: 1px solid #112a62;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  &:active {
    border: 2px solid #112a62;
  }
  a {
    color: #112a62;
  }
  @media (max-width: 850px) {
    padding: 2% 3%;
  }
`;

const Box = styled.div`
  display: grid;
  border: 1px solid #edefed;
  border-radius: 5px;
  width: 90%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 35px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-top: 20px;
  padding: 0.5%;
  div {
    padding-left: 15px;
  }
  .div1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .div2 {
    grid-area: 1 / 2 / 2 / 3;
    border-left: 1px solid #edefed;
  }
  .div3 {
    grid-area: 1 / 3 / 2 / 4;
    border-left: 1px solid #edefed;
  }
  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 5%;
    div {
      padding: 8px 15px;
    }
    .div2 {
      border-left: 1px solid white;
      border-top: 1px solid #edefed;
    }
    .div3 {
      border-left: 1px solid white;
      border-top: 1px solid #edefed;
    }
  }
`;

const PaymentBox = styled.div`
  border: 1px solid #edefed;
  width: 25%;
  padding: 2%;
  margin-top: 2%;
  border-radius: 5px;
  @media (max-width: 850px) {
    width: 95%;
  }
`;

class Uni extends Component {
  state = {
    pay: false
  };

  pay = () => {
    this.setState({ pay: true });
  };
  render() {
    const { me } = this.props;
    let price;
    if (me.uni.paidMonths == null) {
      price = 0;
    } else {
      price = me.uni.paidMonths;
    }
    console.log(me);
    return (
      <UniInfo>
        <Title primary>Кабинет преподавателя</Title>
        <Title>{me.name}</Title>
        <Box>
          <div className="div1"> {me.uni.title}</div>
          <div className="div2">Лимит новых курсов: {me.uni.capacity}</div>
          <div className="div3">Оплачено месяцев: {price}</div>
        </Box>

        <Button onClick={this.pay}>
          <a>Пополнить</a>
        </Button>

        {this.state.pay && (
          <PaymentBox>
            <div>Информация об оплате</div>
          </PaymentBox>
        )}
      </UniInfo>
    );
  }
}

export default Uni;
