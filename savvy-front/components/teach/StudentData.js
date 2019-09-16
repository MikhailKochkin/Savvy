import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import moment from "moment";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  p {
    margin: 0.5% 0;
  }
  .answer {
    border-top: 2px solid #edefed;
    border-bottom: 2px solid #edefed;
  }
`;

const Name = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;

const Square = styled.div`
  width: 70px;
  height: 30px;
  background: #de6b48;
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
    return (
      <Styles>
        <Header>
          <Name className="div1">{student.name}</Name>
          <Square className="div2" />
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

              <Container>
                {lesson.newTests.length === 0 && (
                  <li>
                    <b>Тесты</b> не созданы
                  </li>
                )}
                {lesson.newTests.length > 0 && lesson.testResults && (
                  <>
                    {lesson.testResults.filter(
                      result => result.student.id === student.id
                    ).length === 0 && (
                      <li>
                        <b>Тесты</b> не выполнены
                      </li>
                    )}
                  </>
                )}

                {lesson.newTests.length > 0 &&
                  lesson.testResults.map(
                    result =>
                      result.student.id === student.id && (
                        <li>
                          {" "}
                          <b>Тесты</b> выполнены
                        </li>
                      )
                  )}
              </Container>

              <Container>
                {lesson.quizes.length === 0 && (
                  <li>
                    <b>Вопросы</b> не созданы
                  </li>
                )}
                {lesson.quizes.length > 0 && lesson.quizResults.length === 0 && (
                  <>
                    {lesson.quizResults.filter(
                      result => result.student.id === student.id
                    ).length === 0 ? (
                      <li>
                        <b>Вопросы</b> пока не выполнены
                      </li>
                    ) : null}
                  </>
                )}

                {lesson.quizes.length > 0 &&
                  lesson.quizResults.length > 0 &&
                  lesson.quizResults.map(
                    result =>
                      result.student.id === student.id && (
                        <li key={result.id}>
                          <b>Вопросы</b> выполнены
                        </li>
                      )
                  )}
              </Container>

              <Container>
                {lesson.problems.length === 0 && (
                  <li>
                    <b>Задачи</b> не созданы
                  </li>
                )}
                {lesson.problems.length > 0 &&
                  lesson.problemResults.filter(
                    result => result.student.id === student.id
                  ).length === 0 && (
                    <li>
                      <b>Задачи</b> пока не выполнены
                    </li>
                  )}

                {lesson.problems.length > 0 &&
                  lesson.problemResults.map(
                    result =>
                      result.student.id === student.id && (
                        <>
                          <div>
                            {renderHTML(
                              `<li><b>Задача:</b></li>
                                ${result.problem.text.substring(0, 200)}...
                              `
                            )}
                          </div>

                          <div className="answer">
                            Ответ: {renderHTML(result.answer)}
                          </div>
                          <div>
                            Открытые подсказки:{" "}
                            {result.revealed
                              ? result.revealed.join(", ")
                              : "Студент не использовал подсказки"}
                          </div>
                        </>
                      )
                  )}
              </Container>

              <Container>
                {lesson.constructions.length === 0 && (
                  <li>
                    <b>Конструкторы</b> не созданы
                  </li>
                )}

                {lesson.constructions.length > 0 && (
                  <>
                    {lesson.constructionResults.filter(
                      result => result.student.id === student.id
                    ).length === 0 && (
                      <li>
                        <b>Конструкторы </b>
                        пока не выполнены
                      </li>
                    )}
                  </>
                )}

                {lesson.constructions.length > 0 &&
                  lesson.constructionResults.map(
                    result =>
                      result.student.id === student.id && (
                        <>
                          <div>
                            {renderHTML(
                              "Конструктор: " +
                                result.construction.name +
                                " составлен"
                            )}
                          </div>
                          <div>{"Количество попыток: " + result.attempts}</div>
                        </>
                      )
                  )}
              </Container>

              <Container>
                {lesson.texteditors.length === 0 && (
                  <li>
                    <b>Редакторы</b> не созданы
                  </li>
                )}

                {lesson.texteditors.length > 0 && (
                  <>
                    {lesson.textEditorResults.filter(
                      result => result.student.id === student.id
                    ).length === 0 ? (
                      <li>
                        <b className="grid-item">Редакторы </b>
                        не выполнены
                      </li>
                    ) : null}
                  </>
                )}

                {lesson.texteditors.length > 0 &&
                  lesson.textEditorResults.map(
                    result =>
                      result.student.id === student.id && (
                        <>
                          <li>
                            {renderHTML(
                              "<b>Редактор:</b> " +
                                result.textEditor.text.substring(0, 200) +
                                "..."
                            )}
                          </li>
                          <div>
                            {"Документ отредактирован. Количество попыток: " +
                              result.attempts}
                          </div>
                        </>
                      )
                  )}
              </Container>
            </>
          ))}
        </Open>
      </Styles>
    );
  }
}

export default Person;
