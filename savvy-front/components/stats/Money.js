import { useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";

const Styles = styled.div`
  border: 2px solid #edefed;
  margin: 3% 0;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding: 20px;
`;

const Money = (props) => {
  const { orders } = props;
  const dates = [
    "July 1, 2022 00:00:00",
    "August 1, 2022 00:00:00",
    "September 1, 2022 00:00:00",
    "October 1, 2022 00:00:00",
    "November 1, 2022 00:00:00",
    "December 1, 2022 00:00:00",
    "January 1, 2023 00:00:00",
    "February 1, 2023 00:00:00",
    "March 1, 2023 00:00:00",
    "April 1, 2023 00:00:00",
    "May 1, 2023 00:00:00",
    "June 1, 2023 00:00:00",
  ];

  let chooseDate = (date) => {
    let i;
    for (i = 0; i < dates.length; i++) {
      if (date.diff(dates[i], "minutes") > 0) {
        return dates[i];
      }
    }
  };

  let prev_date = chooseDate(moment());

  let sorted_orders = orders.filter((o) => {
    let order_date = new Date(o.updatedAt);
    let start_date = new Date(prev_date);
    return start_date.getTime() < order_date.getTime();
  });

  let paid_sorted_orders = sorted_orders.filter((o) => {
    return o.isPaid == true && o.price !== null;
  });
  console.log("paid_sorted_orders", paid_sorted_orders);

  //   let total_money = paid_sorted_orders.reduce((a, b) =>
  //     console.log("ab", a, b.price)
  //   );
  var total_money = paid_sorted_orders.reduce(function (acc, obj) {
    return acc + obj.price;
  }, 0);

  var money_to_authors = paid_sorted_orders.reduce(function (acc, obj) {
    return acc + obj.price * 0.5;
  }, 0);
  console.log("money_to_authors", money_to_authors);
  return (
    <Styles>
      <div>Выплаты от {moment(prev_date).format("LLL")}</div>
      <div>
        Общий заработок по курсу: {total_money} ₽ – {total_money * 0.1} ₽{" "}
        сервисного сбора
      </div>
      <div>Доход автора: {money_to_authors * 0.9} ₽</div>
      <div>Число платежей: {paid_sorted_orders.length} </div>
      <div>Средний чек: {total_money / paid_sorted_orders.length} ₽</div>
    </Styles>
  );
};

export default Money;
