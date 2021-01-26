import React from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";

const Quiz = (props) => {
  const { quiz } = props;
  return (
    <>
      <div>
        <b>Вопрос: </b>
        {renderHTML(quiz.question)}
      </div>
      <div className="column">
        <b>Правильный ответ: </b>
        {renderHTML(quiz.answer)}
      </div>
      {quiz.quizResults.map((t) => (
        <div>
          <b>
            {`${t.student.name} ${t.student.surname ? t.student.surname : ""}`}:{" "}
          </b>
          {renderHTML(t.answer)}
          {/* {t.correct ? "Правильно" : "Неправильно"} */}
          {console.log(t.correct)}
        </div>
      ))}
    </>
  );
};

export default Quiz;
