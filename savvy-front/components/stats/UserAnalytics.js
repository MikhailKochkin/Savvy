import StudentData from "./StudentData";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import PropTypes from "prop-types";

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
      lesson {
        id
        structure
        type
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
  const { coursePageID, students, lessons } = props;
  const { loading, error, data } = useQuery(LESSON_RESULTS_QUERY, {
    variables: { coursePageId: coursePageID },
  });
  if (loading) return <p>Загрузка...</p>;
  const results = data.lessonResults;
  // let coursePage = data.coursePage;
  return (
    <Styles>
      <Header>Всего пользователей: {students.length} </Header>
      {students.map((student) => {
        let student_results = results.filter((r) => r.student.id == student.id);
        return (
          <StudentData
            coursePageID={coursePageID}
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
    </Styles>
  );
};

UserAnalytics.propTypes = {
  lessons: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  coursePageID: PropTypes.string.isRequired,
};

export default UserAnalytics;
