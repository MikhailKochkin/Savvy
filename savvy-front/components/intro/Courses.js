import React from "react";
import styled from "styled-components";
import ShownCourses from "./ShownCourses";
import Connect from "./Connect";
import { useUser } from "../User";
import * as _ from "lodash";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center;*/
  align-items: center;
  .bar {
    width: 70%;
    height: 6px;
    /* background: #b6bce2; */
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  @media (max-width: 800px) {
    margin-top: 30px;
    width: 100%;
    .bar {
      width: 90%;
    }
  }
`;

const Course = styled.div`
  height: 6px;
  background: #3f51b5;
  /* width: ${(props) => props.progress}; */
  width: 12%;
  margin-right: 25px;
  transition: all 0.5s;
  border-radius: 10px;
  @media (max-width: 800px) {
    width: 40px;
    margin-right: 10px;
  }
`;

const Course2 = styled.div`
  height: 6px;
  background: #b6bce2;
  width: 12%;
  margin-right: 25px;
  transition: all 0.5s;
  border-radius: 10px;
  @media (max-width: 800px) {
    width: 40px;
    margin-right: 10px;
  }
`;

const Courses = (props) => {
  let me = useUser();
  let visitedCourses;
  const pages = [
    "ckgdgw88c02uv0742v0ttx8pl",
    "ckfy1q60a02f307281abcpgae",
    "ck89zsn5200790701jcpqxmiu",
    "ck78sx36r00vi0700zxlzs1a5",
    "ck4n47a2j01jg0790gspxqxju",
    "cjyg59y2b00qg0768brp9xp2r",
    "cjtreu3md00fp0897ga13aktp",
    "ck3e1vo65002307638xcx7wkd",
  ];
  if (me) {
    visitedCourses = me.courseVisits.filter((c) =>
      pages.includes(c.coursePage.id)
    ).length;
  } else {
    visitedCourses = 0;
  }
  console.log(visitedCourses, 8 - visitedCourses);

  return (
    <Styles>
      <div className="bar">
        {_.times(visitedCourses, () => (
          <Course></Course>
        ))}
        {_.times(8 - visitedCourses, () => (
          <Course2></Course2>
        ))}
      </div>
      <ShownCourses />
      <Connect />
    </Styles>
  );
};

export default Courses;
