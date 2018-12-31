import CoursePage from '../components/course/CoursePage';

const CoursePagePage = props => (
  <div>
    <CoursePage id={props.query.id} />
  </div>
);

export default CoursePagePage;