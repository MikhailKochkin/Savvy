import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import moment from "moment";
import parse from "html-react-parser";

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

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION(
    $subject: String
    $name: String
    $email: String
    $firm: String
    $connection: String
    $type: String
  ) {
    sendBusinessEmail(
      subject: $subject
      name: $name
      email: $email
      firm: $firm
      connection: $connection
      type: $type
    ) {
      name
    }
  }
`;

const Styles = styled.div`
  width: 100%;
  height: 750px;
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
      margin-bottom: 5px;
    }
    .cta {
      margin: 5px 0;
      line-height: 1.3;
    }
  }
`;

const Button = styled.button`
  font-size: 1.6rem;
  background: #fcc417;
  border: 1px solid #fcc417;
  color: #000000;
  font-weight: 500;
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
      min-width: 160px;
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
      margin: 5px 0;

      .clock_start {
        margin-right: 5px;
        min-width: 120px;
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
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isEmailSent, setIsEmailSent] = useState(false); // State to manage if the email is sent

  const router = useRouter();
  const bannerRef = useRef(null);

  const [sendBusinessEmail, { data: d1, loading: l1, error: er1 }] =
    useMutation(SEND_MESSAGE_MUTATION);

  const addDays = (numOfDays, date = new Date()) => {
    date.setDate(date.getDate() + numOfDays);
    return date;
  };
  let tomorrow = addDays(1);
  tomorrow.setHours(0);
  tomorrow.setMinutes(0);
  tomorrow.setSeconds(0);
  const [
    createOrder,
    { data: order_data, loading: loading_data, error: error_data },
  ] = useMutation(CREATE_ORDER_MUTATION);
  const [createBusinessClient, { data, loading, error }] =
    useMutation(CREATE_CLIENT);
  const { t } = useTranslation("lesson");

  useEffect(() => {
    const interval = setInterval(() => {
      var countDownDate = tomorrow; // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days_calculation = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours_calculation = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes_calculation = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      var seconds_calculation = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result
      setDays(days_calculation);
      setHours(hours_calculation);
      setMinutes(minutes_calculation);
      setSeconds(seconds_calculation);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           if (isEmailSent || !props.me) return;
  //           const res = sendBusinessEmail({
  //             variables: {
  //               subject: "New Offer Banner Reach",
  //               email: "mikhail@besavvy.app",
  //               type: "internal",
  //               name: "Mikhail",
  //               connection: `I noticed ${props.me.name} ${props.me.surname} (${props.me.email}) reached the offer banner in ${props.coursePage?.title}`,
  //             },
  //           });
  //           setIsEmailSent(true);
  //           observer.disconnect();
  //         }
  //       });
  //     },
  //     { threshold: 0.1 } // Adjust the threshold as needed
  //   );

  //   if (bannerRef.current) {
  //     observer.observe(bannerRef.current);
  //   }

  //   return () => {
  //     if (bannerRef.current) {
  //       observer.unobserve(bannerRef.current);
  //     }
  //   };
  // }, []);

  router.locale == "ru" ? moment.locale("ru") : moment.locale("en");
  return (
    <Styles id="offer_id" ref={bannerRef}>
      <BiggerBlock>
        <Block>
          <Inner>
            <div className="emoji">👋 💣 🔥</div>
            <div className="cta">
              А вы знаете, что можете получить доступ еще к десятку таких
              уроков?
              {/* Get full access to the course */}
            </div>

            {/* <div className="main_text">
              Join 10,000+ teams creating better experiences 14-Day Free Trial,
              with an extra 30-Day Money Back Guarantee!
              Оплатите полный доступ сейчас со скидкой -30% и:
            </div> */}
            <ul className="list">
              <li>А еще к занятиям с автором курса</li>
              <li>Симуляторам собеседований и юр проектов</li>
              <li>Ответам на все вопросы в чате</li>
              <p> А стоить это будет всего 1990 рублей в месяц!</p>
            </ul>
            <div>
              <Button
                onClick={(e) => {
                  router.push("/subscription", {
                    locale: "ru",
                  });
                }}
              >
                Узнать подробности
              </Button>
            </div>
            <TimeLeft>
              <div id="clock">
                <div className="clock_start">До конца акции</div>
                <div className="clock_section">
                  <div className="clock_time">{hours}</div>
                  <div>{t("hour_short")}.</div>
                </div>
                <div className="clock_section">
                  <div className="clock_time">{minutes}</div>
                  <div>{t("minute_short")}.</div>
                </div>
                <div className="clock_section">
                  <div className="clock_time">{seconds}</div>
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
