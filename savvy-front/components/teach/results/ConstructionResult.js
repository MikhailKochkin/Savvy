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

class ConstructionResult extends Component {
  render() {
    const { constructions, student } = this.props;
    return (
      <Container>
        {constructions.length === 0 && (
          <li>
            <b>Конструкторы</b> не созданы
          </li>
        )}
        {constructions.length > 0 &&
          constructions.map(construction => (
            <Box>
              <li>
                {renderHTML(
                  "<b>Конструктор</b> '" + construction.name + "' составлен"
                )}
              </li>
              <div>
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
