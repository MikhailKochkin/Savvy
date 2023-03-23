import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import Modal from "styled-react-modal";
import { useTranslation } from "next-i18next";
import Router from "next/router";

import Signup from "../../auth/Signup";
import Signin from "../../auth/Signin";
import RequestReset from "../../auth/RequestReset";
import { CURRENT_USER_QUERY } from "../../User";

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
  width: 100%;
  border-top: 2px solid #d6d6d6;
  border-bottom: 2px solid #d6d6d6;
  padding: 20px 0;
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
  .choose {
    width: 100%;
    height: 42px;
    padding: 2%;
    font-family: Montserrat;
    border: 1px solid #e7ebef;
    background: none;
    margin: 10px 0;
    outline: 0;
    cursor: pointer;
    font-size: 1.8rem;
    transition: ease-in 0.2s;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #e3e4ec;
    }
  }
  select {
    width: 80%;
    height: 32px;
    font-family: Montserrat;
    background: none;
    outline: 0;
    border: none;
    cursor: pointer;
    font-size: 1.8rem;
    transition: ease-in 0.2s;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* &:hover {
      background-color: #e3e4ec;
    } */
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
  width: 90%;
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

const Info = styled.div`
  width: 90%;
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
  const [isPromo, setIsPromo] = useState(false);
  const [promo, setPromo] = useState("");

  const [price, setPrice] = useState(props.coursePage.price);
  const toggleModal = (e) => setIsOpen(!isOpen);

  const addPromo = (val) => {
    props.coursePage.promocode.promocodes.map((p) => {
      if (p.name.toLowerCase() == val.toLowerCase() && isPromo == false) {
        setPrice(price * p.value);
        setIsPromo(true);
        setPromo(val);
      }
    });
  };

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

  let my_orders = [];
  if (me) {
    my_orders = me.orders.filter((o) => o.coursePage.id == coursePage.id);
  }

  return (
    <Styles id="buy_section">
      {props.coursePage.courseType == "FORMONEY" && (
        <>
          {/* {installments && (
            <PriceBox>
              <div>
                {installments}{" "}
                {getNoun(installments, "платёж", "платежа", "платежей")} по
              </div>
              {installments && (
                <div className="price_small">
                  {price} {coursePage.currency == "ruble" ? "₽" : "$"}{" "}
                </div>
              )}
            </PriceBox>
          )} */}
          {/* {!installments && <div className="price">{price} ₽</div>} */}
          {/* {!installments && !props.coursePage.discountPrice && (
            <div className="price">
              {price} {coursePage.currency == "ruble" ? "₽" : "$"}
            </div>
          )} */}
          {/* {!installments && props.coursePage.discountPrice && (
            <div className="price">
              <div>
                {props.coursePage.discountPrice}{" "}
                <span className="discount">{price}</span>{" "}
                {coursePage.currency == "ruble" ? "₽" : "$"}
              </div>
              <div className="bubble">
                -
                {100 - parseInt((props.coursePage.discountPrice / price) * 100)}
                %
              </div>
            </div>
          )} */}
        </>
      )}
      {props.coursePage.courseType == "PUBLIC" && (
        <div className="price">{t("free")}</div>
      )}
      {props.coursePage.courseType == "FORMONEY" && (
        <>
          <ButtonOpen
            id="coursePage_to_demolesson"
            // href={`https://besavvy.app/lesson?id=${demo_lesson.id}&type=story`}
            // target="_blank"

            onClick={(e) => {
              e.preventDefault();
              Router.push({
                pathname: "/course",
                query: {
                  id: coursePage.id,
                  // type: "story",
                },
              });
            }}
          >
            {t("start_open_lesson")}
          </ButtonOpen>
        </>
      )}
      {props.coursePage.courseType == "PUBLIC" && (
        <ButtonOpen
          id="coursePage_to_demolesson"
          onClick={async (e) => {
            e.preventDefault();
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
          }}
        >
          {enroll_loading ? "..." : t("enroll")}
        </ButtonOpen>
      )}

      <Info>
        {props.coursePage.courseType !== "PUBLIC" && (
          <div className="guarantee">{t("guarantee")}</div>
        )}
        <div className="details">
          <div className="">
            {coursePage.lessons.filter((l) => l.type !== "HIDDEN").length}{" "}
            {t("online_lessons")}
          </div>
          {price > 4000 && <div className="">{t("webinars")}</div>}

          <div className="">{t("access")}</div>
          <div className="">{t("chat")}</div>
          <div className="">{t("certificate")}</div>
          <div className="">
            {price}
            {coursePage.currency == "ruble" ? "₽" : "$"}
          </div>
        </div>
        <ButtonBuy
          id="mobile_coursePage_buy_button"
          onClick={async (e) => {
            e.preventDefault();
            if (!me) {
              alert(`Set up an account on BeSavvy`);
              toggleModal();
            } else {
              const res = await createOrder({
                variables: {
                  coursePageId: coursePage.id,
                  price: props.coursePage.discountPrice
                    ? props.coursePage.discountPrice
                    : price,
                  userId: me.id,
                  promocode: promo,
                },
              });
              location.href = res.data.createOrder.url;
            }
          }}
        >
          {installments && (loading_data ? `...` : t("buy_installments"))}
          {!installments && (loading_data ? `...` : t("buy"))}
        </ButtonBuy>
        {props.coursePage.prices &&
          props.coursePage.prices.prices &&
          props.coursePage.prices.prices.length > 1 && (
            <div className="choose">
              <select onChange={(e) => setPrice(e.target.value)}>
                {props.coursePage.prices.prices.map((p) => (
                  <option value={p.price}>{p.name} тариф</option>
                ))}
              </select>
            </div>
          )}
        {props.coursePage.courseType !== "PUBLIC" && (
          <div className="open">
            <div className="">{t("after")}</div>
            <OpenCourse
              id="coursePage_open_course_button"
              onClick={async (e) => {
                e.preventDefault();
                let results = [];
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
                  alert("Payment not found.");
                }
              }}
            >
              {updated_loading || enroll_loading ? t("check") : t("open_acess")}
            </OpenCourse>
          </div>
        )}
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
