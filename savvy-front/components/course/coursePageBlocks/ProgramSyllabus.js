import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

import LessonHeader from "./LessonHeader";
import { useUser } from "../../User";
import Feedback from "../Feedback";

import { Container, Total, Lessons } from "../styles/CoursePage_Styles";
import ProgramBottomLine from "./ProgramBottomLine";

const LessonStyles = styled.div`
  width: 85%;
  margin: 1.5% 0;
  @media (max-width: 1000px) {
    width: 90%;
    min-width: 100px;
  }
`;

const LessonsInfo = styled.div`
  margin-top: 2%;
  h2 {
    line-height: 1.4;
    font-weight: 700;
    font-size: 2.8rem;
  }
  .week {
    font-size: 1.6rem;
    font-weight: bold;
    margin: 1% 0;
    margin-top: 20px;
  }
`;

const ProgramSyllabus = (props) => {
  const [page, setPage] = useState("lessons");
  const [open, setOpen] = useState(6);
  const { t } = useTranslation("coursePage");
  const coursePages = [...props.program.coursePages].sort(
    (a, b) => a.numInCareerTrack - b.numInCareerTrack
  );

  const me = useUser();
  return (
    <>
      <div id="root"></div>
      <>
        <Container id="syllabus">
          <LessonStyles>
            <LessonsInfo>
              <h2>{t("what_u_will_learn")}</h2>
              <div>
                {coursePages
                  // .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .map((c, i) => (
                    <Course c={c} i={i} />
                  ))}
              </div>
              {/* {page === "lessons" && (
                <>
                 <Total> {t("open_lessons")}</Total>
                  <Total>
                    {" "}
                    {t("total_lessons")} {props.lessons.length}
                  </Total>
                  <Lessons>
                    {[...props.lessons]
                      .filter((l) => l.type !== "HIDDEN")
                      .sort((a, b) => (a.number > b.number ? 1 : -1))
                      .slice(0, open)
                      .map((lesson, index) => (
                        <>
                          <LessonHeader
                            me={me}
                            key={lesson.id}
                            name={lesson.name}
                            lesson={lesson}
                            coursePage={props.id}
                            // author={coursePage.user.id}
                            // students={coursePage.students}
                            open={index + 1 === 1}
                            index={index + 1}
                            coursePageId={props.coursePageId}
                          />
                        </>
                      ))}
                  </Lessons>
                  {open == 6 && props.lessons.length > 6 && (
                    <Button
                      id="show_all_lessons"
                      onClick={(e) => setOpen(props.lessons.length)}
                    >
                      {t("show")}
                    </Button>
                  )}
                </>
              )} */}
            </LessonsInfo>
          </LessonStyles>
        </Container>
      </>
    </>
  );
};

import React from "react";

const Styles = styled.div`
  .row {
    margin-bottom: 20px;
    width: 100%;
    line-height: 1.6;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    div {
      font-size: 2rem;
      cursor: pointer;
    }
  }
  @media (max-width: 1000px) {
    .row {
      width: 90%;
    }
  }
  .course_name {
    font-size: 2rem;
    font-weight: 500;
    @media (max-width: 1000px) {
      width: 80%;
    }
  }
  .lessons {
    margin-left: 25px;
    .lesson_row {
      margin-bottom: 10px;
    }
  }
`;

const Course = (props) => {
  const [open, setOpen] = useState(false);

  const { i, c } = props;
  return (
    <Styles>
      <div>
        <div className="row">
          <div className="course_name" onClick={(e) => setOpen(!open)}>
            {i + 1}. {c.title}{" "}
          </div>
          <div onClick={(e) => setOpen(!open)}>{open ? "⬆️" : "⬇️"}</div>
        </div>
        {open && (
          <div className="lessons">
            {c.lessons
              .filter((l) => l.type !== "HIDDEN")
              .sort((a, b) => (a.number > b.number ? 1 : -1))
              .map((l, i) => (
                <div className="lesson_row">
                  {i + 1}. {l.name}
                </div>
              ))}
          </div>
        )}
      </div>
    </Styles>
  );
};

export default ProgramSyllabus;
