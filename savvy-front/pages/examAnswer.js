import React, { Component } from "react";
import ExamAnswer from "../components/course/ExamAnswer";

class examAnswer extends Component {
  render() {
    return <ExamAnswer id={this.props.query.id} />;
  }
}

export default examAnswer;
