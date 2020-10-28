import React from "react";
import StudentData from "./StudentData";
import styled from "styled-components";
import PropTypes from "prop-types";

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

const UserAnalytics = (props) => {
  const { coursePageID, students, lessons } = props;
  console.log(props.student);
  return (
    <Styles>
      {students.map((student) => (
        <>
          <StudentData
            coursePage={coursePageID}
            student={student}
            lessons={lessons}
            courseVisit={
              student.courseVisits.filter(
                (c) => c.coursePage.id === coursePageID
              )[0]
            }
          />
        </>
      ))}
    </Styles>
  );
};

UserAnalytics.propTypes = {
  lessons: PropTypes.object.isRequired,
  students: PropTypes.object.isRequired,
  coursePageID: PropTypes.string.isRequired,
};

export default UserAnalytics;
