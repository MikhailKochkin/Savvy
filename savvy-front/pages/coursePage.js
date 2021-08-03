import CoursePage from "../components/course/CoursePage";
import NewCoursePage from "../components/course/NewCoursePage";

const CoursePagePage = (props) => {
  return props.query.id === "cjtreu3md00fp0897ga13aktp" &&
    props.query.type !== "old" ? (
    <NewCoursePage id={props.query.id} />
  ) : (
    <CoursePage id={props.query.id} />
  );
};

export default CoursePagePage;
