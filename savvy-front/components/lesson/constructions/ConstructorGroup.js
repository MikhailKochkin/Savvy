import React, { Component } from "react";
import SingleConstructor from "./SingleConstructor";
import styled from "styled-components";

const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
`;

const Button = styled.button`
  border: none;
  background: none;
  a {
    text-decoration: none;
    display: inline-block;
    padding: 8px 16px;
  }

  a:hover {
    background-color: #112862;
    color: white;
  }

  .previous {
    background-color: #f1f1f1;
    color: black;
    text-align: center;
  }

  .next {
    background-color: #f1f1f1;
    color: black;
  }

  .round {
    border-radius: 50%;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`;

const Advice = styled.p`
  font-size: 1.6rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2%;
  margin: 30px 0;
  width: 70%;
  @media (max-width: 800px) {
    width: 100%;
  }
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
    if (this.state.num < this.props.constructions.length - 1) {
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
    const userData = this.props.constructionResults.filter(
      result => result.student.id === this.props.me.id
    );
    let arr;
    const construction = this.props.constructions[this.state.num];

    return (
      <>
        <Advice>
          <b>Совет</b>: чтобы увидеть, правильно ли вы нашли все риски и ошибки,
          вам нужно сначала постараться самим найти все ошибки. После того, как
          вы найдете все существующие, по вашему мнению, ошибки, вы можете
          нажать на кнопку "Показать све ошибки".{" "}
        </Advice>
        <Box>
          <Title>
            Конструктор {this.state.num + 1} из{" "}
            {this.props.constructions.length}
            <button onClick={this.onPrev}>Предыдущий</button>
            <button onClick={this.onNext}>Следующий</button>
          </Title>
        </Box>
        {construction && (
          <>
            {(arr = Array(construction.answer.length).fill(""))}
            <SingleConstructor
              key={construction.id}
              lessonID={this.props.lessonID}
              construction={construction}
              variants={construction.variants}
              me={this.props.me}
              arr={arr}
              userData={userData}
            />
          </>
        )}
      </>
    );
  }
}

export default TextEditorGroup;
