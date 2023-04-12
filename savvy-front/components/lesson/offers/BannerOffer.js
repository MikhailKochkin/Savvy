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
  width: 100vw;
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
    height: 520px;
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

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  font-size: 1.6rem;
  background: #fcc417;
  border: 1px solid #fcc417;
  color: #000000;
  box-sizing: border-box;
  border-radius: 10px;
  width: 220px;
  height: 45px;
  /* margin-right: 20px; */
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
    &#first {
      margin-bottom: 10px;
    }
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
    if (!mutationFired && props.story) {
      setMutationFired(true);
      console.log("fire");
      sendMessage({
        variables: {
          userId: me.id,
          subject: "для вас спец предложение от BeSavvy",
          coursePageId: coursePageId,
          link: `https://www.besavvy.app/coursePage?id=${coursePageId}&down=bcd`,
          comment: "offer",
          text: `
            <p>Здравствуйте,</p>
            <p>Хотим продублировать специальное предложение, которое мы сделали вам на сайте besavvy.app.</p>
            <p>Вы можете продолжить изчать курс <b>"${props.coursePage.title}"</b> со скидкой: за <b>${offer.discountPrice}</b> вместо ${props.coursePage.price}.</p>
            <p>Предложение действует следующие <b>24 часа.</b></p>
            <p>Информацию по курсу, а также возможность воспользоваться скидкой ищите <b><a target="_blank" href="https://www.besavvy.app/coursePage?id=${coursePageId}&down=bcd">по этой ссылке</a></b>.</p>
            <p>Кстати по этой же ссылке можно продолжить проходить бесплатную часть курса.</p>
            <p>Спасибо, что пользуетесь нашими продуктами.</p>
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

  const handleButtonClick1 = async () => {
    // if (offer.courseId) {
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
    let number =
      me.number ||
      prompt(
        "Пожалуйста, укажите свой номер телефона, чтобы мы закрепили за вами скидку: "
      );

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

  return (
    <Styles ref={bannerRef}>
      <BiggerBlock>
        <Block>
          <Inner>
            <div className="emoji">👋 💣 🔥</div>
            <div className="cta">{renderHTML(offer.header)}</div>
            <ul className="list">{renderHTML(offer.text)}</ul>
            <Buttons>
              <Button id="first" onClick={handleButtonClick1}>
                {loading_data ? "..." : "Купить со скидкой"}
                {/* t("buy_at_discount") */}
              </Button>
              <Button onClick={handleButtonClick2}>
                {loading ? "..." : "Заморозить скидку"}
              </Button>
            </Buttons>
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
