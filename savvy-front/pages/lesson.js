import SingleLesson from "../components/lesson/SingleLesson";
import NewSingleLesson from "../components/lesson/NewSingleLesson";

const LessonPage = props => (
  <div>
    {props.query.type === "regular" && <SingleLesson id={props.query.id} />}
    {props.query.type === "story" && <NewSingleLesson id={props.query.id} />}
  </div>
);

export default LessonPage;
