import React from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";

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
    width: 25%;
  }
  .number {
    width: 10%;
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

const CLIENTS_QUERY = gql`
  query CLIENTS_QUERY {
    businessClients(orderBy: { createdAt: desc }) {
      id
      name
      email
      number
      createdAt
      type
    }
  }
`;

const Client = (props) => {
  moment.locale("ru");
  var url = new URL("https://besavvy.app" + props.url);
  var utm_source = url.searchParams.get("utm_source");
  var utm_medium = url.searchParams.get("utm_medium");
  var utm_campaign = url.searchParams.get("utm_campaign");
  var utm_term = url.searchParams.get("utm_term");

  var id = url.searchParams.get("id");
  return (
    <Row>
      <div className="index">{props.index + 1}.</div>
      <div className="time">
        {" "}
        {moment(props.createdAt).format("DD-MM-YYYY HH:mm")}
      </div>
      <div className="name">{props.name}</div>
      <div className="email">{props.email}</div>
      <div className="number">{props.number}</div>
      <div className="tags">
        <li>pathname: {url.pathname}</li>
        <li>id: {id}</li>
        <li>utm_source: {utm_source}</li>
        <li>utm_medium: {utm_medium}</li>
        <li>utm_campaign: {utm_campaign}</li>
        <li>utm_term: {utm_term}</li>
      </div>
    </Row>
  );
};

const ClientData = () => {
  const { loading, error, data } = useQuery(CLIENTS_QUERY);
  if (loading) return <p>Загрузка...</p>;
  let clients = data.businessClients;

  return (
    <Styles>
      <div className="total">Всего заявок: {clients.length}</div>
      {clients.map((c, i) => (
        <Client
          key={i}
          index={i}
          name={c.name}
          email={c.email}
          number={c.number}
          createdAt={c.createdAt}
          url={c.type}
        />
      ))}
    </Styles>
  );
};

export default ClientData;
