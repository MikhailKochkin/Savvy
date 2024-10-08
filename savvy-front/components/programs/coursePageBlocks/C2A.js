import { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

// import Signup from "../../auth/Signup";
// import Signin from "../../auth/Signin";
// import RequestReset from "../../auth/RequestReset";

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

const Image = styled.div`
  width: 100vw;
  min-height: 90vh;
  img {
    object-fit: cover;
    width: 100%;
    min-height: 90vh;
    position: absolute;
  }
  @media (max-width: 800px) {
    background: #0490da;
    padding: 30px 0;
    img {
      display: none;
    }
  }
`;

const InfoBlock = styled.div`
  width: 100%;
  min-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
  }
`;

const Container = styled.div`
  /* background-image: url("./static/back_image.png"); */
  width: 80%;
  height: 85%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    min-height: 100%;
  }
`;

const Info = styled.div`
  width: 45%;
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 4% 4%;
  #plan {
    font-size: 2rem;

    margin-bottom: 15px;
  }
  #call {
    margin-bottom: 25px;
    font-size: 2.2rem;
    line-height: 1.4;
  }
  @media (max-width: 800px) {
    width: 90%;
    margin-bottom: 20px;
  }
`;

const Point = styled.div`
  margin-bottom: 20px;
  .point_header {
    font-size: 1.7rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    .icon {
      margin-right: 12px;
      color: #007a9b;
    }
  }
  .point_text {
    font-size: 1.4rem;
  }
`;

const Price = styled.div`
  width: 100%;
  background: #fff;
  height: 85%;
  box-shadow: 0px 0px 10px rgba(129, 129, 129, 0.45);
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  margin-bottom: 20px;
  .term {
    border-bottom: 1px solid #dbe6ee;
    div {
      padding: 15px 6%;
      span {
        color: #a84fe9;
      }
    }
  }
  .prices {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2% 6%;
    margin-top: 10px;
  }
  .old_price {
    text-decoration: line-through;
    text-decoration-color: #a04159;
    font-size: 2rem;
    margin-bottom: 0;
  }
  .new_price {
    color: #327998;
    font-size: 3rem;
    margin-right: 40px;
  }
  .buttons {
    width: 100%;
    display: flex;
    padding: 2% 6%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    button {
      background: #327998;
      color: #fff;
      border: 1px solid #327998;
      border-radius: 5px;
      width: 290px;
      font-family: Montserrat;
      font-size: 1.7rem;
      font-weight: 400;
      height: 45px;
      cursor: pointer;
      transition: 0.2s ease-in;
      &:hover {
        background: #29617a;
      }
    }
    div {
      font-size: 1.4rem;
      font-weight: 300;
      margin: 20px 0;
      width: 100%;
      line-height: 1.5;
    }
  }
  @media (max-width: 800px) {
    .buttons {
      button {
        width: 90%;
      }
    }
  }
`;

const Referral = styled.div`
  width: 100%;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(129, 129, 129, 0.45);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #dbe6ee;
  margin-top: 20px;
  padding: 20px 0;
  div {
    width: 60%;
    line-height: 1.4;
  }
  button {
    background: #fff;
    border-radius: 10px;
    border: 1px solid #327998;
    width: 90px;
    color: #327998;
    font-family: Montserrat;
    font-size: 1.7rem;
    font-weight: 400;
    height: 40px;
    cursor: pointer;
  }
`;
const Buy = styled.div`
  /* background-image: url("./static/back_image.png"); */
  width: 35%;
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const Headline = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [auth, setAuth] = useState("signin");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const changeState = (dataFromChild) => {
    setAuth(dataFromChild);
  };

  const toggleModal = (e) => setIsOpen(!isOpen);
  const toggleModal2 = (e) => setIsOpen2(!isOpen2);
  const { asPath } = useRouter();

  const [createOrder, { data, loading, error }] = useMutation(
    CREATE_ORDER_MUTATION
  );

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

  useEffect(() => {
    const interval = setInterval(() => {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      var countDownDate = new Date(`${mm} ${dd}, ${yyyy} 23:59:59`).getTime(); // Get today's date and time
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
      setHours(hours_calculation);
      setMinutes(minutes_calculation);
      setSeconds(seconds_calculation);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Image id="c2a">
        <img src="./static/buy_picture.png" />
        <InfoBlock>
          <Container>
            <Info>
              <div id="call">
                Сделайте гражданское право ключом к успешной учебе и карьере.{" "}
              </div>
              <Point>
                <div className="point_header">
                  <div className="icon">
                    {/* <Icon size={20} icon={calendar} /> */}
                  </div>
                  <div>Занятия</div>
                </div>
                <div className="point_text">
                  Занимайтесь в удобное время в течение недели. Участвуйте в
                  воркшопах и лекциях или смотрите их в записи. Программа
                  подстроится под ваши нужды.
                </div>
              </Point>
              <Point>
                <div className="point_header">
                  <div className="icon">
                    {/* <Icon size={20} icon={handshakeO} /> */}
                  </div>
                  <div>Поддержка</div>
                </div>
                <div className="point_text">
                  Это не самостоятельные занятия. Кураторы и служба тех
                  поддержки всегда с вами на связи. Мы пожем разобраться в
                  заданиях или найти ответ на вопрос.
                </div>
              </Point>
            </Info>
            <Buy>
              <Price>
                <div className="term">
                  <div>
                    Учиться в группе – <span>скидка 46%</span>
                  </div>
                </div>
                <div className="prices">
                  <div className="new_price">4 990 ₽</div>
                  <div className="old_price">9 000 ₽</div>
                </div>
                <div className="buttons">
                  {props.me ? (
                    <button
                      id="civil_law_3000_button"
                      onClick={async (e) => {
                        e.preventDefault();

                        const res = await createOrder({
                          variables: {
                            coursePageId: props.coursePageId,
                            price: 3990,
                            userId: props.me.id,
                            // promocode: props.promocode,
                            comment: asPath,
                          },
                          // refetchQueries: [{ query: CURRENT_USER_QUERY }],
                        });

                        location.href = res.data.createOrder.url;
                      }}
                    >
                      {loading ? "Готовим платёж" : "Участвовать"}
                    </button>
                  ) : (
                    <button onClick={(e) => toggleModal2()}>Войти</button>
                  )}
                  <div>
                    До конца акции –{" "}
                    <b>
                      {hours} {getNoun(hours, "час", "часа", "часов")} {minutes}{" "}
                      {getNoun(minutes, "минута", "минуты", "минут")}
                    </b>
                  </div>
                </div>
              </Price>
              <Price>
                <div className="term">
                  <div>
                    Учиться индивидуально – <span>скидка 47%</span>
                  </div>
                </div>
                <div className="prices">
                  <div className="new_price">14 990 ₽</div>
                  <div className="old_price">26 000 ₽</div>
                </div>
                <div className="buttons">
                  {props.me ? (
                    <button
                      id="civil_law_8000_button"
                      onClick={async (e) => {
                        e.preventDefault();

                        const res = await createOrder({
                          variables: {
                            coursePageId: props.coursePageId,
                            price: 14990,
                            userId: props.me.id,
                            // promocode: props.promocode,
                            comment: asPath,
                          },
                          // refetchQueries: [{ query: CURRENT_USER_QUERY }],
                        });

                        location.href = res.data.createOrder.url;
                      }}
                    >
                      {loading ? "Готовим платёж" : "Участвовать"}
                    </button>
                  ) : (
                    <button onClick={(e) => toggleModal2()}>Войти</button>
                  )}
                  <div>
                    До конца акции –{" "}
                    <b>
                      {hours} {getNoun(hours, "час", "часа", "часов")} {minutes}{" "}
                      {getNoun(minutes, "минута", "минуты", "минут")}
                    </b>
                  </div>
                </div>
              </Price>
            </Buy>
          </Container>
        </InfoBlock>
      </Image>
    </div>
  );
};

export default Headline;
