import React, { Component } from "react";
import { Query } from "react-apollo";
import Link from "next/link";
import gql from "graphql-tag";
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

const Part1 = styled.div``;

const Part2 = styled.div``;

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
    price: this.props.price
  };
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  render() {
    const { coursePage, me, price, studentsArray, subjectArray } = this.props;
    console.log(this.state.price);
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
