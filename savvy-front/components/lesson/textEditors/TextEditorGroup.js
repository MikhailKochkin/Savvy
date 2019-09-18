import React, { Component } from "react";
import SingleTextEditor from "./SingleTextEditor";
import styled from "styled-components";

const Advice = styled.p`
  font-size: 1.6rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2%;
  margin: 30px 0;
  width: 80%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  button {
    border: none;
    background: none;
    font-size: 1.6rem;
    margin-left: 10px;
    outline: none;
    cursor: pointer;
    font-family: Montserrat;
    &:hover {
      color: #112a62;
    }
  }
`;

class TextEditorGroup extends Component {
  state = {
    shown: false,
    num: 0
  };
  onNext = () => {
    if (this.state.num < this.props.textEditors.length - 1) {
      this.setState(prevState => ({
        num: prevState.num + 1
      }));
    }
  };
  onPrev = () => {
    if (this.state.num > 0) {
      this.setState(prevState => ({
        num: prevState.num - 1
      }));
    }
  };
  render() {
    const userData = this.props.textEditorResults.filter(
      result => result.student.id === this.props.me.id
    );
    const textEditor = this.props.textEditors[this.state.num];
    return (
      <>
        <Advice>
          <b>Совет</b>: чтобы увидеть, правильно ли вы нашли все риски ю ошибки,
          вам нужно сначала постараться самим найти все ошибки. После того, как
          вы найдете все существующие, по вашему мнению, ошибки, вы можете
          нажать на кнопку "Показать све ошибки".{" "}
        </Advice>
        <Box>
          <Title>
            Редактор {this.state.num + 1} из {this.props.textEditors.length}
            <button onClick={this.onPrev}>Предыдущий</button>
            <button onClick={this.onNext}>Следующий</button>
          </Title>
        </Box>
        {textEditor && (
          <SingleTextEditor
            key={textEditor.id}
            lessonID={this.props.lessonID}
            textEditor={textEditor}
            me={this.props.me}
            userData={userData}
          />
        )}
      </>
    );
  }
}

export default TextEditorGroup;
