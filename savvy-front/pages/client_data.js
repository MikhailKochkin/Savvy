import React from "react";
import ClientData from "../components/ClientData";
import { useQuery, gql } from "@apollo/client";

const CLIENTS_QUERY = gql`
  query CLIENTS_QUERY {
    businessClients(orderBy: { createdAt: desc }) {
      id
      name
      surname
      country
      source
      email
      number
      tags
      type
      comment
      communication_medium
      communication_history
      sales_cycle
      createdAt
    }
  }
`;

const client_data = () => {
  const { loading, error, data } = useQuery(CLIENTS_QUERY);
  if (loading) return <p>Loading...</p>;
  let initial_clients = data.businessClients;
  return <ClientData initial_clients={initial_clients} />;
};

export default client_data;
