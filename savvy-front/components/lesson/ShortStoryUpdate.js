import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { SINGLE_LESSON_QUERY } from "./SingleLesson";
import Block from "./Block";
import _ from "lodash";

const UPDATE_LESSON_MUTATION = gql`
  mutation UPDATE_LESSON_MUTATION(
    $id: String!
    $short_structure: LessonStructure
  ) {
    updateLesson(id: $id, short_structure: $short_structure) {
      id
    }
  }
`;

const Button = styled.button`
  padding: 1% 2%;
  background: ${(props) => props.theme.green};
  width: 20%;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 2% 0;
  cursor: pointer;
  outline: 0;
  &:active {
    background-color: ${(props) => props.theme.darkGreen};
  }
`;

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 2%;
`;

const Advice = styled.p`
  font-size: 1.5rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2%;
  margin: 30px 0;
  width: 80%;
`;

const StoryUpdate = (props) => {
  const [list, setList] = useState(
    props.lesson.short_structure
      ? props.lesson.short_structure.lessonItems
      : ["el"]
  );
  const plus1 = () => {
    let res = [...list];
    let newRes = ["el", ...res];
    setList(newRes);
  };

  const plus = (i) => {
    let res = [...list];
    res.splice(i + 1, 0, `el`);
    let newRes = res;
    setList(newRes);
  };

  const minus = (val) => {
    let res = [...list];
    let newRes = res.filter((el) => el.id !== val);
    let newRes2 = newRes.filter((el) => el !== "el");
    setList(newRes2);
  };

  const set = (task, data, num) => {
    let res = [...list];
    let val = { type: task, id: data };
    res[num] = val;
    setList(res);
  };

  const { lesson } = props;
  return (
    <>
      <Mutation
        mutation={UPDATE_LESSON_MUTATION}
        variables={{
          id: lesson.id,
          short_structure: { lessonItems: list.filter((el) => el !== "el") },
        }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: lesson.id },
          },
        ]}
      >
        {(updateLesson, { loading, error }) => (
          <>
            <Title>Выстроить структуру бесплатного урока</Title>
            <button onClick={(e) => plus1()}>Первый блок</button>
            {list.map((el, i) => {
              return (
                <Block
                  plus={plus}
                  minus={minus}
                  set={set}
                  // key={i}
                  i={i}
                  value={el}
                  tests={lesson.newTests}
                  quizes={lesson.quizes}
                  notes={lesson.notes}
                  chats={lesson.chats}
                  shots={lesson.shots}
                  problems={lesson.problems}
                  texteditors={lesson.texteditors}
                  constructions={lesson.constructions}
                  testPractices={lesson.testPractices}
                  exams={lesson.exams}
                  documents={lesson.documents}
                  forum={lesson.forum}
                />
              );
            })}
            <Button
              onClick={async (e) => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await updateLesson();
                // change the page to the single case page
              }}
            >
              {loading ? "Сохраняем..." : "Сохранить"}
            </Button>
          </>
        )}
      </Mutation>
    </>
  );
};

export default StoryUpdate;
