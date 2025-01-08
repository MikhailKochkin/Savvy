import React, { useState } from "react";
import UserData from "../components/UserData";
import { useLazyQuery, useQuery, gql } from "@apollo/client";
// import NewUserCreate from "../components/NewUserCreate";
import { useUser } from "../components/User";

const CLIENTS_QUERY = gql`
  query CLIENTS_QUERY($initialDate: DateTime!, $lastDate: DateTime!) {
    users(initialDate: $initialDate, lastDate: $lastDate) {
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
        renewals {
          date
          type
          price
        }
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
      # traffic_sources
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
    users(email: $email) {
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
        renewals {
          date
          type
          price
        }
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
      # traffic_sources
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
  query CLIENTS_TAGS_QUERY {
    subscribers {
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
        renewals {
          date
          type
          price
        }
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
      # traffic_sources
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

const CLIENTS_ACTIVE_QUERY = gql`
  query CLIENTS_ACTIVE_QUERY($date: DateTime!) {
    users(activeDate: $date) {
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
        renewals {
          date
          type
          price
        }
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
      # traffic_sources
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

const ACTIVE_COURSES_QUERY = gql`
  query ACTIVE_COURSES_QUERY {
    coursePages(published: true) {
      id
      title
    }
  }
`;

const ClientData = () => {
  const [initialDate, setInitialDate] = useState("2024-01-01T14:16:28.154Z");
  const [lastDate, setLastDate] = useState("2024-05-01T14:16:28.154Z");
  const [email, setEmail] = useState("");
  const [getUserData, { loading, error, data }] = useLazyQuery(CLIENTS_QUERY);
  const [users, setUsers] = useState([]);

  const me = useUser();

  const [getUserData2, { loading: loading2, error: error2, data: data2 }] =
    useLazyQuery(CLIENTS_EMAIL_QUERY);

  const [getUserData3, { loading: loading3, error: error3, data: data3 }] =
    useLazyQuery(CLIENTS_TAGS_QUERY);

  const [getUserData4, { loading: loading4, error: error4, data: data4 }] =
    useLazyQuery(CLIENTS_ACTIVE_QUERY);

  const {
    loading: loading5,
    error: error5,
    data: data5,
  } = useQuery(ACTIVE_COURSES_QUERY);

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
    getUserData3();
  };

  const handleButtonClick4 = () => {
    if (initialDate.length > 17) {
      alert("Please select a valid date");
      return;
    } else {
      getUserData4({
        variables: {
          date: `${initialDate}:00.000Z`,
        },
      });
    }
  };

  const handleInitialDateChange = (e) => {
    setInitialDate(e.target.value);
  };

  const handleLastDateChange = (e) => {
    setLastDate(e.target.value);
  };

  const sortClientsByActivity = (clients) => {
    let sorted_clients = [...clients].sort((a, b) => {
      // Get the updatedAt property of the latest lessonResult for client A
      const latestUpdatedAtA = a.lessonResults.reduce(
        (latest, lessonResult) => {
          const updatedAt = new Date(lessonResult.updatedAt).getTime();
          return updatedAt > latest ? updatedAt : latest;
        },
        0
      );

      // Get the updatedAt property of the latest lessonResult for client B
      const latestUpdatedAtB = b.lessonResults.reduce(
        (latest, lessonResult) => {
          const updatedAt = new Date(lessonResult.updatedAt).getTime();
          return updatedAt > latest ? updatedAt : latest;
        },
        0
      );

      // Compare the latest updatedAt properties of clients A and B
      return latestUpdatedAtB - latestUpdatedAtA;
    });
    return sorted_clients;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>; // Handle error here
  let initialClients = data
    ? data.users
    : data2
    ? data2.users
    : data3
    ? data3.subscribers
    : data4
    ? sortClientsByActivity(data4.users)
    : [];

  return (
    <>
      {me && me.permissions.includes("ADMIN") && (
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
          <br />
          {/* <div>
        <label htmlFor="lastDate">By Tag</label>
        <input
          id="email"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div> */}
          <button onClick={handleButtonClick3}>
            Load Users with Subscriptions
          </button>
          <br />
          <button onClick={handleButtonClick4}>Load Active users</button>

          {/* <NewUserCreate users={users} /> */}

          {loading || loading2 || loading3 || loading4 ? "Грузимся..." : ""}
          {initialClients && initialClients.length > 0 && (
            <UserData
              initial_clients={initialClients}
              coursePages={data5?.coursePages}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ClientData;
