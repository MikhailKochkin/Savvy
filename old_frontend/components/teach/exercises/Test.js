import React, { useState } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";

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
  p {
    display: inline-block;
    background: #f0f8ff;
    margin: 5px 0;
    border-radius: 5px;
    padding: 2%;
  }
`;

const Test = (props) => {
  const [reveal, setReveal] = useState(false);
  const getAllIndexes = (arr, val) => {
    var indexes = [],
      i;
    for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
    return indexes;
  };
  const { test } = props;
  return (
    <Styles>
      <div>
        <b>Тест: </b>
        {renderHTML(test.question[0])}
      </div>
      <div className="column">
        <b>Правильный ответ:</b>
        {getAllIndexes(test.correct, true).map((i) => (
          <div>{renderHTML(test.answers[i])}</div>
        ))}
      </div>
      {reveal && (
        <>
          {test.testResults.map((t, i) => (
            <div>
              <b>
                {`${i + 1}. ${t.student.name} ${
                  t.student.surname ? t.student.surname : ""
                }`}
                :{" "}
              </b>
              {renderHTML(t.answer)}
            </div>
          ))}
        </>
      )}
      <button onClick={(e) => setReveal(!reveal)}>
        {reveal
          ? "Закрыть ответы пользователей"
          : "Открыть ответы пользователей"}
      </button>
    </Styles>
  );
};

export default Test;
