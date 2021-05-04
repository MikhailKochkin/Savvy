import styled from "styled-components";
const Styles = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #f8efe6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  #data0 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 80%;
    h1 {
      margin-bottom: 0;
    }
  }
  #data {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 80%;
  }
  #mobile_image {
    display: none;
  }
  @media (max-width: 800px) {
    height: 100%;
    padding-bottom: 50px;
    #mobile_image {
      display: block;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      img {
        width: 60%;
        margin: 15px 0;
      }
    }
    #data {
      width: 90%;
      flex-direction: column;
    }
    #data0 {
      width: 90%;
      flex-direction: column;
      justify-content: flex-start;
      h1 {
        line-height: 1.4;
      }
    }
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
  margin-bottom: 50px;
  @media (max-width: 800px) {
    flex-basis: 20%;
    padding-top: 20px;
    width: 95%;
    margin-bottom: 0px;
    div {
      line-height: 1.6;
    }
  }
`;

const Text = styled.div`
  flex-basis: 70%;
  height: 100%;
`;

const Image = styled.div`
  width: 30%;
  height: 100%;
  img {
    width: 310px;
  }
  @media (max-width: 800px) {
    display: none;
  }
`;

const Info = styled.div`
  flex-basis: 85%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  /* min-width: 1000px; */
  #level1 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    #mobile_image {
      display: none;
    }
  }
  h1 {
    font-size: 3.6rem;
    font-weight: 500;
    width: 80%;
    text-align: left;
    line-height: 1.2;
  }
  img {
    width: 120px;
    margin-left: -30px;
  }
  h2 {
    font-size: 2rem;
    font-weight: 500;
    text-align: left;
    width: 60%;
    line-height: 1.6;
    margin-bottom: 20px;
    button {
      padding: 3%;
      border-radius: 10px;
      color: #fff;
      background: #ff6f59;
      border: none;
      outline: 0;
      cursor: pointer;
      margin-top: 20px;
      font-family: Montserrat;
      width: 250px;
      font-size: 1.8rem;
      transition: 0.3s;
      &:hover {
        background: #e01e00;
      }
    }
    span {
      color: #ff6f59;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  @media (max-width: 800px) {
    width: 90%;
    #level1 {
      display: flex;
      flex-direction: column;
      #mobile_image {
        display: block;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        img {
          width: 60%;
          margin: 15px 0;
        }
      }
      h1 {
        font-size: 3rem;
        font-weight: 500;
        width: 95%;
        text-align: left;
        line-height: 1.4;
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
  height: auto;
  width: 80%;
  font-size: 2rem;
  .element {
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
    padding-left: 50px;
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
    width: 100%;

    .element {
      width: 100%;
      padding-left: 50px;
      font-size: 1.8rem;
    }
  }
`;
const Main = () => {
  const slide = () => {
    var my_element = document.getElementById("C2A");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <Styles>
      <Header>
        <div>Проект BeSavvy & Школы права Статут</div>
      </Header>
      <div id="data0">
        <div id="level1">
          <h1>Школа молодого юриста BeSavvy 2021</h1>
          <div id="mobile_image">
            <img src="static/certificate.svg" />
          </div>
        </div>
        <div style={{ fontSize: "1.8rem", color: "#626262" }}>
          Старт: 5 июля. Скидки до 70% после собеседования
        </div>
      </div>

      <div id="data">
        <Text>
          <Info>
            <h2>
              Программа для развития карьеры в актуальных областях права <br />
              <button onClick={(e) => slide()}>Подать заявку</button>
            </h2>
            <List>
              <div className="element">
                {" "}
                <img src="static/tick.svg" />
                Корпоративный юрист
              </div>
              <div className="element">
                {" "}
                <img src="static/tick.svg" />
                Сопровождение IT/IP проектов
              </div>
              <div className="element">
                {" "}
                <img src="static/tick.svg" />
                Работа судебного юриста
              </div>
              <div className="element">
                {" "}
                <img src="static/tick.svg" />
                Как и где использовать Legal Tech?
              </div>
            </List>
          </Info>
        </Text>
        <Image>
          <img src="static/certificate.svg" />
        </Image>
      </div>
    </Styles>
  );
};

export default Main;
