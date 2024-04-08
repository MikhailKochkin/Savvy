import { useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import * as _ from "lodash";

import Loading from "../Loading";
import StudentData from "./StudentData";

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

  const { loading, error, data } = useQuery(LESSON_RESULTS_QUERY, {
    variables: {
      lessonId: lesson.id,
    },
  });
  if (loading) return <Loading />;
  const results = data.lessonResults;
  return (
    <Styles>
      <Header>{lesson.name}</Header>
      <Header># Users: {students.length} </Header>
      {[...students]
        .sort((a, b) => {
          const resultA = results.find((res) => res.student.id === b.id);
          const resultB = results.find((res) => res.student.id === a.id);

          if (!resultA || !resultB) {
            return 0; // or handle this case differently
          }

          return new Date(resultA.createdAt) - new Date(resultB.createdAt);
        })
        .map((student) => {
          return (
            <StudentData
              me={props.me}
              student={student}
              lessons={[lesson]}
              results={results.filter((r) => r.student.id === student.id)}
              type="lesson_analytics"
            />
          );
        })}
    </Styles>
  );
};

UserAnalytics.propTypes = {
  lessons: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  coursePageID: PropTypes.string.isRequired,
};

export default UserAnalytics;
