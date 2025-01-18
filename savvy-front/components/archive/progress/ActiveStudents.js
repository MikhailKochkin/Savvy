import { useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import StudentData from "./StudentData";
const USERS_QUERY = gql`
  query USERS_QUERY {
    users(where: { active: { equals: true } }) {
      id
      name
      surname
      email
      number
      createdAt
      updatedAt
      new_subjects {
        id
        title
      }
      ratings {
        id
        rating
        forum {
          lesson {
            id
          }
        }
      }
      lessonResults {
        id
        createdAt
        updatedAt
        progress
        lesson {
          id
          name
          structure
        }
      }
      courseVisits {
        id
        coursePage {
          id
          title
        }
      }
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($email: String!, $active: Boolean!) {
    updateActiveUser(email: $email, active: $active) {
      id
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION($userId: String!, $text: String!) {
    sendMessage(userId: $userId, text: $text) {
      id
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .student {
    border-bottom: 1px solid #cecece;
    margin-bottom: 40px;
    padding-bottom: 20px;
  }

  .email {
    margin-top: 50px;
    border-top: 2px solid #cecece;
    padding-top: 20px;
  }
  textarea {
    width: 500px;
    height: 120px;
    font-family: Montserrat;
    border: 2px solid #cecece;
    border-radius: 5px;
    font-weight: 500;
    background: none;
    margin-top: 20px;
    font-size: 1.6rem;
  }
  input {
    width: 100%;
    padding: 3% 2%;
    font-family: Montserrat;
    border: 2px solid #cecece;
    border-radius: 5px;
    font-weight: 500;
    background: none;
    margin-bottom: 20px;
    outline: 0;
    cursor: pointer;
    font-size: 1.6rem;
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #a0a0a0;
      opacity: 1; /* Firefox */
    }
  }
`;

const Editor = styled.div`
  font-size: 1.6rem;
  width: 75%;
  border: 1px solid #c4c4c4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: 0;
  padding: 0.5%;
  font-size: 1.6rem;
  margin: 15px 0;
  @media (max-width: 800px) {
    width: 350px;
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const ActiveStudents = () => {
  const [email, setEmail] = useState();
  const [text, setText] = useState();
  const [showStudents, setShowStudents] = useState(false);

  const { loading: loading, error: error, data: data } = useQuery(USERS_QUERY);
  const [updateActiveUser, { data: data3, loading: loading3, error: error3 }] =
    useMutation(UPDATE_USER_MUTATION);

  const [sendMessage, { data: data1, loading: loading1, error: error1 }] =
    useMutation(SEND_MESSAGE_MUTATION);

  const myCallback = (dataFromChild) => {
    setText(dataFromChild);
  };

  let students = [];

  if (data) {
    students = data.users;
  }

  if (loading) return <p>Loading active users...</p>;
  // console.log(
  //   "students",
  //   students.filter((s) => s.tags.includes("Адвокатский_экзамен"))
  // );

  return (
    <Styles>
      <div>
        <button onClick={(e) => setShowStudents(!showStudents)}>
          {showStudents ? "Hide Active Students" : "Show Active Students"}
        </button>
        {showStudents &&
          students.map((s, i) => {
            let results = s.lessonResults;
            let courseVisits = s.courseVisits;
            return (
              <div className="student">
                <div>
                  {i + 1}.{" "}
                  <b>
                    {s.name} {s.surname}
                  </b>{" "}
                  – Последняя активность: {dayjs(s.updatedAt).format("LLL")}
                </div>
                <div>
                  {s.number && (
                    <button>
                      <a target="_blank" href={`https://t.me/${s.number}`}>
                        Написать в Telegram
                      </a>
                    </button>
                  )}
                  {s.number && (
                    <button>
                      <a
                        target="_blank"
                        href={`https://wa.me/${s.number}?text=Добрый!`}
                      >
                        Написать в WhatsApp
                      </a>
                    </button>
                  )}
                  <Editor className="editor">
                    <DynamicLoadedEditor
                      getEditorText={myCallback}
                      value={""}
                      name="text"
                    />
                  </Editor>
                  <button
                    onClick={async (e) => {
                      const res = await sendMessage({
                        variables: {
                          userId: s.id,
                          text: text,
                        },
                      });
                    }}
                  >
                    Send
                  </button>
                </div>
                <StudentData
                  s={s}
                  results={results}
                  courseVisits={courseVisits}
                />
              </div>
            );
          })}
      </div>
      <div className="email">
        <input
          className="second"
          type="text"
          placeholder={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            updateActiveUser({
              variables: {
                email: email,
                active: true,
              },
            });
          }}
        >
          Add active student
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            updateActiveUser({
              variables: {
                email: email,
                active: false,
              },
            });
          }}
        >
          Remove active student
        </button>
      </div>
    </Styles>
  );
};

export default ActiveStudents;
