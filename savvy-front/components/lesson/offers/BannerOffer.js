import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import moment from "moment";
import renderHTML from "react-render-html";

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
  width: 100%;
  height: 600px;
  background: #1c1e29;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
  margin-bottom: 80px;
  @media (max-width: 800px) {
    height: 600px;
  }
`;

const BiggerBlock = styled.div`
  width: 580px;
  height: 415px;
  background: #fff;
  border: 2px solid #fff;
  background: none;
  border-radius: 40px;
  @media (max-width: 800px) {
    width: 340px;
    height: 440px;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 580px;
  height: 415px;
  transform: rotate(-3deg);
  background: #fff;
  border-radius: 40px;
  @media (max-width: 800px) {
    width: 100%;
    transform: rotate(-2deg);
    margin: 0;
    height: 100%;
  }
`;

const Inner = styled.div`
  transform: rotate(3deg);
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .emoji {
    font-size: 2.6rem;
  }
  .cta {
    font-size: 2rem;
    font-weight: 600;
    margin: 10px 0;
    line-height: 1.4;
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
    transform: rotate(2deg);
    padding: 20px;
    width: 100%;
    .list {
      line-height: 1.5;
      font-size: 1.4rem;
    }
    .cta {
      margin: 5px 0;
    }
  }
`;

const Button = styled.button`
  font-size: 1.6rem;
  background: #fcc417;
  border: 1px solid #fcc417;
  color: #000000;
  box-sizing: border-box;
  border-radius: 10px;
  width: 280px;
  height: 45px;
  cursor: pointer;
  font-family: Montserrat;
  outline: 0;
  transition: 0.3s;
  /* max-width: 180px; */
  &:hover {
    background-color: #dea702;
    border: 1px solid #dea702;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const TimeLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  #clock {
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
    .clock_start {
      margin-right: 15px;
      min-width: 120px;
    }
    .clock_section {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
      .clock_time {
        font-size: 1.4rem;
        font-weight: 600;
        margin-right: 5px;
      }
      .clock_name {
        font-size: 1.2rem;
        font-weight: 400;
      }
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    #clock {
      width: 280px;
      font-size: 1.4rem;
      margin-top: 10px;

      .clock_start {
        margin-right: 5px;
      }
      .clock_section {
        margin-right: 10px;

        .clock_time {
          margin-right: 5px;
        }
      }
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
        console.log("visible");
      } else {
        setIsVisible(false);
        console.log("not visible");
      }
    });
  }, []);

  const fireMutation = () => {
    if (!mutationFired) {
      setMutationFired(true);
      console.log("fire");
      sendMessage({
        variables: {
          userId: me.id,
          subject: "для вас спец предложение от BeSavvy",
          coursePageId: coursePageId,
          link: `https://www.besavvy.app/coursePage?id=${coursePageId}`,
          comment: "offer",
          text: `
            <p>Мы хотим сообщить вам о нашей новой акции на курс "<название курса>". В течение следующих 24 часов, вы можете приобрести курс со скидкой 30% по ссылке:</p>
<p><a href="https://www.besavvy.app/coursePage?id=${coursePageId}">Купить курс</a></p>
<p>Курс "<название курса>" поможет вам улучшить ваши знания и навыки в <тематика курса>. Наши эксперты сделали его доступным для всех, кто хочет узнать больше о <тематика курса>. Вы сможете учиться на своем собственном темпе, в любое время и в любом месте.</p>
<p>Если вы не уверены, что курс "<название курса>" подходит именно вам, мы приглашаем вас ознакомиться с отзывами других наших клиентов по ссылке:</p>
<p><a href="https://example.com/course/reviews">Отзывы клиентов</a></p>
<p>Не упустите свой шанс на приобретение курса "<название курса>" со скидкой 30%. Это предложение закончится через 24 часа!</p>
<p>Спасибо за ваше внимание.</p>
<p>С уважением,
Команда Example.</p>
          `,
        },
      });
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

  const handleButtonClick = async () => {
    if (offer.courseId) {
      const res = await createOrder({
        variables: {
          coursePageId: offer.courseId,
          price: offer.discountPrice,
          userId: me.id,
        },
      });
      location.href = res.data.createOrder.url;
    } else {
      let number = me.number || prompt("Please type your phone number: ");

      const res = await createBusinessClient({
        variables: {
          email: me.email,
          name: me.name + " " + me.surname,
          number: number,
          coursePageId: coursePageId,
        },
      });

      alert("Thank you! We will be in touch soon!");
    }
  };

  return (
    <Styles ref={bannerRef}>
      <BiggerBlock>
        <Block>
          <Inner>
            <div className="emoji">👋 💣 🔥</div>
            <div className="cta">{renderHTML(offer.header)}</div>
            <ul className="list">{renderHTML(offer.text)}</ul>
            <div>
              <Button onClick={handleButtonClick}>
                {loading_data ? "..." : t("buy_at_discount")}
              </Button>
            </div>
            <TimeLeft>
              <div id="clock">
                <div className="clock_start">{t("time_left")}</div>
                <div className="clock_section">
                  <div className="clock_time">{timeRemaining.hours}</div>
                  <div>{t("hour_short")}.</div>
                </div>
                <div className="clock_section">
                  <div className="clock_time">{timeRemaining.minutes}</div>
                  <div>{t("minute_short")}.</div>
                </div>
                <div className="clock_section">
                  <div className="clock_time">{timeRemaining.seconds}</div>
                  <div>{t("second_short")}.</div>
                </div>
              </div>
            </TimeLeft>
          </Inner>
        </Block>
      </BiggerBlock>
    </Styles>
  );
};

export default BannerOffer;
