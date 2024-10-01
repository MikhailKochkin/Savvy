import StudentData from "./StudentData";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import PropTypes from "prop-types";

const LESSON_RESULTS_QUERY = gql`
  query LESSON_RESULTS_QUERY($coursePageId: String!) {
    lessonResults(
      where: { lesson: { coursePageId: { equals: $coursePageId } } }
    ) {
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
  border: 2px solid #f2f6f9;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.8rem;
  padding: 15px 2%;
  margin: 0;
  border-bottom: 3px solid #f2f6f9;
  margin-bottom: 5px;
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
`;

const HeaderCircle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.6;
  font-size: 3.4rem;
  border-radius: 50%;
  border: 4px solid #f2f6f9;
  width: 110px;
  height: 110px;
`;

const HeaderComment = styled.div`
  width: 70%;
  margin-top: 10px;
  text-align: center;
  font-size: 1.4rem;
  line-height: 1.5;
  color: #a5a5a5;
`;

const UserAnalytics = (props) => {
  const { coursePageID, coursePage, students, lessons } = props;

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

  let student_arr = [];
  sorted.map((s) => student_arr.push(s.id));
  const { loading, error, data } = useQuery(LESSON_RESULTS_QUERY, {
    variables: {
      coursePageId: coursePageID,
    },
  });
  if (loading) return <p>Loading students results data...</p>;

  const results = data.lessonResults;

  // console.log("students", students);
  // console.log("results", results);

  const groupResultsByLessonId = (studentResults) => {
    const groupedResults = {};

    // Group results by lesson ID
    studentResults.forEach((result) => {
      const lessonId = result.lesson.id;

      if (!groupedResults[lessonId]) {
        groupedResults[lessonId] = [];
      }

      groupedResults[lessonId].push(result);
    });

    // Create an array with one result per lesson, with the maximum progress
    const maxProgressResults = Object.values(groupedResults).map((results) => {
      // Find the result with the maximum progress
      const maxResult = results.reduce((max, current) => {
        return current.progress > max.progress ? current : max;
      });
      return [maxResult]; // Return an array containing the max result
    });

    return maxProgressResults;
  };

  let populated_students = students;
  const populated_students_with_results = populated_students.map((student) => {
    let student_results = results.filter((r) => r.student.id == student.id);

    return {
      ...student,
      results: groupResultsByLessonId(student_results),
    };
  });

  return (
    <Styles>
      <Header>{coursePage.title}</Header>

      <Header>
        <HeaderBlock>
          <HeaderCircle>{students.length}</HeaderCircle>
          <HeaderComment>
            # Total number of users enrolled on the course
          </HeaderComment>
        </HeaderBlock>
        <HeaderBlock>
          <HeaderCircle>
            {
              populated_students_with_results.filter(
                (st) =>
                  st.results.length /
                    lessons.filter((les) => les.published).length >=
                  0.75
              ).length
            }
          </HeaderCircle>
          <HeaderComment># Users who finished the course</HeaderComment>
        </HeaderBlock>
        <HeaderBlock>
          <HeaderCircle>
            {(
              (populated_students_with_results.filter(
                (st) =>
                  st.results.length /
                    lessons.filter((les) => les.published).length >=
                  0.75
              ).length /
                students.length) *
              100
            ).toFixed(0)}
            %
          </HeaderCircle>
          <HeaderComment>% Users who finished the course</HeaderComment>
        </HeaderBlock>
        <HeaderBlock>
          <HeaderCircle>
            {
              populated_students_with_results.filter(
                (st) => st.results.length > 0
              ).length
            }
          </HeaderCircle>
          <HeaderComment># Users who started the course</HeaderComment>
        </HeaderBlock>
        <HeaderBlock>
          <HeaderCircle>
            {(
              (populated_students_with_results.filter(
                (st) => st.results.length > 0
              ).length /
                students.length) *
              100
            ).toFixed(0)}
            %
          </HeaderCircle>
          <HeaderComment>% Users who started the course</HeaderComment>
        </HeaderBlock>
      </Header>
      {/* <Header>
        # Completed:{" "}
        {
          populated_students_with_results.filter(
            (st) => st.results.length / 4 >= 0.75
          ).length
        }{" "}
        /{" "}
        {(
          (populated_students_with_results.filter(
            (st) => st.results.length / 4 >= 0.75
          ).length /
            students.length) *
          100
        ).toFixed(0)}
        %
      </Header>
      <Header>
        # Started:{" "}
        {
          populated_students_with_results.filter((st) => st.results.length > 1)
            .length
        }{" "}
        /{" "}
        {(
          (populated_students_with_results.filter((st) => st.results.length > 1)
            .length /
            students.length) *
          100
        ).toFixed(0)}
        %
      </Header> */}
      {sorted.map((student) => {
        let student_results = results.filter((r) => r.student.id == student.id);
        return (
          <StudentData
            coursePageID={coursePageID}
            coursePage={coursePage}
            student={student}
            lessons={lessons}
            results={student_results}
            type="all_users_page"
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
