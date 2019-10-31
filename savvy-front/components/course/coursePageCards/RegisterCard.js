import React, { Component } from "react";
import styled from "styled-components";
import TakeMyMoney from "../../TakeMyMoney";
import EnrollCoursePage from "../../EnrollCoursePage";

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  border-radius: 10px;
  width: 270px;
  min-height: 290px;
  padding: 2% 4%;
  .message {
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 15px;
  }
`;

const Header = styled.div`
  font-size: 2.4rem;
  padding-bottom: 6%;
  padding-top: 4%;
  line-height: 1.4;
`;

const Input = styled.input`
  width: 100%;
  padding: 3%;
  border-radius: 5px;
  outline: 0;
  border: 1px solid #edefed;
  font-size: 1.4rem;
`;

const Part1 = styled.div``;

const Part2 = styled.div``;

const SmallButton = styled.div`
  border: none;
  background: none;
  color: #112a62;
  padding: 10px 0;
  font-size: 1.4rem;
  cursor: pointer;
  outline: 0;
  &:hover {
    font-weight: bold;
  }
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
  }
  .Teacher {
    grid-area: Teacher;
    padding-right: 10px;
  }

  .Self {
    grid-area: Self;
  }
  .Price1 {
    grid-area: Price1;
  }
  .Price2 {
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
    this.props.promocode.map(el => promo.push(Object.keys(el)[0]));
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
    const {
      coursePage,
      me,
      price,
      discountPrice,
      studentsArray,
      subjectArray
    } = this.props;
    return (
      <>
        <Payment>
          <Part1>
            <Header>
              {this.state.price !== "Бесплатно"
                ? `${this.state.price} рублей`
                : this.state.price}{" "}
            </Header>
            {(coursePage.courseType === "PUBLIC" ||
              coursePage.courseType === "CHALLENGE") && (
              <div className="message">
                Вам необходимо зарегистрироваться на курс, чтобы открыть доступ
                к урокам.
              </div>
            )}
            {coursePage.courseType === "PRIVATE" && (
              <div className="message">
                Это закрытый курс. Вам необходимо подать заявку на регистрацию и
                преподаватель откроет вам доступ.
              </div>
            )}
            {coursePage.courseType === "FORMONEY" && (
              <GridContainer>
                <div className="Title">Выберите тариф:</div>
                <div />
                <div className="Self">Самостоятельное прохождение</div>
                <input
                  className="Price1"
                  type="radio"
                  value={price}
                  name="price"
                  onChange={this.handleInputChange}
                />
                <div className="Teacher">
                  Еженедельные задания от преподавателей
                </div>
                <input
                  className="Price2"
                  type="radio"
                  name="price"
                  value={price * 2}
                  onChange={this.handleInputChange}
                />
              </GridContainer>
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
          </Part2>
        </Payment>
      </>
    );
  }
}

export default RegisterCard;
