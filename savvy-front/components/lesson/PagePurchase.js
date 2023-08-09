import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import moment from "moment";
import parse from "html-react-parser";
import calculateSum from "../../functions.js";

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION(
    $userId: String!
    $text: String!
    $link: String
    $comment: String
    $coursePageId: String
    $subject: String
  ) {
    sendMessage(
      userId: $userId
      text: $text
      subject: $subject
      coursePageId: $coursePageId
      comment: $comment
      link: $link
    ) {
      id
    }
  }
`;

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
    $coursePageId: String
  ) {
    createBusinessClient(
      email: $email
      name: $name
      number: $number
      coursePageId: $coursePageId
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  width: 100em;
  min-height: 100vh;
  /* background: #000000; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;
  z-index: 200;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const BiggerBlock = styled.div`
  width: 75%;
  max-width: 900px;
  background: #fbfbfb;
  border-radius: 40px;
  border: 5px solid #181d2e;
  padding: 100px 25px;
  @media (max-width: 800px) {
    width: 95%;
    padding: 10px;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (max-width: 800px) {
    width: 100%;
    margin: 0;
    flex-direction: column;
  }
`;

const Left = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 4.4rem;
  line-height: 1.2;
  font-weight: 600;
  text-align: center;
  span {
    /* color: #fe5d26; */
  }
  @media (max-width: 800px) {
    width: 90%;
    font-size: 3.4rem;
    margin: 30px 0;
  }
`;

const Right = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .course_name {
    font-size: 2.4rem;
    font-weight: 500px;
    text-align: center;
    line-height: 1.2;
    margin-bottom: 25px;
  }
  .course_details {
    font-size: 1.8;
    font-weight: 500px;
  }
  @media (max-width: 800px) {
    width: 90%;
    margin-bottom: 30px;
  }
`;

const Button = styled.button`
  font-size: 2rem;
  background: #fad802;
  border: 1px solid #fad802;
  color: #271907;
  box-sizing: border-box;
  border-radius: 10px;
  width: 300px;
  height: 45px;
  margin-top: 20px;
  font-weight: 500;
  cursor: pointer;
  font-family: Montserrat;
  outline: 0;
  transition: 0.3s;
  /* max-width: 180px; */
  &:hover {
    background-color: #ffe22e;
  }
  @media (max-width: 800px) {
    font-size: 1.6rem;
  }
`;

const Button2 = styled.button`
  font-size: 2rem;
  background: none;
  border: 2px solid #181d2e;
  color: #271907;
  box-sizing: border-box;
  border-radius: 10px;
  width: 300px;
  height: 45px;
  margin-top: 20px;
  cursor: pointer;
  font-family: Montserrat;
  outline: 0;
  transition: 0.3s;
  /* max-width: 180px; */
  &:hover {
    background-color: #e6e6e6;
  }
  @media (max-width: 800px) {
    font-size: 1.6rem;
  }
`;

const PagePurchase = (props) => {
  const { me, offer, coursePageId, coursePage, lesson_structure } = props;
  // Add a ref for the component
  const bannerRef = useRef(null);
  // State for tracking visibility
  const [mutationFired, setMutationFired] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("lesson");

  const [sendMessage, { data: data1, loading: loading1, error: error1 }] =
    useMutation(SEND_MESSAGE_MUTATION);

  const [createBusinessClient, { data, loading, error }] =
    useMutation(CREATE_CLIENT);

  const [
    createOrder,
    { data: order_data, loading: loading_data, error: error_data },
  ] = useMutation(CREATE_ORDER_MUTATION);

  const handleButtonClick1 = async () => {
    const res = await createOrder({
      variables: {
        coursePageId: coursePageId,
        price: coursePage.price,
        userId: me.id,
      },
    });
    location.href = res.data.createOrder.url;
  };

  const handleButtonClick3 = async () => {
    let number =
      me.number ||
      prompt(
        "Пожалуйста, укажите свой номер телефона, чтобы мы могли с вами связаться: "
      );
    if (!number) {
      return;
    }

    const res = await createBusinessClient({
      variables: {
        email: me.email,
        name: me.name + " " + me.surname,
        number: number,
        coursePageId: coursePageId,
      },
    });

    alert("Спасибо, скоро c вами свяжемся.");
  };

  return (
    <Styles ref={bannerRef}>
      <BiggerBlock>
        <Block>
          <Left>Откройте полный доступ за {coursePage.price} ₽</Left>
          <Right>
            <div className="course_name">{coursePage.title}</div>
            <div className="course_details">
              Время на прохождение: {calculateSum(lesson_structure)} мин.
            </div>
            <div className="course_details">Рейтинг: 9.6/10</div>
            <Button onClick={(e) => handleButtonClick1()}>
              {loading_data ? "Открываем..." : "Открыть"}
            </Button>
            <Button2 onClick={(e) => handleButtonClick3()}>
              Задать вопрос
            </Button2>
          </Right>
        </Block>
      </BiggerBlock>
    </Styles>
  );
};

export default PagePurchase;
