import React, { Component } from "react";
import Shots from "./Shots";
import styled from "styled-components";

const Styles = styled.div`
  margin: 30px 0;
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

class ShotsGroup extends Component {
  state = {
    num: 0
  };
  onNext = () => {
    if (this.state.num < this.props.shots.length - 1) {
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
    const userData = this.props.shotResults.filter(
      result => result.student.id === this.props.me.id
    );
    const sh = this.props.shots[this.state.num];
    return (
      <Styles>
        <Box>
          <Title>
            Задача {this.state.num + 1} из {this.props.shots.length}
            <button onClick={this.onPrev}>Предыдущая</button>
            <button onClick={this.onNext}>Следующая</button>
          </Title>
        </Box>
        {sh && (
          <Shots
            key={sh.id}
            comments={sh.comments}
            parts={sh.parts}
            shotUser={sh.user.id}
            me={this.props.me}
            shotID={sh.id}
            lessonID={this.props.lessonID}
            title={sh.title}
            userData={userData}
          />
        )}
      </Styles>
    );
  }
}

export default ShotsGroup;
