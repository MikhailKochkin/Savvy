import React from "react";
import styled from "styled-components";
import LessonExercises from "./LessonExercises";

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

const Exercises = (props) => {
  return (
    <Styles>
      {[...props.lessons]
        .sort((a, b) => (a.number > b.number ? 1 : -1))
        .map((l) => {
          return (
            <MiniStyles>
              <Header>
                {l.number}. {l.name}
              </Header>
              <LessonExercises lesson={l} />
            </MiniStyles>
          );
        })}
    </Styles>
  );
};

export default Exercises;
