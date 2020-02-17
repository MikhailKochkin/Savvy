import React, { Component } from "react";
import styled from "styled-components";
import TakeMyMoney from "../../TakeMyMoney";
import EnrollCoursePage from "../../EnrollCoursePage";
import BuyDummy from "../BuyDummy";

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

const SmallButton = styled.div`
  border: none;
  background: none;
  color: #112a62;
  padding: 10px 0;
  font-size: 1.4rem;
  cursor: pointer;
  outline: 0;
`;

const Text = styled.div`
  margin: 4% 4%;
`;

const Paid = styled.div`
  background: #fdf3c8;
  padding: 1% 3%;
  border-radius: 5px;
  font-size: 1.4rem;
`;

const GridContainer = styled.div`
  display: grid;
  max-width: 280px;
  grid-template-columns: 90% 10%;
  grid-template-areas: "Title ." "Self Price1" "Teacher Price2";
  div {
    padding-bottom: 15px;
  }
  .Title {
    grid-area: Title;
    font-size: 1.6rem;
  }
  .Teacher {
    grid-area: Teacher;
    padding-right: 10px;
    font-size: 1.8rem;
    span {
      text-decoration: underline;
    }
    /* &:hover {
      text-decoration: underline;
      transition: all ease-in-out 1s;
    } */
  }

  .Self {
    grid-area: Self;
    font-size: 1.8rem;

    span {
      transition: all ease-in-out 3s;
    }
    span:hover {
      text-decoration: underline;
    }
  }
  .Price1 {
    margin-top: 10px;
    grid-area: Price1;
  }
  .Price2 {
    margin-top: 10px;
    grid-area: Price2;
  }
`;

class RegisterCard extends Component {
  state = {
    price: this.props.price,
    used: false
  };
  change = async e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  promo = () => {
    const promo = [];
    let discount;
    const res = this.props.promocode.map(el => promo.push(Object.keys(el)[0]));
    if (promo.includes(this.state.promo) && !this.state.used) {
      this.props.promocode.map(el =>
        Object.keys(el)[0] === this.state.promo
          ? (discount = Object.values(el)[0])
          : null
      );
      this.setState(prev => ({
        price: prev.price * discount
      }));
      this.setState({
        used: true
      });
    }
  };

  scroll = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      used: false
    });
  };
  render() {
    const { coursePage, me, price, studentsArray, subjectArray } = this.props;
    let applied;
    me &&
    coursePage.applications.filter(ap => ap.applicantId === me.id).length > 0
      ? (applied = true)
      : (applied = false);
    return (
      <Data>
        <Description>
          <div className="title">Выберите подходящий тариф и получите:</div>
          <div>- пожизненный доступ</div>
          <div>- доступ сразу после оплаты</div>
          <div>- полный комплекс услуг по выбранному тарифу</div>
          <div>- эксклюзивные предложения на другие курсы от Savvy App</div>
          <div>- эксклюзивные карьерные возможности от Savvy App</div>
        </Description>
        <Payment>
          <Header>
            {this.state.price !== "Бесплатно"
              ? `${this.state.price} ₽`
              : this.state.price}{" "}
          </Header>
          <Text>
            <Part1>
              {(coursePage.courseType === "PUBLIC" ||
                coursePage.courseType === "CHALLENGE") && (
                <>
                  <div className="message">
                    Это открытый курс, но вам необходимо на него
                    зарегистрироваться, нажав на кнопку ниже, чтобы получить
                    доступ к урокам.
                  </div>
                  <div></div>
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
                    <div className="Title">Выберите тариф:</div>
                    <div />
                    <div className="Self">
                      🏎 <span>Базовый</span>
                    </div>
                    <input
                      className="Price1"
                      type="radio"
                      value={price}
                      name="price"
                      onChange={this.handleInputChange}
                    />
                    <div className="Teacher">🚀 Продвинутый</div>
                    <input
                      className="Price2"
                      type="radio"
                      name="price"
                      value={price * 1.75}
                      onChange={this.handleInputChange}
                    />
                  </GridContainer>
                </>
              )}
            </Part1>
            <Part2>
              {this.props.promocode && this.props.promocode.length > 0 && (
                <>
                  <Input
                    name="promo"
                    onChange={this.change}
                    placeholder="Введите промокод"
                  />
                  <SmallButton onClick={this.promo}>Применить</SmallButton>
                </>
              )}
              {applied && (
                <Paid>
                  Мы получили вашу заявку. Если оплата прошла, то скоро откроем
                  доступ. Если оплата не прошла, вы можете провести ее еще раз и
                  мы откроем доступ.
                </Paid>
              )}
              {!me && <BuyDummy onClick={this.toggleModal}>Купить</BuyDummy>}
              {me && (
                <>
                  {coursePage.courseType === "FORMONEY" && (
                    <TakeMyMoney
                      coursePage={coursePage}
                      coursePageID={coursePage.id}
                      name={me.name}
                      user={me.id}
                      price={parseInt(this.state.price)}
                    >
                      Купить
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
    );
  }
}

export default RegisterCard;
