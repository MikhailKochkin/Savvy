import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  display: flex;
  flex-direction: row;
  .my {
    flex-basis: 50%;
    border-right: 1px solid #f4f2f2;
    padding: 1%;
  }
  .others {
    flex-basis: 50%;
    padding: 1%;
    padding-left: 3%;
  }
  .header {
    margin-bottom: 10px;
  }
`;

const Span = styled.span`
  font-weight: ${(props) => (props.bold ? 800 : 300)};
`;

const Result = (props) => {
  const my = props.completed ? props.completed[0] : undefined;
  let results = props.results.sort((r, n) => {
    let r1 = n.correct - r.correct;
    if (r1 != 0) {
      return r1;
    }
    return r.time - n.time;
  });
  return (
    <Styles>
      {my && (
        <div className="my">
          <div className="header">{props.text}</div>
          <div>
            Правильных ответов: <b>{my.correct}</b>
          </div>
          <div>
            Неправильных ответов: <b>{my.wrong}</b>
          </div>
          <div>
            Время:{" "}
            <b>
              {String(Math.floor(my.time / 60)).padStart(2, "0")}:
              {String(my.time - Math.floor(my.time / 60) * 60).padStart(2, "0")}
            </b>
          </div>
        </div>
      )}
      <div className="others">
        <div className="header">Рейтинг участников:</div>
        <div>
          <ol>
            {results.map((r) => (
              <li>
                <Span bold={my ? my.student.id === r.student.id : false}>
                  {r.student.surname
                    ? `${r.student.name} ${r.student.surname}`
                    : r.student.name}{" "}
                  {`(${r.correct} за ${String(Math.floor(r.time / 60)).padStart(
                    2,
                    "0"
                  )}:${String(r.time - Math.floor(r.time / 60) * 60).padStart(
                    2,
                    "0"
                  )})`}
                </Span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Styles>
  );
};

export default Result;
