import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  border-radius: 10px;
  width: 290px;
  min-height: 290px;
  padding: 2% 4%;
  span {
    font-weight: bold;
  }
  .results {
    padding: 3% 0;
    border-bottom: 1px solid #e4e4e4;
  }
  .news {
    padding: 3% 0;
    border-bottom: 1px solid #e4e4e4;
  }
  .final {
    padding: 3% 0;
  }
`;

const Button = styled.button`
  padding: 1.5% 3%;
  margin-top: 2%;
  font-size: 1.6rem;
  width: 50%;
  font-weight: 600;
  color: #fffdf7;
  background: ${props => props.theme.green};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:active {
    background: ${props => props.theme.darkGreen};
  }
  @media (max-width: 800px) {
    width: 40%;
  }
`;

class StudentCard extends Component {
  render() {
    const { coursePage, me } = this.props;
    // 0. Put all lesson results in an array
    let lessonResults = [];
    coursePage.lessons.map(lesson => lessonResults.push(lesson.lessonResults));
    // 1. leave only the results of the current user
    const newlessonResults = lessonResults.map(result =>
      result.filter(result => result.student.id === me.id)
    );
    // 2. See how many lessons the currents user has attended
    let status = 0;
    newlessonResults.map(res => (res.length > 0 ? status++ : status));
    // 3. Generate the ratio which is used to determine
    // whether the student can complete the final task
    let ratio = (status * 100) / coursePage.lessons.length;
    let left = coursePage.lessons.length - status;
    return (
      <Payment>
        {/* <div className="news">
          <div>
            <span>Новости курса</span>
          </div>
          <div>{coursePage.news}</div>
        </div> */}
        <div className="results">
          <div>
            <span>Ваш результат</span>
          </div>
          <div>
            Результаты по урокам: {status} / {coursePage.lessons.length}
          </div>
          {ratio < 33 && (
            <div>
              У вас все получится! Вы же не из тех, кто бросает онлайн курс в
              самом начале?{" "}
            </div>
          )}
          {ratio > 33 && ratio < 66 && (
            <div>
              Вы в середине пути. Уверены, что у вас получится дойти до конца!
            </div>
          )}
          {ratio > 66 && ratio < 100 && (
            <div>Отличная работа! Осталась совсем чуть-чуть. Поднажмите!</div>
          )}
          {ratio === 100 && (
            <div>Курс пройден. Не забыли сделать финальное задание?</div>
          )}
        </div>
        {/* {coursePage.examQuestion && (
          <div className="final">
            <span>Финальное задание</span>
            {ratio < 100 && (
              <div>
                Пройдите еще {left}
                {left === 1 && " урок"}
                {left > 1 && left < 5 && " урока"}
                {left > 4 && " уроков"}
              </div>
            )}
            {ratio === 100 && (
              <Link
                href={{
                  pathname: "/examAnswer",
                  query: { id: coursePage.id }
                }}
              >
                <Button>Начать</Button>
              </Link>
            )}
          </div>
        )} */}
      </Payment>
    );
  }
}

export default StudentCard;
