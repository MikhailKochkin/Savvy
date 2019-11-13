import React, { Component } from "react";
import styled from "styled-components";

const El = styled.div`
  display: ${props => (props.hide ? "none" : "block")};
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
    }
    this.setState({ hide: true });
  };
  render() {
    const { data } = this.props;
    return (
      <El hide={this.state.hide}>
        <div>Тип задания: {data.__typename}</div>
        {this.props.data.__typename === "Note" && (
          <div>Текст: {data.text.substring(0, 100)}</div>
        )}

        {this.props.data.__typename === "NewTest" && (
          <div>Вопрос: {data.question[0]}</div>
        )}
        {this.props.data.__typename === "Quiz" && (
          <div>Вопрос: {data.question}</div>
        )}
        {this.props.data.__typename === "TextEditor" && (
          <div>Текст: {data.text.substring(0, 100)}</div>
        )}
        {this.props.data.__typename === "Constructor" && (
          <div>Название: {data.name}</div>
        )}
        {this.props.data.__typename === "Problem" && (
          <div>Текст: {data.text.substring(0, 100)}</div>
        )}
        <button onClick={this.push}>Выбрать!</button>
      </El>
    );
  }
}

export default Element;
