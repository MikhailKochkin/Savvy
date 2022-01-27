import { useState } from "react";
import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import renderHTML from "react-render-html";
import AddToCalendar from "react-add-to-calendar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
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
        lessonResults {
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
      description
      courseType
      students
      applications {
        id
        applicantId
      }
      new_students {
        id
      }
      user {
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

const CalendarComponent = styled.div`
  height: 500px;
  margin: 50px 0;
`;

const localizer = momentLocalizer(moment);

const CoursePage = (props) => {
  const [page, setPage] = useState("lessons");
  const me = useUser();
  let my_reviews;
  // my_reviews = Reviews.filter((r) => r.coursePage === props.id);
  my_reviews = [];
  let events = [
    {
      start: new Date("January 19, 2022 20:00:00"),
      end: new Date("January 19, 2022 21:00:00"),
      title: "Договорные конструкции в юридическом английском",
    },
  ];

  return (
    <>
      <div id="root"></div>
      <>
        <Query
          query={SINGLE_COURSEPAGE_QUERY}
          variables={{
            id: props.id,
          }}
        >
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <Loading />;
            const coursePage = data.coursePage;
            let lessons = coursePage.lessons;
            const student_list = [];
            coursePage.new_students.map((ns) => student_list.push(ns.id));
            let price;
            if (coursePage.price === null) {
              price = "Бесплатно";
            } else {
              price = coursePage.price;
            }
            let new_subjectArray = [];
            if (me && me.new_subjects) {
              me.new_subjects.map((new_subject) =>
                new_subjectArray.push(new_subject.id)
              );
            }

            let maxes = [];

            // 0.
            if (me) {
              let results = [];
              coursePage.lessons.map((les) => {
                results.push(...les.lessonResults);
              });

              let filtered_results = results.filter(
                (r) => r.student.id == me.id
              );

              // 1. Get all lesson results
              const sorted_lessons = filtered_results
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

              const applicationsList = [];
              coursePage.applications.map((application) =>
                applicationsList.push(application.applicantId)
              );
            }

            let weeks;
            if (coursePage.weeks) {
              weeks = coursePage.weeks;
            } else {
              weeks = 3;
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

            return (
              <>
                <Container>
                  <LessonStyles>
                    <CourseInfo>
                      <Data>
                        <Header>{coursePage.title}</Header>
                        {/* <p className="track2">{coursePage.description}</p> */}
                        {coursePage && coursePage.authors.length > 0 ? (
                          coursePage.authors.map((a) => (
                            <div className="name">
                              <img src={a.image} />
                              <p>
                                {a.name} {a.surname} из {a.company.name}
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
                                из {coursePage.user.company.name}
                              </p>
                            </div>
                            <p className="track2">
                              {coursePage.user.description}
                            </p>
                          </>
                        )}
                      </Data>
                      <PayBox>
                        {/* Карточка регистрации на сайте */}
                        {!me && <SignInCard />}
                        {/* Карточка первого урока */}
                        {me &&
                          me.permissions &&
                          me.id !== coursePage.user.id &&
                          !new_subjectArray.includes(coursePage.id) &&
                          !me.permissions.includes("ADMIN") && (
                            <FirstLesson openLesson={openLesson} />
                          )}
                        {/* Карточка преподавателя */}
                        {me &&
                          me.permissions &&
                          (me.id === coursePage.user.id ||
                            me.permissions.includes("ADMIN")) && (
                            <TeacherCard
                              id={coursePage.id}
                              coursePage={coursePage}
                            />
                          )}
                        {/* Карточка ученика */}
                        {me &&
                          me.permissions &&
                          new_subjectArray.includes(coursePage.id) &&
                          !me.permissions.includes("ADMIN") && (
                            <StudentCard coursePage={coursePage} me={me} />
                          )}
                      </PayBox>
                    </CourseInfo>{" "}
                    {/* <CalendarComponent>
                      <Calendar
                        localizer={localizer}
                        events={events}
                        defaultView="month"
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                      />
                    </CalendarComponent> */}
                    {me && (
                      <Certificate
                        completed={
                          (maxes.length / coursePage.lessons.length) * 100
                        }
                        have_cert={have_cert}
                        studentId={me.id}
                        student={me}
                        coursePageId={coursePage.id}
                        coursePage={coursePage}
                        createdAt={have_cert ? cert.createdAt : null}
                        certId={have_cert ? cert.id : null}
                      />
                    )}
                    <LessonsInfo>
                      <Buttons>
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
                      </Buttons>
                      {page === "lessons" && (
                        <>
                          <Total>
                            {" "}
                            {/* {props.t("total")}  */}
                            Всего уроков: {lessons.length}
                          </Total>
                          <Lessons>
                            {[...coursePage.lessons]
                              .sort((a, b) => (a.number > b.number ? 1 : -1))
                              .map((lesson, index) => (
                                <>
                                  <LessonHeader
                                    me={me}
                                    key={lesson.id}
                                    name={lesson.name}
                                    lesson={lesson}
                                    statements={
                                      lesson.forum
                                        ? lesson.forum.statements
                                        : null
                                    }
                                    coursePage={props.id}
                                    author={coursePage.user.id}
                                    students={coursePage.students}
                                    new_students={student_list}
                                    open={index + 1 === 1}
                                    index={index + 1}
                                    coursePageId={coursePage.id}
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
                              .filter(
                                (f) => f.lesson.coursePage.id == coursePage.id
                              )
                              .map((feedback) => (
                                <Feedback feedback={feedback} />
                              ))}
                          </>
                        ) : (
                          <Comment>
                            Зарегистрируйтесь на курс по продвинутому тарифу,
                            чтобы получать обратную связь по выполненным
                            заданиям.
                          </Comment>
                        ))}
                    </LessonsInfo>
                    <Details>
                      {/* <AddToCalendar event={event} /> */}

                      {data.coursePage.audience && (
                        <div className="info">
                          <div className="header">
                            <span>Для кого этот курс</span>
                          </div>
                          <div>{renderHTML(data.coursePage.audience)}</div>
                        </div>
                      )}
                      {data.coursePage.video && data.coursePage.video !== "" && (
                        <Video>
                          <div className="header">
                            Посмотрите презентацию курса от его автора:
                          </div>
                          <iframe src={data.coursePage.video} allowFullScreen />
                        </Video>
                      )}
                      {data.coursePage.methods && (
                        <div className="info">
                          <div className="header">Про автора курса</div>
                          <div>{renderHTML(data.coursePage.methods)}</div>
                        </div>
                      )}
                      {data.coursePage.result && (
                        <div className="info">
                          <div className="header">О программе</div>
                          <div>{renderHTML(data.coursePage.result)}</div>
                        </div>
                      )}
                      {data.coursePage.batch && (
                        <div className="red">
                          <div className="header">
                            Информация о следующем живом потоке
                          </div>
                          {renderHTML(data.coursePage.batch)}
                        </div>
                      )}
                    </Details>
                    <Details>
                      {data.coursePage.tariffs && (
                        <div className="info">
                          <div className="header">Тарифы</div>
                          <div>{renderHTML(data.coursePage.tariffs)}</div>
                        </div>
                      )}
                    </Details>
                    {me &&
                      me.permissions &&
                      !me.permissions.includes("ADMIN") &&
                      !new_subjectArray.includes(coursePage.id) && (
                        <RegisterCard
                          me={me}
                          coursePage={coursePage}
                          price={price}
                          subscription={coursePage.subscription}
                          subscriptionPrice={coursePage.subscriptionPrice}
                          discountPrice={coursePage.discountPrice}
                          promocode={coursePage.promocode}
                        />
                      )}
                    {me &&
                      me.permissions &&
                      me.permissions.includes("ADMIN") && (
                        <RegisterCard
                          me={me}
                          coursePage={coursePage}
                          price={price}
                          subscription={coursePage.subscription}
                          subscriptionPrice={coursePage.subscriptionPrice}
                          discountPrice={coursePage.discountPrice}
                          promocode={coursePage.promocode}
                        />
                      )}
                    {!me && (
                      <RegisterCard
                        me={me}
                        coursePage={coursePage}
                        price={price}
                        subscription={coursePage.subscription}
                        subscriptionPrice={coursePage.subscriptionPrice}
                        discountPrice={coursePage.discountPrice}
                        promocode={coursePage.promocode}
                      />
                    )}
                    {my_reviews[0] && (
                      <>
                        {/* <Header2>{props.t("reviews")}</Header2> */}
                        <ReviewsStyles>
                          {my_reviews[0].reviews.map((post, i) => (
                            <Post color={i + 1}>
                              <div>
                                <div className="header">{post.author}</div>
                                <a href={post.link} target="_blank">
                                  <div className="text">{post.text}</div>
                                </a>
                              </div>
                              <div className="source">
                                <span>{post.source}</span>
                              </div>
                            </Post>
                          ))}
                        </ReviewsStyles>
                      </>
                    )}
                  </LessonStyles>
                </Container>
              </>
            );
          }}
        </Query>
      </>
    </>
  );
};

// export default withTranslation("course")(CoursePage);
export default CoursePage;

export { SINGLE_COURSEPAGE_QUERY };
