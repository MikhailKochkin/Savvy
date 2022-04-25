import { useState } from "react";
import LessonHeader from "./LessonHeader";
import { useUser } from "../../User";
import Feedback from "../Feedback";
import { useTranslation } from "next-i18next";

import {
  Container,
  LessonStyles,
  LessonsInfo,
  Total,
  Lessons,
} from "../styles/CoursePage_Styles";

const CoursePage = (props) => {
  const [page, setPage] = useState("lessons");
  const { t } = useTranslation("coursePage");

  const me = useUser();
  return (
    <>
      <div id="root"></div>
      <>
        <Container id="syllabus">
          <LessonStyles>
            <LessonsInfo>
              <h1>{t("what_u_will_learn")}</h1>
              {page === "lessons" && (
                <>
                  <Total> {t("open_lessons")}</Total>
                  <Total>
                    {" "}
                    {t("total_lessons")} {props.lessons.length}
                  </Total>
                  <Lessons>
                    {[...props.lessons]
                      .sort((a, b) => (a.number > b.number ? 1 : -1))
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
