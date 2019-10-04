import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";

import TestResult from "./results/TestResult";
import QuizResult from "./results/QuizResult";
import ProblemResult from "./results/ProblemResult";
import ConstructionResult from "./results/ConstructionResult";
import TexteditorResult from "./results/TexteditorResult";

const Name = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;

const Square = styled.div`
  width: 70px;
  height: 30px;
  background: ${props => props.inputColor || "palevioletred"};
`;

const Open = styled.div`
  display: ${props => (props.secret ? "none" : "block")};
  .time {
    margin: 5px 0;
  }
`;

const Header = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 50px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  .div1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .div2 {
    grid-area: 1 / 2 / 2 / 3;
  }
  .div3 {
    grid-area: 1 / 3 / 2 / 4;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Styles = styled.div`
  margin-bottom: 0;
  padding: 0.5% 2%;
`;

const Button = styled.div`
  background: none;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  color: #112a62;
`;

const SendButton = styled.div`
  font-size: 1.6rem;
  padding: 1% 0.5%;
  text-align: center;
  background: #ffffff;
  border: 1px solid #112a62;
  box-sizing: border-box;
  border-radius: 5px;
  width: 150px;
  cursor: pointer;
  outline: 0;
  margin: 1% 0;
  a {
    color: #112a62;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

class Person extends Component {
  state = {
    secret: true
  };
  onShow = () => {
    this.setState(prevState => ({
      secret: !prevState.secret
    }));
  };
  render() {
    let { student, lessons } = this.props;
    moment.locale("ru");
    let mail = `mailto:${student.email}`;
    let color;
    let lesson_list = [];
    lessons.map(l => lesson_list.push(l.id));
    let lesson_results = student.lessonResults.filter(l =>
      lesson_list.includes(l.lesson.id)
    );
    if (lesson_results.length / lessons.length === 0) {
      color = "#DE6B48";
    } else if (
      lesson_results.length / lessons.length > 0 &&
      lesson_results.length / lessons.length < 1
    ) {
      color = "#FDF3C8";
    } else if (lesson_results.length / lessons.length >= 1) {
      color = "#84BC9C";
    }
    return (
      <Styles>
        <Header>
          <Name className="div1">{student.name}</Name>
          <Square className="div2" inputColor={color} />
          <Button className="div3" onClick={this.onShow}>
            {this.state.secret ? "Открыть" : "Закрыть"}
          </Button>
        </Header>
        <Open secret={this.state.secret}>
          <SendButton>
            <a href={mail}>Написать</a>
          </SendButton>
          {lessons.map((lesson, index) => (
            <>
              <Name>
                {index + 1}. {lesson.name}
              </Name>
              {lesson.lessonResults.filter(
                result => result.student.id === student.id
              ).length > 0 ? (
                <>
                  <div>
                    Количество заходов на страницу урока:{" "}
                    {
                      lesson.lessonResults.filter(
                        result => result.student.id === student.id
                      )[0].visitsNumber
                    }{" "}
                  </div>
                  <div>
                    Первый заход:{" "}
                    {moment(
                      lesson.lessonResults.filter(
                        result => result.student.id === student.id
                      )[0].createdAt
                    ).format("LLL")}
                  </div>
                  <div className="time">
                    Последний заход:{" "}
                    {moment(
                      lesson.lessonResults.filter(
                        result => result.student.id === student.id
                      )[0].updatedAt
                    ).format("LLL")}
                    {"–"}
                    {moment(
                      lesson.lessonResults.filter(
                        result => result.student.id === student.id
                      )[0].updatedAt
                    ).fromNow()}
                  </div>
                </>
              ) : (
                <div className="time">Нет данных по заходам на урок.</div>
              )}

              <TestResult newTests={lesson.newTests} student={student} />
              <QuizResult quizes={lesson.quizes} student={student} />
              <ProblemResult problems={lesson.problems} student={student} />
              <ConstructionResult
                constructions={lesson.constructions}
                student={student}
              />
              <TexteditorResult
                texteditors={lesson.texteditors}
                student={student}
              />
            </>
          ))}
        </Open>
      </Styles>
    );
  }
}

export default Person;
