import { gql, useQuery } from "@apollo/client";
import LessonsResultsLoad from "./LessonsResultsLoad";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(id: $id) {
      id
      title
      courseType
      lessons {
        id
        text
        name
        open
        assignment
        number
        structure
      }
    }
  }
`;

const STUDENTS_QUERY = gql`
  query STUDENTS_QUERY($coursePageId: String!) {
    users(
      # where: { new_subjects: { some: { id: { equals: $coursePageId } } } }
      where: { coursePageId: $coursePageId }
    ) {
      id
      name
      surname
      tags
      email
      courseVisits {
        id
        reminders
        visitsNumber
        coursePage {
          id
        }
        createdAt
      }
    }
  }
`;

const LESSONS_QUERY = gql`
  query LESSONS_QUERY($id: String!) {
    lessons(where: { coursePage: { id: { equals: $id } } }) {
      id
      published
    }
  }
`;

const AllEnrolledStudentsData = (props) => {
  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.id },
  });
  const {
    loading: loading1,
    error: error1,
    data: data1,
  } = useQuery(STUDENTS_QUERY, {
    variables: { coursePageId: props.id },
  });
  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(LESSONS_QUERY, {
    variables: { id: props.id },
  });

  if (loading) return <p>Loading course data...</p>;
  if (loading1) return <p>Loading students data...</p>;
  if (loading2) return <p>Loading lessons data...</p>;

  let coursePage = data.coursePage;
  let students = data1.users;
  let lessons = data2.lessons;

  return (
    <div>
      <LessonsResultsLoad
        coursePage={coursePage}
        coursePageID={coursePage.id}
        lessons={lessons}
        students={students}
      />
    </div>
  );
};

export default AllEnrolledStudentsData;
export { SINGLE_COURSEPAGE_QUERY };
