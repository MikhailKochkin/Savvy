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
import tinkoff from "@tcb-web/create-credit";

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
    margin-bottom: 10px;
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
  .details {
    margin: 20px 0;
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

const ButtonOpen = styled.a`
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
  a {
    color: #fff;
  }
  &:hover {
    background-color: #0b44bf;
  }
`;

const ButtonBuy = styled.button`
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

const ButtonBuySmall = styled.button`
  width: 292px;
  height: 48px;
  padding: 2%;
  font-family: Montserrat;
  border: 2px solid #252f3f;
  background: none;
  margin-bottom: 10px;
  outline: 0;
  cursor: pointer;
  font-size: 1.4rem;
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
  const { me, program } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState("signin");
  const [promo, setPromo] = useState("");

  const [price, setPrice] = useState(
    program.discountPrice ? program.discountPrice : program.price
  );
  const { t } = useTranslation("coursePage");
  const router = useRouter();

  const toggleModal = (e) => setIsOpen(!isOpen);
  const changeState = (dataFromChild) => setAuth(dataFromChild);

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

  const first_course = [...program.coursePages].sort(
    (a, b) => a.numInCareerTrack - b.numInCareerTrack
  )[0];

  let my_orders = [];
  if (me) {
    my_orders = me.orders.filter((o) => o.coursePage.id == first_course.id);
  }

  const getInstallments = () => {
    tinkoff.create({
      shopId: process.env.NEXT_PUBLIC_SHOP_ID,
      showcaseId: process.env.NEXT_PUBLIC_SHOWCASE_ID,
      items: [{ name: props.program.title, price: price, quantity: 1 }],
      sum: price,
      promoCode: "installment_0_0_9_9,8",
    });
    if (me) {
      createOrder({
        variables: {
          coursePageId: first_course.id,
          price: parseInt(price),
          userId: me.id,
          comment: "Заявка на рассрочку",
        },
      });
    }
  };

  const total_lessons_number = program.coursePages.reduce(function (acc, obj) {
    return (
      acc +
      obj.lessons.filter((les) => les.type.toLowerCase() !== "hidden").length
    );
  }, 0);
  return (
    <Styles id="c2a">
      <Container>
        <Contact>
          <ButtonOpen
            id="coursePage_to_demolesson"
            onClick={(e) => {
              e.preventDefault();
              Router.push({
                pathname: "/navigator",
                query: {
                  level: "post",
                  id: program.promotionId,
                  source: "programPage",
                  name: program.title,
                },
              });
            }}
          >
            {t("start_open_lesson")}
          </ButtonOpen>
          <div className="details">
            <div className="">
              ◼️ {total_lessons_number} {t("online_lessons")}
            </div>
            <div className="">◼️ {t("access")}</div>
            <div className="">◼️ {t("chat")}</div>
            <div className="">◼️ {t("certificate")}</div>
            <div className="">◼️ {price} ₽</div>
          </div>
          <ButtonBuy
            id="coursePage_buy_button"
            onClick={async (e) => {
              e.preventDefault();
              if (!me) {
                alert(`Set up an account on BeSavvy`);
                toggleModal();
              } else {
                const res = await createOrder({
                  variables: {
                    coursePageId: first_course.id,
                    price: price,
                    userId: me.id,
                    promocode: promo,
                  },
                });
                location.href = res.data.createOrder.url;
              }
            }}
          >
            {loading_data ? `...` : t("buy")}
          </ButtonBuy>
          <ButtonBuySmall
            id="coursePage_buy_button"
            onClick={(e) => getInstallments()}
          >
            Купить в рассрочку за {parseInt(price / 9)} ₽ / мес
          </ButtonBuySmall>
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
                      coursePageId: first_course.id,
                    },
                  });
                  Router.push({
                    pathname: "/course",
                    query: {
                      id: first_course.id,
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

// {!program.discountPrice && <div className="price">{price} ₽</div>}
//   <div className="price">
//     <div>
//       {program.discountPrice}{" "}
//       <span className="discount">{price}</span> ₽
//     </div>
//     <div className="bubble">
//       -{100 - parseInt((program.discountPrice / price) * 100)}%
//     </div>
//   </div>
