import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import * as EmailValidator from "email-validator";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import "react-phone-number-input/style.css";
import { v4 as uuidv4 } from "uuid";
import Error from "../ErrorMessage";
import Signin from "./SignIn";

// const UPDATE_USER_MUTATION = gql`
//   mutation UPDATE_USER_MUTATION($id: String!, $tags: [String]) {
//     updateUser(id: $id, tags: $tags) {
//       id
//     }
//   }
// `;

// const CREATE_CLIENT = gql`
//   mutation createBusinessClient(
//     $email: String!
//     $name: String!
//     $number: String!
//     $type: String!
//     $communication_medium: String!
//     $comment: String!
//   ) {
//     createBusinessClient(
//       email: $email
//       name: $name
//       number: $number
//       type: $type
//       communication_medium: $communication_medium
//       comment: $comment
//     ) {
//       id
//     }
//   }
// `;

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $number: String
    $surname: String!
    $password: String!
    $isFamiliar: Boolean!
    $status: Status!
  ) {
    signup(
      email: $email
      name: $name
      number: $number
      surname: $surname
      password: $password
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

const Contact = styled.div`
  width: 44%;
  min-width: 410px;
  height: 500px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  #form_container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    color: #fff;
    text-align: center;
    justify-content: center;
    .variants {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: flex-start;
      font-size: 1.4rem;
      margin-bottom: 15px;
      .variants_form {
        max-width: 45%;
        display: flex;
        flex-direction: row;
        padding: 5px;
        align-items: flex-start;
        justify-content: flex-start;
        border: 1px solid #d8d8d8;
        border-radius: 10px;
        margin-right: 6px;
        margin-bottom: 6px;
        label {
          line-height: 1.6;
        }
        div {
          width: 40px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          input {
            margin: 0;
            padding: 0;
            margin-top: 5px;
          }
        }
      }
    }
    .h2 {
      width: 100%;
      margin-bottom: 20px;
      font-weight: 700;
      font-size: 3.8rem;
      line-height: 1.2;
    }
    form {
      width: 100%;
      .names {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        input {
          width: 48%;
        }
      }
    }
  }
  input {
    width: 100%;
    padding: 3% 2%;
    font-family: Montserrat;
    border: 2px solid #fff;
    border-radius: 5px;
    color: #fff;
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
  #explainer {
    width: 100%;
    font-size: 1.4rem;
    line-height: 1.5;
    margin-bottom: 20px;
  }
  #legal {
    color: #fff;
    width: 80%;
    font-size: 1.3rem;
    line-height: 1.5;
    a {
      text-decoration: underline;
      color: #fff;
    }
  }
  button {
    width: 100%;
    padding: 2%;
    font-family: Montserrat;
    border: none;
    background: #f9d801;
    border-radius: 5px;
    margin-bottom: 10px;
    outline: 0;
    cursor: pointer;
    font-size: 1.8rem;
    transition: ease-in 0.2s;
    a {
      width: 100%;
      height: 100%;
    }
    &:hover {
      background-color: #dfc201;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
    min-width: 100px;
    height: auto;

    flex-direction: column;
    padding: 4% 4%;
    input {
      width: 100%;
      height: 50px;
      font-size: 1.6rem;
    }
    button {
      width: 100%;
      height: 50px;
      font-size: 2.2rem;
      a {
      }
    }
    #legal {
      width: 95%;
    }
    #details {
      width: 95%;
      font-size: 1.9rem;
    }
    form {
      width: 100%;
      border: none;
      .names {
        width: 100%;
      }
    }
    #form_container {
      width: 100%;

      .variants {
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .variants_form {
          width: 100%;
          max-width: 100%;
          margin-bottom: 20px;
          label {
            font-size: 1.6rem;
            line-height: 1.4;
          }
          div {
            width: 30%;
            max-width: 30%;
            input[type="radio"] {
              width: 30px;
              height: 30px;
            }
          }
        }
      }
    }
  }
`;

const Nav = styled.div`
  text-decoration: underline;
  cursor: pointer;
`;

const Form = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("register");

  const { asPath } = useRouter();
  const router = useRouter();
  const { t } = useTranslation("common");

  // const [createBusinessClient, { data, loading, error }] =
  //   useMutation(CREATE_CLIENT);

  const [signup, { data: data2, loading: loading2, error: error2 }] =
    useMutation(SIGNUP_MUTATION);

  // const [updateUser, { data: data3, loading: loading3, error: error3 }] =
  //   useMutation(UPDATE_USER_MUTATION);

  let password = uuidv4();

  const d = props.data;
  const { me, material, useful } = props;
  return (
    <Contact>
      <div id="form_container">
        <div className="h2">{useful.header}</div>
        {me && (
          <button
            id="useful_to_destination"
            onClick={async (e) => {
              e.preventDefault();
              // updateUser({
              //   variables: {
              //     id: me.id,
              //     tags: [...new Set([...me.tags, ...useful.tags])],
              //   },
              // });
              location.href = material.link;
            }}
          >
            Перейти
          </button>
        )}
        {!me && (
          <>
            {step == "register" && (
              <>
                <Error error={error2} />
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
                    className="data"
                    type="tel"
                    placeholder="+7 (999) 999-99-99"
                    onChange={(e) => setNumber(e.target.value)}
                  />
                  <input
                    id="email"
                    className="data"
                    type="email"
                    placeholder="Электронная почта"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    id="useful_to_signup"
                    type="submit"
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
                        const res2 = await signup({
                          variables: {
                            name: name,
                            surname: surname,
                            password: password,
                            email: email,
                            number: number,
                            status: "LAWYER",
                            isFamiliar: true,
                          },
                        });
                        location.href = material.link;
                      }
                    }}
                  >
                    {loading2 ? "..." : useful.buttonText}
                  </button>
                </form>
                <Nav onClick={(e) => setStep("signin")}>
                  Если у вас уже есть аккаунт BeSavvy, жмите сюда
                </Nav>
              </>
            )}
            {step == "signin" && (
              <>
                <Signin material={material} />
                <Nav onClick={(e) => setStep("register")}>
                  Вернуться к регистрации
                </Nav>
              </>
            )}
          </>
        )}
        {/* <div id="legal">
          Если аккаунта ннет, то просто оставьте з
          <a href="https://besavvy.app/legal?name=privacy" target="_blank">
            политики
          </a>{" "}
          и{" "}
          <a href="https://besavvy.app/legal?name=offer" target="_blank">
            оферты
          </a>
          .
        </div> */}
      </div>
    </Contact>
  );
};

export default Form;
