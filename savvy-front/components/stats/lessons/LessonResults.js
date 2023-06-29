import { useState } from "react";
import styled from "styled-components";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import moment from "moment";

import LessonResult from "./LessonResult";

const GET_RESULTS = gql`
  query GET_RESULTS($id: String!) {
    lesson(where: { id: $id }) {
      id
      text
      name
      open
      number
      structure
      lessonResults {
        id
        progress
        visitsNumber
        createdAt
        updatedAt
        student {
          id
          name
          surname
          number
          email
          new_subjects {
            id
          }
        }
      }
    }
  }
`;

const Styles = styled.div`
  button {
    margin-left: 10px;
  }
`;

const LessonResults = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [show, setShow] = useState(false);

  const [message, setMessage] = useState("");
  const [getData, { loading, error, data }] = useLazyQuery(GET_RESULTS, {
    variables: { id: props.id },
  });
  const myCallback = (dataFromChild) => {
    setMessage(dataFromChild);
  };
  let maxes;
  let enrolled_maxes;
  let not_enrolled_maxes;

  if (data) {
    maxes = data.lesson.lessonResults.filter((r) => r.progress !== 0);

    enrolled_maxes = [...maxes]
      .filter(
        (r) =>
          r.student.new_subjects.filter((subj) => subj.id == props.coursePageId)
            .length > 0
      )
      .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));

    not_enrolled_maxes = [...data.lesson.lessonResults]
      .filter(
        (r) =>
          r.student.new_subjects.filter((subj) => subj.id == props.coursePageId)
            .length == 0
      )
      .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
  }

  if (loading) return <p>Загружаем информацию об уроке...</p>;
  moment.locale("ru");

  return (
    <Styles>
      <button
        onClick={(e) => {
          getData({
            variables: { id: props.id },
          }),
            setShow(!show);
        }}
      >
        Get data
      </button>
      {show && data !== undefined && (
        <div>
          Всего визитов: {maxes.length} {maxes.length == 0 && ""}
          <button onClick={(e) => setIsOpen(!isOpen)}>
            {isOpen ? "Close" : "Open"}
          </button>
          {isOpen && !props.structure && <p>Урок-испытание</p>}
          {isOpen && props.structure && (
            <>
              <h4>Заинтересованные пользователи:</h4>
              <ol>
                {not_enrolled_maxes.length == 0 && <div>Пусто</div>}
                {[...not_enrolled_maxes].map((r) => (
                  <LessonResult
                    r={r}
                    lessondId={props.id}
                    coursePageId={props.coursePageId}
                    structure={props.structure}
                    lesson={props.lesson}
                  />
                ))}
              </ol>
              <h4>Участники курса:</h4>
              <ol>
                {[...enrolled_maxes].map((r) => (
                  <LessonResult
                    r={r}
                    lessondId={props.id}
                    coursePageId={props.coursePageId}
                    structure={props.structure}
                    lesson={props.lesson}
                  />
                ))}
              </ol>
            </>
          )}
        </div>
      )}
    </Styles>
  );
};

export default LessonResults;
