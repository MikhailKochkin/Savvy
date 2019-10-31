import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import Modal from "styled-react-modal";

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
  width: 90%;
  outline: 0;
  margin: 1% 0;
  color: #112a62;
  font-size: 1.4rem;
  a {
    color: #112a62;
  }
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

const Text = styled.div``;

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
        <TextBox>
          <Text>
            <b>Редактор: </b>
            {renderHTML(texteditor.text.substring(0, 200) + "...")}
          </Text>
          <StyledModal
            isOpen={this.state.isOpen}
            onBackgroundClick={this.toggleModal}
            onEscapeKeydown={this.toggleModal}
          >
            {renderHTML(texteditor.text)}
          </StyledModal>
          <Button onClick={this.toggleModal}>
            <a>Развернуть</a>
          </Button>
        </TextBox>
        <div className="column">
          {texteditor.textEditorResults.filter(t => t.student.id === student.id)
            .length > 0
            ? texteditor.textEditorResults
                .filter(t => t.student.id === student.id)
                .map(t => <div>Попыток: {t.attempts} </div>)
            : null}

          <div>Всего ошибок: {texteditor.totalMistakes}</div>
        </div>

        <div className="column">
          {texteditor.textEditorResults.filter(t => t.student.id === student.id)
            .length > 0 ? (
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
    );
  }
}

export default TexteditorModal;
