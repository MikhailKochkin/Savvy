import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import moment from "moment";

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
    padding: 0 1%;
    &.column {
      padding-left: 2%;
      border-left: 1px solid #edefed;
    }
  }
`;

const Block = styled.div`
  padding: 2% 0;
  margin-bottom: 15px;
  border-bottom: ${(props) =>
    props.final ? "1px solid #001F4E" : "1px solid #edefed"};
`;

class TestResult extends Component {
  getAllIndexes = (arr, val) => {
    var indexes = [],
      i;
    for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
    return indexes;
  };
  render() {
    const { newTests, student, results } = this.props;
    moment.locale("ru");
    return (
      <Container>
        {newTests.length > 0 &&
          newTests.map((test) => (
            <Box>
              <div>
                <b>Тест: </b>
                {renderHTML(test.question[0])}
              </div>
              <div className="column">
                <div>
                  <b>Правильный ответ:</b>
                </div>
                {this.getAllIndexes(test.correct, true).map((i) =>
                  renderHTML(test.answers[i])
                )}
              </div>
              <div className="column">
                {results && results.length > 0 ? (
                  results
                    .filter((r) => r.test.id === test.id)
                    .map((t, i) => (
                      <Block final={i == results.length - 1}>
                        {renderHTML(t.answer)}(
                        {moment(t.createdAt).format("LLL")})
                      </Block>
                    ))
                ) : (
                  <span>Не выполнен</span>
                )}
              </div>
            </Box>
          ))}
      </Container>
    );
  }
}

export default TestResult;
