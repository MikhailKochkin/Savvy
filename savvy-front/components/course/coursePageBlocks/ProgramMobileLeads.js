import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import Modal from "styled-react-modal";
import { useTranslation } from "next-i18next";
import Router from "next/router";
import { useRouter } from "next/router";
import moment from "moment";
import * as EmailValidator from "email-validator";

import { CURRENT_USER_QUERY } from "../../User";

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

const Styles = styled.div`
  width: 100%;
  border-top: 2px solid #d6d6d6;
  border-bottom: 2px solid #d6d6d6;
  padding: 40px 0;
  margin-top: 40px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border-top: 2px solid #d6d6d6; */
  z-index: 10;
  /* position: fixed; */
  bottom: 0px;
  /* height: 100px; */
  .student {
    line-height: 1.4;
    text-align: center;
    width: 80%;
    margin-top: 10px;
  }
  .price {
    font-weight: 600;
    font-size: 3.2rem;
    text-align: left;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 20px;
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
`;

const ButtonBuy = styled.button`
  width: 100%;
  height: 48px;
  padding: 2%;
  font-family: Montserrat;
  border: 2px solid #252f3f;
  background: none;
  margin-top: 20px;
  outline: 0;
  cursor: pointer;
  font-size: 1.8rem;
  transition: ease-in 0.2s;
  &:hover {
    background-color: #e3e4ec;
  }
`;

const ButtonOpen = styled.a`
  width: 87%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 52px;
  border: 2px solid #283d3b;
  padding: 2%;
  font-family: Montserrat;
  border: none;
  text-align: center;
  background: #175ffe;
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

const Info = styled.div`
  width: 90%;
  .guarantee {
    font-size: 1.3rem;
    color: #4b5563;
    text-align: center;
  }
  .details {
    margin-top: 25px;
    font-size: 1.6rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div {
      width: 90%;
    }
  }
  .price {
    font-weight: 600;
    font-size: 3.2rem;
    width: 100%;
    text-align: left;
    margin-bottom: 15px;
  }
  .open {
    line-height: 1.4;
    margin-top: 20px;
    border-top: 1px solid #e7ebef;
    padding: 15px 0;
    div {
      margin-bottom: 15px;
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
`;

const PriceBox = styled.div`
  width: 292px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

const OpenCourse = styled.button`
  width: 100%;
  height: 48px;
  padding: 2%;
  font-family: Montserrat;
  border: 1px solid #aeaeae;
  background: none;
  outline: 0;
  cursor: pointer;
  font-size: 1.6rem;
  transition: ease-in 0.2s;
  &:hover {
    background-color: #e2e2e2;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;

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
  width: 90%;
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
  background: #fff;
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
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 1.3;
  width: 85%;
  margin-bottom: 20px;
  span {
    border-bottom: 4px solid #175ffe;
  }
`;

const PhoneInput = styled.input`
  width: 90%;
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

const MobileBuy = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");

  const [price, setPrice] = useState(
    props.coursePage.installments && props.coursePage.installments > 1
      ? props.coursePage.price / props.coursePage.installments
      : props.coursePage.price
  );
  const { me, coursePage, program } = props;
  const { t } = useTranslation("coursePage");

  const { asPath } = useRouter();

  const [createBusinessClient, { data, loading, error }] =
    useMutation(CREATE_CLIENT);

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
      return acc + obj.lessons.length;
    }, 0);
  }

  return (
    <Styles id="buy_section">
      <>
        {program && program.id == "clgp3kppu0454eku9bs6nklf8" ? (
          <Title>Пошаговый запуск карьеры юриста</Title>
        ) : (
          <Title>
            Пробный месяц за{" "}
            <span>{program ? program.price / program.months : 6900} ₽</span>
          </Title>
        )}
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
      </>
      {program && program.id == "clgp3kppu0454eku9bs6nklf8" && (
        <div className="student">
          🔥 Оставьте заявку, и мы дадим вам испытание{" "}
          <b>для получения скидки до 70%</b>
        </div>
      )}

      <Info>
        {/* {props.coursePage.courseType !== "PUBLIC" && (
          <div className="guarantee">{t("guarantee")}</div>
        )} */}
        <div className="details">
          <div className="">◼️ Длительность: {program.months} месяцев</div>

          <div className="">
            ◼️{" "}
            {program
              ? total_lessons_number
              : coursePage.lessons.filter((l) => l.type !== "HIDDEN")
                  .length}{" "}
            {t("online_lessons")}
          </div>
          <div className="">◼️ {t("access")}</div>
          <div className="">◼️ {t("chat")}</div>
          <div className="">◼️ {t("certificate")}</div>
          <div className="">◼️ {program.price} ₽</div>
        </div>
      </Info>
    </Styles>
  );
};

export default MobileBuy;
