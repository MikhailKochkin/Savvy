import React from "react";
import UserData from "../components/UserData";
import { useQuery, gql } from "@apollo/client";

const CLIENTS_QUERY = gql`
  query CLIENTS_QUERY {
    users(orderBy: { createdAt: desc }) {
      id
      name
      surname
      country
      comment
      email
      number
      tags
      emailReminders {
        id
        emailCampaign {
          id
          name
        }
        coursePage {
          id
          title
        }
        createdAt
      }
      lessonResults {
        id
        progress
        createdAt
        lesson {
          id
          name
        }
      }
      new_subjects {
        id
        title
      }
      orders {
        id
        price
        coursePage {
          id
          title
        }
        isPaid
        createdAt
      }
      traffic_sources
      createdAt
      updatedAt
      messages {
        id
        text
        createdAt
      }
    }
  }
`;

const client_data = () => {
  const { loading, error, data } = useQuery(CLIENTS_QUERY);
  if (loading) return <p>Loading...</p>;
  let initial_clients = data.users;
  return <UserData initial_clients={initial_clients} />;
};

export default client_data;
