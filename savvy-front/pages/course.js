import CoursePage from "../components/course/CoursePage";
const Course = (props) => {
  return <CoursePage id={props.query.id} />;
};

// export default withTranslation("common")(CoursePagePage);
export default Course;
