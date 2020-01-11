import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import UpdateNote from "./UpdateNote";

const Container = styled.div`
  width: ${props => (props.story ? "95%" : "100%")};
  font-size: 1.6rem;
  margin: 30px 0;
`;

const NoteStyles = styled.div`
  width: ${props => (props.story ? "100%" : "95%")};
  margin: 2% 0 0 0;
  padding: 0% 2%;
  font-size: 1.6rem;
  border: ${props => (props.story ? null : "1px solid #e4e4e4")};
  border-radius: 8px;
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
  img {
    display: block;
    max-width: 100%;
    max-height: 20em;
    box-shadow: "0 0 0 2px blue;";
  }
  iframe {
    width: 100%;
    height: 400px;
    @media (max-width: 800px) {
      width: 100%;
      height: auto;
    }
  }
  a {
    color: #112b62;
    &:hover {
      text-decoration: underline;
    }
  }
  pre {
    background: #282c34;
    color: white;
    padding: 2% 4%;
    line-height: 1;
    font-size: 1.4rem;
    border-radius: 10px;
  }
  table {
    width: 100%;
    border: 1px solid #edefed;
    border-collapse: collapse;
    tr {
      border: 1px solid #edefed;
    }
    thead {
      background: #f5f5f5;
      font-weight: bold;
    }
    th {
      border: 1px solid #edefed;
    }
    td {
      border: 1px solid #edefed;
      border-top: none;
      border-bottom: none;
      border-right: none;
      padding: 0% 2.5%;
      position: relative;
      width: 5%;
    }
  }
`;

const Dots = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 90px;
  margin-bottom: 5%;
  .group {
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: space-between;
    margin-top: 5%;
  }
  .dot {
    width: 12px;
    height: 12px;
    background: #c4c4c4;
    border-radius: 50%;
  }
`;

const MiniButton = styled.div`
  border: none;
  background: none;
  cursor: pointer;
  margin: 1.5% 0;
  padding: 0% 2%;
  &:hover {
    text-decoration: underline;
  }
`;

class note extends Component {
  state = {
    update: false
  };
  switch = () => {
    this.setState(prev => ({ update: !prev.update }));
  };
  push = () => {
    this.props.exam
      ? this.props.getData(
          this.props.next ? this.props.next.true : { finish: 0 },
          "true"
        )
      : null;
  };
  render() {
    return (
      <>
        <Container story={this.props.story}>
          {!this.props.exam && this.props.me.id === this.props.teacher && (
            <MiniButton onClick={this.switch}>
              {!this.state.update ? "Настройки" : "Заметка"}
            </MiniButton>
          )}
          {!this.state.update && (
            <NoteStyles story={this.props.story}>
              {renderHTML(this.props.text)}
            </NoteStyles>
          )}
          {this.props.getData && (
            <MiniButton onClick={this.push}>
              Разобрались? Поехали дальше!
            </MiniButton>
          )}
          {this.state.update && this.props.story !== true && (
            <UpdateNote
              notes={this.props.notes}
              text={this.props.text}
              tests={this.props.tests}
              id={this.props.note}
              quizes={this.props.quizes}
            />
          )}
        </Container>
        {this.props.exam && (
          <Dots>
            <div className="group">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </Dots>
        )}
      </>
    );
  }
}

export default note;
