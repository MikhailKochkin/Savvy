import { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { useTranslation } from "next-i18next";

import { CURRENT_USER_QUERY } from "../../User";
import Router from "next/router";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $surname: String!
    $password: String!
    $isFamiliar: Boolean!
    $status: Status!
    $company: String
    $uniID: String
    $careerTrackID: String
  ) {
    signup(
      email: $email
      name: $name
      surname: $surname
      password: $password
      isFamiliar: $isFamiliar
      status: $status
      company: $company
      uniID: $uniID
      careerTrackID: $careerTrackID
    ) {
      token
      user {
        id
      }
    }
  }
`;

const Styles = styled.div`
  min-height: 80vh;
  padding: 60px 0;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    height: 100%;
  }
`;

const Container = styled.div`
  height: 85%;
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .picture {
    width: 30%;
    height: 100%;
    div {
      margin-top: 20%;
      height: 150px;
      img {
        height: 100%;
      }
    }
  }
  .text {
    width: 55%;
    height: 100%;
    .hello {
      font-weight: bold;
      font-size: 3rem;
    }
    .message {
      font-size: 1.9rem;
      span {
        background: #fce969;
        transform: skew(-8deg);
      }
    }
    form {
      display: flex;
      flex-direction: column;
      input {
        height: 50%;
        width: 70%;
        margin: 1% 0;
        font-family: Montserrat;
        border: 1px solid #e5e5e5;
        border-radius: 3.5px;
        padding: 2%;
        font-size: 1.6rem;
        outline: 0;
      }
    }
    button {
      margin: 2% 0;
      height: 50px;
      width: 70%;
      font-size: 1.8rem;
      background: none;
      border: 2px solid black;
      font-family: Montserrat;
      font-weight: bold;
      border-radius: 5px;
      outline: 0;
      cursor: pointer;
      transition: all 0.6s;
      &:hover {
        background: black;
        color: white;
      }
    }
    div {
      height: 100px;
      img {
        margin-left: 40%;
        height: 100%;
      }
    }
  }
  @media (max-width: 800px) {
    height: auto;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10%;
    .picture {
      width: 85%;
    }

    .text {
      width: 85%;
      div {
        display: none;
      }
      form {
        width: 100%;
        input {
          width: 100%;
          margin: 5px 0;
        }
        button {
          width: 100%;
          margin-top: 15px;
        }
      }
    }
  }
`;

const hello = (props) => {
  const [name, setName] = useState(props.name);
  const [surname, setSurname] = useState(props.surname);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(props.email);
  const { t } = useTranslation("hello");

  useEffect(() => {
    var my_element = document.getElementById("initial");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [0]);

  const [signup, { data, loading }] = useMutation(SIGNUP_MUTATION, {
    refetchQueries: [CURRENT_USER_QUERY],
  });

  const { me } = props;
  return (
    <Styles>
      <Container id="initial">
        <div className="picture">
          <div>
            <img src="../../static/hello.svg" />
          </div>
        </div>
        <div className="text">
          <h1 className="hello">Мы получили вашу заявку!</h1>
          <p className="message">
            Начните проходить первый урок бесплатно прямо сейчас.
          </p>
          <p className="message">
            А если вы пройдете бесплатный вводный урок до конца (это займет
            15-20 минут),{" "}
            <span>
              то мы сделаем вам специальное предложение по этому курсу со
              скидкой 40%.
            </span>{" "}
          </p>
          {!me && (
            <>
              <p className="message">
                Для доступа к уроку вам надо просто создать аккаунт, добавив
                пароль ниже.
              </p>
              <form>
                <input
                  id="name"
                  className="data"
                  type="name"
                  placeholder="Имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  id="name"
                  className="surname"
                  type="text"
                  name="surname"
                  placeholder="Фамилия"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
                <input
                  className="email"
                  type="email"
                  name="email"
                  placeholder="Почта"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Электронная почта"
                />
                <input
                  className="password"
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Пароль"
                />

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // Router.push({
                    //   pathname: "/lesson",
                    //   query: {
                    //     id: "ck0pdmvvo00sw0704utlt1p83",
                    //     type: "story",
                    //   },
                    // });
                    const finish = signup({
                      variables: {
                        name: name,
                        surname: surname,
                        password: password,
                        email: email,
                        status: "LAWYER",
                        uniID: "ckhxpu4sj0000k8rkthw1no3o",
                        company: "ckhxpvj4b0040k8rkag97bkza",
                        careerTrackID: "ckhxpur6r0017k8rkw0qp2rp2",
                        isFamiliar: true,
                      },
                    });
                  }}
                >
                  {loading ? "Создаем..." : "Создать аккаунт"}
                </button>
              </form>

              {/* <a
                href="https://calendly.com/mikhail-from-besavvy/30min"
                target="_blank"
              >
                <button>Назначить встречу</button>
              </a> */}
            </>
          )}
          {me && (
            <button
              onClick={(e) => {
                e.preventDefault();
                Router.push({
                  pathname: "/lesson",
                  query: {
                    id: "ckmxdsbmu15582mgrk04c07ztr",
                    type: "story",
                    add: "offer",
                  },
                });
              }}
            >
              Начать Урок 1
            </button>
          )}
          {/* <p className="message">
            Если есть какие-то вопросы, задайте вопрос в чат.
          </p>
          <div>
            <img src="../../static/arrow.svg" />
          </div> */}
        </div>
      </Container>
    </Styles>
  );
};

export default hello;
