import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";

const El = styled.div`
  display: ${props => (props.hide ? "none" : "block")};
  border: 1px solid #edefed;
  padding: 1.5%;
  margin-bottom: 3%;
  border-radius: 5px;
  img {
    width: 80%;
  }
  .header {
    font-weight: bold;
  }
`;

const Button = styled.button`
  font-family: Montserrat;
  color: #112a62;
  padding: 0.5% 1%;
  font-size: 1.6rem;
  background: #ffffff;
  border: 1px solid #112a62;
  border-radius: 5px;
  margin-top: 3%;
`;

class Element extends Component {
  state = {
    hide: false
  };
  push = e => {
    if (this.props.data.__typename === "NewTest") {
      this.props.getData({ newTest: this.props.data.id });
    } else if (this.props.data.__typename === "Note") {
      this.props.getData({ note: this.props.data.id });
    } else if (this.props.data.__typename === "Quiz") {
      this.props.getData({ quiz: this.props.data.id });
    } else if (this.props.data.__typename === "TextEditor") {
      this.props.getData({ texteditor: this.props.data.id });
    } else if (this.props.data.__typename === "Problem") {
      this.props.getData({ problem: this.props.data.id });
    } else if (this.props.data.__typename === "Exam") {
      this.props.getData({ exam: this.props.data.id });
    } else if (this.props.data.__typename === "Construction") {
      this.props.getData({ construction: this.props.data.id });
    } else if (this.props.data.__typename === "Document") {
      this.props.getData({ document: this.props.data.id });
    } else if (this.props.data.__typename === "Shot") {
      this.props.getData({ shot: this.props.data.id });
    }
    this.setState({ hide: true });
  };
  render() {
    const { data } = this.props;
    return (
      <El hide={this.state.hide}>
        {data.__typename === "Note" && (
          <>
            <div className="header">Заметка</div>
            <div>{renderHTML(data.text.substring(0, 300))}</div>
          </>
        )}

        {data.__typename === "Shot" && (
          <>
            <div className="header">Последовательность</div>
            <div>{renderHTML(data.title)}</div>
          </>
        )}

        {data.__typename === "NewTest" && (
          <>
            <div className="header">Тест</div>
            <div>{data.question[0]}</div>
          </>
        )}
        {data.__typename === "Quiz" && (
          <>
            <div className="header">Вопрос</div>
            <div>{data.question}</div>
          </>
        )}
        {data.__typename === "TextEditor" && (
          <>
            <div className="header">Редактор текста</div>
            <div>{data.text.substring(0, 100)}</div>
          </>
        )}
        {data.__typename === "Construction" && (
          <>
            <div className="header">Конструктор</div>
            <div>{data.name}</div>
          </>
        )}
        {data.__typename === "Problem" && (
          <>
            <div className="header">Задача</div>
            <div>{renderHTML(data.text.substring(0, 300))}</div>
          </>
        )}
        {data.__typename === "Exam" && (
          <>
            <div className="header">Экзамен</div>
            <div>ID первого вопроса: {data.id}</div>
          </>
        )}
        {data.__typename === "Document" && (
          <>
            <div className="header">Документ</div>
            <div>Название документа: {data.title}</div>
          </>
        )}
        <Button onClick={this.push}>Выбрать!</Button>
      </El>
    );
  }
}

export default Element;
