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
      subscriptions {
        id
        isActive
        type
        term
        startDate
        paymentID
        renewals
        endDate
        createdAt
        updatedAt
      }
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
        paymentID
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

const CLIENTS_EMAIL_QUERY = gql`
  query CLIENTS_EMAIL_QUERY($email: String!) {
    users(where: { email: { equals: $email } }) {
      id
      name
      surname
      country
      comment
      email
      number
      tags
      subscriptions {
        id
        isActive
        type
        startDate
        paymentID
        renewals
        endDate
        createdAt
        updatedAt
      }
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
        paymentID
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

const CLIENTS_TAGS_QUERY = gql`
  query CLIENTS_TAGS_QUERY($tag: [String!]!) {
    users(where: { tags: { hasSome: $tag } }) {
      id
      name
      surname
      country
      comment
      email
      number
      tags
      subscriptions {
        id
        isActive
        type
        startDate
        paymentID
        renewals
        endDate
        createdAt
        updatedAt
      }
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
        paymentID
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
  const [email, setEmail] = useState("");
  const [tag, setTag] = useState("");
  const [getUserData, { loading, error, data }] = useLazyQuery(CLIENTS_QUERY);

  const [getUserData2, { loading: loading2, error: error2, data: data2 }] =
    useLazyQuery(CLIENTS_EMAIL_QUERY);

  const [getUserData3, { loading: loading3, error: error3, data: data3 }] =
    useLazyQuery(CLIENTS_TAGS_QUERY);

  const handleButtonClick = () => {
    getUserData({
      variables: {
        initialDate: `${initialDate}:00.000Z`,
        lastDate: `${lastDate}:00.000Z`,
      },
    });
  };

  const handleButtonClick2 = () => {
    getUserData2({
      variables: {
        email: email.toLowerCase(),
      },
    });
  };

  const handleButtonClick3 = () => {
    getUserData3({
      variables: {
        tag: [tag.toLowerCase()],
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

  let initialClients = data
    ? data.users
    : data2
    ? data2.users
    : data3
    ? data3.users
    : [];

  console.log("data3.users", data3);
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

      <div>
        <label htmlFor="lastDate">By Email</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleButtonClick2}>Load Users By Email</button>
      <div>
        <label htmlFor="lastDate">By Tag</label>
        <input
          id="email"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>
      <button onClick={handleButtonClick3}>Load Users By Tag</button>

      {loading ? "Грузимся..." : ""}
      {initialClients && initialClients.length > 0 && (
        <UserData initial_clients={initialClients} />
      )}
    </div>
  );
};

export default ClientData;
