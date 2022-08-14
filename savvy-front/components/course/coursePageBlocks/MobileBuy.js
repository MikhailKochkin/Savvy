import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import Modal from "styled-react-modal";
import { useTranslation } from "next-i18next";

import Signup from "../../auth/Signup";
import Signin from "../../auth/Signin";
import RequestReset from "../../auth/RequestReset";

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

const Styles = styled.div`
  width: 100%;
  border-top: 2px solid #d6d6d6;
  border-bottom: 2px solid #d6d6d6;
  padding: 40px 0;
  margin-top: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border-top: 2px solid #d6d6d6; */
  background: #fff;
  z-index: 10;
  /* position: fixed; */
  bottom: 0px;
  /* height: 100px; */
  .price {
    font-weight: 600;
    font-size: 3.2rem;
    width: 100%;
    text-align: center;
    margin-bottom: 15px;
  }
`;

const ButtonBuy = styled.button`
  width: 90%;
  /* width: 292px; */
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

const Info = styled.div`
  width: 80%;
  .guarantee {
    font-size: 1.3rem;
    color: #4b5563;
    text-align: center;
  }
  .details {
    margin-top: 25px;
    width: 100%;
    div {
      text-align: center;
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
    /* margin-top: 20px; */
    border-top: 1px solid #e7ebef;
    padding: 15px 0;
    div {
      margin-bottom: 15px;
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
  const [auth, setAuth] = useState("signin");
  const [installments, setInstallments] = useState(
    props.coursePage.installments
  );
  const [price, setPrice] = useState(
    props.coursePage.installments && props.coursePage.installments > 1
      ? props.coursePage.price / props.coursePage.installments
      : props.coursePage.price
  );
  const toggleModal = (e) => setIsOpen(!isOpen);

  const [
    createOrder,
    { data: order_data, loading: loading_data, error: error_data },
  ] = useMutation(CREATE_ORDER_MUTATION);
  const { t } = useTranslation("coursePage");
  const changeState = (dataFromChild) => setAuth(dataFromChild);

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

  const { me, coursePage } = props;
  return (
    <Styles>
      {/* <div className="price">{coursePage.price} ₽</div> */}
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
      <ButtonBuy
        id="mobile_coursePage_buy_button"
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
                // comment: props.comment,
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
      <Info>
        <div className="guarantee">Гарантия возврата денег</div>
        <div className="details">
          {installments && (
            <div className="">
              Рассрочка на {installments - 1}{" "}
              {getNoun(installments - 1, "месяц", "месяца", "месяцев")}
            </div>
          )}
          <div className="">
            {coursePage.lessons.length} онлайн{" "}
            {getNoun(coursePage.lessons.length, "урок", "урока", "уроков")}
          </div>
          <div className="">4 вебинара</div>
          <div className="">Пожизненный доступ</div>
          <div className="">Чат с автором курса</div>
          <div className="">Сертификат об окончании</div>
        </div>
      </Info>
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

export default MobileBuy;
