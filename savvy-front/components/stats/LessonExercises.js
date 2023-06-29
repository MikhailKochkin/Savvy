import { useState } from "react";
import Problems from "./exercises/Problems";

const LessonExercises = (props) => {
  const [reveal, setReveal] = useState("");
  let l = props.lesson;
  return (
    <div>
      <>
        {l.problems.length > 0 && (
          <button onClick={(e) => setReveal("problems")}>Задачи</button>
        )}
        {l.problems.length > 0 && (
          <button onClick={(e) => setReveal("")}>Закрыть</button>
        )}
        {l.problems.length > 0 && reveal == "problems" && (
          <Problems lesson={l} />
        )}
      </>
    </div>
  );
};

export default LessonExercises;
