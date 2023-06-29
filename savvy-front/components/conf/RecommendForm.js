import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import * as EmailValidator from "email-validator";
import { useRouter } from "next/router";

const CREATE_CLIENT = gql`
  mutation createBusinessClient(
    $email: String!
    $name: String!
    $surname: String!
    $number: String!
    $type: String! # $communication_medium: String!
  ) {
    createBusinessClient(
      email: $email
      name: $name
      surname: $surname
      number: $number
      type: $type #   communication_medium: $communication_medium
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  width: 60%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
  h2 {
    font-size: 3.6rem;
    font-weight: 700;
    margin: 20px 0;
    line-height: 1.2;
    text-align: center;
    background: -webkit-linear-gradient(90.69deg, #1a75ff, #ff4ecd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0px;
  }
  #explainer {
    width: 80%;
    color: #7d7d7d;
    text-align: center;
    font-weight: 600;
    line-height: 1.2;
    margin: 20px 0;
    a {
      color: #fff;
      transition: 0.5s ease;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  #explainer2 {
    width: 80%;
    color: #7d7d7d;
    font-size: 1.8rem;
    text-align: center;
    font-weight: 600;
    line-height: 1.2;
    margin: 20px 0;
    a {
      color: #fff;
      transition: 0.5s ease;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  button {
    width: 100%;
    padding: 2%;
    font-family: Montserrat;
    border: none;
    background: #fff;
    color: #000000;
    border-radius: 5px;
    margin-bottom: 10px;
    outline: 0;
    cursor: pointer;
    font-size: 1.8rem;
    transition: ease-in 0.2s;
    &:hover {
      background-color: #4072f9;
    }
  }
  input {
    width: 100%;
    background: #222222;
    border: 2px solid #5b5b5b;
    border-radius: 15px;
    color: #fff;
    padding: 4% 5%;
    font-family: Montserrat;
    margin-bottom: 20px;
    outline: 0;
    cursor: pointer;
    font-size: 1.4rem;
    &:active {
      background: #222222;
    }
  }
  form {
    width: 80%;
    .names {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      #name {
        margin-right: 10px;
      }
    }
  }
  #legal {
    width: 80%;
    font-size: 1.3rem;
    line-height: 1.5;
    a {
      text-decoration: underline;
      color: #fff;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
    #explainer {
      font-size: 1.9rem;
      width: 90%;
    }
    #explainer2 {
      font-size: 2rem;
      width: 90%;
    }
    h2 {
      font-size: 3.6rem;
      width: 90%;
      line-height: 1.1;
    }
    button {
      font-size: 1.8rem;
      height: 45px;
    }
  }
`;
const Form = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState();
  const [clientId, setClientId] = useState();
  const [isRegistered, setIsRegistered] = useState(false);

  const [createBusinessClient, { data, loading, error }] =
    useMutation(CREATE_CLIENT);
  const { asPath } = useRouter();

  let password = uuidv4();
  return (
    <Styles id="signup_form">
      <h2>
        {!isRegistered
          ? `Получите бесплатный доступ к курсу "Legal English. Тренажер для собеседований"`
          : "Спасибо за регистрацию"}
      </h2>
      {!isRegistered && (
        <div id="explainer">
          Для этого зарегистрируйтесь сами и пригласите 2 своих друзей. После
          этого сразу откроем курс. Детали курса можно посмотреть{" "}
          <a
            href="https://besavvy.app/ru/coursePage?id=cktrbubdl2237dou9vzn1gb3w
"
            target="_blank"
          >
            здесь
          </a>
          .
        </div>
      )}
      {!isRegistered && (
        <form>
          <div className="names">
            <input
              className="data"
              id="name"
              placeholder="Имя"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="data"
              id="surname"
              placeholder="Фамилия"
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <input
            id="tel"
            type="tel"
            placeholder="+7 (999) 999-99-99"
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            id="email"
            type="email"
            placeholder="Электронная почта"
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isRegistered && (
            <button
              type="submit"
              id="community_application_button"
              onClick={async (e) => {
                e.preventDefault();

                if (!EmailValidator.validate(email)) {
                  alert("Неправильный имейл");
                } else if (number.length < 7) {
                  alert("Неправильный номер мобильнного телефона");
                } else if (name.length < 2) {
                  alert("Напишите, пожалуйста, свое имя");
                } else if (surname.length < 2) {
                  alert("Напишите, пожалуйста, свою фамилию");
                } else {
                  const res = await createBusinessClient({
                    variables: {
                      type: asPath ? asPath : "Unknown",
                      email,
                      name: name,
                      surname: surname,
                      number,
                      // communication_medium: "Legal English Intro",
                      comment: "Kazakhstan_English",
                    },
                  });
                  console.log("res", res, res.data.createBusinessClient.id);
                  setClientId(res.data.createBusinessClient.id);
                  // 2. Enroll new user / user
                  // const new_conf_user = await enrollOnCourse({
                  //   variables: {
                  //     id: authPayload.data.advancedSignup.user.id,
                  //     coursePageId: props.conf.id,
                  //   },
                  // });
                  setIsRegistered(true);
                }
              }}
            >
              {loading ? "⚙️ Готовим регистрацию ... " : "Участвовать"}
            </button>
          )}
        </form>
      )}
      {isRegistered && (
        <div id="explainer2">
          <p>
            Поделитесь этой ссылкой с 2 друзьями.{" "}
            <a
              href={`https://besavvy.app/recommend?id=${clientId}`}
            >{`https://besavvy.app/recommend?id=${clientId}`}</a>
          </p>{" "}
          <p>
            Мы сразу откроем доступ к курсу после того, как ваши друзья
            зарегистрируются и мы проверим, что они живые люди.
          </p>
        </div>
      )}
      {!isRegistered && (
        <div id="legal">
          Нажимая кнопку, принимаю условия{" "}
          <a href="https://besavvy.app/legal?name=privacy" target="_blank">
            политики
          </a>{" "}
          и{" "}
          <a href="https://besavvy.app/legal?name=offer" target="_blank">
            оферты
          </a>
          .
        </div>
      )}
    </Styles>
  );
};

export default Form;
