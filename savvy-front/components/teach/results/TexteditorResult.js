import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";

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

const Box = styled.div`
  display: flex;
  justify-content: row;
  margin-bottom: 1%;
  li {
    flex: 50%;
  }
  div {
    flex: 50%;
    border-left: 1px solid #c4c4c4;
    padding-left: 2%;
  }
`;

class TexteditorResult extends Component {
  render() {
    const { texteditors, student } = this.props;
    return (
      <Container>
        {texteditors.length === 0 && (
          <li>
            <b>Конструкторы</b> не созданы
          </li>
        )}
        {texteditors.length > 0 &&
          texteditors.map(texteditor => (
            <Box>
              <li>
                <b>Редактор: </b>
                {renderHTML(texteditor.text.substring(0, 200) + "...")}
              </li>
              <div>
                {texteditor.textEditorResults.filter(
                  t => t.student.id === student.id
                ).length > 0 ? (
                  texteditor.textEditorResults
                    .filter(t => t.student.id === student.id)
                    .map(t => (
                      <span>
                        {"Документ отредактирован. Количество попыток: " +
                          t.attempts}
                      </span>
                    ))
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
