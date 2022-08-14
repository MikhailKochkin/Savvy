import React, { useState } from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";
import { useQuery, useMutation, gql } from "@apollo/client";

import { useTranslation } from "next-i18next";
import ReactResizeDetector from "react-resize-detector";

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

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      price
      # user {
      #   id
      #   name
      #   surname
      # }
    }
  }
`;

const Banner = styled.div`
  width: 100%;
  min-height: 10vh;
  background-image: url("/static/pattern.svg");
  background-size: cover;
  color: #dfe1ec;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  justify-content: center;
  /* padding-right: 300px; */
  .bottomline_text {
    /* max-width: 95%;
    min-width: 45%; */
    font-size: 1.6rem;
    height: 100%;
    line-height: 1.6;
    font-weight: 600;
    padding: 10px;
    margin-right: 50px;
  }
  .more_bottomline_text {
    max-width: 65%;
    min-width: 45%;
    font-size: 1.3rem;
    height: 100%;
    line-height: 1.6;
    font-weight: 500;
    padding: 10px;
    margin-right: 50px;
  }
  button {
    background: #fcc419;
    color: #000;
    border: 1px solid #fcc419;
    border-radius: 5px;
    width: 250px;
    min-width:
    font-family: Montserrat;
    font-size: 1.7rem;
    font-weight: 400;
    height: 45px;
    opacity: 1;
    text-align: center;
    cursor: pointer;
    z-index: 4;
    transition: ease-in 0.2s;
    &:hover {
      background-color: #dea702;
      border: 1px solid #dea702;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    /* position: fixed; */
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    padding: 10px 0;
    background-size: cover;
    .bottomline_text {
      width: 60%;
      padding: 0;
      margin: 0;
      font-size: 1.4rem;
      /* margin-bottom: 10px; */
    }
    button {
      min-width: 90%;
      font-size: 1.8rem;
    }
  }
`;

const Button = styled.div`
  background: #fcc419;
  color: #000;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #fcc419;
  border-radius: 5px;
  width: 220px;
  font-family: Montserrat;
  font-size: 1.7rem;
  font-weight: 400;
  height: 45px;
  opacity: 1;
  cursor: pointer;
  z-index: 4;
  transition: ease-in 0.2s;
  &:hover {
    background-color: #dea702;
    border: 1px solid #dea702;
  }
  @media (max-width: 800px) {
    width: 120px;
    font-size: 1.3rem;
  }
`;

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    flex-direction: row;
    width: 95%;
    justify-content: space-between;
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

const Ad = (props) => {
  const [width, setWidth] = useState(0);

  const onResize = (width, height) => {
    setWidth(width);
  };
  const { t } = useTranslation("lesson");
  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.coursePageId },
  });

  const [
    createOrder,
    { data: order_data, loading: loading_data, error: error_data },
  ] = useMutation(CREATE_ORDER_MUTATION);

  if (loading) return <div></div>;
  const course = data.coursePage;
  const { me } = props;
  // const course = data.coursePage;
  // const { t } = useTranslation("coursePage");

  // let demo_lesson = props.data
  //   .filter((l) => l.open == true)
  //   .sort((les) => les.number > les.number)[0];
  console.log("width", width);
  return (
    <Banner>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <Container>
        {data && (
          <>
            <div className="bottomline_text">
              {width < 500 && (
                <span>
                  {/* 🚀 Откройте доступ к курсу  */}Курс со скидкой 20% –{" "}
                  <br /> {course.price * 0.8} ₽ вместо {course.price} ₽
                  {/* "{course.title}". Автор – {course.user.name}{" "}
            {course.user.surname} */}
                </span>
              )}
              {width >= 500 && (
                <span>
                  🚀 Откройте доступ к курсу "{course.title}" со скидкой 20% –{" "}
                  {course.price * 0.8} ₽ вместо {course.price} ₽
                  {/* "{course.title}". Автор – {course.user.name}{" "}
            {course.user.surname} */}
                </span>
              )}
            </div>
            {/* <div className="more_bottomline_text">
          <span>
            🖐🏻 Курс: Юридический английский для профессионалов. Базовый уровень.
          </span>
        </div> */}
            <Button
              // href={`https://besavvy.app/lesson?id=${demo_lesson.id}&type=story`}
              target="_blank"
              id="bottomline_coursepage_to_demo_lesson"
              onClick={async (e) => {
                const res = await createOrder({
                  variables: {
                    coursePageId: course.id,
                    price: course.price * 0.8,
                    userId: me.id,
                  },
                });
                location.href = res.data.createOrder.url;
              }}
            >
              {/* {t("start_open_lesson")} */}{" "}
              {loading_data ? "Открываем..." : "Открыть доступ"}
            </Button>
          </>
        )}
      </Container>
    </Banner>
  );
};

export default Ad;
