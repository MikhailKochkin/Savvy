import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";

const Button = styled.button`
  font-family: Montserrat;
  padding: 0.5% 1%;
  font-size: 1.5rem;
  background: #ffffff;
  border-radius: 5px;
  text-align: center;
  outline: 0;
  margin-right: 0.5%;
  width: 20%;
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  width: 25%;
  justify-content: space-between;
  margin-bottom: 1%;
`;

const Box = styled.div`
  display: ${props => (props.hide ? "none" : "flex")};
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #edefed;
  width: 100%;
  padding: 1.5%;
  padding-bottom: 0;
  font-size: 1.5rem;
  background: ${props => props.color || null};
  margin-bottom: 2%;
`;

class Option extends Component {
  state = {
    hide: false,
    color: null
  };
  push = e => {
    e.target.getAttribute("type") === "note" &&
      (e.target.name === "true"
        ? this.props.getData(true, { note: this.props.note.id })
        : this.props.getData(false, { note: this.props.note.id }));
    e.target.getAttribute("type") === "quiz" &&
      (e.target.name === "true"
        ? this.props.getData(true, { quiz: this.props.quiz.id })
        : this.props.getData(false, { quiz: this.props.quiz.id }));
    e.target.getAttribute("type") === "newTest" &&
      (e.target.name === "true"
        ? this.props.getData(true, { newTest: this.props.test.id })
        : this.props.getData(false, { newTest: this.props.test.id }));

    e.target.name === "true"
      ? this.setState({ color: "rgba(50, 172, 102, 0.05)" })
      : this.setState({ color: "rgba(253, 156, 125, 0.5);" });
  };

  reset = e => {
    e.target.getAttribute("type") === "note" &&
    this.state.color === "rgba(50, 172, 102, 0.05)"
      ? this.props.getData(true, { note: null })
      : this.props.getData(false, { note: null });
    e.target.getAttribute("type") === "quiz" &&
      (this.state.color === "rgba(50, 172, 102, 0.05)"
        ? this.props.getData(true, { quiz: null })
        : this.props.getData(false, { quiz: null }));
    e.target.getAttribute("type") === "newTest" &&
      (this.state.color === "rgba(50, 172, 102, 0.05)"
        ? this.props.getData(true, { newTest: null })
        : this.props.getData(false, { newTest: null }));

    this.setState({ color: null });
  };

  render() {
    const { quiz, note, test } = this.props;
    return (
      <>
        {note && (
          <Box color={this.state.color}>
            <div>{note.text.substring(0, 50)}</div>
            <Group>
              <Button onClick={this.push} name="true" type="note">
                ✅
              </Button>
              <Button onClick={this.push} name="false" type="note">
                ⛔️
              </Button>
              <Button onClick={this.reset} type="note">
                👊🏻
              </Button>
            </Group>
          </Box>
        )}
        {test && (
          <Box color={this.state.color}>
            <div>{test.question[0].substring(0, 40)}</div>
            <Group>
              <Button onClick={this.push} name="true" type="newTest">
                ✅
              </Button>
              <Button onClick={this.push} name="false" type="newTest">
                ⛔️
              </Button>
              <Button onClick={this.reset} type="newTest">
                👊🏻
              </Button>
            </Group>
          </Box>
        )}
        {quiz && (
          <Box color={this.state.color}>
            <div>{quiz.question.substring(0, 50)}</div>
            <Group>
              <Button onClick={this.push} name="true" type="quiz">
                ✅
              </Button>
              <Button onClick={this.push} name="false" type="quiz">
                ⛔️
              </Button>
              <Button onClick={this.reset} type="quiz">
                👊🏻
              </Button>
            </Group>
          </Box>
        )}
      </>
    );
  }
}

export default Option;
