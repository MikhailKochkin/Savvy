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
  li {
    flex: 50%;
  }
  div {
    flex: 50%;
    &.column {
      padding-left: 2%;
      border-left: 1px solid #edefed;
    }
  }
`;

class ConstructionResult extends Component {
  render() {
    const { constructions, student } = this.props;
    return (
      <Container>
        {/* {constructions.length === 0 && (
          <div>
            <b>Конструкторы</b> не созданы
          </div>
        )} */}
        {constructions.length > 0 &&
          constructions.map(construction => (
            <Box>
              <div>
                {renderHTML("<b>Конструктор</b> '" + construction.name)}
              </div>
              <div className="column">
                <div>Всего вариантов: {construction.variants.length}</div>
                <div>Всего частей документа: {construction.answer.length}</div>
              </div>
              <div className="column">
                {construction.constructionResults.filter(
                  t => t.student.id === student.id
                ).length > 0 ? (
                  construction.constructionResults
                    .filter(t => t.student.id === student.id)
                    .map(t => <span>Количество попыток: {t.attempts}</span>)
                ) : (
                  <span>Не составлен</span>
                )}
              </div>
            </Box>
          ))}
      </Container>
    );
  }
}

export default ConstructionResult;
