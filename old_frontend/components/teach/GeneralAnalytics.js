import React, { Component } from "react";
import styled from "styled-components";

const Styles = styled.div`
  padding: 3% 0;
`;

class GeneralAnalytics extends Component {
  render() {
    return (
      <Styles>Всего студентов на курсе: {this.props.students.length}</Styles>
    );
  }
}

export default GeneralAnalytics;
