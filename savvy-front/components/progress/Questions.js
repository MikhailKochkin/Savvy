import { useState } from "react";
import { useUser } from "../User";

import Statement from "./Statement";

const Questions = (props) => {
  const [show, setShow] = useState(false);
  const me = useUser();

  let course = props.c;
  let lessons = [];
  [...course.lessons]
    .sort((a, b) => (a.number > b.number ? 1 : -1))
    .map((l) => lessons.push(l));
  let forums = [];
  lessons.map((l) => forums.push(l.forum));
  // console.log("forums", forums);
  return (
    <>
      <h3>Вопросы без ответа в {forums.length} уроках</h3>
      <button onClick={(e) => setShow(!show)}>
        {show ? "Закрыть" : "Открыть"}
      </button>
      {show && (
        <div>
          {forums.map((f, i) => {
            let unanswered_questions = f
              ? f.statements.filter((s) => s.answered !== true)
              : [];

            return (
              <div>
                <p>
                  {i}. {f && f.lesson ? f.lesson.name : "Урок без чата"}
                </p>
                <ol>
                  {unanswered_questions.map((q) => (
                    <Statement s={q} author={q.user} me={me} answered={false} />
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Questions;
