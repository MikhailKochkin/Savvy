import SingleLesson from "../components/lesson/SingleLesson";

const LessonPage = props => (
  <div>
    <SingleLesson id={props.query.id} number={props.query.number} />
  </div>
);

export default LessonPage;
