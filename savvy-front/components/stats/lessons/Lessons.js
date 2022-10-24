import { useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import LessonResult from "./LessonResult";

const LESSONS_QUERY = gql`
  query LESSONS_QUERY($id: String!) {
    lessons(where: { coursePage: { id: { equals: $id } } }) {
      id
      text
      name
      open
      number
      structure
      lessonResults {
        id
        progress
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
  border: 2px solid #edefed;
  margin: 3% 0;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const MiniStyles = styled.div`
  margin-bottom: 5px;
  border-bottom: 2px solid #edefed;
  padding: 3%;
`;

const Header = styled.p`
  font-size: 1.8rem;
  /* background: #edefed; */
  padding: 0.5% 2%;
  padding-top: 8px;
  margin: 0;
  margin-top: -2px;
  margin-bottom: 5px;
  /* border-bottom: 2px solid #edefed; */
`;

const Lessons = (props) => {
  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(LESSONS_QUERY, {
    variables: { id: props.id },
  });
  if (loading2) return <p>Загружаем информацию об уроках...</p>;

  let lessons = data2.lessons;
  {
    console.log("lessons", lessons);
  }

  return (
    <Styles>
      {[...lessons]
        .sort((a, b) => (a.number > b.number ? 1 : -1))
        .map((l) => {
          let ratings = [];
          l.forum
            ? l.forum.rating.map((r) => ratings.push(r.rating))
            : (ratings = [0]);
          let average = (
            ratings.reduce((a, b) => a + b, 0) / ratings.length
          ).toFixed(2);
          console.log(average == NaN);
          if (isNaN(average)) {
            average = "Нет оценок";
          }
          console.log("l", l.structure);
          return (
            <MiniStyles>
              <Header>
                {l.open ? "🔓" : ""}
                {l.number}. {l.name}.({l.id}) {average}
              </Header>
              {/* {console.log("l.lessonResults", l.lessonResults)} */}
              <LessonResult
                coursePageId={props.id}
                structure={l.structure}
                res={l.lessonResults}
              />
            </MiniStyles>
          );
        })}
    </Styles>
  );
};

export default Lessons;
