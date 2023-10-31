import { useState } from "react";
import SingleQuiz from "../quizes/SingleQuiz";
import SingleProblem from "../problems/SingleProblem";

const NextQuestions = (props) => {
  const { lesson, me, author } = props;
  const [num, setNum] = useState(1);
  let components = props.nextQuestions.sort((a, b) => {
    if (a.next_id && b.next_id) {
      return 0;
    }
    if (a.next_id) {
      return -1;
    }
    if (b.next_id) {
      return 1;
    }
    return 0;
  });
  console.log("components", components.slice(0, num));
  const updateArray = (data) => {
    setNum(num + 1);
  };
  const getResults = (data) => {
    setNum(num + 1);
  };
  return (
    <div>
      {components.slice(0, num).map((com) => {
        let el;
        if (com.next_type.toLowerCase() === "quiz") {
          el = lesson.quizes.find((quiz) => quiz.id === com.next_id);
          console.log("el", el, com);
          return (
            <SingleQuiz
              id={el.id}
              index={1}
              key={el.id}
              type={el.type}
              check={el.check}
              question={el.question}
              answer={el.answer}
              ifRight={el.ifRight}
              ifWrong={el.ifWrong}
              me={me}
              hidden={true}
              userData={[]}
              lessonID={lesson.id}
              quizID={el.id}
              user={el.user.id}
              user_name={el.user}
              next={el.next}
              getData={updateArray}
              exam={true}
              story={true}
              author={author}
            />
          );
        } else if (com.next_type.toLowerCase() === "problem") {
          el = lesson.problems.find((problem) => problem.id === com.next_id);
          return (
            <SingleProblem
              key={el.id}
              problem={el}
              // complexity={el.complexity}
              getResults={getResults}
              lessonID={lesson.id}
              me={me}
              story={true}
              lesson={lesson}
              author={lesson.user}
              updateArray={updateArray}
            />
          );
        }
      })}
    </div>
  );
};

export default NextQuestions;
