import React from "react";
import ClientData from "../components/ClientData";
import { useQuery, gql } from "@apollo/client";

const CLIENTS_QUERY = gql`
  query CLIENTS_QUERY {
    businessClients(orderBy: { createdAt: desc }) {
      id
      name
      email
      number
      tags
      createdAt
      type
      comment
      communication_medium
    }
  }
`;

const clientdata = () => {
  // const { loading, error, data } = useQuery(CLIENTS_QUERY);
  // if (loading) return <p>Loading...</p>;
  // let initial_clients = data.businessClients;
  // return <ClientData initial_clients={initial_clients} />;
  return <div>Hello World</div>;
};

export default clientdata;
