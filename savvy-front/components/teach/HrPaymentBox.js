import React, { Component } from "react";
import styled from "styled-components";
import TakeMyMoney from "../TakeMyMoney";

const PaymentBox = styled.div`
  border: 1px solid #edefed;
  width: 25%;
  padding: 2%;
  margin-top: 2%;
  border-radius: 5px;
  font-size: 1.6rem;
  .text {
    margin-top: 4%;
    padding-bottom: 4%;
    border-bottom: 1px solid #edefed;
  }
  .header {
    font-size: 1.8rem;
  }
  @media (max-width: 850px) {
    width: 95%;
  }
`;

class HrPaymentBox extends Component {
  render() {
    const { me } = this.props;
    return (
      <PaymentBox>
        <div className="header">Информация об оплате</div>
        <div className="text">Оплатите подписку на ещё один месяц: 1000₽</div>
        <TakeMyMoney
          coursePage={"coursePage"}
          coursePageID={"ck2ez6cr606ss0785ll2w9cwy"}
          name={me.name}
          user={me.id}
          price={1000}
        >
          Оплатить
        </TakeMyMoney>
      </PaymentBox>
    );
  }
}

export default HrPaymentBox;
