import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import * as EmailValidator from "email-validator";
import Modal from "styled-react-modal";
import Router from "next/router";
import { useRouter } from "next/router";
import ReactGA from "react-ga";

const CREATE_CLIENT = gql`
  mutation createBusinessClient(
    $email: String!
    $name: String!
    $number: String!
    $type: String!
    $communication_medium: String!
  ) {
    createBusinessClient(
      email: $email
      name: $name
      number: $number
      type: $type
      communication_medium: $communication_medium
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  padding: 50px 0;
  min-height: 85vh;
  width: 100vw;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0.5) 29.69%,
    rgba(220, 232, 253, 0.466013) 48.44%,
    rgba(49, 117, 243, 0.3) 100%,
    #c4d6fc 100%
  );

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  width: 65%;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const Form = styled.div`
  width: 100%;
  background: #3175f3;
  border-radius: 30px;
  padding: 4%;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  #description {
    width: 50%;
    padding: 2%;
  }
  #header {
    font-size: 3rem;
    line-height: 1.2;
    width: 90%;
    font-weight: 600;
    margin-bottom: 20px;
    span {
      color: #f9d801;
    }
  }
  #details {
    font-size: 1.7rem;
    line-height: 1.4;
    width: 90%;
    div {
      margin: 5px 0;
    }
    span {
      color: #f9d801;
      font-weight: 500;
    }
  }
  #form {
    width: 50%;
    border-left: 1px solid #606060;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  #form_container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .names {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 80%;
      input {
        width: 49%;
      }
    }
  }
  input {
    width: 80%;
    padding: 3% 2%;
    font-family: Montserrat;
    border: none;
    border-radius: 5px;
    margin-bottom: 20px;
    outline: 0;
    cursor: pointer;
    font-size: 1.6rem;
  }
  #legal {
    width: 80%;
    font-size: 1.3rem;
    line-height: 1.5;
    a {
      color: #fff;
      text-decoration: underline;
    }
  }
  button {
    width: 80%;
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
    &:hover {
      background-color: #dfc201;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    border-radius: 15px;
    padding: 6% 4%;
    #description {
      width: 100%;
      margin-bottom: 20px;
    }
    #header {
      width: 95%;
    }
    input {
      width: 100%;
      height: 50px;
      font-size: 1.6rem;
    }
    button {
      width: 100%;
      height: 50px;
      font-size: 2.2rem;
    }
    #legal {
      width: 95%;
    }
    #details {
      width: 95%;
      font-size: 1.9rem;
    }
    #form {
      width: 100%;
      border: none;
    }
    #form_container {
      width: 95%;
      .names {
        width: 100%;
      }
    }
  }
`;

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  max-width: 40%;
  min-width: 400px;
  padding: 2%;
  .top_message {
    padding-bottom: 2%;
    border-bottom: 1px solid grey;
    font-size: 2rem;
    width: 100%;
    text-align: center;
  }
  .bottom_message {
    margin-top: 2%;
  }
  @media (max-width: 1300px) {
    max-width: 70%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
  @media (max-width: 800px) {
    max-width: 90%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
`;

const Action = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (e) => setIsOpen(!isOpen);

  const { asPath } = useRouter();

  const [createBusinessClient, { data, loading, error }] =
    useMutation(CREATE_CLIENT);
  return (
    <Styles id="contact">
      <Container>
        <Form>
          <div id="description">
            <div id="header">
              Запишитесь на <span>вводное занятие</span> с автором курса
            </div>
            <div id="details">
              <div>1. Поделюсь главным правилом юр английского</div>
              <div>2. Открою демо-доступ к неделе 1</div>
              <div>3. Покажу, как работает система</div>
              <div>
                4. Это <span>бесплатно</span>
              </div>
            </div>
          </div>
          <div id="form">
            <form id="form_container">
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
                className="data"
                id="tel"
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
                id="english_application_button1"
                onClick={async (e) => {
                  e.preventDefault();
                  if (EmailValidator.validate(email)) {
                    Router.push({
                      pathname: "/hello_eng",
                      query: {
                        name: name,
                        surname: surname,
                        email: email,
                        course: "eng_prof",
                      },
                    });
                    ReactGA.event({
                      category: "English Apply Button Click",
                      action: "Click",
                    });
                    const res = await createBusinessClient({
                      variables: {
                        type: asPath ? asPath : "English",
                        email,
                        name: name + " " + surname,
                        number,
                        communication_medium: "english",
                      },
                    });
                    console.log(res);
                    toggleModal();
                  } else {
                    alert("Неправильный имейл");
                  }
                }}
              >
                Записаться
              </button>
              <div id="legal">
                Нажимая кнопку, принимаю условия{" "}
                <a
                  href="https://besavvy.app/legal?name=privacy"
                  target="_blank"
                >
                  политики
                </a>{" "}
                и{" "}
                <a href="https://besavvy.app/legal?name=offer" target="_blank">
                  оферты
                </a>
                .
              </div>
            </form>
          </div>
        </Form>
      </Container>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <div className="top_message">Мы получили заявку!</div>
        <div className="bottom_message">
          Спасибо, что заинтересовались нашей программой. Мы очень ждем
          возможности познакомиться с вами поближе. Напишем или позвоним вам в
          течение часа.
        </div>
      </StyledModal>
    </Styles>
  );
};

export default Action;
