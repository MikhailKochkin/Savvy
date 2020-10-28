import React, { Component } from "react";
import StudentProblemResult from "./StudentProblemResult";
import renderHTML from "react-render-html";
import styled from "styled-components";

const Styles = styled.div`
  margin: 0 1%;
  margin-bottom: 5px;
  padding: 1%;
  border-bottom: 2px solid #edefed;
`;

class Problem extends Component {
  state = {
    components: [],
  };

  componentDidMount() {
    let arr = [];
    const manage = (el) => {
      if (el && el.next) {
        arr.push(
          this.props.parts.filter((p) => p.id === el.next.true.value)[0]
        );
        manage(this.props.parts.filter((p) => p.id === el.next.true.value)[0]);
      }
    };
    let first = this.props.parts.filter(
      (p) => p.id === this.props.problem.nodeID
    )[0];
    manage(first);
    if (first) {
      this.setState({
        components: [first, ...arr.filter((c) => c !== undefined)],
      });
    } else {
      this.setState({
        components: [...arr.filter((c) => c !== undefined)],
      });
    }
  }
  render() {
    // let students_who_completed = this.props.students.filter(
    //   (s) =>
    //     s.problemResults.filter((p) => p.problem.id === this.props.problem.id)
    //       .length > 0
    // );
    return (
      <Styles>
        <b>Задача {this.props.index}.</b>
        {renderHTML(this.props.problem.text)}
        <div>
          <b>Решения:</b>
        </div>
        <ol>
          {this.props.problem.problemResults.map((p, i) => (
            <div>
              {i + 1}. {p.student.name}
              {p.student.surname}:{renderHTML(p.answer)}
            </div>
          ))}
          {/* {students_who_completed.map((s) => (
            <li>
              <StudentProblemResult
                coursePage={this.props.coursePage}
                lesson={this.props.lesson}
                student={s}
                problem={this.props.problem}
                components={this.state.components}
              />
            </li>
          ))} */}
        </ol>
      </Styles>
    );
  }
}

export default Problem;
