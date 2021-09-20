import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import * as EmailValidator from "email-validator";
import Modal from "styled-react-modal";
import Router from "next/router";
import { useRouter } from "next/router";

const CREATE_CLIENT = gql`
  mutation createBusinessClient(
    $email: String!
    $name: String!
    $number: String!
    $type: String!
  ) {
    createBusinessClient(
      email: $email
      name: $name
      number: $number
      type: $type
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  padding: 50px 0;
  min-height: 85vh;
  width: 100vw;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    padding: 0;
    min-height: 0;
  }
`;
const Container = styled.div`
  width: 65%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Form = styled.div`
  width: 100%;
  background: #496ddb;
  border-radius: 5px;
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
    border-radius: 0;
    padding: 6% 4%;
    #description {
      width: 100%;
      margin-bottom: 20px;
    }
    #header {
      width: 95%;
      font-size: 2.6rem;
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

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
              <span>Проконсультируйтесь</span> по обучающим программам
            </div>
            <div id="details">
              <div>1. Составим индивидуальный план развития</div>
              <div>2. Обсудим, какие карьерные цели вы планируете достичь</div>
              <div>
                3. Дадим доступ к <span>бесплатным и демо-материалам</span>
              </div>
            </div>
          </div>
          <div id="form">
            <div id="form_container">
              <input
                className="data"
                placeholder="Имя и фамилия"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="data"
                type="tel"
                name="tel"
                placeholder="+7 (999) 999-99-99"
                onChange={(e) => setNumber(e.target.value)}
              />
              <input
                className="data"
                type="email"
                name="email"
                placeholder="Электронная почта"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                id="english_application_button1"
                onClick={async (e) => {
                  e.preventDefault();
                  if (EmailValidator.validate(email)) {
                    Router.push({
                      pathname: "/hello",
                    });
                    const res = await createBusinessClient({
                      variables: {
                        type: asPath ? asPath : "English",
                        email,
                        name,
                        number,
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
            </div>
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

export default ContactForm;
