import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import * as EmailValidator from "email-validator";
import Modal from "styled-react-modal";
import Router from "next/router";
import { useRouter } from "next/router";
import "react-phone-number-input/style.css";
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
  background-image: url("/static/pattern.svg");
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    height: auto;
    padding: 0;
    min-height: 0;
    background-size: contain;
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
    font-weight: 600;
  }
  #header {
    font-size: 2.8rem;
    line-height: 1.2;
    width: 90%;
    font-weight: 700;
    margin-bottom: 20px;
  }
  #intro {
    font-size: 2.2rem;
    width: 95%;
    font-weight: 600;
    margin-top: 10px;
    line-height: 1.2;
  }
  #details2 {
    font-size: 2rem;
    div {
      line-height: 1.4;
      margin: 10px 0;
    }
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
      margin-top: 10px;
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
          margin-top: 10px;

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
      font-size: 2.8rem;
      line-height: 1.2;
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
      color: black;
      font-weight: 500;
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

const Action = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (e) => setIsOpen(!isOpen);

  const { asPath } = useRouter();

  let program;

  if (props.offer === "school") {
    program = "Карьерная Школа Юриста + Юр Английский";
  } else if (props.offer === "corp") {
    program = "Корпоративное право + Юр Английский";
  } else if (props.offer === "litigation") {
    program = "Арбитражный процесс + Юр Английский";
  } else if (props.offer === "start") {
    program = "Старт Карьеры";
  }

  const [createBusinessClient, { data, loading, error }] =
    useMutation(CREATE_CLIENT);

  return (
    <Styles id="c2a">
      <Container>
        <Form>
          <Description>
            <div id="header">
              <span>
                С каждым будущим студентом мы проводим вводное занятие
              </span>
            </div>
            <div id="details2">
              <div>Перед занятием мы пришлем подробную программу курса.</div>
              <div>
                А на занятии покажем, как проходит обучение, и поделимся
                инсайдами с рынка.
              </div>
            </div>

            {/* <div id="details">
              <div id="prices">
                <div className="full">
                  Скидка 50% до 19 ноября
                  <br />
                  <span> 104 000</span>
                </div>
                <div className="parts">
                  Скидка 50% до 19 ноября
                  <br /> <span> 52 000</span>
                </div>
              </div>
            </div> */}
          </Description>
          <Contact>
            <div id="form_container">
              <div className="h2">Запишитесь на вводное занятие</div>
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

                    if (!EmailValidator.validate(email)) {
                      alert("Неправильный имейл");
                    } else if (number.length < 7) {
                      alert("Неправильный номер мобильнного телефона");
                    } else {
                      Router.push({
                        pathname: "/hello",
                        query: {
                          name: name,
                          email: email,
                          course: program,
                          number: number,
                        },
                      });
                      const res = await createBusinessClient({
                        variables: {
                          type: asPath ? asPath : "English",
                          email,
                          name,
                          number,
                          communication_medium: "Black Friday " + program,
                        },
                      });
                      console.log(res);
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
    </Styles>
  );
};

export default Action;
