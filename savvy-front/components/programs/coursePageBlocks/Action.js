import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import * as EmailValidator from "email-validator";
import Modal from "styled-react-modal";
import Router from "next/router";
import { useRouter } from "next/router";
import "react-phone-number-input/style.css";
import ReactGA from "react-ga";
import Signup from "../../auth/Signup";
import Signin from "../../auth/Signin";
import RequestReset from "../../auth/RequestReset";
import tinkoff from "@tcb-web/create-credit";
import parse from "html-react-parser";

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder(
    $coursePageId: String!
    $userId: String!
    $price: Int!
    $promocode: String
    $comment: String
  ) {
    createOrder(
      coursePageId: $coursePageId
      price: $price
      userId: $userId
      promocode: $promocode
      comment: $comment
    ) {
      order {
        id
        paymentID
      }
      url
    }
  }
`;

const CREATE_CLIENT = gql`
  mutation createBusinessClient(
    $email: String!
    $name: String!
    $number: String!
    $type: String!
    $communication_medium: String!
    $comment: String!
  ) {
    createBusinessClient(
      email: $email
      name: $name
      number: $number
      type: $type
      communication_medium: $communication_medium
      comment: $comment
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  padding: 50px 0;
  min-height: 85vh;
  width: 100vw;
  background-image: url("/static/pattern5.svg");
  background-size: contain;
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
  justify-content: flex-start;
  width: 48%;
  min-width: 460px;
  border: 1px solid #e7ebef;
  padding: 2% 4%;
  background: #fff;
  border-radius: 25px;
  .comment {
    div {
      margin: 10px 0;
    }
  }
  .highlight {
    padding-bottom: 1px;
    border-bottom: 3px solid #f9d801;
    font-weight: 600;
  }
  #header {
    font-size: 3.4rem;
    line-height: 1.2;
    width: 70%;
    font-weight: 600;
    margin-bottom: 20px;
  }
  #info {
    div {
      line-height: 1.4;
      margin: 10px 0;
    }
  }
  #promo {
    margin-top: 10%;
    input {
      width: 100%;
      padding: 13px 6px;
      border: 1px solid #d8d8d8;
      border-radius: 5px;
      outline: 0;
      font-family: Montserrat;
      font-size: 1.6rem;
    }
  }
  #details {
    font-size: 1.6rem;
    line-height: 1.4;
    width: 100%;
    .arrow {
      width: 50%;
    }
    #prices {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .buy {
        text-decoration: underline;
        cursor: pointer;
      }
      .full {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        span {
          font-size: 3.4rem;
        }
      }
      .parts {
        width: 48%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        span {
          font-size: 2rem;
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
  .buy_button {
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
    height: auto;
    justify-content: space-between;
    min-height: 350px;
    padding: 20px 0;
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
    #promo {
      margin-top: 0;
    }
    #details {
      margin-top: 0;
      .arrow {
        width: 70%;
      }
      #prices {
        flex-direction: row;
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
  /* height: 400px; */
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #e7ebef;
  border-radius: 25px;
  padding: 30px 0;
  #form_container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .variants {
      width: 80%;
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
      width: 80%;
      margin-bottom: 20px;
      font-weight: 700;
      font-size: 1.8rem;
      line-height: 1.5;
    }
    form {
      width: 80%;
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
    padding: 1% 2%;
    font-family: Montserrat;
    border: none;
    margin-bottom: 20px;
    border-bottom: 1px solid black;
    outline: 0;
    cursor: pointer;
    font-size: 1.4rem;
  }
  #explainer {
    width: 100%;
    font-size: 1.4rem;
    line-height: 1.5;
    margin-bottom: 20px;
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
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState("signin");
  const [step, setStep] = useState("apply");
  const [price, setPrice] = useState(props.data.price.price);
  const [isPromo, setIsPromo] = useState(false);

  const toggleModal = (e) => setIsOpen(!isOpen);
  const changeState = (dataFromChild) => setAuth(dataFromChild);

  const addPromo = (val) => {
    if (
      val.toLowerCase() == "school50" &&
      props.data.price.course == "school" &&
      isPromo == false
    ) {
      setPrice(price * 0.5);
      setIsPromo(true);
    }
  };

  const numberWithSpaces = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const { asPath } = useRouter();

  const [createBusinessClient, { data, loading, error }] =
    useMutation(CREATE_CLIENT);

  const [
    createOrder,
    { data: order_data, loading: loading_data, error: error_data },
  ] = useMutation(CREATE_ORDER_MUTATION);

  const getInstallments = () => {
    tinkoff.create({
      shopId: "e8ec52dc-846a-42e9-9394-8697300599e8",
      showcaseId: "571229ce-512f-4741-a513-4b8180fb4446",
      items: [{ name: props.coursePage.title, price: price, quantity: 1 }],
      sum: price,
    });
    if (me) {
      createOrder({
        variables: {
          coursePageId: coursePage.id,
          price: parseInt(price),
          userId: me.id,
          comment: "Заявка на рассрочку",
        },
      });
    }
  };

  const d = props.data;
  const { me } = props;

  return (
    <Styles id="c2a">
      <Container>
        <Form>
          <Description>
            <div id="header">
              <span>Стоимость обучения</span>
            </div>
            <div id="info">
              <div>
                ✅ Если оставите заявку на консультацию, дадим доступ к
                открытому уроку и поделимся гайдом по развитию юридической
                карьеры.
              </div>
              <div>✅ Если вам не подойдет курс, мы вернем деньги.</div>
            </div>
            <div id="details">
              <br />
              <div className="arrow"> {props.data.price.full_explain}</div>
              <div id="prices">
                <div className="full">
                  <span> {numberWithSpaces(Math.ceil(price / 10))} ₽/мес</span>
                </div>
                <div className="parts">
                  <span> {numberWithSpaces(price)} ₽</span>
                </div>
              </div>
            </div>
            <div id="promo">
              <div>Введите промокод</div>
              <input onChange={(e) => addPromo(e.target.value)} />
            </div>
          </Description>
          <Contact>
            <div id="form_container">
              <div className="h2">Шаг 1. Выберите удобный вариант</div>
              <div className="variants">
                <div
                  className="variants_form"
                  onChange={(e) => {
                    setStep(e.target.value);
                  }}
                >
                  <div>
                    <input
                      type="radio"
                      value="apply"
                      checked={step == "apply"}
                      onChange={(e) => {
                        setStep(e.target.value);
                      }}
                    />
                  </div>
                  <label for="html">
                    Оставить заявку (консультация/рассрочка)
                  </label>
                </div>
                <div
                  className="variants_form"
                  onChange={(e) => {
                    setStep(e.target.value);
                  }}
                >
                  <div>
                    <input
                      type="radio"
                      value="installments"
                      checked={step == "installments"}
                      onChange={(e) => {
                        setStep(e.target.value);
                      }}
                    />
                  </div>
                  <label for="html">Купить курс в рассрочку</label>
                </div>

                <div className="variants_form">
                  <div>
                    <input
                      type="radio"
                      value="buy"
                      checked={step == "buy"}
                      onChange={(e) => {
                        setStep(e.target.value);
                      }}
                    />
                  </div>
                  <label for="html">Купить курс и начать обучение</label>
                </div>
              </div>
              <div className="h2">
                Шаг 2.
                {step == "apply" && " Заполните заявку"}
                {step == "buy" && " Оплатите курс"}
                {step == "installments" && " Заявка на рассрочку"}
              </div>
              {step == "apply" && (
                <>
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
                      type="submit"
                      id="english_application_button1"
                      onClick={async (e) => {
                        e.preventDefault();
                        if (!EmailValidator.validate(email)) {
                          alert("Неправильный имейл");
                        } else if (number.length < 7) {
                          alert("Неправильный номер мобильнного телефона");
                        } else {
                          if (props.data.price.course == "school") {
                            ReactGA.event({
                              category: "Litigation Apply Button Click",
                              action: "Click",
                            });
                          } else if (props.data.price.course == "corp") {
                            ReactGA.event({
                              category: "Corp Apply Button Click",
                              action: "Click",
                            });
                          }
                          const res = await createBusinessClient({
                            variables: {
                              type: asPath ? asPath : "Unknown",
                              email,
                              name: name + " " + surname,
                              number,
                              communication_medium: props.data.price.course,
                              comment: "Консультация",
                            },
                          });
                          Router.push({
                            pathname: "/hello",
                            query: {
                              name: name + " " + surname,
                              email: email,
                              number: number,
                            },
                          });
                        }
                      }}
                    >
                      {loading ? "Записываем..." : "Оставить заявку"}
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
                    <a
                      href="https://besavvy.app/legal?name=offer"
                      target="_blank"
                    >
                      оферты
                    </a>
                    .
                  </div>
                </>
              )}

              {step == "buy" && (
                <form>
                  <div id="explainer">
                    Если у вас еще нет аккаунта, после нажатия на кнопку мы
                    попросим вас зарегистрироваться на сайте. Если у вас уже
                    есть аккаунт, то вас перенаправят на страницу оплаты.
                  </div>
                  {!loading_data && (
                    <button
                      className="buy"
                      onClick={async (e) => {
                        e.preventDefault();
                        if (!me) {
                          alert(
                            `Сейчас мы откроем страницу регистрации. Создайте аккаунт, а потом нажмите на конпку "Купить" еще раз.`
                          );
                          toggleModal();
                        } else {
                          const res = await createOrder({
                            variables: {
                              coursePageId: "cjtreu3md00fp0897ga13aktp",
                              price: price,
                              userId: me.id,
                              comment: props.comment,
                            },
                          });
                          location.href = res.data.createOrder.url;
                        }
                      }}
                    >
                      Купить курс
                    </button>
                  )}
                  {loading_data && <button>Готовим покупку...</button>}
                  <div id="legal">
                    Нажимая кнопку, принимаю условия{" "}
                    <a
                      href="https://besavvy.app/legal?name=privacy"
                      target="_blank"
                    >
                      политики
                    </a>{" "}
                    и{" "}
                    <a
                      href="https://besavvy.app/legal?name=offer"
                      target="_blank"
                    >
                      оферты
                    </a>
                    .
                  </div>
                </form>
              )}
            </div>
          </Contact>
        </Form>
      </Container>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        {auth === "signin" && (
          <Signin getData={changeState} closeNavBar={toggleModal} />
        )}
        {auth === "signup" && (
          <Signup getData={changeState} closeNavBar={toggleModal} />
        )}
        {auth === "reset" && <RequestReset getData={changeState} />}
      </StyledModal>
    </Styles>
  );
};

export default Action;
