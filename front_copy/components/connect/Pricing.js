import { useState } from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";
import Form from "./Form";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 120vh;
  background: #111111;
  color: #fff;
  @media (max-width: 800px) {
    padding: 30px 0;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 80%;
  background: #111111;
  @media (max-width: 800px) {
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 60px;
  font-size: 3.4rem;
  width: 70%;
  line-height: 1.4;
  font-weight: 800;
  @media (max-width: 800px) {
    width: 100%;
    font-size: 2.6rem;
  }
`;

const Tarifs = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
  align-items: space-between;
  .image {
    width: 15%;
    div {
      width: 80px;
      height: 80px;
      background: grey;
      border-radius: 50px;
    }
  }
  .intro {
    font-size: 2.2rem;
    width: 45%;
    p {
      width: 80%;
      line-height: 1.4;
    }
  }

  .background {
    color: #8c8c8c;
    font-size: 2.2rem;

    width: 40%;
    p {
      width: 80%;
      line-height: 1.4;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    .box {
      width: 90%;
      font-size: 1.8rem;
    }
  }
`;

const Card = styled.div`
  width: 420px;
  height: 550px;
  border: 2px solid #7d7d7d;
  border-radius: 40px;
  .info {
    height: 75%;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    .term {
      font-size: 5.6rem;
      font-weight: 1000;
    }
    .price {
      font-size: 2.6rem;
      font-weight: 500;
    }
    .perks {
      display: flex;
      margin-top: 40px;
      flex-direction: column;
      width: 80%;

      justify-content: center;
      align-items: center;
      color: #7d7d7d;
      font-size: 1.9rem;
      div {
        text-align: center;
        line-height: 1.4;
        margin-top: 15px;
      }
      #important {
        color: #fff;
      }
    }
  }
  .button {
    height: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    button {
      background: #c34bfe;
      width: 220px;
      color: #000000;
      height: 50px;
      border: 1px solid #c34bfe;
      border-radius: 50px;
      font-size: 2rem;
      color: rgba(0, 0, 0, 1);
      font-weight: 600;
      cursor: pointer;
      transition: 0.3s ease;
      &:hover {
        width: 230px;
        height: 56px;
      }
    }
  }
  @media (max-width: 800px) {
    width: 100%;
    min-height: 100vh;
    .info {
      height: auto;
      .perks {
        width: 95%;
      }
    }
  }
`;

const StyledModal = Modal.styled`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  color: #fff;
  border: 1px solid grey;
  border-radius: 8px;
  max-width: 40%;
  min-width: 320px;
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

const Pricing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subscription, setSubscription] = useState("month");

  const toggleModal = (e) => setIsOpen(!isOpen);

  return (
    <Styles id="prices">
      <Container>
        <Header>Присоединиться к сообществу</Header>
        <Tarifs>
          <Card>
            <div className="info">
              <div className="term">1 месяц</div>
              <div className="price">490 ₽</div>
              <div className="perks">
                <div>Пробный первый месяц</div>
                <div id="important">Только для новых членов</div>
                <div>Доступ к базе данных юристов</div>
                <div>Доступ к онлайн мероприятиям</div>
              </div>
            </div>
            <div className="button">
              <button
                onClick={(e) => {
                  setSubscription("month"), toggleModal();
                }}
              >
                Присоединиться
              </button>
            </div>
          </Card>
          <Card>
            <div className="info">
              <div className="term">1 год</div>
              <div className="price">5 000 ₽</div>
              <div className="perks">
                <div>Полная подписка на 1 год</div>
                <div id="important">Вводная встреча с Мишей</div>
                <div>Доступ к базе данных юристов</div>
                <div>Доступ к мероприятиям</div>
                <div>Доступ к микросообществам</div>
                <div>Создание карточки участника</div>
              </div>
            </div>
            <div className="button">
              <button
                onClick={(e) => {
                  setSubscription("year"), toggleModal();
                }}
              >
                Присоединиться
              </button>
            </div>
          </Card>
        </Tarifs>
      </Container>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <Form subscription={subscription} />
      </StyledModal>
    </Styles>
  );
};

export default Pricing;
