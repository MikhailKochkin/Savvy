import CoursePage from "../components/course/CoursePage";

const CoursePagePage = (props) => <CoursePage id={props.query.id} />;

CoursePagePage.getInitialProps = async () => ({
  namespacesRequired: ["search"],
});

export default CoursePagePage;
