import { useState } from "react";
import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import renderHTML from "react-render-html";
import LessonHeader from "../lesson/LessonHeader";
import { useUser } from "../User";
import FirstLesson from "./coursePageCards/FirstLesson";
import RegisterCard from "./coursePageCards/RegisterCard";
import StudentCard from "./coursePageCards/StudentCard";
import TeacherCard from "./coursePageCards/TeacherCard";
import SignInCard from "./coursePageCards/SignInCard";
import Loading from "../Loading";
import Feedback from "./Feedback";
// import { Reviews } from "../../config";
import { withTranslation } from "../../i18n";

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
      # promocode
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
          lessonID
          student {
            id
          }
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

const CoursePage = (props) => {
  const [page, setPage] = useState("lessons");
  const me = useUser();
  let my_reviews;
  // my_reviews = Reviews.filter((r) => r.coursePage === props.id);
  my_reviews = [];
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
            me &&
              me.new_subjects.map((new_subject) =>
                new_subjectArray.push(new_subject.id)
              );

            const applicationsList = [];
            coursePage.applications.map((application) =>
              applicationsList.push(application.applicantId)
            );

            let weeks;
            if (coursePage.weeks) {
              weeks = coursePage.weeks;
            } else {
              weeks = 3;
            }

            let lessonsList = [];
            coursePage.lessons.map((l) => lessonsList.push(l.id));

            const openLesson = coursePage.lessons.filter(
              (c) => c.id === coursePage.openLesson
            );
            return (
              <>
                <Container>
                  <LessonImage
                    src={
                      "https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_1280.png"
                    }
                  />
                  <LessonStyles>
                    <CourseInfo>
                      <Data>
                        <Header>{coursePage.title}</Header>
                        <p className="track2">{coursePage.description}</p>
                        <p className="track2">{coursePage.user.description}</p>
                      </Data>
                      <PayBox>
                        {/* Карточка регистрации на сайте */}
                        {!me && <SignInCard />}
                        {/* Карточка первого урока */}
                        {me &&
                          me.id !== coursePage.user.id &&
                          !new_subjectArray.includes(coursePage.id) &&
                          !me.permissions.includes("ADMIN") && (
                            <FirstLesson lesson={openLesson} />
                          )}
                        {/* Карточка преподавателя */}
                        {me &&
                          (me.id === coursePage.user.id ||
                            me.permissions.includes("ADMIN")) && (
                            <TeacherCard
                              id={coursePage.id}
                              coursePage={coursePage}
                            />
                          )}
                        {/* Карточка ученика */}
                        {me &&
                          new_subjectArray.includes(coursePage.id) &&
                          !me.permissions.includes("ADMIN") && (
                            <StudentCard coursePage={coursePage} me={me} />
                          )}
                      </PayBox>
                    </CourseInfo>
                    <Details>
                      {data.coursePage.audience && (
                        <div className="info">
                          <div className="header">
                            <span>{props.t("TA")}</span>
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
                          <div className="header">{props.t("author")}</div>
                          <div>{renderHTML(data.coursePage.methods)}</div>
                        </div>
                      )}
                      {data.coursePage.result && (
                        <div className="info">
                          <div className="header">{props.t("result")}</div>
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
                          onClick={(e) => setPage("forum")}
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
                          {[...coursePage.lessons]
                            .sort((a, b) => (a.number > b.number ? 1 : -1))
                            .map((lesson, index) => (
                              <>
                                {(index + weeks) % weeks === 0 && (
                                  <div className="week">
                                    Неделя {/* {props.t("week")}  */}
                                    {(index + weeks) / weeks}
                                  </div>
                                )}
                                <LessonHeader
                                  me={me}
                                  key={lesson.id}
                                  name={lesson.name}
                                  lesson={lesson}
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
                        </>
                      )}

                      {page === "feedback" &&
                        (me && new_subjectArray.includes(coursePage.id) ? (
                          <>
                            {me.studentFeedback.filter((feed) =>
                              lessonsList.includes(feed.lesson.id)
                            ).length === 0 ? (
                              <p>Обратной связи нет</p>
                            ) : null}
                            {me.studentFeedback
                              .filter((feed) =>
                                lessonsList.includes(feed.lesson.id)
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
                      {data.coursePage.tariffs && (
                        <div className="info">
                          {/* <div className="header">{props.t("tariffs")}</div> */}
                          <div>{renderHTML(data.coursePage.tariffs)}</div>
                        </div>
                      )}
                    </Details>
                    {me &&
                      !me.permissions.includes("ADMIN") &&
                      !new_subjectArray.includes(coursePage.id) && (
                        <RegisterCard
                          me={me}
                          coursePage={coursePage}
                          price={price}
                          subscription={coursePage.subscription}
                          subscriptionPrice={coursePage.subscriptionPrice}
                          discountPrice={coursePage.discountPrice}
                          // promocode={coursePage.promocode}
                        />
                      )}

                    {me && me.permissions.includes("ADMIN") && (
                      <RegisterCard
                        me={me}
                        coursePage={coursePage}
                        price={price}
                        subscription={coursePage.subscription}
                        subscriptionPrice={coursePage.subscriptionPrice}
                        discountPrice={coursePage.discountPrice}
                        // promocode={coursePage.promocode}
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
                        // promocode={coursePage.promocode}
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

export default withTranslation("course")(CoursePage);
// export default CoursePage;

export { SINGLE_COURSEPAGE_QUERY };
