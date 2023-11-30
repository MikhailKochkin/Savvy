import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import * as EmailValidator from "email-validator";
import Modal from "styled-react-modal";
import Router from "next/router";
import { useRouter } from "next/router";
import "react-phone-number-input/style.css";
import moment from "moment";

import Signup from "../../auth/Signup";
import Signin from "../../auth/Signin";
import RequestReset from "../../auth/RequestReset";
import { CURRENT_USER_QUERY } from "../../User";
import { useTranslation } from "next-i18next";

const CREATE_CLIENT = gql`
  mutation createBusinessClient(
    $email: String!
    $name: String!
    $number: String!
    $type: String!
    $comment: String
    $coursePageId: String
  ) {
    createBusinessClient(
      email: $email
      name: $name
      number: $number
      type: $type
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
    font-size: 2.4rem;
    text-align: left;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    margin-bottom: 10px;
    .discount {
      font-weight: 600;
      font-size: 2rem;
      text-decoration: line-through;
    }
    .bubble {
      background: #f7003e;
      border-radius: 50%;
      color: #fff;
      font-size: 1.8rem;
      height: 55px;
      width: 55px;
      margin-left: 15px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border: 1px solid #6e6c6d;
    }
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
  .student {
    line-height: 1.4;
    text-align: center;
  }
  .details {
    margin-top: 20px;
    width: 100%;
    .discount {
      text-decoration: line-through;
      text-decoration-thickness: 2px;
    }
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

const Group = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  input {
    width: 48%;
    background: none;
    font-size: 1.6rem;
    border: 1px solid #d6d6d6;
    font-family: Montserrat;
    outline: 0;
    padding: 10px;
    margin-bottom: 10px;
    &:hover {
      border: 1px solid #999999;
    }
    &:focus {
      border: 1px solid #1a2a81;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  background: none;
  font-size: 1.4rem;
  border: 1px solid #d6d6d6;
  font-family: Montserrat;
  outline: 0;
  padding: 10px;
  margin-bottom: 15px;
  &:hover {
    border: 1px solid #999999;
  }
  &:focus {
    border: 1px solid #1a2a81;
  }
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0;
  input {
    font-size: 1.6rem;
    font-family: Montserrat;
  }
  .condition {
    font-size: 1.4rem;
    line-height: 1.4;
    margin-top: 4%;
    color: #787878;
  }
  #standard-select-currency {
    width: 90%;
    font-size: 1.6rem;
    font-family: Montserrat;
  }
  #standard-select-currency-label {
    display: none;
  }
`;

const Title = styled.div`
  font-size: 2.4rem;
  margin-bottom: 15px;
  font-weight: 700;
  line-height: 1.2;
  width: 100%;
  span {
    border-bottom: 4px solid #175ffe;
  }
`;

const PhoneInput = styled.input`
  width: 100%;
  background: none;
  font-size: 1.4rem;
  border: 1px solid #d6d6d6;
  font-family: Montserrat;
  outline: 0;
  padding: 10px;
  margin-bottom: 10px;
  &:hover {
    border: 1px solid #999999;
  }
  &:focus {
    border: 1px solid #1a2a81;
  }
`;

const ButtonOpen = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 292px;
  height: 52px;
  padding: 2%;
  font-family: Montserrat;
  border: 2px solid #283d3b;
  text-align: center;
  background: #175ffe;
  margin-bottom: 10px;
  outline: 0;
  cursor: pointer;
  font-size: 1.8rem;
  transition: ease-in 0.2s;
  color: #fff;
  a {
    color: #fff;
  }
  &:hover {
    background-color: #0b44bf;
  }
`;

const ButtonBuy = styled.button`
  width: 292px;
  height: 42px;
  padding: 2%;
  font-family: Montserrat;
  border: 2px solid #252f3f;
  background: none;
  margin: 10px 0;
  outline: 0;
  cursor: pointer;
  font-size: 1.8rem;
  transition: ease-in 0.2s;
  &:hover {
    background-color: #e3e4ec;
  }
`;

const Action = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState("signin");
  const [promo, setPromo] = useState("");
  const [installments, setInstallments] = useState(
    props.coursePage.installments
  );
  const [price, setPrice] = useState(
    props.coursePage?.installments && props.coursePage.installments > 1
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
      if (p.name.toLowerCase() == val.toLowerCase() && isPromo == false) {
        setPrice(price * p.value);
        setIsPromo(true);
        setPromo(val);
      }
    });
  };

  const { asPath } = useRouter();

  const [createBusinessClient, { data, loading, error }] =
    useMutation(CREATE_CLIENT);

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
  const { me, coursePage, program } = props;
  let my_orders = [];
  if (me) {
    my_orders = me.orders.filter((o) => o.coursePage.id == coursePage.id);
  }

  moment.locale("ru");

  let in_two_days = new Date();
  in_two_days.setDate(in_two_days.getDate() + 2);

  let total_lessons_number = 0;
  if (program) {
    total_lessons_number = program.coursePages.reduce(function (acc, obj) {
      return (
        acc +
        obj.lessons.filter((les) => les.type.toLowerCase() !== "hidden").length
      );
    }, 0);
  }

  let currency_symbol;
  if (coursePage.currency == "ruble") {
    currency_symbol = "₽";
  } else if (coursePage.currency == "usd") {
    currency_symbol = "$";
  } else if (coursePage.currency == "ruble") {
    currency_symbol = "$";
  }

  return (
    <Styles id="c2a">
      <Container>
        <Contact>
          <Title>
            {program.discountPrice ? (
              <>
                Получите скидку{" "}
                <span className="">
                  -
                  {parseInt(
                    100 - (program.price * 100) / program.discountPrice
                  )}
                  %
                </span>
              </>
            ) : (
              "Получите 🎁 за покупку программы"
            )}
          </Title>
          <Fieldset>
            <Group>
              <input
                className="name"
                type="text"
                name="name"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="surname"
                type="text"
                name="surname"
                placeholder="Фамилия"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Group>
            <PhoneInput
              className="number"
              type="tel"
              name="number"
              placeholder="Телефон"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              label="Number"
            />
            <Input
              className="email"
              type="email"
              name="email"
              placeholder="Имейл"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Электронная почта"
            />
          </Fieldset>

          <ButtonOpen
            id="coursePage_to_demolesson"
            // href={`https://besavvy.app/lesson?id=${demo_lesson.id}&type=story`}
            // target="_blank"

            onClick={async (e) => {
              e.preventDefault();
              if (!EmailValidator.validate(email)) {
                alert("Неправильный имейл");
              } else if (number.length < 7) {
                alert("Неправильный номер мобильного телефона");
              } else {
                const res = await createBusinessClient({
                  variables: {
                    type: asPath ? asPath : "Unknown",
                    email,
                    name,
                    surname,
                    number,
                    coursePageId: coursePage.id,
                  },
                });
                alert("Спасибо! Свяжемся с вами в течение дня!");
              }
            }}
          >
            {loading ? "Готовим заявку..." : "Оставить заявку"}
          </ButtonOpen>
          {program && program.id == "clgp3kppu0454eku9bs6nklf8" && (
            <div className="student">
              🔥 Оставьте заявку, и мы дадим вам испытание{" "}
              <b>для получения скидки до 70%</b>
            </div>
          )}

          <div className="details">
            {/* {installments && (
              <div className="">
                ◼️ рассрочка на {installments - 1}{" "}
                {getNoun(installments - 1, "месяц", "месяца", "месяцев")}
              </div>
            )} */}

            <div className="">
              ◼️ Длительность:{" "}
              {program && program.months !== 3
                ? `${program.months} месяцев`
                : "3 месяца"}
            </div>
            <div className="">
              ◼️{" "}
              {program
                ? total_lessons_number
                : coursePage.lessons.filter((l) => l.type !== "HIDDEN")
                    .length}{" "}
              {t("online_lessons")}
              {/* {getNoun(coursePage.lessons.length, "урок", "урока", "уроков")} */}
            </div>
            {price > 4000 && <div className="">◼️ {t("webinars")}</div>}
            <div className="">◼️ {t("access")}</div>
            <div className="">◼️ {t("chat")}</div>
            <div className="">◼️ {t("certificate")}</div>
            <div className="">
              ◼️ {program ? program.price : coursePage.price} ₽{" "}
              {program.discountPrice ? (
                <span className="discount">{program.discountPrice} ₽</span>
              ) : null}
            </div>
          </div>
        </Contact>
      </Container>
    </Styles>
  );
};

export default Action;
