import { useState, useEffect } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import renderHTML from "react-render-html";
import { useTranslation } from "next-i18next";

import LessonHeader from "../lesson/LessonHeader";
import { useUser } from "../User";
import FirstLesson from "./coursePageCards/FirstLesson";
import RegisterCard from "./coursePageCards/RegisterCard";
import StudentCard from "./coursePageCards/StudentCard";
import TeacherCard from "./coursePageCards/TeacherCard";
import SignInCard from "./coursePageCards/SignInCard";
import Loading from "../Loading";
import Feedback from "./Feedback";
import Certificate from "./Certificate";

import {
  Container,
  LessonStyles,
  CourseInfo,
  LessonsInfo,
  Data,
  PayBox,
  Header,
  Total,
  Buttons,
  Button,
  Syllabus,
  Video,
  Comment,
  Lessons,
} from "./styles/CoursePage_Styles";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      image
      news
      price
      discountPrice
      video
      audience
      result
      tags
      weeks
      tariffs
      methods
      reviews
      subscriptionPrice
      subscription
      promocode
      published
      user {
        id
      }
      lessons {
        id
        name
        number
        type
        open
        description
        structure
        forum {
          id
          statements {
            id
            comments
          }
          rating {
            id
            rating
          }
        }
        published
        coursePage {
          id
        }
        user {
          id
        }
      }
      description
      courseType
      students
      new_students {
        id
      }
      user {
        id
        name
        surname
        image
        description
        work
        status
        uni {
          id
          title
        }
        company {
          id
          name
        }
      }
      authors {
        id
        name
        surname
        image
        description
        status
        uni {
          id
          title
        }
        company {
          id
          name
        }
      }
    }
  }
`;

const LESSON_RESULTS_QUERY = gql`
  query LESSON_RESULTS_QUERY($coursePageId: String!, $userId: String!) {
    lessonResults(
      where: {
        lesson: { coursePageId: { equals: $coursePageId } }
        student: { id: { equals: $userId } }
      }
    ) {
      id
      visitsNumber
      progress
      lesson {
        id
        name
        structure
        type
        number
      }
      student {
        id
        email
      }
      createdAt
      updatedAt
    }
  }
`;

const CoursePage = (props) => {
  const [page, setPage] = useState("lessons");
  const { t } = useTranslation("course");
  const me = useUser();

  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.id },
  });
  const [
    fetchQuery,
    { loading: stats_loading, error: stats_error, data: stats_data },
  ] = useLazyQuery(LESSON_RESULTS_QUERY);

  useEffect(() => {
    // when the first query is loaded, then fire this lazy query function
    if (me) {
      fetchQuery({
        variables: {
          coursePageId: props.id,
          userId: me.id,
        },
      });

      // if (stats_error) return <p>{stats_error}</p>;
      // if (stats_loading) return <Loading />;
    }
  }, [me]);
  if (loading) return <Loading />;

  const coursePage = data.coursePage;
  let lessons = coursePage.lessons;
  let maxes = [];

  if (stats_data) {
    let lessonResults = stats_data.lessonResults;

    // 1. Get all lesson results
    const sorted_lessons = lessonResults
      .slice()
      .sort((a, b) => a.lesson.number - b.lesson.number);
    // 2. group all lesson results by lesson
    let new_array = [];
    sorted_lessons.forEach((l) => {
      let lessonId = l.lesson.id;
      if (new_array.find((x) => x.lessonId === lessonId)) {
        let obj = new_array.find((x) => x.lessonId === lessonId);
        let new_results_list = [...obj.results, l];
        return (obj.results = new_results_list);
      } else {
        let new_obj = {
          lessonId: lessonId,
          results: [l],
        };
        return new_array.push(new_obj);
      }
    });

    // 3. leave only lesson results with the highest progress

    let new_array_2 = new_array.map((el) => {
      const max = el.results.reduce((prev, current) =>
        prev.progress > current.progress ? prev : current
      );
      el["max"] = max;
      return el;
    });

    // 4. Leave only maxes

    new_array_2.forEach((el) => maxes.push(el.max));

    let lesResults = [];
    maxes.forEach((lr) => {
      let new_obj = {
        progress: lr.progress,
        lesson_number: lr.lesson.number,
        lesson_size: lr.lesson.structure
          ? lr.lesson.structure.lessonItems.length
          : 1,
        lesson_name: lr.lesson.name,
        visits: lr.visitsNumber,
      };
      lesResults.push(new_obj);
    });

    console.log("maxes", maxes);
  }

  let openLesson;
  let openLessons = coursePage.lessons.filter((l) => l.open);
  if (openLessons.length > 0) {
    openLesson = openLessons[0];
  } else {
    openLesson = null;
  }

  let isEnrolled;
  if (me && me.new_subjects) {
    isEnrolled = me.new_subjects.some((c) => c.id == coursePage.id);
  } else {
    isEnrolled = false;
  }

  let have_cert = false;
  let cert;
  me &&
    me.certificates.forEach((c) => {
      if (c.coursePage.id == coursePage.id) {
        have_cert = true;
        cert = c;
      }
    });

  let i_am_author = false;
  if (me && coursePage.authors.filter((auth) => auth.id == me.id).length > 0) {
    i_am_author = true;
  }

  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }
  let initial_lessons = [...coursePage.lessons]
    .sort((a, b) => (a.number > b.number ? 1 : -1))
    .filter((l) => l.type !== "HIDDEN");

  let broken_lessons = sliceIntoChunks(
    initial_lessons,
    coursePage.weeks ? coursePage.weeks : 3
  );
  return (
    <>
      <div id="root"></div>
      <>
        <Container>
          <LessonStyles>
            <CourseInfo>
              <Data>
                <Header>{coursePage.title}</Header>
                {coursePage && coursePage.authors.length > 0 ? (
                  coursePage.authors.map((a) => (
                    <div className="name">
                      <img src={a.image} />
                      <p>
                        {a.name} {a.surname}
                      </p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="name">
                      <img src={coursePage.user.image} />
                      <p>
                        {coursePage.user && coursePage.user.surname
                          ? `${coursePage.user.name} ${coursePage.user.surname}`
                          : coursePage.user.name}{" "}
                      </p>
                    </div>
                    {coursePage.user.work ? (
                      <p className="track2">
                        {renderHTML(coursePage.user.work)}
                      </p>
                    ) : (
                      ""
                    )}
                  </>
                )}
                <div className="description">
                  {coursePage.description && renderHTML(coursePage.description)}
                </div>
              </Data>
              <PayBox id="info_box">
                {/* Карточка регистрации на сайте */}
                {!me && <SignInCard />}
                {/* Карточка первого урока */}
                {me &&
                  me.permissions &&
                  me.id !== coursePage.user.id &&
                  !i_am_author &&
                  !me.new_subjects.find((c) => c.id == coursePage.id) &&
                  !me.permissions.includes("ADMIN") && (
                    <RegisterCard me={me} coursePage={coursePage} />
                  )}
                {/* Карточка преподавателя */}
                {me &&
                  me.permissions &&
                  (me.id === coursePage.user.id ||
                    me.permissions.includes("ADMIN") ||
                    i_am_author) && (
                    <TeacherCard id={coursePage.id} coursePage={coursePage} />
                  )}
                {/* Карточка ученика */}
                {stats_data &&
                  me &&
                  me.permissions &&
                  me.new_subjects.find((c) => c.id == coursePage.id) &&
                  !me.permissions.includes("ADMIN") && (
                    <StudentCard
                      coursePage={coursePage}
                      lessonResults={maxes}
                      me={me}
                    />
                  )}
              </PayBox>
            </CourseInfo>{" "}
            <LessonsInfo>
              <Buttons>
                <Button
                  primary={page === "lessons"}
                  onClick={(e) => setPage("lessons")}
                >
                  {t("lessons")}
                </Button>
                <Button
                  primary={page === "feedback"}
                  onClick={(e) => setPage("feedback")}
                >
                  {t("feedback")}
                </Button>
              </Buttons>
              {page === "lessons" && (
                <>
                  <Total>
                    {" "}
                    {t("total_lessons")}
                    <b>
                      {lessons.filter((l) => l.type !== "HIDDEN").length}
                    </b>{" "}
                    <br /> {t("course_term")}{" "}
                    <b>
                      {parseInt(
                        lessons.length /
                          (coursePage.weeks ? coursePage.weeks : 4)
                      ) == 0
                        ? 1
                        : parseInt(
                            lessons.length /
                              (coursePage.weeks ? coursePage.weeks : 4)
                          )}
                    </b>
                  </Total>
                  <Syllabus>
                    {[...broken_lessons].map((b, i) => (
                      <>
                        <div className="week_number">
                          {t("week")} {i + 1}
                        </div>
                        <Lessons>
                          {b.map((lesson, index) => (
                            <>
                              <LessonHeader
                                me={me}
                                key={lesson.id}
                                name={lesson.name}
                                lesson={lesson}
                                lessonResult={maxes.find(
                                  (m) => m.lesson.id == lesson.id
                                )}
                                i_am_author={i_am_author}
                                statements={
                                  lesson.forum ? lesson.forum.statements : null
                                }
                                coursePage={props.id}
                                author={coursePage.user.id}
                                open={index + 1 === 1}
                                index={index + 1}
                                coursePageId={coursePage.id}
                              />
                            </>
                          ))}
                        </Lessons>
                      </>
                    ))}
                  </Syllabus>
                </>
              )}

              {page === "feedback" &&
                (me && isEnrolled ? (
                  <>
                    {me.studentFeedback.filter(
                      (f) => f.lesson.coursePage.id == coursePage.id
                    ).length === 0 ? (
                      <p>{t("no_feedback_yet")}</p>
                    ) : null}
                    {me.studentFeedback
                      .filter((f) => f.lesson.coursePage.id == coursePage.id)
                      .map((feedback) => (
                        <Feedback feedback={feedback} />
                      ))}
                  </>
                ) : (
                  <Comment>{t("join_the_course")}</Comment>
                ))}
            </LessonsInfo>
            {me && (
              <Certificate
                completed={(maxes.length / coursePage.lessons.length) * 100}
                have_cert={have_cert}
                studentId={me.id}
                student={me}
                coursePageId={coursePage.id}
                coursePage={coursePage}
                createdAt={have_cert ? cert.createdAt : null}
                certId={have_cert ? cert.id : null}
              />
            )}
            {/* <Details>
              {data.coursePage.audience && (
                <div className="info">
                  <div className="header">
                    <span>{t("who_for")}</span>
                  </div>
                  <div>{renderHTML(data.coursePage.audience)}</div>
                </div>
              )}
              {data.coursePage.video && data.coursePage.video !== "" && (
                <Video>
                  <div className="header">{t("presentation")}</div>
                  <iframe src={data.coursePage.video} allowFullScreen />
                </Video>
              )}
              {data.coursePage.methods && (
                <div className="info">
                  <div className="header">{t("author")}</div>
                  <div>{renderHTML(data.coursePage.methods)}</div>
                </div>
              )}
              {data.coursePage.result && (
                <div className="info">
                  <div className="header">{t("about")}</div>
                  <div>{renderHTML(data.coursePage.result)}</div>
                </div>
              )}
              {data.coursePage.batch && (
                <div className="red">
                  <div className="header">{t("next_cohort")}</div>
                  {renderHTML(data.coursePage.batch)}
                </div>
              )}
            </Details>
            <Details>
              {data.coursePage.tariffs && (
                <div className="info">
                  <div className="header">{t("tariffs")}</div>
                  <div>{renderHTML(data.coursePage.tariffs)}</div>
                </div>
              )}
            </Details> */}
          </LessonStyles>
        </Container>
      </>
    </>
  );
};

export default CoursePage;

export { SINGLE_COURSEPAGE_QUERY };
