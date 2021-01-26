import React, { Component } from "react";
import Exam from "./Exam";
import LessonHeader from "../LessonHeader";

class Exams extends Component {
  render() {
    return (
      <div>
        {this.props.lesson.exams.map(ex => (
          <Exam
            key={ex.id}
            lesson={this.props.lesson}
            me={this.props.me}
            exam={ex}
          />
        ))}
      </div>
    );
  }
}

export default Exams;
