import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import * as EmailValidator from "email-validator";
import Modal from "styled-react-modal";
import Router from "next/router";
import { useRouter } from "next/router";
import "react-phone-number-input/style.css";

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
  background: #74bcfe;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    height: auto;
    padding: 0;
    min-height: 0;
  }
`;

const Container = styled.div`
  width: 75%;
  height: 90%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 48%;
  min-width: 460px;
  height: 400px;
  border: 1px solid #e7ebef;
  padding: 4%;
  background: #fff;
  border-radius: 25px;
  .highlight {
    padding-bottom: 1px;
    border-bottom: 3px solid #f9d801;
  }
  #header {
    font-size: 3.4rem;
    line-height: 1.2;
    width: 70%;
    font-weight: 600;
    margin-bottom: 20px;
  }
  #details {
    font-size: 1.6rem;
    line-height: 1.4;
    width: 90%;

    #prices {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .full {
        width: 48%;
        color: #8b887e;
        span {
          font-size: 2.6rem;
        }
      }
      .parts {
        width: 48%;
        span {
          font-size: 2.6rem;
        }
      }
    }
    #price {
      border-bottom: 2px solid white;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    div {
      margin: 5px 0;
    }
    span {
      font-weight: 500;
    }
  }
  @media (max-width: 800px) {
    height: auto;
    min-height: 350px;
    width: 100%;
    min-width: 100px;
    margin-bottom: 40px;
    #description {
      width: 100%;
      margin-bottom: 20px;
    }
    #header {
      font-size: 2.6rem;
      width: 95%;
    }
    #details {
      #prices {
        flex-direction: column;
        .full {
          width: 90%;
          span {
            font-size: 2.2rem;
          }
        }
        .parts {
          width: 90%;
          span {
            font-size: 2.2rem;
          }
        }
      }
    }
  }
`;

const Contact = styled.div`
  width: 48%;
  min-width: 460px;
  height: 400px;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #e7ebef;
  border-radius: 25px;
  #form_container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .h2 {
      width: 80%;
      margin-bottom: 30px;
      font-weight: 700;
      font-size: 1.8rem;
      line-height: 1.5;
    }
    form {
      width: 80%;
    }
  }
  input {
    width: 100%;
    padding: 1% 2%;
    font-family: Montserrat;
    border: none;
    margin-bottom: 20px;
    border-bottom: 1px solid black;
    outline: 0;
    cursor: pointer;
    font-size: 1.4rem;
  }
  #legal {
    width: 80%;
    font-size: 1.3rem;
    line-height: 1.5;
    a {
      text-decoration: underline;
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
    }
    #form_container {
      width: 100%;
    }
  }
`;

const Form = styled.div`
  width: 100%;
  height: 90%;
  /* padding: 4%; */
  color: black;
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: space-between;
  .PhoneInput {
    width: 80%;
    height: 22px;
    select {
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
      .h2 {
        width: 100%;
      }
      form {
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

const Action = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (e) => setIsOpen(!isOpen);

  const { asPath } = useRouter();

  const [createBusinessClient, { data, loading, error }] =
    useMutation(CREATE_CLIENT);
  const d = props.data;

  return (
    <Styles id="c2a">
      <Container>
        <Form>
          <Description>
            <div id="header">
              <span>Стоимость обучения</span>
            </div>
            <div>
              Первая неделя обучения{" "}
              <span className="highlight">бесплатно</span>. Укажите правильный
              номер, чтобы мы могли направить ссылки на материалы.
            </div>

            <div id="details">
              <div id="prices">
                <div className="full">
                  {props.data.price.full_explain}
                  <br />
                  <span> {props.data.price.full}</span>
                </div>
                <div className="parts">
                  {props.data.price.part_explain}
                  <br /> <span> {props.data.price.part}</span>
                </div>
              </div>
            </div>
            {/* <div className="discount">Акция до 10 октября</div> */}
          </Description>
          <Contact>
            <div id="form_container">
              <div className="h2">
                Записаться на курс и начать проходить бесплатные уроки
              </div>
              <form>
                <input
                  id="name"
                  className="data"
                  placeholder="Имя и фамилия"
                  onChange={(e) => setName(e.target.value)}
                />
                {/* <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="RU"
                // value={value}
                // onChange={(e) => setNumber(e.target.value)}
                onChange={setNumber}
              /> */}
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
                  type="submit"
                  id="english_application_button1"
                  onClick={async (e) => {
                    e.preventDefault();
                    var phoneno =
                      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

                    if (!EmailValidator.validate(email)) {
                      alert("Неправильный имейл");
                    } else if (number.length < 7) {
                      alert("Неправильный номер мобильнного телефона");
                    } else {
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
                    }
                  }}
                >
                  Записаться
                </button>
              </form>
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
          </Contact>
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
