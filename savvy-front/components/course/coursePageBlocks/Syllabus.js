import { useState } from "react";
import LessonHeader from "./LessonHeader";
import { useUser } from "../../User";
import Feedback from "../Feedback";
// import { withTranslation } from "../../../i18n";

import {
  Container,
  LessonStyles,
  CourseInfo,
  LessonsInfo,
  Data,
  PayBox,
  LessonImage,
  Header,
  Header2,
  Total,
  Buttons,
  Button,
  ReviewsStyles,
  Post,
  Details,
  Video,
  Comment,
  Lessons,
} from "../styles/CoursePage_Styles";

const CoursePage = (props) => {
  const [page, setPage] = useState("lessons");
  const me = useUser();
  return (
    <>
      <div id="root"></div>
      <>
        <Container id="syllabus">
          <LessonStyles>
            <LessonsInfo>
              <h1>Вот, что вы будете изучать </h1>
              {/* <Buttons>
                        <Button
                          primary={page === "lessons"}
                          onClick={(e) => setPage("lessons")}
                        >
                          Уроки
                        </Button>
                        <Button
                          primary={page === "feedback"}
                          onClick={(e) => setPage("feedback")}
                        >
                          Обратная связь
                        </Button>
                      </Buttons> */}
              {page === "lessons" && (
                <>
                  <Total>
                    {" "}
                    {/* {props.t("total")}  */}
                    Уроки, отмеченные замочком, можно посмотреть, если вы
                    зарегистрируетесь на сайте.
                  </Total>
                  <Total>
                    {" "}
                    {/* {props.t("total")}  */}
                    Всего уроков: {props.lessons.length}
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
                            student_list={props.student_list}
                            open={index + 1 === 1}
                            index={index + 1}
                            coursePageId={props.coursePageId}
                          />
                        </>
                      ))}
                  </Lessons>
                </>
              )}

              {page === "feedback" &&
                (me && isEnrolled ? (
                  <>
                    {me.studentFeedback.filter(
                      (f) => f.lesson.coursePage.id == coursePage.id
                    ).length === 0 ? (
                      <p>Обратной связи нет</p>
                    ) : null}
                    {me.studentFeedback
                      .filter((f) => f.lesson.coursePage.id == coursePage.id)
                      .map((feedback) => (
                        <Feedback feedback={feedback} />
                      ))}
                  </>
                ) : (
                  <Comment>
                    Зарегистрируйтесь на курс по продвинутому тарифу, чтобы
                    получать обратную связь по выполненным заданиям.
                  </Comment>
                ))}
            </LessonsInfo>
          </LessonStyles>
        </Container>
      </>
    </>
  );
};

// export default withTranslation("course")(CoursePage);
export default CoursePage;
