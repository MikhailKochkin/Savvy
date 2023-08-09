import React, { Component } from "react";
import styled from "styled-components";
import parse from "html-react-parser";

import Modal from "styled-react-modal";
import moment from "moment";

const Box = styled.div`
  display: flex;
  justify-content: row;
  margin-bottom: 2%;
  div {
    flex: 50%;
    &.column {
      padding-left: 2%;
      border-left: 1px solid #edefed;
    }
  }
  .no {
    color: red;
  }
  .answer_box {
    background: #e8e8e4;
    width: 95%;
  }
`;

const StyledModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  overflow: scroll;
  padding: 3% 2%;
  width: 50%;
  max-height: 600px;
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const Button = styled.button`
  text-align: center;
  background: #ffffff;
  border: 1px solid #112a62;
  border-radius: 5px;
  cursor: pointer;
  outline: 0;
  margin: 1% 0;
  color: #112a62;
  font-size: 1.4rem;
  a {
    color: #112a62;
  }
`;

const Span = styled.div`
  max-height: 600px;
  margin: 3% 0;
`;

const Block = styled.div`
  margin: 3% 0;
  padding: 3% 0;
  border-bottom: 1px solid #edefed;
`;

class ProblemModal extends Component {
  state = {
    isOpen: false,
  };
  toggleModal = (e) => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };
  render() {
    moment.locale("ru");

    const {
      problem,
      student,
      results,
      newTests,
      quizes,
      notes,
      testResults,
      quizResults,
    } = this.props;

    let arr = [];
    let first_element;

    const getAllIndexes = (arr, val) => {
      var indexes = [],
        i;
      for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
      return indexes;
    };

    const checker = (el) => {
      // 2. add element to the queue
      // 3. check if the element has next_elements
      if (
        el == null ||
        el == undefined ||
        el.next == undefined ||
        el.next == null
      )
        return;
      arr.push(el);

      if (
        (el.next.true.type !== null && el.next.true.value !== null) ||
        (el.next.false.type !== null && el.next.false.value)
      ) {
        // 4. find the element
        let new_el;

        if (el.next.true.type.toLowerCase() == "newtest") {
          new_el = newTests.find((t) => t.id == el.next.true.value);
        } else if (el.next.true.type.toLowerCase() == "quiz") {
          new_el = quizes.find((q) => q.id == el.next.true.value);
        } else if (el.next.true.type.toLowerCase() == "note") {
          new_el = notes.find((n) => n.id == el.next.true.value);
        }
        if (new_el) checker(new_el);
      }
      // 4. restart the process
    };

    const solution_builder = () => {
      if (problem.nodeID == null || problem.nodeType == null) {
        return;
      }
      if (problem.nodeType.toLowerCase() == "newtest") {
        first_element = newTests.find((el) => el.id == problem.nodeID);
      } else if (problem.nodeType.toLowerCase() == "quiz") {
        first_element = quizes.find((el) => el.id == problem.nodeID);
      } else if (problem.nodeType.toLowerCase() == "note") {
        first_element = notes.find((el) => el.id == problem.nodeID);
      }
      checker(first_element);
    };
    solution_builder();
    return (
      <Box key={problem.id}>
        <div>
          <b>Задача: </b>
          {parse(`${problem.text}`)}
        </div>
        <div className="column">
          <div>Ход решения:</div>
          {arr.length > 0 &&
            arr.map((el) => {
              if (el.__typename.toLowerCase() == "newtest") {
                return (
                  <Block>
                    {parse(el.question[0])}
                    <div>
                      {testResults.filter((r) => r.test.id === el.id).length >
                      0 ? (
                        testResults
                          .filter((r) => r.test.id === el.id)
                          .map((t) => {
                            return (
                              <div className="answer_box">
                                {t.answer} /{" "}
                                {/* {el.correct.map((cor) => cor + ", ")} */}
                                {getAllIndexes(el.correct, true).map((i) =>
                                  parse(el.answers[i])
                                )}
                              </div>
                            );
                          })
                      ) : (
                        <div className="no">Решений нет</div>
                      )}
                    </div>
                  </Block>
                );
              }
              if (el.__typename.toLowerCase() == "quiz") {
                return (
                  <Block>
                    {parse(el.question)}
                    {/* {console.log(
                      "quizResults",
                      quizResults.filter((r) => r.quiz.id === el.id)
                    )} */}
                    <div>
                      {quizResults.filter((r) => r.quiz.id === el.id).length >
                      0 ? (
                        quizResults
                          .filter((r) => r.quiz.id === el.id)
                          .map((t) => {
                            return (
                              <div className="answer_box">
                                {t.answer} - {t.correct.toString()}
                              </div>
                            );
                          })
                      ) : (
                        <div className="no">Решений нет</div>
                      )}
                    </div>
                  </Block>
                );
              }
              if (el.__typename.toLowerCase() == "note") {
                return <Block>{parse(el.text)}</Block>;
              }
            })}

          {/* <div>Открытые подсказки:</div> */}
          {/* <div>
            {results &&
            results.length > 0 &&
            results.filter((r) => r.problem.id === problem.id)[0] ? (
              results
                .filter((r) => r.problem.id === problem.id)[0]
                .revealed.map((t) => <div>{parse(t)}</div>)
            ) : (
              <span>Не выполнена</span>
            )}
          </div> */}
        </div>
        <div className="column">
          {results && results.length > 0 ? (
            results
              .filter((t) => t.problem.id === problem.id)
              .map((t) => (
                <>
                  {moment(t.createdAt).format("LLL")}
                  {t.answer.length < 200 ? (
                    <span>{parse(t.answer)}</span>
                  ) : (
                    <span>{parse(t.answer.substring(0, 200) + "...")}</span>
                  )}
                  <Modal
                    isOpen={this.state.isOpen}
                    onBackgroundClick={this.toggleModal}
                    onEscapeKeydown={this.toggleModal}
                  >
                    <StyledModal>
                      {results.filter((t) => t.problem.id === problem.id)
                        .length > 0 ? (
                        results
                          .filter((t) => t.problem.id === problem.id)
                          .map((t) => <Span>{parse(t.answer)}</Span>)
                      ) : (
                        <span>No data</span>
                      )}
                    </StyledModal>
                  </Modal>
                  <Button onClick={this.toggleModal}>
                    <a>Open</a>
                  </Button>
                  <br />
                </>
              ))
          ) : (
            <span>No data</span>
          )}
        </div>
      </Box>
    );
  }
}

export default ProblemModal;
