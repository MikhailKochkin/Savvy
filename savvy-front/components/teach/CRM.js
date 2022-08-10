import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";
import dynamic from "next/dynamic";
import UserRow from "./UserRow";

const AUTHORS_QUERY = gql`
  query AUTHORS_QUERY {
    users(where: { status: { equals: "AUTHOR" } }) {
      id
      email
      name
      surname
      comment
      number
      createdAt
      coursePages {
        id
        title
      }
      co_coursePages {
        id
        title
      }
    }
  }
`;

const LAST_WEEK_USERS_QUERY = gql`
  query LAST_WEEK_USERS_QUERY {
    users(where: { createdAt: { gte: "2022-07-28T20:16:18.125Z" } }) {
      id
      email
      name
      surname
      comment
      createdAt
      coursePages {
        id
        title
      }
      co_coursePages {
        id
        title
      }
    }
  }
`;

const Styles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 20px 0;
`;

const CRM = () => {
  const [page, setPage] = useState("AUTHORS");
  const subtractDays = (numOfDays, date = new Date()) => {
    date.setDate(date.getDate() - numOfDays);
    return date;
  };
  const { loading, error, data } = useQuery(AUTHORS_QUERY);
  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(LAST_WEEK_USERS_QUERY, {
    variables: {
      date: subtractDays(7).toISOString(),
    },
  });
  console.log("new Date(now()).getTime()", subtractDays(7).toISOString());
  if (loading) return <p>Loading 1...</p>;
  if (loading2) return <p>Loading 2...</p>;

  const authors = data.users;
  const new_users = data2.users;

  return (
    <Styles>
      <Container>
        <select
          name="page"
          defaultValue={page}
          onChange={(e) => setPage(e.target.value)}
        >
          <option value={"AUTHORS"}>Авторы</option>
          <option value={"NEW_STUDENTS"}>Новые студенты</option>
        </select>
        {page == "NEW_STUDENTS" &&
          [...new_users]
            .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
            .map((c, i) => (
              <UserRow
                author={c}
                index={i}
                //   sort={sort}
                //   key={i}
                //   index={i}
                //   id={c.id}
                //   name={c.name}
                //   email={c.email}
                //   comment={c.comment}
                //   tags={c.tags}
                //   number={c.number}
                //   createdAt={c.createdAt}
                //   url={c.type}
                //   communication_medium={c.communication_medium}
              />
            ))}
        {page == "AUTHORS" &&
          [...authors]
            .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
            .map((c, i) => (
              <UserRow
                author={c}
                index={i}
                //   sort={sort}
                //   key={i}
                //   index={i}
                //   id={c.id}
                //   name={c.name}
                //   email={c.email}
                //   comment={c.comment}
                //   tags={c.tags}
                //   number={c.number}
                //   createdAt={c.createdAt}
                //   url={c.type}
                //   communication_medium={c.communication_medium}
              />
            ))}
      </Container>
    </Styles>
  );
};

export default CRM;
