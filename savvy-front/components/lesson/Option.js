import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";

const Button = styled.button`
  font-family: Montserrat;
  /* color: #112a62; */
  padding: 0.5% 1%;
  font-size: 1.6rem;
  background: #ffffff;
  /* border: 1px solid #112a62; */
  border-radius: 5px;
  outline: 0;
  margin-top: 3%;
  width: 45%;
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  justify-content: space-between;
  margin-bottom: 3%;
`;

const Box = styled.div`
  display: ${props => (props.hide ? "none" : "block")};
`;

class Option extends Component {
  state = {
    hide: false
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
    this.setState({ hide: true });
  };

  render() {
    const { quiz, note, test } = this.props;
    return (
      <>
        {note && (
          <Box hide={this.state.hide}>
            <div>{renderHTML(note.text.substring(0, 150) + "...")}</div>
            <Group>
              <Button onClick={this.push} name="true" type="note">
                Правильно
              </Button>
              <Button onClick={this.push} name="false" type="note">
                Неправильно
              </Button>
            </Group>
          </Box>
        )}
        {test && (
          <Box hide={this.state.hide}>
            <div>{test.question}</div>
            <Group>
              <Button onClick={this.push} name="true" type="newTest">
                Правильно
              </Button>
              <Button onClick={this.push} name="false" type="newTest">
                Неправильно
              </Button>
            </Group>
          </Box>
        )}
        {quiz && (
          <Box hide={this.state.hide}>
            <div>{quiz.question}</div>
            <Group>
              <Button onClick={this.push} name="true" type="quiz">
                Правильно
              </Button>
              <Button onClick={this.push} name="false" type="quiz">
                Неправильно
              </Button>
            </Group>
          </Box>
        )}
      </>
    );
  }
}

export default Option;
