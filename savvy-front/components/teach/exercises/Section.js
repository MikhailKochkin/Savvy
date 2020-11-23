import React, { useState } from "react";
import styled from "styled-components";
import Problem from "./Problem";
import Document from "./Document";
import Test from "./Test";
import Quiz from "./Quiz";

const Styles = styled.div`
  margin: 0 1%;
  margin-bottom: 5px;
  padding: 1%;
  border-bottom: 1px solid #edefed;
  .header {
    font-size: 1.6rem;
  }
  button {
    margin-left: 5px;
  }
`;

const Section = (props) => {
  const [reveal, setReveal] = useState(false);
  let parts = [
    ...props.lesson.newTests,
    ...props.lesson.quizes,
    ...props.lesson.notes,
  ];
  let average;
  let ratings = [];
  let num;
  // if (props.lesson.forum) {
  //   props.lesson.forum.rating.map((a) => ratings.push(a.rating));
  //   if (ratings.length === 0) {
  //     average = "Нет оценок";
  //     num = 0;
  //   } else {
  //     average = (ratings.((a, b) => a + b, 0) / ratings.length).toFixed(
  //       2
  //     );
  //     num = ratings.length;
  //   }
  // } else {
  //   average = "Нет формы оценки урока";
  //   num = 0;
  // }
  return (
    <Styles>
      <div className="header">
        Урок {props.index}. {props.lesson.name}
        {/* - {average} / оценки: {num}
        {props.lesson.problems.length > 0  */}
        <button onClick={(e) => setReveal(!reveal)}>
          {reveal ? "Закрыть" : "Открыть"}
        </button>
      </div>
      {reveal && (
        <>
          {props.lesson.newTests &&
            props.lesson.newTests.map((p, i) => (
              <Test
                index={i + 1}
                coursePage={props.lesson.coursePage.id}
                test={p}
                students={props.students}
                lesson={props.lesson.id}
              />
            ))}
          {props.lesson.quizes &&
            props.lesson.quizes.map((p, i) => (
              <Quiz
                index={i + 1}
                coursePage={props.lesson.coursePage.id}
                quiz={p}
                students={props.students}
                lesson={props.lesson.id}
              />
            ))}
          {console.log(props.lesson.problems)}
          {props.lesson.problems &&
            props.lesson.problems.map((p, i) => (
              <Problem
                parts={parts}
                index={i + 1}
                coursePage={props.lesson.coursePage.id}
                problem={p}
                students={props.students}
                lesson={props.lesson.id}
              />
            ))}
          {/* {props.lesson.documents &&
            props.lesson.documents.map((d, i) => (
              <Document
                index={i + 1}
                coursePage={props.lesson.coursePage.id}
                document={d}
                students={props.students}
                lesson={props.lesson.id}
              />
            ))} */}
        </>
      )}
    </Styles>
  );
};

export default Section;
