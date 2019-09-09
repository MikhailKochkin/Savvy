import React, { Component } from "react";
import SingleProblem from "./SingleProblem";
import styled from "styled-components";

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

const Advice = styled.div`
  font-size: 1.6rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2%;
  margin: 30px 0 15px 0;
  width: 85%;
  @media (max-width: 850px) {
    width: 100%;
  }
`;

class ProblemGroup extends Component {
  state = {
    shown: false,
    num: 0
  };
  onNext = () => {
    if (this.state.num < this.props.problems.length - 1) {
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
    const userData = this.props.problemResults.filter(
      result => result.student.id === this.props.me.id
    );
    const id = this.props.problems[this.state.num];
    return (
      <>
        <Advice>
          <b>Совет</b>: чтобы увидеть ответ на задачу, вам нужно сначала дать
          собственный ответ. Для этого введите его в форму ниже и нажмите на
          кнопку "Ответить". После этого при нажатии на раздел "Ответ", вам
          откроется ответ на задачу.{" "}
        </Advice>
        <Box>
          <Title>
            Задача {this.state.num + 1} из {this.props.problems.length}
            <button onClick={this.onPrev}>Предыдущая</button>
            <button onClick={this.onNext}>Следующая</button>
          </Title>
        </Box>
        {id && (
          <SingleProblem
            key={id.id}
            problem={id}
            lessonID={this.props.lessonID}
            me={this.props.me}
            userData={userData}
          />
        )}
      </>
    );
  }
}

export default ProblemGroup;