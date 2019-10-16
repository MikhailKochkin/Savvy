import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 1.4rem;
  p {
    margin: 0.5% 0;
  }
  .answer {
    border-top: 2px solid #edefed;
    border-bottom: 2px solid #edefed;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: row;
  margin-bottom: 1%;
  div {
    flex: 50%;
    &.column {
      padding-left: 2%;
      border-left: 1px solid #edefed;
    }
    &.mistake {
      border-bottom: 1px solid #edefed;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
  }
`;

const Text = styled.div`
  #id {
    color: #dc143c;
  }
`;

class TexteditorResult extends Component {
  render() {
    const { texteditors, student } = this.props;
    return (
      <Container>
        {/* {texteditors.length === 0 && (
          <div>
            <b>Конструкторы</b> не созданы
          </div>
        )} */}
        {texteditors.length > 0 &&
          texteditors.map(texteditor => (
            <Box>
              <Text>
                <b>Редактор: </b>
                {renderHTML(texteditor.text)}
              </Text>
              <div className="column">
                {texteditor.textEditorResults.filter(
                  t => t.student.id === student.id
                ).length > 0
                  ? texteditor.textEditorResults
                      .filter(t => t.student.id === student.id)
                      .map(t => <div>Попыток: {t.attempts} </div>)
                  : null}

                <div>Всего ошибок: {texteditor.totalMistakes}</div>
              </div>

              <div className="column">
                {texteditor.textEditorResults.filter(
                  t => t.student.id === student.id
                ).length > 0 ? (
                  texteditor.textEditorResults
                    .filter(t => t.student.id === student.id)
                    .map(t =>
                      t.revealed.map(el => (
                        <div className="mistake">
                          <div>Ошибка в тексте: {el.wrong_variant}</div>
                          <div>Вариант ученика: {el.student_variant}</div>
                          <div>Правильный вариант: {el.correct_variant}</div>
                        </div>
                      ))
                    )
                ) : (
                  <span>Не отредактирован</span>
                )}
              </div>
            </Box>
          ))}
      </Container>
    );
  }
}

export default TexteditorResult;
