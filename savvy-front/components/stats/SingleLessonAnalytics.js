import { useState } from "react";
import StudentData from "./StudentData";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import Loading from "../Loading";
import * as _ from "lodash";

const LESSON_RESULTS_QUERY = gql`
  query LESSON_RESULTS_QUERY($lessonId: String!) {
    lessonResults(where: { lessonId: { equals: $lessonId } }) {
      id
      visitsNumber
      progress
      checked
      lesson {
        id
        name
        structure
        published
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
  width: 80%;
  background-color: #fff;
  border: 2px solid #f2f6f9;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  margin: 50px 0;
`;

const Header = styled.p`
  font-size: 1.8rem;
  /* background: #edefed; */
  padding: 0.5% 2%;
  padding-top: 8px;
  margin: 0;
  margin-top: -2px;
  margin-bottom: 5px;
  border-bottom: 3px solid #f2f6f9;
`;

const UserAnalytics = (props) => {
  const { students, lesson } = props;
  const [number, setNumber] = useState(25);

  //   let cloned_elements = _.cloneDeep(students);
  //   let d = cloned_elements.map((el) =>
  //     Object.defineProperty(el, "date", {
  //       value:
  //         el.courseVisits.filter((c) => c.coursePage.id == coursePageID).length >
  //         0
  //           ? new Date(
  //               el.courseVisits.filter(
  //                 (c) => c.coursePage.id == coursePageID
  //               )[0].createdAt
  //             )
  //           : new Date("2016-01-01T08:16:20.669Z"),
  //       writable: true,
  //     })
  //   );
  //   let sorted = d.sort((a, b) => b.date - a.date);

  //   let student_arr = [];
  //   sorted.map((s) => student_arr.push(s.id));
  const { loading, error, data } = useQuery(LESSON_RESULTS_QUERY, {
    variables: {
      lessonId: lesson.id,
    },
  });
  if (loading) return <Loading />;
  // <p>Loading students results data...</p>;
  const results = data.lessonResults;
  return (
    <Styles>
      <Header>{lesson.name}</Header>
      <Header># Users: {students.length} </Header>
      {students.slice(0, number).map((student) => {
        return (
          <StudentData
            student={student}
            lessons={[lesson]}
            results={results.filter((r) => r.student.id === student.id)}
            type="lesson_analytics"
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
