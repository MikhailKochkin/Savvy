import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import moment from "moment";
import renderHTML from "react-render-html";

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
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const router = useRouter();
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
  const getEngNoun = (number, one, two) => {
    let n = Math.abs(number);
    if (n == 1) {
      return one;
    }
    if (n > 1) {
      return two;
    }
  };

  const getNoun = (number, one, two, five) => {
    let n = Math.abs(number);
    n %= 100;
    if (n == 0 || (n >= 5 && n <= 20)) {
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
  router.locale == "ru" ? moment.locale("ru") : moment.locale("en");
  return (
    <Styles>
      <BiggerBlock>
        <Block>
          <Inner>
            <div className="emoji">👋 💣 🔥</div>
            <div className="cta">
              {renderHTML(offer.header)}
              {/* Get full access to the course */}
            </div>

            {/* <div className="main_text">
              Join 10,000+ teams creating better experiences 14-Day Free Trial,
              with an extra 30-Day Money Back Guarantee!
              Оплатите полный доступ сейчас со скидкой -30% и:
            </div> */}
            <ul className="list">
              {renderHTML(offer.text)}
              {/* <li>
                Стоимость курса сегодня: <b>6990</b> вместо 10 000 Р
              </li>
              <li>
                {" "}
                20 уроков: занимайтесь в удобное время с бессрочным доступом
              </li>
              <li>Задавайте вопросы авторам и приходите на встречи с ними</li>
              <li>Общайтесь и учитесь с 400+ студентами BeSavvy Lawyer</li> */}
            </ul>
            <div>
              <Button
                onClick={async (e) => {
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
                    let number;
                    if (!me.number) {
                      number = prompt("Please type your phone number: ");
                    } else {
                      number = me.number;
                    }
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
                }}
              >
                {loading_data ? "..." : t("buy_at_discount")}
                {/* Buy */}
              </Button>
            </div>
            <TimeLeft>
              <div id="clock">
                <div className="clock_start">{t("time_left")}</div>
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
