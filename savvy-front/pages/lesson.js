import SingleLesson from '../components/lesson/SingleLesson';

const LessonPage = props => (
  <div>
    <SingleLesson id={props.query.id}/>
  </div>
);

export default LessonPage;