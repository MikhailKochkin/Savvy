import React, { Component } from "react";
import StudentData from "./StudentData";
import styled from "styled-components";

const Styles = styled.div`
  border: 2px solid #edefed;
  margin: 3% 0;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const Header = styled.p`
  font-size: 1.8rem;
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
    return (
      <Styles>
        <Header>Участники: {students.length}</Header>
        {students.map((student) => (
          <>
            <StudentData
              coursePage={coursePage.id}
              student={student}
              lessons={coursePage.lessons}
              courseVisit={
                student.courseVisits.filter(
                  (c) => c.coursePage.id === coursePage.id
                )[0]
              }
            />
          </>
        ))}
      </Styles>
    );
  }
}

export default UserAnalytics;
