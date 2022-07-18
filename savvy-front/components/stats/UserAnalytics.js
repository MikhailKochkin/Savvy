import { useState } from "react";
import StudentData from "./StudentData";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import Loading from "../Loading";
import * as _ from "lodash";

const LESSON_RESULTS_QUERY = gql`
  query LESSON_RESULTS_QUERY($coursePageId: String!) {
    lessonResults(
      where: {
        lesson: { coursePageId: { equals: $coursePageId } }
        student: { new_subjects: { some: { id: { equals: $coursePageId } } } }
      }
    ) {
      id
      visitsNumber
      progress
      checked
      lesson {
        id
        name
        structure
        type
        number
      }
      student {
        id
        email
      }
      createdAt
      updatedAt
    }
  }
`;

const Styles = styled.div`
  border: 2px solid #edefed;
  margin: 3% 0;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const Header = styled.p`
  font-size: 1.8rem;
  /* background: #edefed; */
  padding: 0.5% 2%;
  padding-top: 8px;
  margin: 0;
  margin-top: -2px;
  margin-bottom: 5px;
  border-bottom: 2px solid #edefed;
`;

const UserAnalytics = (props) => {
  const { coursePageID, coursePage, students, lessons } = props;
  const [number, setNumber] = useState(25);

  const { loading, error, data } = useQuery(LESSON_RESULTS_QUERY, {
    variables: { coursePageId: coursePageID },
  });
  if (loading) return <Loading />;

  const results = data.lessonResults;
  let cloned_elements = _.cloneDeep(students);
  let d = cloned_elements.map((el) =>
    Object.defineProperty(el, "date", {
      value:
        el.courseVisits.filter((c) => c.coursePage.id == coursePageID).length >
        0
          ? new Date(
              el.courseVisits.filter(
                (c) => c.coursePage.id == coursePageID
              )[0].createdAt
            )
          : new Date("2016-01-01T08:16:20.669Z"),
      writable: true,
    })
  );
  let sorted = d.sort((a, b) => b.date - a.date);
  return (
    <Styles>
      <Header>Всего пользователей: {students.length} </Header>
      {sorted.slice(0, number).map((student) => {
        let student_results = results.filter((r) => r.student.id == student.id);
        return (
          <StudentData
            coursePageID={coursePageID}
            coursePage={coursePage}
            student={student}
            lessons={lessons}
            results={student_results}
            courseVisit={
              student.courseVisits.filter(
                (c) => c.coursePage.id === coursePageID
              )[0]
            }
          />
        );
      })}
      {number < students.length && (
        <button onClick={(e) => setNumber(number + 25)}>Еще</button>
      )}
    </Styles>
  );
};

UserAnalytics.propTypes = {
  lessons: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  coursePageID: PropTypes.string.isRequired,
};

export default UserAnalytics;
