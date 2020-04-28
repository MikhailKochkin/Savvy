import SingleLesson from "../components/lesson/SingleLesson";
import NewSingleLesson from "../components/lesson/NewSingleLesson";
import Challenge from "../components/lesson/challenge/Challenge";

const LessonPage = (props) => (
  <div>
    {props.query.type === "regular" && <SingleLesson id={props.query.id} />}
    {props.query.type === "story" && <NewSingleLesson id={props.query.id} />}
    {props.query.type === "challenge" && <Challenge id={props.query.id} />}
  </div>
);

export default LessonPage;
