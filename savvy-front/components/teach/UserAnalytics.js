import React, { Component } from "react";
import StudentData from "./StudentData";
import styled from "styled-components";
import renderHTML from "react-render-html";

const Styles = styled.div`
  border: 2px solid #edefed;
  margin: 3% 0;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const Header = styled.p`
  font-size: 2rem;
  background: #edefed;
  padding: 0.5% 2%;
  padding-top: 8px;
  margin: 0;
  margin-top: -2px;
  border: 1px solid #edefed;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

class UserAnalytics extends Component {
  render() {
    const { coursePage, students } = this.props;
    // console.log(coursePage.examQuestion.answers);
    return (
      <Styles>
        <Header>Ученики</Header>
        {students.map(student => (
          <>
            <StudentData student={student} lessons={coursePage.lessons} />
            {/* {coursePage.examQuestion.answers.filter(
              answer => answer.student.id === student.id
            )[0] !== undefined ? (
              <>
                <p> Ответ на финальное практическое задание </p>
                {renderHTML(
                  coursePage.examQuestion.answers.filter(
                    answer => answer.student.id === student.id
                  )[0].answer
                )}
              </>
            ) : null} */}
          </>
        ))}
      </Styles>
    );
  }
}

export default UserAnalytics;
