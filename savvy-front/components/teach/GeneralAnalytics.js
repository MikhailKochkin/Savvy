import React, { Component } from "react";
import styled from "styled-components";

const Styles = styled.div`
  padding: 1%;
  background: white;
  padding: 3%;
  margin-bottom: 3%;
`;

class GeneralAnalytics extends Component {
  render() {
    return (
      <Styles>Всего студентов на курсе: {this.props.students.length}</Styles>
    );
  }
}

export default GeneralAnalytics;
