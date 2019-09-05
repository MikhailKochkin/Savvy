import React, { Component } from "react";
import ExamQuestion from "../components/course/ExamQuestion";

class examQuestion extends Component {
  render() {
    return <ExamQuestion id={this.props.query.id} />;
  }
}

export default examQuestion;
