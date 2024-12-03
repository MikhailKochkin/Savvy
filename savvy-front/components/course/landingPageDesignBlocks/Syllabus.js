import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { useUser } from "../../User";
import LessonRow from "./LessonRow";

import { Container, Total, Lessons } from "../styles/CoursePage_Styles";

const LessonStyles = styled.div`
  width: 100%;
  padding: 20px;
  margin: 1.5% 0;
  @media (max-width: 1000px) {
    min-width: 100px;
  }
`;

const LessonsInfo = styled.div`
  margin-top: 2%;
  h2 {
    line-height: 1.4;
    font-weight: 700;
    font-size: 2.2rem;
    margin-bottom: 30px;
    margin-top: 0;
  }
  .week {
    font-size: 1.6rem;
    font-weight: bold;
    margin: 1% 0;
    margin-top: 20px;
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
  border-bottom: 2px solid #f2f7fb;
  display: flex;
  flex-direction: row;
  flex: 1; /* This makes the Box component stretch in height */
  background: #f2f7fb;
  color: #76706c;
  div {
    padding: 5px 10px;
    font-size: 1.4rem;
    background: #fff;
  }
  .div1 {
    width: 6%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: 1.4;
    margin-right: 2px;
  }
  .div2 {
    width: 34%;
    margin-right: 2px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: 1.4;
  }
  .div3 {
    width: 60%;
    p {
      margin: 0;
      margin-bottom: 5px;
      line-height: 1.5;
    }
    margin-right: 2px;
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
                  {/* <Total>
                    {" "}
                    {t("total_lessons")}{" "}
                    {props.lessons.filter((l) => l.published).length}
                  </Total> */}
                  <Syllabus>
                    <LessonsTable>
                      <Box>
                        <div className="div1">№</div>
                        <div className="div2">{t("name")}</div>
                        <div className="div3">{t("description")}</div>
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
