import React, { useState } from "react";
import UserData from "../components/UserData";
import { useLazyQuery, gql } from "@apollo/client";

const CLIENTS_QUERY = gql`
  query CLIENTS_QUERY($initialDate: DateTime!, $lastDate: DateTime!) {
    users(
      where: { createdAt: { gte: $initialDate, lte: $lastDate } }
      orderBy: { createdAt: desc }
    ) {
      id
      name
      surname
      country
      comment
      email
      number
      tags
      challengeResults {
        id
        wrong
        correct
        createdAt
        lesson {
          id
          name
          coursePage {
            id
            title
          }
        }
      }
      lessonResults {
        id
        progress
        createdAt
        updatedAt
        lesson {
          id
          name
          coursePage {
            id
          }
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
        subject
        createdAt
      }
    }
  }
`;

const ClientData = () => {
  const [initialDate, setInitialDate] = useState("2024-01-01T14:16:28.154Z");
  const [lastDate, setLastDate] = useState("2024-05-01T14:16:28.154Z");
  const [getUserData, { loading, error, data }] = useLazyQuery(CLIENTS_QUERY);

  const handleButtonClick = () => {
    getUserData({
      variables: {
        initialDate: `${initialDate}:00.000Z`,
        lastDate: `${lastDate}:00.000Z`,
      },
    });
  };

  const handleInitialDateChange = (e) => {
    setInitialDate(e.target.value);
  };

  const handleLastDateChange = (e) => {
    setLastDate(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>; // Handle error here

  let initialClients = data ? data.users : [];
  return (
    <div>
      <div>
        <label htmlFor="initialDate">Initial Date:</label>
        <input
          type="datetime-local"
          id="initialDate"
          value={initialDate}
          onChange={handleInitialDateChange}
          key={initialDate} // Add key prop
        />
      </div>
      <div>
        <label htmlFor="lastDate">Last Date:</label>
        <input
          type="datetime-local"
          id="lastDate"
          value={lastDate}
          onChange={handleLastDateChange}
        />
      </div>
      <button onClick={handleButtonClick}>Load Data</button>
      {loading ? "Грузимся..." : ""}
      {initialClients && initialClients.length > 0 && (
        <UserData initial_clients={initialClients} />
      )}
    </div>
  );
};

export default ClientData;
