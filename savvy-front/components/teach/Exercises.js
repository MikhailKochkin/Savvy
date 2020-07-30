import React from "react";
import styled from "styled-components";
import Section from "./exercises/Section";

const Styles = styled.div`
  border: 2px solid #edefed;
  margin: 3% 0;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const Exercises = (props) => {
  const lessons = props.lessons.sort((a, b) => (a.number > b.number ? 1 : -1));
  return (
    <Styles>
      {lessons.map((el, i) => (
        <Section lesson={el} students={props.students} index={i + 1} />
      ))}
    </Styles>
  );
};

export default Exercises;
