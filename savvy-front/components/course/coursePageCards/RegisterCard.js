import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TakeMyMoney from "../../TakeMyMoney";
import EnrollCoursePage from "../../EnrollCoursePage";
import moment from "moment";
import BuyDummy from "../BuyDummy";
import Package from "./Package";
import ReactResizeDetector from "react-resize-detector";
import Modal from "styled-react-modal";
import { Specials } from "../../../config";
import { withTranslation } from "../../../i18n";

const Data = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  width: 350px;
  min-height: 290px;
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
  .message {
    text-align: center;
    margin-bottom: 10%;
  }
`;

const Part2 = styled.div``;

const Text = styled.div`
  margin: 4% 4%;
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
  max-width: 320px;
  grid-template-columns: 90% 10%;
  grid-template-areas: "Title ." "Self Price1" "Teacher Price2" "Friend1 Price3" "Friend2 Price4";
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
    padding-right: 10px;
    font-size: 1.6rem;
    span {
      text-decoration: underline;
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
  max-width: 70%;
  min-width: 1100px;
  height: 80%;
  @media (max-width: 800px) {
    min-width: 90%;
    height: 75%;
    margin: 10px;
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

  const onResize = (width) => {
    setWidth(width);
  };

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const promos = [];
  if (props.coursePage.promocode[0]) {
    props.coursePage.promocode[0].map((el) => promos.push(Object.keys(el)[0]));
  }
  const handlePromo = (p) => {
    if (promos.includes(p) && !used && price < 5000) {
      let pro = props.coursePage.promocode[0].filter(
        (el) => Object.keys(el)[0] === p
      );
      setPrice(price * Object.values(pro[0])[0]);
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
  me && me.orders.filter((o) => o.coursePage.id === coursePage.id).length > 0
    ? (applied = true)
    : (applied = false);

  let the1 = Specials.find((el) => el.courses.includes(coursePage.id));
  return (
    <>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <Data>
        <Description>
          <div className="title">{props.t("choose_plan")}</div>
          <div>{props.t("life")}</div>
          <div>{props.t("access")}</div>
          <div>{props.t("services")}</div>
          <div>{props.t("exclusive")}</div>
          <div>{props.t("career")}</div>
        </Description>
        <Payment>
          <Header>
            {
              <>
                {discountPrice && price !== "Бесплатно" && (
                  <>
                    <span className="crossed">{`${price}`}</span>
                    {"        "}
                    {`${discountPrice} ₽`}
                  </>
                )}
                {!discountPrice && price !== "Бесплатно" && <>{`${price} ₽`}</>}
                {!discountPrice && price === "Бесплатно" && <>{`Бесплатно`}</>}
              </>
            }
          </Header>
          <Text>
            <Part1>
              {(coursePage.courseType === "PUBLIC" ||
                coursePage.courseType === "CHALLENGE") && (
                <>
                  <div className="message">
                    Это открытый курс, но вам необходимо на него
                    зарегистрироваться, чтобы получить доступ к урокам. Для
                    этого нажмите кнопку ниже.
                  </div>
                </>
              )}
              {coursePage.courseType === "PRIVATE" && (
                <div className="message">
                  Это закрытый курс. Вам необходимо подать заявку на регистрацию
                  и преподаватель откроет вам доступ.
                </div>
              )}
              {coursePage.courseType === "FORMONEY" && (
                <>
                  <GridContainer>
                    <div className="Title">{props.t("plan-choose")}</div>
                    <div />
                    <div className="Self">
                      🏎 <span>{props.t("basic")}</span>
                    </div>
                    <input
                      className="Price1"
                      type="radio"
                      value={props.price}
                      name="price"
                      onChange={(e) => {
                        setPack(0),
                          setPrice(props.price),
                          setUsed(false),
                          setDiscountPrice(props.discountPrice);
                      }}
                    />
                    {props.subscriptionPrice && (
                      <div className="Teacher">
                        🚀{" "}
                        {props.subscription
                          ? props.t("subscription")
                          : props.t("advanced")}
                      </div>
                    )}
                    {/* {the1 && (
                      <div
                        className="Package"
                        onClick={(e) => {
                          if (me) {
                            setIsOpen(!isOpen);
                          } else {
                            alert("Необходимо зарегистрироваться");
                          }
                        }}
                      >
                        Купить пакетом
                      </div>
                    )} */}
                    {props.subscriptionPrice && (
                      <input
                        className="Price2"
                        type="radio"
                        name="price"
                        value={props.subscriptionPrice}
                        onChange={(e) => {
                          setPack(0),
                            setPrice(props.subscriptionPrice),
                            setUsed(false),
                            props.discountPrice
                              ? setDiscountPrice(props.discountPrice * 1.75)
                              : null;
                        }}
                      />
                    )}
                  </GridContainer>
                </>
              )}
            </Part1>
            <Part2>
              {coursePage.courseType !== "PUBLIC" &&
                coursePage.courseType !== "CHALLENGE" && (
                  <Input
                    name="promo"
                    onChange={(e) => handlePromo(e.target.value)}
                    placeholder="Введите промокод"
                  />
                )}
              {applied && (
                <Paid>
                  Мы получили вашу заявку. Если оплата прошла, то скоро откроем
                  доступ. Если оплата не прошла, вы можете провести ее еще раз и
                  мы откроем доступ.
                </Paid>
              )}
              {!me && <BuyDummy>{props.t("signin")}</BuyDummy>}
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
                      {props.t("buy")}
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
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={(e) => setIsOpen(!isOpen)}
        onEscapeKeydown={(e) => setIsOpen(!isOpen)}
      >
        <Package
          coursePage={coursePage}
          me={me}
          teacher={the1 ? the1.teacher : null}
          discounts={the1 ? the1.discounts : null}
        />
      </StyledModal>
    </>
  );
};

export default withTranslation("course")(RegisterCard);
