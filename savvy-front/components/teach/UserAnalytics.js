import React, { Component } from "react";
import StudentData from "./StudentData";
import styled from "styled-components";

const Styles = styled.div`
  padding: 1%;
  background: white;
  padding: 3%;
`;

const Header = styled.p`
  font-size: 2rem;
`;

class UserAnalytics extends Component {
  render() {
    const { coursePage, students } = this.props;

    return (
      <Styles>
        <Header>Аналитика по студентам</Header>
        {students.map(student => (
          <>
            <StudentData student={student} lessons={coursePage.lessons} />
          </>
        ))}
      </Styles>
    );
  }
}

export default UserAnalytics;
