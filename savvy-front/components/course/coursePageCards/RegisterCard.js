import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TakeMyMoney from "../../TakeMyMoney";
import EnrollCoursePage from "../../EnrollCoursePage";
import moment from "moment";
import BuyDummy from "../BuyDummy";
import ReactResizeDetector from "react-resize-detector";
import Modal from "styled-react-modal";
import { useTranslation } from "next-i18next";

const Data = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px 0;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    padding: 3%;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(36, 101, 255, 0.1);
  padding: 4%;
  box-sizing: border-box;
  width: 350px;
  min-height: 290px;
  max-height: 400px;
  .title {
    font-weight: bold;
    font-size: 1.7rem;
    line-height: 1.4;
    margin-bottom: 2%;
  }
  @media (max-width: 800px) {
    margin-bottom: 8%;
    width: 100%;
  }
`;

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  background: #ffffff;
  box-sizing: border-box;
  width: 350px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Header = styled.div`
  font-size: 2.4rem;
  padding-bottom: 4%;
  padding-top: 4%;
  line-height: 1.4;
  background: rgba(36, 101, 255, 0.1);
  margin: 0;
  text-align: center;
  /* margin-bottom: 50px; */
  .crossed {
    text-decoration: line-through;
    font-size: 1.8rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 3%;
  border-radius: 5px;
  outline: 0;
  border: 1px solid #edefed;
  font-size: 1.4rem;
`;

const Part1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .message {
    text-align: center;
    margin-bottom: 10%;
    margin: 0 10px;
    font-size: 1.6rem;
  }
`;

const Part2 = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const Paid = styled.div`
  background: #fdf3c8;
  padding: 1% 3%;
  border-radius: 5px;
  font-size: 1.4rem;
  margin-top: 2%;
`;

const GridContainer = styled.div`
  display: grid;
  width: 320px;
  grid-template-columns: 90% 10%;
  grid-template-areas: "Title ." "Self Price1" "Teacher Price2" "Friend1 Price3" "Friend2 Price4";
  @media (max-width: 800px) {
    padding: 0 10px;
  }
  div {
    padding-bottom: 15px;
  }
  .Package {
    margin-bottom: 1%;
    padding: 1%;
    font-weight: bold;
    display: inline-block;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .Title {
    grid-area: Title;
    font-size: 1.6rem;
  }
  .Teacher {
    grid-area: Teacher;
    font-size: 1.6rem;
    padding: 0;
    margin-bottom: 10px;

    span {
      height: 100%;
      padding-left: 5px;
    }
  }
  .Friend1 {
    grid-area: Friend1;
    padding-right: 10px;
    font-size: 1.6rem;
    span {
      text-decoration: underline;
    }
  }
  .Friend2 {
    grid-area: Friend2;
    padding-right: 10px;
    font-size: 1.6rem;
    span {
      text-decoration: underline;
    }
  }
  .Self {
    grid-area: Self;
    font-size: 1.6rem;
    padding: 0;
    margin-bottom: 10px;
    span {
      height: 100%;
      padding-left: 5px;
    }
  }
  .Emoji {
    margin-right: 10px;
  }
  .Price1 {
    margin-top: 10px;
    grid-area: Price1;
  }
  .Price2 {
    margin-top: 10px;
    grid-area: Price2;
  }
  .Price3 {
    margin-top: 10px;
    grid-area: Price3;
  }
  .Price4 {
    margin-top: 10px;
    grid-area: Price4;
  }
`;

const Time = styled.div`
  /* border: 1px solid #e4e4e4; */
  width: 100%;
  background: #00b4db; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #0083b0,
    #00b4db
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #0083b0,
    #00b4db
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: white;
  margin-bottom: 20px;
  font-size: 2rem;
  text-align: center;
  padding: 0.5%;
  .comment {
    font-size: 1.6rem;
  }
`;

const StyledModal = Modal.styled`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  max-width: 40%;
  min-width: 400px;
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

const calculateTimeLeft = () => {
  moment.locale("ru");
  let now = moment(new Date());
  let then = new Date("06/2/2020 06:00:00");
  const difference = then - now;
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = [
      Math.floor(difference / (1000 * 60 * 60 * 24)),
      String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
      String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    ];
  }

  return timeLeft;
};

const RegisterCard = (props) => {
  const [price, setPrice] = useState(props.price);
  const [discountPrice, setDiscountPrice] = useState(props.discountPrice);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [pack, setPack] = useState(2);
  const [width, setWidth] = useState(0);
  const [used, setUsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("course");

  const onResize = (width) => {
    setWidth(width);
  };

  const handlePromo = (p) => {
    if (
      props.promocode &&
      props.promocode.promocodes.some((pr) => pr.name == p) &&
      !used
    ) {
      let pro = props.promocode.promocodes.find((pr) => pr.name == p);
      setPrice(price * pro.value);
      setUsed(true);
    } else {
      null;
    }
  };

  let day;
  if (timeLeft[0] > 1) {
    day = "дня";
  } else if (timeLeft[0] === 1) {
    day = "день";
  } else if (timeLeft[0] === 0) {
    day = "дней";
  }

  let left;
  if (timeLeft[0] > 1) {
    left = "Осталось";
  } else if (timeLeft[0] === 1) {
    left = "Остался";
  } else if (timeLeft[0] === 0) {
    left = "Осталось";
  }
  const { coursePage, me, studentsArray, subjectArray } = props;
  let applied;
  me &&
  me.orders.filter(
    (o) => o.coursePage.id === coursePage.id && o.isPaid === null
  ).length > 0
    ? (applied = true)
    : (applied = false);

  return (
    <>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <Data>
        <Payment>
          <Text>
            <Part1>
              {(coursePage.courseType === "PUBLIC" ||
                coursePage.courseType === "CHALLENGE") && (
                <>
                  <div className="message">{t("open_course")}</div>
                </>
              )}
              {(coursePage.courseType === "PRIVATE" ||
                coursePage.courseType === "FORMONEY") && (
                <div className="message">{t("private_course")}</div>
              )}
            </Part1>
            <Part2>
              {applied && <Paid>{t("applied")}</Paid>}
              {me && (
                <>
                  {coursePage.courseType === "FORMONEY" && (
                    <TakeMyMoney
                      coursePage={coursePage}
                      coursePageID={coursePage.id}
                      name={me.name}
                      user={me.id}
                      price={
                        discountPrice
                          ? parseInt(discountPrice)
                          : parseInt(price)
                      }
                    >
                      {t("enroll")}
                    </TakeMyMoney>
                  )}
                  {coursePage.courseType !== "FORMONEY" && (
                    <EnrollCoursePage
                      coursePage={coursePage}
                      studentsArray={studentsArray}
                      subjectArray={subjectArray}
                      meData={me}
                    />
                  )}
                </>
              )}
            </Part2>
          </Text>
        </Payment>
      </Data>
    </>
  );
};

// export default withTranslation("course")(RegisterCard);
export default RegisterCard;
