import { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import renderHTML from "react-render-html";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import moment from "moment";

import Loading from "../../Loading";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      user {
        id
        image
      }
      authors {
        id
        image
      }
      nextStart
      header
      subheader
      new_students {
        id
      }
    }
  }
`;

const BImage = styled.div`
  /* background-image: url("./static/back_image.png"); */
  width: 100%;
  /* min-height: 90vh; */
  max-height: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-image: url("/static/pattern6.svg");
  background-size: contain;
  @media (max-width: 800px) {
    /* padding: 50px 0; */
    min-height: 60vh;
    background-size: contain;
  }
`;

const InfoBlock = styled.div`
  width: 100%;
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  /* background-image: url("./static/back_image.png"); */
  width: 85%;
  max-width: 1050px;
  margin-top: 50px;
  /* height: 50%; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .date {
    font-weight: bold;
    color: #252f3f;
  }

  h1 {
    font-size: 5.6rem;
    line-height: 1.2;
    /* text-align: center; */
    font-weight: 800;
    margin: 0;
    margin-bottom: 20px;
    color: #252f3f;
    span {
      background: #fce969;
      display: inline-block;
      transform: skew(-8deg);
      /* -webkit-transform: skew(-5deg);
      -moz-transform: skew(-5deg);
      -o-transform: skew(-5deg); */
    }
  }
  h2 {
    font-size: 2.4rem;
    line-height: 1.4;
    /* text-align: center; */
    width: 75%;
    font-weight: 400;
    color: #4b5563;
  }
  @media (max-width: 800px) {
    width: 90%;

    h1 {
      font-size: 3.6rem;
      line-height: 1.4;
    }
    h2 {
      font-size: 2rem;
      width: 100%;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 65%;
  flex-direction: row;
  justify-content: center;
  margin: 30px 0;
  #atf_look_at_syllabus_button {
    width: 45%;
    height: 50px;
    font-size: 2rem;
    font-family: Montserrat;
    background-color: #dedede;
    border: 1px solid #dedede;
    border-radius: 8px;
    transition: 0.2s ease-in;
    cursor: pointer;
    &:hover {
      background: #c2c2c2;
    }
  }
  #atf_buy_button {
    width: 45%;
    margin-left: 50px;
    background: #175ffe;
    color: #fff;
    border-radius: 5px;
    border: none;
    height: 50px;
    font-size: 2rem;
    outline: 0;
    cursor: pointer;
    font-family: Montserrat;
    transition: 0.3s;
    &:hover {
      background: #0135a9;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    #atf_look_at_syllabus_button {
      width: 100%;
      margin-bottom: 20px;
    }
    #atf_buy_button {
      width: 100%;
      margin-left: 0;
    }
  }
`;

const TimeLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  #clock {
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .clock_section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 300px;
      .clock_time {
        font-size: 3rem;
        font-weight: 600;
      }
      .clock_name {
        font-size: 1.8rem;
        font-weight: 400;
      }
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    #clock {
      width: 100vw;
      .clock_section {
        width: 25%;
      }
    }
  }
`;

const NextMeeting = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .image_container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-right: 15px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
      object-fit: cover;
      border: 1px solid #dde2e1;
    }
  }
`;

const ATF = (props) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const { t } = useTranslation("coursePage");
  const router = useRouter();

  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.id },
  });

  if (loading) return <Loading />;

  const course = data.coursePage;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     var countDownDate = new Date(d.start_eng).getTime(); // Get today's date and time
  //     var now = new Date().getTime();

  //     // Find the distance between now and the count down date
  //     var distance = countDownDate - now;

  //     // Time calculations for days, hours, minutes and seconds
  //     var days_calculation = Math.floor(distance / (1000 * 60 * 60 * 24));
  //     var hours_calculation = Math.floor(
  //       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //     );
  //     var minutes_calculation = Math.floor(
  //       (distance % (1000 * 60 * 60)) / (1000 * 60)
  //     );
  //     var seconds_calculation = Math.floor((distance % (1000 * 60)) / 1000);

  //     // Display the result
  //     setDays(days_calculation);
  //     setHours(hours_calculation);
  //     setMinutes(minutes_calculation);
  //     setSeconds(seconds_calculation);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

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

  moment.locale("ru");
  console.log("course.nextStart", course.nextStart);
  return (
    <div id="ATF">
      <BImage>
        {/* <Image src={`/static/${d.image}`} layout="fill" /> */}
        <InfoBlock>
          <Container>
            {/* <div>
              Рейтинг: ⭐️⭐️⭐️⭐️⭐️, число студентов:{" "}
              {course.new_students.length}
            </div> */}
            <h1>
              {course.header.length > 0 ? renderHTML(course.header[0]) : ""}
            </h1>
            <h2>
              {course.subheader.length > 0
                ? renderHTML(course.subheader[0])
                : ""}
            </h2>
            {/* <div>Курс актуален на 1 августа 2022 года</div> */}
            <NextMeeting>
              <div className="image_container">
                {course.authors.length > 0 ? (
                  course.authors.map((auth) => <img src={auth.image} />)
                ) : (
                  <img src={course.user.image} />
                )}
              </div>
              <div>
                Следующий вебинар{" "}
                {course.authors.length > 1 ? "авторов" : "автора"} –
                <span className="date">
                  {" "}
                  {moment(course.nextStart).format("LL")}
                </span>
              </div>
            </NextMeeting>

            {/* <Buttons>
              <button id="atf_look_at_syllabus_button" onClick={(e) => slide()}>
                {t("syllabus")}
              </button>
              <button id="atf_buy_button" onClick={(e) => slide2()}>
                {t("enroll")}
              </button>
            </Buttons> */}
            {/* <TimeLeft>
              <div id="clock">
                <div className="clock_section">
                  <div className="clock_time">{days}</div>
                  <div className="clock_name">
                    {router.locale == "en"
                      ? getEngNoun(days, "day", "days")
                      : getNoun(days, "день", "дня", "дней")}
                  </div>
                </div>
                <div className="clock_section">
                  <div className="clock_time">{hours}</div>
                  <div className="clock_name">
                    {router.locale == "en"
                      ? getEngNoun(days, "hour", "hours")
                      : getNoun(hours, "час", "часа", "часов")}
                  </div>
                </div>
                <div className="clock_section">
                  <div className="clock_time">{minutes}</div>
                  <div className="clock_name">
                    {router.locale == "en"
                      ? getEngNoun(minutes, "minute", "minutes")
                      : getNoun(minutes, "минута", "минуты", "минут")}
                  </div>
                </div>
                <div className="clock_section">
                  <div className="clock_time">{seconds}</div>
                  <div className="clock_name">
                    {router.locale == "en"
                      ? getEngNoun(seconds, "second", "seconds")
                      : getNoun(seconds, "секунда", "секунды", "секунд")}
                  </div>
                </div>
              </div>
            </TimeLeft> */}
          </Container>
        </InfoBlock>
      </BImage>
    </div>
  );
};

export default ATF;
