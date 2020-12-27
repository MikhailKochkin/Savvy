import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import Modal from "styled-react-modal";

const Box = styled.div`
  display: flex;
  justify-content: row;
  margin-bottom: 1%;
  div {
    &.column {
      padding-left: 2%;
      border-left: 1px solid #edefed;
      flex-basis: 33.3%;
    }
    &.box {
      padding-bottom: 10px;
      margin-bottom: 10px;
      flex-basis: 66.6%;
    }
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  #id {
    color: #dc143c;
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

const Block = styled.div`
  padding-bottom: 2%;
  margin-bottom: 3%;
  border-bottom: 1px solid #edefed;
`;

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 1% 2%;
  width: 50%;
  max-height: calc(100vh - 5rem);
  overflow-y: scroll;
  @media (max-width: 800px) {
    width: 90%;
  }
  p {
      margin: 1%;
  }
  #id {
    color: #dc143c;
  }
`;

const Text = styled.div`
  img {
    max-width: 200px;
  }
`;

class TexteditorModal extends Component {
  state = {
    isOpen: false
  };
  toggleModal = e => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };
  render() {
    const { texteditor, student } = this.props;
    return (
      <Box>
        <TextBox className="box">
          <Text>
            <b>Редактор: </b>
            {renderHTML(texteditor.text.substring(0, 200) + "...")}
            <Button onClick={this.toggleModal}>
              <a>Развернуть</a>
            </Button>
          </Text>
          <StyledModal
            isOpen={this.state.isOpen}
            onBackgroundClick={this.toggleModal}
            onEscapeKeydown={this.toggleModal}
          >
            {renderHTML(texteditor.text)}
          </StyledModal>
        </TextBox>
        <div className="column">
          {texteditor.textEditorResults.filter(t => t.student.id === student.id)
            .length > 0 ? (
            texteditor.textEditorResults
              .filter(t => t.student.id === student.id)
              .map(t => (
                <Block>
                  <div>⛔️: {t.wrong} </div>
                  <div>✅: {t.correct} </div>
                  <div>❓: {t.guess} </div>
                  <div>Попытка {t.attempts} </div>
                </Block>
              ))
          ) : (
            <div>Ответов нет</div>
          )}
        </div>
      </Box>
    );
  }
}

export default TexteditorModal;
