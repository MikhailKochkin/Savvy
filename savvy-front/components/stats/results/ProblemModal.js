import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
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

class ProblemModal extends Component {
  state = {
    isOpen: false,
  };
  toggleModal = (e) => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };
  render() {
    moment.locale("ru");

    const { problem, student, results } = this.props;
    return (
      <Box key={problem.id}>
        <div>
          <b>Задача: </b>
          {renderHTML(`${problem.text}`)}
        </div>
        <div className="column">
          <div>Открытые подсказки:</div>
          <div>
            {results &&
            results.length > 0 &&
            results.filter((r) => r.problem.id === problem.id)[0] ? (
              results
                .filter((r) => r.problem.id === problem.id)[0]
                .revealed.map((t) => <div>{renderHTML(t)}</div>)
            ) : (
              <span>Не выполнена</span>
            )}
          </div>
        </div>
        <div className="column">
          {results && results.length > 0 ? (
            results
              .filter((t) => t.problem.id === problem.id)
              .map((t) => (
                <>
                  {moment(t.createdAt).format("LLL")}
                  {t.answer.length < 200 ? (
                    <span>{renderHTML(t.answer)}</span>
                  ) : (
                    <span>
                      {renderHTML(t.answer.substring(0, 200) + "...")}
                    </span>
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
                          .map((t) => <Span>{renderHTML(t.answer)}</Span>)
                      ) : (
                        <span>Не выполнена</span>
                      )}
                    </StyledModal>
                  </Modal>
                  <Button onClick={this.toggleModal}>
                    <a>Развернуть</a>
                  </Button>
                </>
              ))
          ) : (
            <span>Не выполнена</span>
          )}
        </div>
      </Box>
    );
  }
}

export default ProblemModal;
