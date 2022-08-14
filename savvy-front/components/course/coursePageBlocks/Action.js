import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import * as EmailValidator from "email-validator";
import Modal from "styled-react-modal";
import Router from "next/router";
import { useRouter } from "next/router";
import "react-phone-number-input/style.css";
import Signup from "../../auth/Signup";
import Signin from "../../auth/Signin";
import RequestReset from "../../auth/RequestReset";
import { CURRENT_USER_QUERY } from "../../User";
import { useTranslation } from "next-i18next";

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
    $coursePageId: String
  ) {
    createBusinessClient(
      email: $email
      name: $name
      number: $number
      type: $type
      communication_medium: $communication_medium
      comment: $comment
      coursePageId: $coursePageId
    ) {
      id
    }
  }
`;

const UPDATE_ORDER = gql`
  mutation UPDATE_ORDER($id: String!, $userId: String!) {
    updateOrderAuto(id: $id, userId: $userId) {
      id
      isPaid
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
  padding: 50px 0;
  min-height: 85vh;
  width: 100%;
  /* background-image: url("/static/pattern5.svg"); */
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: -webkit-sticky;
  position: sticky;
  top: -20px;
  z-index: 5;
  @media (max-width: 800px) {
    height: auto;
    padding: 0;
    min-height: 0;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Contact = styled.div`
  width: 100%;
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #e7ebef;
  padding: 20px;
  box-shadow: 0px 0px 7px 4px rgba(217, 217, 217, 0.35);
  -webkit-box-shadow: 0px 0px 7px 4px rgba(217, 217, 217, 0.35);
  -moz-box-shadow: 0px 0px 7px 4px rgba(217, 217, 217, 0.35);
  .guarantee {
    font-size: 1.3rem;
    color: #4b5563;
  }
  .open {
    line-height: 1.4;
    /* margin-top: 20px; */
    border-top: 1px solid #e7ebef;
    padding: 15px 0;
    div {
      margin-bottom: 15px;
    }
  }
  .price {
    font-weight: 600;
    font-size: 3.2rem;
    text-align: left;
    width: 100%;
  }
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
    }
  }
  .details {
    margin: 30px 0;
    width: 100%;
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
  #promo {
    /* margin-top: 10%; */
    margin: 10px 0;
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
      .explainer {
        width: 100%;
      }
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

const PriceBox = styled.div`
  width: 292px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  .price_small {
    font-weight: 600;
    font-size: 3.2rem;
    /* text-align: left; */
  }
  div {
    margin-right: 10px;
  }
`;

const ButtonOpen = styled.button`
  width: 292px;
  height: 48px;
  border: 2px solid #175ffe;
  padding: 2%;
  font-family: Montserrat;
  border: none;
  text-align: center;
  background: #175ffe;
  margin-bottom: 10px;
  outline: 0;
  cursor: pointer;
  font-size: 1.8rem;
  transition: ease-in 0.2s;
  color: #fff;
  &:hover {
    background-color: #0b44bf;
  }
`;

const ButtonBuy = styled.button`
  width: 100%;
  width: 292px;
  height: 48px;
  padding: 2%;
  font-family: Montserrat;
  border: 2px solid #252f3f;
  background: none;
  margin-bottom: 10px;
  outline: 0;
  cursor: pointer;
  font-size: 1.8rem;
  transition: ease-in 0.2s;
  &:hover {
    background-color: #e3e4ec;
  }
`;

const OpenCourse = styled.button`
  width: 100%;
  width: 292px;
  height: 40px;
  padding: 2%;
  font-family: Montserrat;
  border: 1px solid #aeaeae;
  background: none;
  margin-bottom: 10px;
  outline: 0;
  cursor: pointer;
  font-size: 1.6rem;
  transition: ease-in 0.2s;
  &:hover {
    background-color: #e2e2e2;
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
  const [installments, setInstallments] = useState(
    props.coursePage.installments
  );
  const [price, setPrice] = useState(
    props.coursePage.installments && props.coursePage.installments > 1
      ? props.coursePage.price / props.coursePage.installments
      : props.coursePage.price
  );
  const [isPromo, setIsPromo] = useState(false);
  const { t } = useTranslation("coursePage");
  const router = useRouter();

  const toggleModal = (e) => setIsOpen(!isOpen);
  const changeState = (dataFromChild) => setAuth(dataFromChild);
  const addPromo = (val) => {
    props.coursePage.promocode.promocodes.map((p) => {
      console.log(
        "p.name.toLowerCase() == val.toLowerCase()",
        p.name.toLowerCase() == val.toLowerCase(),
        isPromo.toS
      );
      if (p.name.toLowerCase() == val.toLowerCase() && isPromo == false) {
        console.log("price * p.value", price * p.value, isPromo.toString());

        setPrice(price * p.value);
        setIsPromo(true);
      }
    });
  };

  const { asPath } = useRouter();

  const [createBusinessClient, { data, loading, error }] =
    useMutation(CREATE_CLIENT);

  const [
    createOrder,
    { data: order_data, loading: loading_data, error: error_data },
  ] = useMutation(CREATE_ORDER_MUTATION);

  const [
    updateOrderAuto,
    { data: updated_data, loading: updated_loading, error: updated_error },
  ] = useMutation(UPDATE_ORDER);

  const [
    enrollOnCourse,
    { data: enroll_data, loading: enroll_loading, error: enroll_error },
  ] = useMutation(ENROLL_COURSE_MUTATION, {
    refetchQueries: [
      CURRENT_USER_QUERY, // DocumentNode object parsed with gql
      "me", // Query name
    ],
  });

  const d = props.data;
  const { me, coursePage } = props;
  console.log("price / installments", price, installments);
  let my_orders = [];
  if (me) {
    my_orders = me.orders.filter((o) => o.coursePage.id == coursePage.id);
  }

  const getNoun = (number, one, two, five) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  };

  let demo_lesson = coursePage.lessons
    .filter((l) => l.open == true)
    .sort((les) => les.number > les.number)[0];

  return (
    <Styles id="c2a">
      <Container>
        <Contact>
          {installments && (
            <PriceBox>
              <div>
                {installments}{" "}
                {getNoun(installments, "платёж", "платежа", "платежей")} по
              </div>
              {installments && <div className="price_small">{price} ₽</div>}
            </PriceBox>
          )}
          {!installments && <div className="price">{price} ₽</div>}
          <ButtonOpen
            id="coursePage_to_demolesson"
            // href={`https://besavvy.app/lesson?id=${demo_lesson.id}&type=story`}
            // target="_blank"

            onClick={(e) => {
              e.preventDefault();
              Router.push({
                pathname: "/lesson",
                query: {
                  id: demo_lesson.id,
                  type: "story",
                },
              });
            }}
          >
            {t("start_open_lesson")}
          </ButtonOpen>

          <ButtonBuy
            id="coursePage_buy_button"
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
                    coursePageId: coursePage.id,
                    price: price,
                    userId: me.id,
                  },
                });
                location.href = res.data.createOrder.url;
              }
            }}
          >
            {installments &&
              (loading_data ? `Готовим покупку...` : t("buy_installments"))}
            {!installments && (loading_data ? `Готовим покупку...` : t("buy"))}
          </ButtonBuy>
          <div className="guarantee">Гарантия возврата денег</div>
          <div className="details">
            {installments && (
              <div className="">
                ◼️ рассрочка на {installments - 1}{" "}
                {getNoun(installments - 1, "месяц", "месяца", "месяцев")}
              </div>
            )}
            <div className="">
              ◼️ {coursePage.lessons.length} онлайн{" "}
              {getNoun(coursePage.lessons.length, "урок", "урока", "уроков")}
            </div>
            <div className="">◼️ 4 вебинара</div>
            <div className="">◼️ Пожизненный доступ</div>
            <div className="">◼️ Чат с автором курса</div>
            <div className="">◼️ Сертификат об окончании</div>
            {props.coursePage.promocode && (
              <div id="promo">
                <input
                  placeholder="Промокод"
                  onChange={(e) => addPromo(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="open">
            <div className="">
              После покупки нажмите сюда, чтобы получить доступ к курсу
            </div>
            <OpenCourse
              id="coursePage_open_course_button"
              onClick={async (e) => {
                e.preventDefault();
                let results = [];
                console.log(1);
                let checked_orders = await Promise.all(
                  my_orders.map(async (o) => {
                    let updated_res = await updateOrderAuto({
                      variables: {
                        userId: me.id,
                        id: o.id,
                      },
                    });
                    return updated_res;
                  })
                );

                const checked_orders2 = checked_orders.filter(
                  (c) =>
                    c.data.updateOrderAuto !== null &&
                    c.data.updateOrderAuto.isPaid == true
                );

                if (checked_orders2.length > 0) {
                  let enroll = await enrollOnCourse({
                    variables: {
                      id: me.id,
                      coursePageId: coursePage.id,
                    },
                  });
                  Router.push({
                    pathname: "/course",
                    query: {
                      id: coursePage.id,
                    },
                  });
                } else {
                  alert(
                    "Не нашли ваш платеж. Если вы считаете, что произошла ошибка, напишите нам."
                  );
                }
              }}
            >
              {updated_loading || enroll_loading
                ? "Проверяем..."
                : "Открыть доступ"}
            </OpenCourse>
          </div>
        </Contact>
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

{
  /* <Form space={router.locale}>
          {router.locale == "ru" && (
            <>
              <Contact>
                <div id="form_container">
                  <div className="h2">{t("step1")}</div>
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
                      <label for="html">{t("step1option1")}</label>
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
                      <label for="html">{t("step1option2")}</label>
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
                          value="open"
                          checked={step == "open"}
                          onChange={(e) => {
                            setStep(e.target.value);
                          }}
                        />
                      </div>
                      <label for="html">
                        Открыть доступ к оплаченному курсу
                      </label> 
                    </div>
                  </div>

                  <div className="h2">
                    {t("step2")}
                    {step == "apply" &&
                      " Подпишитесь на полезные материалы по теме курса"}
                    {step == "buy" && " Оплатите курс"}
                    {step == "open" && " Открываем доступ"}
                  </div>
                  {step == "apply" && (
                    <>
                      <div className="explainer">
                        Если пока не готовы присоединиться, раз в 2 недели будем
                        бесплатно присылать полезные материалы и новости по теме
                        курса.
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
                          id="coursePage_subscribe_button"
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
                                  communication_medium: "Consultation",
                                  comment: "consult",
                                  coursePageId: coursePage.id,
                                },
                              });
                              alert(
                                "Добавили вас в рассылку. Скоро вернемся с полезностями!"
                              );
                              // Router.push({
                              //   pathname: "/hello",
                              //   query: {
                              //     name: name + " " + surname,
                              //     email: email,
                              //     number: number,
                              //   },
                              // });
                            }
                          }}
                        >
                          {loading ? "Записываем..." : "Подписаться"}
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
                          id="coursePage_buy_button"
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
                                  coursePageId: coursePage.id,
                                  price: price,
                                  userId: me.id,
                                  comment: props.comment,
                                },
                              });
                              location.href = res.data.createOrder.url;
                            }
                          }}
                        >
                          {t("buy")}
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
              </Contact>
            </>
          )}
           {router.locale == "en" && (
            <>
              <Contact>
                <div id="form_container">
                  <div className="h2">Choose an option</div>
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
                      <label for="html">Get a consultation</label>
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
                          value="open"
                          checked={step == "open"}
                          onChange={(e) => {
                            setStep(e.target.value);
                          }}
                        />
                      </div>
                      <label for="html">Apply Today</label>
                    </div>
                  </div>
                  <div className="h2">Fill out the application</div>
                  <>
                    <form>
                      <div className="names">
                        <input
                          className="data"
                          id="name"
                          placeholder="Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          className="data"
                          id="surname"
                          placeholder="Surname"
                          onChange={(e) => setSurname(e.target.value)}
                        />
                      </div>
                      <input
                        id="tel"
                        className="data"
                        type="tel"
                        placeholder="Mobile number"
                        onChange={(e) => setNumber(e.target.value)}
                      />
                      <input
                        id="email"
                        className="data"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button
                        type="submit"
                        id="coursePage_apply_button"
                        onClick={async (e) => {
                          e.preventDefault();
                          if (!EmailValidator.validate(email)) {
                            alert("Wrong Email");
                          } else if (number.length < 7) {
                            alert("Wrong Mobile Number");
                          } else {
                            const res = await createBusinessClient({
                              variables: {
                                type: asPath ? asPath : "Unknown",
                                email,
                                name: name + " " + surname,
                                number,
                                communication_medium: "Legal English Intro",
                                comment: "consult",
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
                        {loading ? "Applying..." : "Apply"}
                      </button>
                    </form>
                    {/* <div id="legal">
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
                </div>
              </Contact>
            </>
          )}
        </Form> */
}
