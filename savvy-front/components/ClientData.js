import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Client from "./Client";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  background: #f3f4f5;
  .total {
    width: 90%;
    margin: 20px 0;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    padding: 3%;
  }
`;

const Tag = styled.div`
  border: 1px solid blue;
  cursor: pointer;
  color: blue;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: center;
  align-items: center;
  transition: ease-in 0.2s;
  &:hover {
    border: 2px solid blue;
  }
`;

const Row = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: left;
  padding: 5px 0;
  background: #fff;
  border: 1px solid #eff0f1;
  border-top: 1px solid #fff;
  .index {
    width: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .time {
    width: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .name {
    width: 15%;
  }
  .email {
    width: 20%;
  }
  .number {
    width: 10%;
  }
  .comment {
    width: 45%;
    .editor {
      font-size: 1.6rem;
      width: 95%;
      margin-left: 5%;
      border: 1px solid #c4c4c4;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      outline: 0;
      padding: 0.5%;
      font-size: 1.6rem;
      @media (max-width: 800px) {
        width: 350px;
      }
    }
    button {
      margin-left: 5%;
      margin-bottom: 5%;
    }
    textarea {
      font-family: Montserrat;
      padding: 0 5%;
      margin: 0 5%;
      border: none;
      width: 90%;
      height: 100px;
      white-space: pre-line;
    }
    .editor {
    }
  }
  .tags {
    padding-left: 20px;
    li {
      width: 100%;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    padding: 3%;
  }
`;

const ClientData = (props) => {
  const [clients, setClients] = useState(props.initial_clients);
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState(0); // integer state

  const sort = (val) => {
    const new_clients = clients.filter((c) => c.tags.includes(val));
    setClients(new_clients);
  };

  const chooseDate = (d) => {
    let clients_in_range = props.initial_clients.filter((cl) => {
      let client_date = new Date(cl.createdAt);
      let chosendate = new Date(d);
      let week_before_date = new Date(d);

      week_before_date.setDate(chosendate.getDate() - 7);

      if (
        client_date.getTime() > week_before_date.getTime() &&
        client_date.getTime() < chosendate.getTime()
      ) {
        return cl;
      }
    });
    setClients(clients_in_range);
  };

  let clients_in_range = clients.filter((cl) => {
    let client_date = new Date(cl.createdAt);
    let chosendate = new Date(startDate);
    let week_before_date = new Date(startDate);

    week_before_date.setDate(chosendate.getDate() - 7);

    if (
      client_date.getTime() > week_before_date.getTime() &&
      client_date.getTime() < chosendate.getTime()
    ) {
      return cl;
    }
  });

  return (
    <Styles>
      <div className="total">Всего заявок: {props.initial_clients.length}</div>
      <button onClick={(e) => setClients(props.initial_clients)}>
        Показать всех клиентов
      </button>
      <div className="total">
        Заявок за выбранный период: {clients_in_range.length}
      </div>
      <button onClick={(e) => setValue((value) => value + 1)}>
        Обновить данные
      </button>
      <DatePicker
        selected={startDate}
        dateFormat="dd/MM/yyyy"
        onChange={(date) => {
          setStartDate(date);
          return chooseDate(date);
        }}
      />
      {clients.map((c, i) => (
        <Client
          sort={sort}
          key={i}
          index={i}
          id={c.id}
          name={c.name}
          email={c.email}
          comment={c.comment}
          tags={c.tags}
          number={c.number}
          createdAt={c.createdAt}
          url={c.type}
          communication_medium={c.communication_medium}
        />
      ))}
    </Styles>
  );
};

export default ClientData;
