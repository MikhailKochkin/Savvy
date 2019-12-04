import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import UpdateNote from "./UpdateNote";

const NoteStyles = styled.div`
  width: 100%;
  margin: 2% 0 0 0;
  padding: 1%;
  font-size: 1.6rem;
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

const Button = styled.button`
  border: none;
  background: none;
  border: 1px solid #112a62;
  border-radius: 5px;
  font-family: Montserrat;
  padding: 1.5% 3%;
  font-size: 1.6rem;
  margin-right: 3%;
  outline: 0;
  color: #112a62;
  cursor: pointer;
  &:hover {
    background: #112a62;
    color: white;
  }
  @media (max-width: 800px) {
    margin-bottom: 20px;
  }
`;

class note extends Component {
  state = {
    update: false
  };
  switch = () => {
    this.setState(prev => ({ update: !prev.update }));
  };
  render() {
    return (
      <>
        {!this.state.update && (
          <NoteStyles>{renderHTML(this.props.text)}</NoteStyles>
        )}
        {this.state.update && <UpdateNote note={this.props.note} />}
        {this.props.me.id === this.props.teacher && (
          <Button onClick={this.switch}>
            {!this.state.update ? "Изменить" : "Вернуться"}
          </Button>
        )}
      </>
    );
  }
}

export default note;
