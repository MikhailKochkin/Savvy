import React, { Component } from "react";
import styled from "styled-components";
import TakeMyMoney from "../TakeMyMoney";
import User from "../User";

const CaseCard = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px lightgrey solid;
  border-radius: 5px;
  text-align: left;
  padding: 0.5%;
  @import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");
  font-family: "Montserrat", serif;
  width: 100%;
  line-height: 1.2;
  @media (max-width: 800px) {
    padding: 2%;
    button {
      padding: 4px 6px;
    }
  }
`;

const Photo = styled.div`
  width: 100%;
  max-width: initial;
  height: auto;
  content: url("../static/баннер.png");
`;

const Level1 = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2%;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Video = styled.div`
  flex: 50%;
  @media (max-width: 800px) {
    margin-top: 3%;
  }
`;

const Iframe = styled.iframe`
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 50%;

  div {
    width: 85%;
    background: #f1f7ff;
    border-radius: 10px;
    padding: 2% 6%;
  }
  @media (max-width: 800px) {
    margin-top: 3%;
    div {
      width: 100%;
    }
  }
`;

const Title = styled.p`
  font-size: 1.8rem;
`;

const Date = styled.p`
  font-size: 2rem;
`;

const Author = styled.p`
  font-size: 2rem;
`;

const Program = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 2%;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const July = styled.div`
  flex: 48%;
  width: 575px;
  height: 325px;
  content: url("../static/июль.png");
  @media (max-width: 800px) {
    flex-direction: column;
    flex: none;
    width: 100%;
    height: auto;
  }
`;

const August = styled.div`
  flex: 48%;
  width: 575px;
  height: 325px;
  content: url("../static/август.png");
  @media (max-width: 800px) {
    flex-direction: column;
    flex: none;
    width: 100%;
    height: auto;
  }
`;

const Tarif = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 2%;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Choose = styled.div`
  flex: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 8%;
  li {
    list-style-type: none;
    margin-bottom: 3%;
  }
  label,
  p {
    font-size: 2.2rem;
  }
  @media (max-width: 800px) {
    padding-left: 4%;
  }
`;

const Info = styled.div`
  flex: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  background: #f1f7ff;
  width: 75%;
  padding: 4%;
  /* border: 1px solid grey; */
  border-radius: 10px;
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.p`
  font-size: 2.4rem;
  font-weight: bold;
  margin-top: 1%;
`;

const PriceBox = styled.p`
  font-size: 2.4rem;
  color: white;
  background: #112a62;
  width: 85%;
  padding: 3%;
  margin-top: 0%;
  border-radius: 10px;
  text-align: center;
  select {
    display: block;
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: 0.6em 1.4em 0.5em 0.8em;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
    border-radius: 0.5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }
  select-css::-ms-expand {
    display: none;
  }
  select-css:hover {
    border-color: #888;
  }
  select-css:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }
  select-css option {
    font-weight: normal;
  }
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  margin-top: 4%;
  padding: 3% 3%;
  border-radius: 10px;
  background: #b9e28c;
  p {
    font-size: 2rem;
    text-align: center;
  }
  input {
    width: 70%;
    font-size: 2rem;
  }
  button {
    margin-top: 3%;
  }
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const MainText = styled.div`
  margin: 0 5%;
  font-size: 1.8rem;
`;

const Button = styled.button`
  padding: 3% 6%;
  font-size: 2.4rem;
  font-weight: 600;
  margin-top: 3%;
  margin-bottom: 3%;
  color: #fffdf7;
  background: ${props => (props.promo ? "#FF6663" : "#5DAE76")};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #294d4a;
  }
  @media (max-width: 800px) {
    /* font-size: 2rem; */
    /* padding: 10px 20px; */
  }
`;

const Note = styled.div`
  font-size: 2rem;
  font-weight: 600;
  padding: 2% 4%;
  margin-top: 3%;
  margin-bottom: 3%;
  color: #fffdf7;
  background: #ff6663;
  border: solid 1px white;
  border-radius: 5px;
`;

const Buy = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #fcdb4b;
  margin-top: 3%;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Terms = styled.div`
  flex: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  padding: 4%;
  p {
    font-size: 2rem;
    line-height: 1.8;
  }
`;

const Click = styled.div`
  flex: 50%;
  padding: 8%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  text-align: center;
  span {
    font-weight: 900;
    text-decoration: underline;
  }
  &:author {
    font-size: 3rem;
  }
`;

class Project extends Component {
  state = {
    tarif: "Базовый",
    price: 1800,
    promo: "",
    promoUsed: false,
    months: "1"
  };
  onTarifSelected = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    value === "Базовый" ? this.setState({ price: 1800, months: "1" }) : null;
    value === "Стандарт" ? this.setState({ price: 3200, months: "1" }) : null;
    value === "Премиум" ? this.setState({ price: 4300, months: "1" }) : null;
    value === "VIP" ? this.setState({ price: 6790, months: "1" }) : null;
  };
  onHandlePromo = () => {
    if (this.state.promo !== "") {
      if (
        this.state.promo.toUpperCase() === "SAVVYGRAM" &&
        (this.state.tarif === "Стандарт" || this.state.tarif === "Премиум") &&
        !this.state.promoUsed
      ) {
        this.setState(prevState => ({
          price: prevState.price * 0.9,
          promoUsed: true
        }));
      } else if (
        this.state.promo.toUpperCase() === "SAVVYEARLYBIRD" &&
        (this.state.tarif === "Стандарт" || this.state.tarif === "Премиум") &&
        !this.state.promoUsed
      ) {
        this.setState(prevState => ({
          price: prevState.price * 0.85,
          promoUsed: true
        }));
      } else {
        alert(
          "Не получилось. Возможно, на этот тариф промокод не действует. Или такого промокода нет. Или вы уже использовали другой промокод."
        );
      }
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handlePrice = e => {
    const { name, value } = e.target;
    if (this.state.months === "1") {
      this.setState(prevState => ({
        price: prevState.price * 2
      }));
    }
    if (this.state.months === "2") {
      this.setState(prevState => ({
        price: prevState.price / 2
      }));
    }
    this.setState({ [name]: value });
  };

  render() {
    const program = (
      <>
        <p>✅ Основная программа (6 полноценных блоков): </p>
        <ul>
          <li>Времена</li>
          <li>Инфинитив и герундий</li>
          <li>Придаточные предложения</li>
          <li>Существительные и местоимения</li>
          <li>Артикли</li>
          <li>Вопросы</li>
        </ul>
        <p>✅ Задания на Savvvy.app с автопроверкой</p>
      </>
    );
    return (
      <User>
        {({ data: { me } }) => (
          <CaseCard>
            <Photo />
            <Level1>
              <Video>
                <Iframe
                  width="620"
                  height="400"
                  src={"https://www.youtube.com/embed/IBkes96vRic"}
                  allowFullScreen
                />
              </Video>
              <Box>
                <div>
                  <Title>
                    Привет! Меня зовут Михаил Кочкин, я – основатель Savvvy.app.
                    Мы запускаем новый сезон онлайн курсов по юридическому
                    английскому.
                    <br />
                    <br />
                    Начнем мы его с двухмесячного курса по грамматике. Задача
                    этого курса – рассказать вам о сложностях грамматики,
                    которые будут важны при написании юридических текстов и их
                    переводе, найти ваши ошибки и исправить их.
                  </Title>
                </div>
              </Box>
            </Level1>
            <Program>
              <July />
              <August />
            </Program>

            <Tarif>
              <Choose>
                <ul>
                  <p>
                    Выберите наиболее удобные для вас параметры прохождения
                    курса:
                  </p>
                  <li className="answerOption">
                    <input
                      type="radio"
                      name="tarif"
                      value={"Базовый"}
                      onChange={this.onTarifSelected}
                    />
                    <label> Тариф "Базовый" </label>
                  </li>
                  <li className="answerOption">
                    <input
                      type="radio"
                      name="tarif"
                      value={"Стандарт"}
                      onChange={this.onTarifSelected}
                    />
                    <label> Тариф "Стандарт" </label>
                  </li>

                  <li className="answerOption">
                    <input
                      type="radio"
                      name="tarif"
                      value={"Премиум"}
                      onChange={this.onTarifSelected}
                    />
                    <label> Тариф "Премиум" </label>
                  </li>
                  <li className="answerOption">
                    <input
                      type="radio"
                      name="tarif"
                      value={"VIP"}
                      onChange={this.onTarifSelected}
                    />
                    <label> Тариф "VIP" </label>
                  </li>
                </ul>
              </Choose>
              <Info>
                {this.state.tarif === "Базовый" && (
                  <Card>
                    <Center>
                      <Name>Базовый</Name>
                      <PriceBox>1800 рублей</PriceBox>
                    </Center>
                    <MainText>{program}</MainText>
                  </Card>
                )}
                {this.state.tarif === "Стандарт" && (
                  <Card>
                    <Center>
                      <Name>Стандарт</Name>
                      <PriceBox>3200 рублей</PriceBox>
                    </Center>
                    <MainText>
                      {program}
                      <p>✅ Чат участников</p>
                      <p>
                        ✅ Дополнительные юридические задания в гугл-документе
                      </p>
                    </MainText>
                  </Card>
                )}
                {this.state.tarif === "Премиум" && (
                  <Card>
                    <Center>
                      <Name>Премиум</Name>
                      <PriceBox>4300 рублей</PriceBox>
                    </Center>
                    <MainText>
                      {program}
                      <p>✅ Чат участников</p>
                      <p>
                        ✅ Дополнительные юридические задания в гугл-документе
                      </p>
                      <p>✅ Speaking Practice: 20 минут в неделю </p>
                    </MainText>
                  </Card>
                )}
                {this.state.tarif === "VIP" && (
                  <Card>
                    <Center>
                      <Name>VIP</Name>
                      <PriceBox>6790 рублей</PriceBox>
                    </Center>
                    <MainText>
                      {program}
                      <p>✅ Чат участников</p>
                      <p>
                        ✅ Дополнительные юридические задания в гугл-документе
                      </p>
                      <p>✅ Личное менторство от Миши</p>
                      <p>✅ Speaking Practice: 40 минут в неделю </p>
                    </MainText>
                  </Card>
                )}
              </Info>
            </Tarif>
            <Center>
              {/* <Price>
                        <p>Введите промокод, чтобы получить скидку, и переходите к оплате! </p>

                        <PriceBox>Сейчас стоимость курса составляет {this.state.price} рублей.</PriceBox>
                        <input
                            spellcheck={true}
                            name={"promo"}
                            placeholder={"Введите промокод"}
                            value={this.state.promo}
                            onChange={this.handleChange}
                        />
                        <Button promo onClick={this.onHandlePromo}>Применить</Button>
                    </Price> */}
            </Center>
            <Buy>
              <Terms>
                <PriceBox>
                  <select
                    name="months"
                    value={this.state.months}
                    onChange={this.handlePrice}
                  >
                    <option value={1}>1 месяц (август)</option>
                  </select>
                </PriceBox>
              </Terms>
              <Click>
                <Author>
                  Окончательная стоимость курса:{" "}
                  <span className="final">{this.state.price}</span> рублей.{" "}
                </Author>
                {!me && (
                  <Note>
                    Зарегистрируйтесь на сайте, чтобы приобрести этот курс!
                  </Note>
                )}
                {me && (
                  <TakeMyMoney
                    coursePageID={"cjysqb6a005060719x4i9l6e2"}
                    name={me.name}
                    user={me.id}
                    price={this.state.price}
                    promo={true}
                    discountPrice={null}
                  >
                    Купить
                  </TakeMyMoney>
                )}
                <p>Нажимая кнопку купить, вы соглашаетесь с уловиями оферты.</p>
                <Author>
                  После оплаты вас добавят на страницу курса и свяжутся с вами в
                  социальных сетях.
                </Author>
              </Click>
            </Buy>
          </CaseCard>
        )}
      </User>
    );
  }
}

export default Project;
