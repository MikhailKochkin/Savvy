import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import moment from "moment";
import parse from "html-react-parser";

import UpdateOffer from "./UpdateOffer";

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
  background: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
  padding: 50px 0;
  margin-bottom: 80px;
  z-index: 200;
  color: #fff;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const BiggerBlock = styled.div`
  width: 75%;
  max-width: 900px;
  background: none;
  border-radius: 40px;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 415px; */
  /* border: 1px solid green; */

  /* background: #fff; */
  border-radius: 40px;

  @media (max-width: 800px) {
    width: 100%;
    margin: 0;
    /* height: 100%; */
  }
`;

const Inner = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .syllabus {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    cursor: pointer;

    .img {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 16px;
      margin-right: 16px;
      cursor: pointer;

      img {
        width: 100%;
      }
    }
  }
  .emoji {
    font-size: 2.6rem;
  }
  .cta {
    font-size: 4.6rem;
    font-weight: 600;
    margin: 10px 0;
    line-height: 1.2;
    text-align: center;
  }
  .main_text {
    line-height: 1.4;
    text-align: center;
    margin-bottom: 10px;
  }
  .list {
    margin-top: 5px;
    font-size: 1.5rem;
    line-height: 1.5;
  }
  @media (max-width: 800px) {
    padding: 20px;
    width: 100%;
    .list {
      line-height: 1.5;
      font-size: 1.5rem;
    }
    .cta {
      font-size: 2.4rem;
      margin: 5px 0;
      line-height: 1.4;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  font-size: 1.6rem;
  background: #2d6fef;
  border: 1px solid #2d6fef;
  color: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  width: 200px;
  height: 45px;
  margin-top: 20px;
  cursor: pointer;
  font-family: Montserrat;
  outline: 0;
  transition: 0.3s;
  /* max-width: 180px; */
  &:hover {
    opacity: 0.9;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
    &#first {
      margin-bottom: 10px;
    }
    .syllabus {
      flex-direction: column;
      width: 90%;
      height: auto;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 1000px;
  height: 160px;
  padding: 10px;
  /* background-color: #fcfcfb; */
  border-radius: 8px;
  margin-bottom: 20px;
  @media (max-width: 1000px) {
    width: 90%;
    height: auto;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  height: 100%;
  .rows {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    font-family: Montserrat;
    height: 100%;
    width: 100%;
    .row {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-right: 20px;
      width: 100%;
      font-size: 1.8rem;
      .img {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 16px;
        height: 16px;
        margin-right: 15px;
        img {
          width: 100%;
        }
      }
    }
  }
  @media (max-width: 800px) {
    .rows {
      width: 100%;
      .row {
        font-size: 1.5rem;
        line-height: 1.5;
        margin-bottom: 5px;
        align-items: flex-start;
        .img {
          width: 14px;
          height: 14px;
        }
      }
    }
  }
`;

const Prices = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const PriceBox = styled.div`
  width: 263px;
  height: 238px;
  border: 1px solid #2e2e2e;
  border-radius: 10px;
  background: #2e2e2e;
  color: #fff;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    width: 340px;
    height: 238px;
    margin-bottom: 40px;
  }
  .time {
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
    max-width: 80%;
    line-height: 1.2;
    margin-bottom: 10px;
  }
  .price {
    font-size: 3rem;
    font-weight: 600;
    text-align: center;
    max-width: 80%;
    line-height: 1.2;
    margin-bottom: 15px;
  }
  .discountPrice {
    font-size: 3rem;
    font-weight: 600;
    text-align: center;
    max-width: 80%;
    line-height: 1.2;
  }
  .comment {
    font-size: 1.2rem;
    text-align: center;
    line-height: 1.2;
    width: 90%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .popular-badge {
    position: absolute;
    top: -15px;
    left: 0;
    text-align: center;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    span {
      text-align: center;
      background: #f2b135;
      font-size: 1.2rem;
      color: #000000;
      padding: 4px 10px;
      border-radius: 15px;
    }
  }
  &.popular {
    border: 2px solid #f2b135;
  }
  @media (max-width: 800px) {
    .time {
      margin-bottom: 10px;
    }
    .price {
      margin-bottom: 15px;
    }
    .comment {
      width: 70%;
    }
  }
`;

const Syllabus = styled.div`
  width: 540px;
  font-size: 1.8rem;
  h3 {
    font-size: 2.4rem;
    line-height: 1.4;
    color: #f2b135;
  }
  margin-bottom: 70px;
  @media (max-width: 800px) {
    width: 95%;
    font-size: 1.4rem;
    h3 {
      font-size: 2rem;
      line-height: 1.4;
    }
  }
`;

const BannerOffer = (props) => {
  const { me, offer, coursePageId } = props;
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [update, setUpdate] = useState(false);
  const [purchaseType, setPurchaseType] = useState();
  const [revealSyllabus, setRevealSyllabus] = useState(false);
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

  // Intersection Observer callback
  const intersectionObserverCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // console.log("visible");
      } else {
        setIsVisible(false);
        // console.log("not visible");
      }
    });
  }, []);

  const fireMutation = () => {
    if (!mutationFired && props.story) {
      setMutationFired(true);
      // console.log("fire");
      // sendMessage({
      //   variables: {
      //     userId: me.id,
      //     subject: "для вас спец предложение от BeSavvy",
      //     coursePageId: coursePageId,
      //     link: `https://www.besavvy.app/coursePage?id=${coursePageId}&down=bcd`,
      //     comment: "offer",
      //     text: `
      //       <p>Здравствуйте,</p>
      //       <p>Хотим продублировать специальное предложение, которое мы сделали вам на сайте besavvy.app.</p>
      //       <p>Вы можете продолжить изчать курс <b>"${props.coursePage.title}"</b> со скидкой: за <b>${offer.discountPrice}</b> вместо ${props.coursePage.price}.</p>
      //       <p>Предложение действует следующие <b>24 часа.</b></p>
      //       <p>Информацию по курсу, а также возможность воспользоваться скидкой ищите <b><a target="_blank" href="https://www.besavvy.app/coursePage?id=${coursePageId}&down=bcd">по этой ссылке</a></b>.</p>
      //       <p>Кстати по этой же ссылке можно продолжить проходить бесплатную часть курса.</p>
      //       <p>Спасибо, что пользуетесь нашими продуктами.</p>
      //     `,
      //   },
      // });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fireMutation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [bannerRef]);

  const [
    createOrder,
    { data: order_data, loading: loading_data, error: error_data },
  ] = useMutation(CREATE_ORDER_MUTATION);

  const getResult = (data) => {
    props.getResult(data);
  };

  const passUpdated = () => {
    props.passUpdated(true);
  };

  const switchUpdate = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    router.locale === "ru" ? moment.locale("ru") : moment.locale("en");
    const timer = initializeTimer();
    return () => clearInterval(timer);
  }, []);

  const initializeTimer = () => {
    const addDays = (numOfDays, date = new Date()) => {
      date.setDate(date.getDate() + numOfDays);
      return date;
    };

    const tomorrow = addDays(1);
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = tomorrow - now;

      setTimeRemaining({
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return timer;
  };

  const handleButtonClick1 = async () => {
    setPurchaseType("part");
    const res = await createOrder({
      variables: {
        coursePageId: offer.courseId,
        price: offer.discountPrice,
        userId: me.id,
      },
    });
    location.href = res.data.createOrder.url;
  };

  const handleButtonClick2 = async () => {
    // if (offer.courseId) {
    setPurchaseType("full");
    const res = await createOrder({
      variables: {
        coursePageId: offer.courseId,
        price: offer.price,
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

    alert("Спасибо, скоро пришлем больше информации о курсе.");
  };
  function parseStringToArray(input) {
    const separatedArray = input.split(",").map((item) => item.trim());
    return separatedArray;
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

  function formatIntegerWithSpace(number) {
    const numberString = number.toString();
    const length = numberString.length;

    if (length <= 3) {
      return numberString;
    }

    const hundreds = numberString.slice(-3);
    const thousands = numberString.slice(0, length - 3);

    return `${thousands} ${hundreds}`;
  }
  return (
    <Styles ref={bannerRef}>
      {props.updateMode && (
        <button onClick={(e) => setUpdate(true)}>Update</button>
      )}
      <BiggerBlock>
        <Block>
          <Inner>
            {/* <div className="emoji">👋 ⭐️ 🔥</div> */}
            <div className="cta">{parse(offer.header)}</div>

            <Container>
              {/* <IconContainer>
                <i className="fas fa-folder-open"></i>
              </IconContainer> */}
              <TextContainer>
                <div className="rows">
                  {parseStringToArray(offer.text).map((val) => (
                    <div className="row">
                      <div className="img">
                        <img src="static/tick_check.svg" />
                      </div>
                      <div>{val}</div>
                    </div>
                  ))}
                </div>
              </TextContainer>
            </Container>
            {offer.program && (
              <>
                <div
                  className="syllabus"
                  onClick={(e) => setRevealSyllabus(!revealSyllabus)}
                >
                  <div className="img">
                    <img src="static/down-arrow2.svg" />
                  </div>
                  <div>Показать программу</div>
                </div>
                {revealSyllabus && (
                  <Syllabus>
                    {offer.program?.syllabus?.modules.map((m) => (
                      <>
                        <h3>{m.header}</h3>
                        <div>
                          {m.topic.map((t) => (
                            <li>{t}</li>
                          ))}
                        </div>
                      </>
                    ))}
                  </Syllabus>
                )}
              </>
            )}
            <Prices>
              {offer?.program && (
                <PriceBox>
                  <div className="time">
                    {offer?.program?.months}{" "}
                    {getNoun(
                      offer?.program?.months,
                      "месяц",
                      "месяца",
                      "месяцев"
                    )}
                  </div>
                  <div className="price">
                    {formatIntegerWithSpace(offer.price)} ₽
                  </div>
                  <Buttons>
                    <Button id="first" onClick={(e) => handleButtonClick2()}>
                      {loading_data && purchaseType == "full"
                        ? "Готовим оплату..."
                        : "Открыть доступ"}
                    </Button>
                  </Buttons>
                </PriceBox>
              )}
              <PriceBox className="popular">
                <div className="popular-badge">
                  <span>Популярный</span>
                </div>
                <div className="time">1 месяц</div>
                <div className="discountPrice">
                  {formatIntegerWithSpace(offer.discountPrice)} ₽
                </div>
                {/* <div className="comment">
                  <u>
                    {formatIntegerWithSpace(parseInt(offer.discountPrice / 2))}{" "}
                    ₽
                  </u>{" "}
                  за следующий месяц, если пригласите друга
                </div> */}
                <Buttons>
                  <Button id="first" onClick={(e) => handleButtonClick1()}>
                    {loading_data && purchaseType == "part"
                      ? "Готовим оплату..."
                      : "Открыть доступ"}
                  </Button>
                </Buttons>
              </PriceBox>
              <PriceBox>
                <div className="time">У меня остались вопросы..</div>
                <Buttons>
                  <Button id="first" onClick={(e) => handleButtonClick3()}>
                    {loading ? "..." : "Задать вопрос"}
                  </Button>
                </Buttons>
              </PriceBox>
            </Prices>
          </Inner>
        </Block>
      </BiggerBlock>
      {update && (
        <UpdateOffer
          offer={offer}
          id={offer.id}
          getResult={getResult}
          switchUpdate={switchUpdate}
          passUpdated={passUpdated}
        />
      )}
    </Styles>
  );
};

export default BannerOffer;
