import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import moment from "moment";

const HeadContainer = styled.div`
  display: grid;
  width: 100%;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-template-columns: 33% 33% 33%;
  .grid-item {
    border-bottom: 1px solid grey;
    padding-left: 3%;
    font-size: 1.6rem;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-template-columns: 33% 33% 33%;
  .grid-item {
    border-bottom: 1px solid #d3d3d3;
    padding-left: 3%;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const ProblemContainer = styled.div`
  display: grid;
  width: 100%;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-template-columns: 33% 33% 33%;
  .grid-item {
    border-bottom: 1px solid #d3d3d3;
    padding-left: 3%;
    p {
      margin: 0;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Pro = styled.div``;

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
          {lessons.map((lesson, index) => (
            <>
              <Name>
                {index + 1}. {lesson.name}
              </Name>
              {lesson.lessonResults.filter(
                result => result.student.id === student.id
              ).length > 0 ? (
                <>
                  {/* {console.log(
                    lesson.lessonResults.filter(
                      result => result.student.id === student.id
                    )
                  )} */}
                  <p>
                    Количество заходов на страницу урока:{" "}
                    {
                      lesson.lessonResults.filter(
                        result => result.student.id === student.id
                      )[0].visitsNumber
                    }{" "}
                  </p>
                  <p>
                    Первый заход:{" "}
                    {moment(
                      lesson.lessonResults.filter(
                        result => result.student.id === student.id
                      )[0].createdAt
                    ).format("LLL")}
                  </p>
                  <p>
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
                  </p>
                </>
              ) : (
                "Нет данных по заходам на урок."
              )}

              <HeadContainer>
                <div className="grid-item">Тип задания</div>
                <div className="grid-item">Ответ</div>
                <div className="grid-item">Комментарий</div>
              </HeadContainer>

              <Container>
                <div className="grid-item">Тесты</div>

                {lesson.newTests.length === 0 ? (
                  <div className="grid-item">Тесты не созданы</div>
                ) : null}

                {lesson.testResults && (
                  <>
                    {lesson.testResults.filter(
                      result => result.student.id === student.id
                    ).length === 0 ? (
                      <>
                        <div className="grid-item">Тесты пока не выполнены</div>
                      </>
                    ) : null}
                  </>
                )}

                {lesson.newTests.length > 0
                  ? lesson.testResults.map(result =>
                      result.student.id === student.id ? (
                        <div key={result.id} className="grid-item">
                          Выполнены
                        </div>
                      ) : null
                    )
                  : null}
              </Container>

              <Container>
                <div className="grid-item">Вопросы</div>

                {lesson.quizes.length === 0 ? (
                  <div className="grid-item">Вопросы не созданы</div>
                ) : null}

                {lesson.quizResults.length > 0 && (
                  <>
                    {lesson.quizResults.filter(
                      result => result.student.id === student.id
                    ).length === 0 ? (
                      <>
                        <div className="grid-item">
                          Вопросы пока не выполнены
                        </div>
                      </>
                    ) : null}
                  </>
                )}

                {lesson.quizes.length > 0
                  ? lesson.quizResults.map(result =>
                      result.student.id === student.id ? (
                        <div key={result.id} className="grid-item">
                          Выполнены
                        </div>
                      ) : null
                    )
                  : null}
              </Container>

              <ProblemContainer>
                {lesson.problems.length === 0 ? (
                  <>
                    <div className="grid-item">Задачи</div>
                    <div className="grid-item">Не созданы</div>
                  </>
                ) : null}

                {lesson.problemResults.filter(
                  result => result.student.id === student.id
                ).length === 0 ? (
                  <>
                    <div className="grid-item">Задачи</div>
                    <div className="grid-item">Задачи пока не выполнены</div>
                  </>
                ) : null}

                {lesson.problems.length > 0
                  ? lesson.problemResults.map(result =>
                      result.student.id === student.id ? (
                        <>
                          <Pro className="grid-item">
                            <div>
                              {renderHTML(
                                "Задача: " +
                                  result.problem.text.substring(0, 200) +
                                  "..."
                              )}
                            </div>
                          </Pro>
                          <div className="grid-item">{result.answer}</div>
                          <div className="grid-item">
                            Открытые подсказки: {result.revealed.join(", ")}
                          </div>
                        </>
                      ) : null
                    )
                  : null}
              </ProblemContainer>

              <ProblemContainer>
                {lesson.constructions.length === 0 ? (
                  <>
                    <div className="grid-item">Конструкторы</div>
                    <div className="grid-item">Не созданы</div>
                  </>
                ) : null}

                {lesson.constructions.length > 0 && (
                  <>
                    {lesson.constructionResults.filter(
                      result => result.student.id === student.id
                    ).length === 0 ? (
                      <>
                        <div className="grid-item">Конструкторы</div>
                        <div className="grid-item">Пока не выполнены</div>
                      </>
                    ) : null}
                  </>
                )}

                {lesson.constructions.length > 0
                  ? lesson.constructionResults.map(result =>
                      result.student.id === student.id ? (
                        <>
                          <Pro className="grid-item">
                            <div>
                              {renderHTML(
                                "Конструктор: " + result.construction.name
                              )}
                            </div>
                          </Pro>
                          <div className="grid-item">
                            {"Документ составлен"}
                          </div>
                          <div className="grid-item">
                            {"Количество попыток: " + result.attempts}
                          </div>
                        </>
                      ) : null
                    )
                  : null}
              </ProblemContainer>

              <ProblemContainer>
                {lesson.texteditors.length === 0 ? (
                  <>
                    <div className="grid-item">Редакторы</div>
                    <div className="grid-item">Не созданы</div>
                  </>
                ) : null}

                {lesson.texteditors.length > 0 && (
                  <>
                    {lesson.textEditorResults.filter(
                      result => result.student.id === student.id
                    ).length === 0 ? (
                      <>
                        <div className="grid-item">Редакторы</div>
                        <div className="grid-item">Не выполнены</div>
                      </>
                    ) : null}
                  </>
                )}

                {lesson.texteditors.length > 0
                  ? lesson.textEditorResults.map(result =>
                      result.student.id === student.id ? (
                        <>
                          <Pro className="grid-item">
                            <div>
                              {result.textEditor
                                ? renderHTML(
                                    "Конструктор: " +
                                      result.textEditor.text.substring(0, 200) +
                                      "..."
                                  )
                                : null}
                            </div>
                          </Pro>
                          <div className="grid-item">
                            {"Документ отредактирован"}
                          </div>
                          <div className="grid-item">
                            {"Количество попыток: " + result.attempts}
                          </div>
                        </>
                      ) : null
                    )
                  : null}
              </ProblemContainer>
            </>
          ))}
        </Open>
      </Styles>
    );
  }
}

export default Person;
