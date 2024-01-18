import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

import LessonHeader from "./LessonHeader";
import { useUser } from "../../User";
import Feedback from "../Feedback";

import { Container, Total, Lessons } from "../styles/CoursePage_Styles";

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

const Button = styled.button`
  width: 292px;
  height: 48px;
  /* padding: 2%; */
  font-family: Montserrat;
  border: 1px solid #252f3f;
  background: none;
  margin-bottom: 10px;
  outline: 0;
  cursor: pointer;
  font-size: 1.8rem;
  transition: ease-in 0.2s;
  &:hover {
    background-color: #e3e4ec;
  }
`;

const CoursePage = (props) => {
  const [page, setPage] = useState("lessons");
  const [open, setOpen] = useState(6);
  const { t } = useTranslation("coursePage");

  const me = useUser();
  return (
    <>
      <div id="root"></div>
      <>
        <Container id="syllabus">
          <LessonStyles>
            <LessonsInfo>
              <h2>{t("what_u_will_learn")}</h2>
              {page === "lessons" && (
                <>
                  <Total>
                    {" "}
                    {t("total_lessons")}{" "}
                    {props.lessons.filter((l) => l.published).length}
                  </Total>
                  <Lessons>
                    {[...props.lessons]
                      .filter((l) => l.published)
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
                      {t("show_all")}
                    </Button>
                  )}
                </>
              )}
            </LessonsInfo>
          </LessonStyles>
        </Container>
      </>
    </>
  );
};

export default CoursePage;
