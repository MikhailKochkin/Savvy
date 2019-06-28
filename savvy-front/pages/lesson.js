import SingleLesson from '../components/lesson/SingleLesson';

const LessonPage = props => (
  <div>
    <SingleLesson id={props.query.id} type={props.query.type}/>
  </div>
);

export default LessonPage;