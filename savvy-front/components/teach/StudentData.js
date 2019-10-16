import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
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
`;

const Header = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 40px;
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

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1.5% 0;
  /* justify-content: space-between; */
`;

const SendButton = styled.div`
  font-size: 1.6rem;
  /* padding: 0.5% 1%; */
  text-align: center;
  background: #ffffff;
  border: 1px solid;
  border-color: ${props => (props.green ? "#84BC9C" : "#112a62")};
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  outline: 0;
  /* margin: 1% 0; */
  margin-right: 20px;
  width: 130px;
  color: #112a62;
  a {
    color: #84bc9c;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const Box = styled.div`
  display: grid;
  border: 1px solid #edefed;
  border-radius: 5px;
  grid-template-columns: 0.6fr 1.2fr 1.2fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin: 20px 0;
  padding: 0.5%;
  div {
    padding: 0 15px;
  }
  .div1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .div2 {
    grid-area: 1 / 2 / 2 / 3;
    border-left: 1px solid #edefed;
  }
  .div3 {
    grid-area: 1 / 3 / 2 / 4;
    border-left: 1px solid #edefed;
  }
  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 5%;
    div {
      padding: 8px 15px;
    }
    .div2 {
      border-left: 1px solid white;
      border-top: 1px solid #edefed;
    }
    .div3 {
      border-left: 1px solid white;
      border-top: 1px solid #edefed;
    }
  }
`;

const StyledCV = styled.div`
  margin-bottom: 2%;
`;

const StyledResume = styled.div`
  margin-bottom: 2%;
`;

class Person extends Component {
  state = {
    secret: true,
    page: "results"
  };
  onShow = () => {
    this.setState(prevState => ({
      secret: !prevState.secret
    }));
  };

  onSwitch = e => {
    console.log(e.target.getAttribute("name"));
    this.setState({ page: e.target.getAttribute("name") });
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
          <Buttons>
            <SendButton onClick={this.onSwitch} name="results">
              Результаты
            </SendButton>
            <SendButton onClick={this.onSwitch} name="CV">
              CV
            </SendButton>
            <SendButton onClick={this.onSwitch} name="resume">
              Резюме
            </SendButton>
            <SendButton green>
              <a href={mail}>Написать</a>
            </SendButton>
          </Buttons>
          {this.state.page === "results" &&
            lessons.map((lesson, index) => (
              <>
                <Name>
                  {index + 1}. {lesson.name}
                </Name>
                {lesson.lessonResults.filter(
                  result => result.student.id === student.id
                ).length > 0 ? (
                  <Box>
                    <div className="div1">
                      Заходов на урок:{" "}
                      {
                        lesson.lessonResults.filter(
                          result => result.student.id === student.id
                        )[0].visitsNumber
                      }{" "}
                    </div>
                    <div className="div2">
                      Первый заход:{" "}
                      {moment(
                        lesson.lessonResults.filter(
                          result => result.student.id === student.id
                        )[0].createdAt
                      ).format("LLL")}
                    </div>
                    <div className="div3">
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
                  </Box>
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
          {this.state.page === "CV" && (
            <StyledCV>
              На этой странице можно будет посмотреть и скачать CV кандидата.
            </StyledCV>
          )}
          {this.state.page === "resume" && (
            <StyledResume>
              На этой странице можно будет посмотреть и скачать резюме
              кандидата.
            </StyledResume>
          )}
        </Open>
      </Styles>
    );
  }
}

export default Person;
