import React from "react";
import ClientData from "../components/ClientData";
import { useQuery, gql } from "@apollo/client";
import { useUser } from "../components/User";

const CLIENTS_QUERY = gql`
  query CLIENTS_QUERY {
    businessClients {
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
      communication_history {
        messages {
          id
          subject
          message
          date
        }
      }
      sales_cycle
      createdAt
    }
  }
`;

const client_data = () => {
  const { loading, error, data } = useQuery(CLIENTS_QUERY);
  const me = useUser();

  if (loading) return <p>Loading...</p>;
  let initial_clients = data.businessClients;
  return (
    <>
      {me && me.permissions.includes("ADMIN") && (
        <ClientData initial_clients={initial_clients} />
      )}
    </>
  );
};

export default client_data;
