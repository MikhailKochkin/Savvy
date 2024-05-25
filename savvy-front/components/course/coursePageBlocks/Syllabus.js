import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

import LessonHeader from "./LessonHeader";
import { useUser } from "../../User";
import Feedback from "../Feedback";
import LessonRow from "../../lesson/LessonRow";

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

const Syllabus = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  .week_number {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 25px;
  }
  @media (max-width: 800px) {
    max-width: 380px;
    .week_number {
      margin: 15px 0;
    }
  }
`;

const LessonsTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
  border-radius: 20px;
  padding: 10px;
  background: #fff;
  margin-bottom: 20px;
  @media (max-width: 800px) {
    overflow-x: auto;
    max-width: 100%;
    /* height: 200px; */
  }
`;

const Box = styled.div`
  border-bottom: 2px solid #e8eff6;
  display: flex;
  flex-direction: row;
  flex: 1; /* This makes the Box component stretch in height */
  background: #e8eff6;
  color: #76706c;
  div {
    padding: 5px 10px;
    font-size: 1.4rem;
    background: #fff;
  }
  .div1 {
    width: 5%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: 1.4;
    margin-right: 2px;
  }
  .div2 {
    width: 22%;
    display: flex;

    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: 1.4;
  }
  .div3 {
    width: 40%;

    p {
      margin: 0;
      margin-bottom: 5px;
      line-height: 1.5;
    }
  }
  .div4 {
    width: 13%;
  }
  .div5 {
    width: 20%;
  }
  @media (max-width: 850px) {
    .div1 {
      min-width: 50px;
    }
    .div2 {
      min-width: 250px;
    }
    .div3 {
      min-width: 400px;
    }
    .div4 {
      min-width: 100px;
    }
    .div5 {
      min-width: 200px;
    }
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
                  <Syllabus>
                    <LessonsTable>
                      <Box>
                        <div className="div1">№</div>
                        <div className="div2">{t("name")}</div>
                        <div className="div3">{t("description")}</div>
                        <div className="div4"></div>
                        <div className="div5">{t("tags")}</div>
                      </Box>
                      {props.lessons
                        .filter((l) => l.published)
                        .sort((a, b) => a.number - b.number)
                        .map((lesson, index) => (
                          <>
                            <LessonRow
                              me={me}
                              key={lesson.id}
                              name={lesson.name}
                              lesson={lesson}
                              // i_am_author={i_am_author}
                              coursePage={props.id}
                              // author={coursePage.user.id}
                              open={index + 1 === 1}
                              index={index + 1}
                              // coursePageId={coursePage.id}
                            />
                          </>
                        ))}
                    </LessonsTable>
                  </Syllabus>
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
