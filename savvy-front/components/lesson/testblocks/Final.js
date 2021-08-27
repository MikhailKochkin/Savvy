import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  font-size: 1.6rem;
  span {
    border-bottom: 2px solid #f6a6ad;
    padding-bottom: 2px;
  }
`;

const Final = (props) => {
  console.log(props.answers);
  let correct = props.answers.filter((a) => a !== false);
  let ratio = correct.length / props.tasks_number;
  return (
    <Styles>
      <p>
        Всего было {props.tasks_number} вопросов. Вы ответили правильно
        <span> на {correct.length} из них.</span>{" "}
      </p>
      {ratio < 0.8 ? (
        <p>
          Мы хотим, чтобы вы были уверены в своих знаниях. Пожалуйста, пройдите
          это задание еще раз и постарайтесь ответить верно на 80% вопросов.
        </p>
      ) : (
        <div>Отличный результат. Можете двигаться дальше.</div>
      )}
    </Styles>
  );
};

export default Final;
