import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import Modal from "styled-react-modal";
import { useTranslation } from "next-i18next";
import Router from "next/router";
import tinkoff from "@tcb-web/create-credit";
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
  .guarantee {
    font-size: 1.4rem;
    color: #4b5563;
    text-align: center;
    margin-bottom: 10px;
  }
`;

const ButtonBuy = styled.button`
  width: 90%;
  height: 48px;
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

const ButtonBuySmall = styled.button`
  width: 90%;
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

const ButtonOpen = styled.a`
  width: 90%;
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

const Info = styled.div`
  width: 90%;

  .details {
    margin-top: 10px;
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

const ProgramMobileBuy = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState("signin");
  const toggleModal = (e) => {};

  const { me, program } = props;
  const first_course = [...program.coursePages].sort(
    (a, b) => a.numInCareerTrack - b.numInCareerTrack
  )[0];

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

  let my_orders = [];
  if (me) {
    my_orders = me.orders.filter((o) => o.coursePage.id == first_course.id);
  }

  const getAllLessons = (coursePages) => {
    // Initialize an empty array to store all lessons
    let allLessons = [];

    // Loop through each course page in the provided data
    coursePages.forEach((coursePage) => {
      // Check if the course page has lessons
      if (coursePage.lessons && coursePage.lessons.length > 0) {
        // Sort lessons by the .number value
        const sortedLessons = [...coursePage.lessons].sort(
          (a, b) => a.number - b.number
        );

        // Concatenate the sorted lessons to the 'allLessons' array
        allLessons = allLessons.concat(sortedLessons);
      }
    });

    // Return the array containing all lessons
    return allLessons;
  };

  let sorted_courses = [...program.coursePages].sort(
    (a, b) => a.numInCareerTrack - b.numInCareerTrack
  );

  let all_lessons = getAllLessons(sorted_courses);

  let first_open_lesson = all_lessons.find((l) => l.open == true);

  let total_lessons_number = program.coursePages.reduce(function (acc, obj) {
    return (
      acc +
      obj.lessons.filter((les) => les.type.toLowerCase() !== "hidden").length
    );
  }, 0);

  const getInstallments = () => {
    tinkoff.create({
      shopId: process.env.NEXT_PUBLIC_SHOP_ID,
      showcaseId: process.env.NEXT_PUBLIC_SHOWCASE_ID,
      items: [
        {
          name: props.program.title,
          price: props.program.price,
          quantity: 1,
        },
      ],
      sum: props.program.price,
      promoCode: "installment_0_0_9_9,8",
    });
    if (me) {
      createOrder({
        variables: {
          coursePageId: first_course.id,
          price: parseInt(props.program.price),
          userId: me.id,
          comment: "Заявка на рассрочку",
        },
      });
    }
  };

  return (
    <Styles id="buy_section">
      {!program.discountPrice && <div className="price">{program.price} ₽</div>}
      {program.discountPrice && (
        <div className="price">
          <div>
            {program.price}{" "}
            <span className="discount">{program.discountPrice}</span> ₽
          </div>
        </div>
      )}
      <ButtonOpen
        id="coursePage_to_demolesson"
        onClick={(e) => {
          e.preventDefault();
          Router.push({
            pathname: "/lesson",
            query: {
              id: first_open_lesson.id,
              type: "story",
            },
          });
        }}
      >
        {t("start_open_lesson")}
      </ButtonOpen>
      <div className="guarantee">{t("guarantee")}</div>

      <ButtonBuy
        id="mobile_coursePage_buy_button"
        onClick={async (e) => {
          e.preventDefault();
          if (!me) {
            alert(`Set up an account on BeSavvy`);
          } else {
            const res = await createOrder({
              variables: {
                coursePageId: first_course.id,
                price: program.price,
                userId: me.id,
                // promocode: promo,
              },
            });
            location.href = res.data.createOrder.url;
          }
        }}
      >
        {loading_data ? `...` : t("buy")}
      </ButtonBuy>
      <ButtonBuySmall
        id="mobile_coursePage_buy_button"
        onClick={(e) => getInstallments()}
      >
        Купить в рассрочку за {parseInt(program.price / 9)} ₽ / мес
      </ButtonBuySmall>
      <Info>
        <div className="details">
          {/* {installments && (
            <div className="">
              Рассрочка на {installments - 1}{" "}
              {getNoun(installments - 1, "месяц", "месяца", "месяцев")}
            </div>
          )} */}
          <div className="">
            {total_lessons_number} {t("online_lessons")}
          </div>
          {program.price > 4000 && <div className="">{t("webinars")}</div>}

          <div className="">{t("access")}</div>
          <div className="">{t("chat")}</div>
          <div className="">{t("certificate")}</div>
        </div>
        {/* {props.program.promocode && (
          <div id="promo">
            <input
              placeholder="Promocode"
              onChange={(e) => addPromo(e.target.value)}
            />
          </div>
        )} */}
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
      </Info>
    </Styles>
  );
};

export default ProgramMobileBuy;
