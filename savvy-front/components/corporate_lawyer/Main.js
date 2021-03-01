import styled from "styled-components";
const Styles = styled.div`
  height: 100vh;
  width: 100vw;
  background: #f8efe6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    height: 100%;
    padding-bottom: 50px;
  }
`;

const Header = styled.div`
  flex-basis: 10%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  border-bottom: 2px solid;
  padding-bottom: 10px;
  width: 90%;
  color: #1b222c;
  border-color: #1b222c;
  font-size: 2.1rem;
  @media (max-width: 800px) {
    flex-basis: 20%;
    padding-top: 20px;
    width: 95%;
  }
`;

const Info = styled.div`
  flex-basis: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  #level1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  h1 {
    font-size: 3.6rem;
    font-weight: 500;
    width: 80%;
    text-align: center;
    line-height: 1.2;
  }
  img {
    width: 120px;
    margin-left: -30px;
  }
  h2 {
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    width: 80%;
    span {
      color: #ff6f59;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  @media (max-width: 800px) {
    margin-top: 50px;
    width: 90%;

    #level1 {
      display: flex;
      flex-direction: row;
      h1 {
        font-size: 2.6rem;
        font-weight: 600;
        width: 95%;
        text-align: left;
        line-height: 1.2;
      }

      img {
        width: 100px;
      }
    }
    h2 {
      width: 100%;
      font-size: 2rem;
      text-align: left;
      line-height: 1.4;
      margin-top: 20px;
    }
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
  flex-wrap: wrap;
  height: 200px;
  width: 100%;
  font-size: 2rem;
  .element {
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
    padding-left: 100px;
    width: 50%;
    img {
      width: 25px;
      margin-right: 15px;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    height: auto;
    flex-wrap: nowrap;
    margin-top: 20px;
    .element {
      width: 100%;
      padding-left: 50px;
      font-size: 1.8rem;
    }
  }
`;
const Main = () => {
  return (
    <Styles>
      <Header>
        <div>BeSavvy & Школа права Статут</div>
      </Header>
      <Info>
        <div id="level1">
          <h1>Профессия "Корпоративный юрист"</h1>
          <img src="static/star.svg" />
        </div>
        <h2>
          Практический курс для запуска карьеры в сфере корпоративного и
          договорного права. <span>Подайте заявку сейчас</span>
        </h2>
        <List>
          <div className="element">
            {" "}
            <img src="static/tick.svg" />
            Сделки M/A
          </div>
          <div className="element">
            {" "}
            <img src="static/tick.svg" />
            Финансирование корпораций
          </div>
          <div className="element">
            {" "}
            <img src="static/tick.svg" />
            Копоративные договоры
          </div>
          <div className="element">
            {" "}
            <img src="static/tick.svg" />
            Решение кейсов в командах
          </div>
          <div className="element">
            {" "}
            <img src="static/tick.svg" />
            Тестовые собеседования
          </div>
          <div className="element">
            {" "}
            <img src="static/tick.svg" />
            Инструменты Legal Tech
          </div>
        </List>
      </Info>
    </Styles>
  );
};

export default Main;
