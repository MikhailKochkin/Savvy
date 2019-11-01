import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";

const NoteStyles = styled.div`
  width: 100%;
  margin: 2% 0;
  padding: 1%;
  font-size: 1.6rem;
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
  table {
    width: 90%;
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
    }
  }
`;

class note extends Component {
  render() {
    return <NoteStyles>{renderHTML(this.props.text)}</NoteStyles>;
  }
}

export default note;
