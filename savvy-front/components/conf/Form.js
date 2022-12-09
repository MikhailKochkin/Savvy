import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import * as EmailValidator from "email-validator";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $number: String
    $surname: String!
    $password: String!
    $country: String!
    $isFamiliar: Boolean!
    $status: Status!
  ) {
    advancedSignup(
      email: $email
      name: $name
      number: $number
      surname: $surname
      password: $password
      country: $country
      isFamiliar: $isFamiliar
      status: $status
    ) {
      token
      user {
        id
      }
    }
  }
`;

const ENROLL_COURSE_MUTATION = gql`
  mutation ENROLL_COURSE_MUTATION($id: String!, $coursePageId: String) {
    enrollOnCourse(id: $id, coursePageId: $coursePageId) {
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
    font-size: 5.6rem;
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

    h2 {
      font-size: 4.4rem;
      width: 90%;
      line-height: 1.1;
    }
    button {
      font-size: 1.6rem;
    }
  }
`;
const Form = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState();
  const [isRegistered, setIsRegistered] = useState(false);

  const [advancedSignup, { data: data2, loading: loading2, error: error2 }] =
    useMutation(SIGNUP_MUTATION);

  const [enrollOnCourse, { data: data1, loading: loading1, error: error1 }] =
    useMutation(ENROLL_COURSE_MUTATION);

  let password = uuidv4();
  console.log("props.conf.countries", props.conf.countries);
  return (
    <Styles id="signup_form">
      <h2>
        {!isRegistered
          ? "Примите бесплатное участие"
          : "Спасибо за регистрацию"}
      </h2>
      <div id="explainer">
        Зарегистрируйтесь, а мы напомним вам о мероприятии за день до начала.
      </div>
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
                // 1. Query user. Find or create.
                const authPayload = await advancedSignup({
                  variables: {
                    name: name,
                    surname: surname,
                    password: password,
                    email: email,
                    number: number,
                    status: "LAWYER",
                    isFamiliar: true,
                    country:
                      props.conf.countries && props.conf.countries[0]
                        ? props.conf.countries[0]
                        : "RU",
                  },
                });

                // 2. Enroll new user / user
                const new_conf_user = await enrollOnCourse({
                  variables: {
                    id: authPayload.data.advancedSignup.user.id,
                    coursePageId: props.conf.id,
                  },
                });
                setIsRegistered(true);
              }
            }}
          >
            {loading2 ? "⚙️ Готовим регистрацию ... " : "Участвовать"}
          </button>
        )}
      </form>
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
