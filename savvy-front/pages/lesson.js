import SingleLesson from '../components/course/SingleLesson';

const LessonPage = props => (
  <div>
    <SingleLesson id={props.query.id}/>
  </div>
);

export default LessonPage;