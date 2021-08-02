import { useState } from "react";
import styled from "styled-components";
import { calendar } from "react-icons-kit/fa/calendar";
import { handshakeO } from "react-icons-kit/fa/handshakeO";
import Icon from "react-icons-kit";
import Modal from "styled-react-modal";
import { useMutation, gql } from "@apollo/client";

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
  min-height: 120vh;
  img {
    object-fit: cover;
    width: 100%;
    min-height: 120vh;
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
  min-height: 120vh;
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
      width: 80%;
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

const Buy = styled.div`
  /* background-image: url("./static/back_image.png"); */
  width: 35%;
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const Headline = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = (e) => setIsOpen(!isOpen);

  const [createOrder, { data, loading, error }] = useMutation(
    CREATE_ORDER_MUTATION
  );

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
                    <Icon size={20} icon={calendar} />
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
                    <Icon size={20} icon={handshakeO} />
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
                    Доступ на <b>1</b> месяц – <span>скидка 50%</span>
                  </div>
                </div>
                <div className="prices">
                  <div className="new_price">3000 ₽</div>
                  <div className="old_price">6000 ₽</div>
                </div>
                <div className="buttons">
                  <button
                    onClick={async (e) => {
                      e.preventDefault();

                      const res = await createOrder({
                        variables: {
                          coursePageId: props.coursePageId,
                          price: 3000,
                          userId: props.me.id,
                          // promocode: props.promocode,
                          // comment: props.comment,
                        },
                        // refetchQueries: [{ query: CURRENT_USER_QUERY }],
                      });

                      console.log(res.data.createOrder.url);
                      location.href = res.data.createOrder.url;
                    }}
                  >
                    {loading ? "Готовим платёж" : "Участвовать"}
                  </button>
                  <div>
                    Скидки действуют для первых 20 участников. С нами уже:{" "}
                    <b>7</b>
                  </div>
                </div>
              </Price>
              <Price>
                <div className="term">
                  <div>
                    Доступ на <b>3</b> месяца – <span>скидка 56%</span>
                  </div>
                </div>
                <div className="prices">
                  <div className="new_price">8000 ₽</div>
                  <div className="old_price">18000 ₽</div>
                </div>
                <div className="buttons">
                  <button
                    onClick={async (e) => {
                      e.preventDefault();

                      const res = await createOrder({
                        variables: {
                          coursePageId: props.coursePageId,
                          price: 8000,
                          userId: props.me.id,
                          // promocode: props.promocode,
                          // comment: props.comment,
                        },
                        // refetchQueries: [{ query: CURRENT_USER_QUERY }],
                      });

                      console.log(res.data.createOrder.url);
                      location.href = res.data.createOrder.url;
                    }}
                  >
                    Участвовать
                  </button>
                  <div>
                    Скидки действуют для первых 20 участников. С нами уже:{" "}
                    <b>7</b>
                  </div>
                </div>
              </Price>
              <Referral>
                <div>
                  А с реферральной программой скидка может быть еще больше.
                </div>
                <button onClick={(e) => toggleModal()}>Узнать</button>
              </Referral>
            </Buy>
          </Container>
        </InfoBlock>
      </Image>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <p>
          С нашей новой реферральной программой вы можете учиться практически
          бесплатно.
        </p>{" "}
        После приобретения этого курса, вы получите специальный код, который
        можете передать своим друзьям. После того, как ваш друг оплатит участие
        в программе, вы оба получите бонусные 1000 рублей на следующую покупку
        на BeSavvy. Таким образом, если по вашему промокоду придет 3 человека,
        вы сможете участвовать в следующем месяце программы бесплатно.{" "}
        <p>
          {" "}
          Промокод можно получить, написав в личные сообщения группы любого
          аккаунта нашей социальной сети.
        </p>
      </StyledModal>
    </div>
  );
};

export default Headline;
