import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import renderHTML from "react-render-html";
import LessonHeader from "../lesson/LessonHeader";
import User from "../User";
import FirstLesson from "./coursePageCards/FirstLesson";
import RegisterCard from "./coursePageCards/RegisterCard";
import StudentCard from "./coursePageCards/StudentCard";
import TeacherCard from "./coursePageCards/TeacherCard";
import SignInCard from "./coursePageCards/SignInCard";
import Loading from "../Loading";
import Feedback from "./Feedback";
import { Reviews } from "../../config";

const AGGREGATE_PAGE_LESSONS_QUERY = gql`
  query AGGREGATE_PAGE_LESSONS_QUERY($id: ID!) {
    lessonsConnection(where: { coursePageID: $id }) {
      aggregate {
        count
      }
    }
  }
`;

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: ID!) {
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
      batch
      methods
      reviews
      package {
        id
        price
        title
        image
        description
      }
      promocode
      openLesson
      published
      user {
        id
      }
      lessons {
        id
        name
        open
        number
        type
        coursePage {
          id
        }
        description
        published
        user {
          id
        }
        forum {
          id
          rating {
            id
            rating
          }
        }
        lessonResults {
          id
          visitsNumber
          lessonID
          student {
            id
          }
        }
        newTests {
          testResults {
            id
            student {
              id
            }
          }
        }
        quizes {
          quizResults {
            id
            student {
              id
            }
          }
        }
        problems {
          problemResults {
            id
            student {
              id
            }
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
      careerTrack {
        id
        name
        img
      }
      new_students {
        id
      }
      examQuestion {
        id
        question
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

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LessonStyles = styled.div`
  max-width: 850px;
  min-width: 700px;
  margin: 1.5% 0;
  @media (max-width: 1000px) {
    width: 90%;
    min-width: 100px;
  }
`;

const CourseInfo = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const LessonsInfo = styled.div`
  margin-top: 2%;
  padding: 0 3%;
  .week {
    font-size: 1.6rem;
    font-weight: bold;
    margin: 1% 0;
    margin-top: 3%;
  }
`;

const Data = styled.div`
  flex: 60%;
  padding: 2% 3%;
  p {
    margin: 0;
  }
  .name {
    font-size: 1.6rem;
    font-weight: bold;
    padding-bottom: 4%;
    padding-top: 4%;
    border-top: 1px solid #e4e4e4;
  }
  .company {
    font-size: 1.6rem;
    padding-bottom: 4%;
  }
  .track {
    font-size: 1.6rem;
    line-height: 1.4;
    padding-top: 4%;
    padding-bottom: 4%;
  }
  .rating {
    padding-bottom: 4%;
    font-size: 1.6rem;
  }
  .track2 {
    font-size: 1.6rem;
    line-height: 1.4;
    padding-top: 0%;
    padding-bottom: 2%;
  }
  .trackName {
    font-weight: 600;
  }
`;

const PayBox = styled.div`
  flex: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 2% 3%;
  @media (max-width: 1000px) {
    margin-bottom: 20px;
    align-items: center;
  }
`;

const LessonImage = styled.img`
  position: relative;
  object-fit: cover;
  height: 350px;
  width: 100%;
  @media (max-width: 800px) {
    height: 200px;
  }
`;

const Header = styled.div`
  font-size: 2.4rem;
  padding-bottom: 4%;
  padding-top: 4%;
  line-height: 1.4;
`;

const Header2 = styled.div`
  font-size: 2rem;
  padding-top: 4%;
`;

const Total = styled.div`
  font-size: 1.6rem;
  margin: 1.5% 0;
`;

const Buttons = styled.div``;

const Button = styled.button`
  border: none;
  background: none;
  font-size: 1.6rem;
  padding: 0;
  margin-right: 20px;
  outline: 0;
  cursor: pointer;
  font-family: Montserrat;
  padding-bottom: 10px;
  border-bottom: ${(props) =>
    props.primary ? "1px solid black" : "1px solid white"};
  &#forum {
    font-weight: bold;
  }
`;

const ReviewsStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  flex-wrap: wrap;
  margin: 2% 0;
  .header {
    font-size: 1.8rem;
    font-weight: bold;
  }
  .post {
    width: 45%;
    flex-basis: 45%;
    background: #fff;
    margin-bottom: 3%;
    border: 2px solid #32ac66;
    border-radius: 15px;
    padding: 2%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .source {
      & {
        width: 100%;
        text-align: center;
        border-bottom: 1px solid #000;
        line-height: 0.1em;
        margin: 20px 0 20px;
      }

      & span {
        background: #fff;
        padding: 0 30px;
      }
    }
    .text {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .post {
      width: 95%;
      padding: 4%;
    }
  }
`;

const Details = styled.div`
  margin: 3% 0;
  padding: 0 2%;
  font-size: 1.6rem;

  .red {
    padding: 4%;
    background: #6c4ae0;
    color: white;
    margin-top: 2%;
    width: 100%;
    @media (max-width: 800px) {
      padding: 20px;
    }
  }
  .yellow {
    padding: 4%;
    background: rgba(169, 210, 255, 0.3);
    margin-top: 2%;
    width: 100%;
    @media (max-width: 800px) {
      padding: 20px;
    }
  }
  .green {
    padding: 4%;
    background: rgba(210, 246, 252, 0.3);
    width: 100%;
    @media (max-width: 800px) {
      padding: 20px;
    }
  }
  .blue {
    padding: 4%;
    background: rgba(121, 132, 238, 0.15);
    margin-bottom: 4%;
    width: 100%;
    @media (max-width: 800px) {
      padding: 20px;
    }
  }
  .header {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 1%;
    @media (max-width: 800px) {
      font-size: 1.6rem;
    }
  }
  .openLesson {
    margin: 3% 0;
    @media (max-width: 800px) {
      margin: 6% 0;
    }
  }
`;

const Video = styled.div`
  .header {
    margin-bottom: 3%;
  }
  margin: 3% 0;
  iframe {
    width: 100%;
    height: 45vh;
    border: none;
  }
`;

const Comment = styled.div`
  font-size: 1.6rem;
  background: #0268e6;
  color: white;
  padding: 2% 3%;
  margin-top: 3%;
  text-align: center;
`;

class CoursePage extends Component {
  state = {
    page: "lessons",
    primary1: true,
    primary2: false,
  };
  switch = (e) => {
    const { name } = e.target;
    this.setState({ page: name });
  };
  scroll = () => {
    window.scrollTo(0, 0);
  };
  render() {
    let my_reviews;
    my_reviews = Reviews.filter((r) => r.coursePage === this.props.id);
    return (
      <>
        <div id="root"></div>
        <User>
          {({ data: { me } }) => (
            <>
              <Query
                query={AGGREGATE_PAGE_LESSONS_QUERY}
                variables={{
                  id: this.props.id,
                }}
              >
                {({ data: data2, error: error2, loading: loading2 }) => {
                  if (loading2) return <Loading />;
                  if (error2) return <p>Error: {error2.message}</p>;
                  return (
                    <Query
                      query={SINGLE_COURSEPAGE_QUERY}
                      variables={{
                        id: this.props.id,
                      }}
                    >
                      {({ error, loading, data }) => {
                        if (error) return <Error error={error} />;
                        if (loading) return <Loading />;
                        const coursePage = data.coursePage;
                        const student_list = [];
                        coursePage.new_students.map((ns) =>
                          student_list.push(ns.id)
                        );
                        let price;
                        if (coursePage.price === null) {
                          price = "Бесплатно";
                        } else {
                          price = coursePage.price;
                        }
                        const studentsArray = [];
                        coursePage.students.map((student) =>
                          studentsArray.push(student)
                        );

                        const subjectArray = [];
                        const new_subjectArray = [];
                        me &&
                          me.subjects.map((subject) =>
                            subjectArray.push(subject)
                          );
                        me &&
                          me.new_subjects.map((new_subject) =>
                            new_subjectArray.push(new_subject.id)
                          );
                        const applicationsList = [];
                        coursePage.applications.map((application) =>
                          applicationsList.push(application.applicantId)
                        );

                        let lessonsList = [];
                        coursePage.lessons.map((l) => lessonsList.push(l.id));

                        let forums = [];
                        let ratings = [];
                        let average;
                        if (coursePage && coursePage.lessons) {
                          coursePage.lessons.map((l) =>
                            forums.push(l.forum ? [...l.forum.rating] : null)
                          );
                          forums = forums
                            .filter((f) => f !== null)
                            .filter((f) => f.length !== 0);
                          forums.map((f) =>
                            f.map((r) => ratings.push(r.rating))
                          );
                          average = (
                            ratings.reduce((a, b) => a + b, 0) / ratings.length
                          ).toFixed(2);
                        }
                        return (
                          <>
                            <Container>
                              <LessonImage
                                src={
                                  "https://cdn.pixabay.com/photo/2014/01/30/18/26/singapore-river-255116_1280.jpg"
                                }
                              />
                              <LessonStyles>
                                <CourseInfo>
                                  <Data>
                                    <Header>{coursePage.title}</Header>
                                    <p className="track2">
                                      {coursePage.description}
                                    </p>
                                    {average >= 0 ? (
                                      <div className="rating">
                                        Оценка курса учениками: <b>{average}</b>
                                      </div>
                                    ) : null}
                                    <p className="name">
                                      {coursePage.user &&
                                      coursePage.user.surname
                                        ? `${coursePage.user.name} ${coursePage.user.surname}`
                                        : coursePage.user.name}{" "}
                                      из{" "}
                                      {coursePage.user &&
                                      (coursePage.user.status === "HR" ||
                                        coursePage.user.status === "AUTHOR")
                                        ? coursePage.user.company.name
                                        : coursePage.user.uni.title}
                                    </p>
                                    <p className="track2">
                                      {coursePage.user.description}
                                    </p>
                                  </Data>
                                  <PayBox>
                                    {/* Карточка регистрации на сайте */}
                                    {!me && <SignInCard />}
                                    {/* Карточка первого урока */}
                                    {me &&
                                      me.id !== coursePage.user.id &&
                                      // !applicationsList.includes(me.id) &&
                                      !subjectArray.includes(coursePage.id) &&
                                      !new_subjectArray.includes(
                                        coursePage.id
                                      ) &&
                                      !me.permissions.includes("ADMIN") && (
                                        <FirstLesson
                                          lesson={
                                            coursePage.lessons.filter(
                                              (l) => l.open === true
                                            )[0]
                                          }
                                        />
                                      )}{" "}
                                    {/* Карточка первого урока */}
                                    {me &&
                                      me.id !== coursePage.user.id &&
                                      !me.permissions.includes("ADMIN") &&
                                      applicationsList.includes(me.id) && (
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
                                      (subjectArray.includes(coursePage.id) ||
                                        new_subjectArray.includes(
                                          coursePage.id
                                        )) &&
                                      !me.permissions.includes("ADMIN") && (
                                        <StudentCard
                                          coursePage={coursePage}
                                          me={me}
                                        />
                                      )}
                                  </PayBox>
                                </CourseInfo>
                                <Details>
                                  {data.coursePage.audience && (
                                    <div className="yellow">
                                      <div className="header">
                                        🙋🏻‍♀ Кому нужен этот курс?
                                      </div>
                                      <div>
                                        {renderHTML(data.coursePage.audience)}
                                      </div>
                                    </div>
                                  )}
                                  {data.coursePage.video &&
                                    data.coursePage.video !== "" && (
                                      <Video>
                                        <div className="header">
                                          Посмотрите презентацию курса от его
                                          автора:
                                        </div>
                                        <iframe
                                          src={data.coursePage.video}
                                          allowFullScreen
                                        />
                                      </Video>
                                    )}
                                  {data.coursePage.methods && (
                                    <div className="green">
                                      <div className="header">
                                        👨🏻‍🏫 👩🏼‍🏫 Об авторе курса и его подходах
                                      </div>
                                      <div>
                                        {renderHTML(data.coursePage.methods)}
                                      </div>
                                    </div>
                                  )}
                                  {/* {openLesson.length > 0 && (
                                    <div className="openLesson">
                                      <div className="header">
                                        Посмотрите первый открытый урок уже
                                        сейчас!
                                      </div>
                                      {!me && (
                                        <>
                                          <p>
                                            Войдите или зарегистрируйтесь, чтобы
                                            это сделать.
                                          </p>
                                          <SignInButton onClick={this.scroll}>
                                            Войти
                                          </SignInButton>
                                        </>
                                      )}
                                      {me &&
                                        openLesson.map((lesson, index) => (
                                          <LessonHeader
                                            me={me}
                                            key={lesson.id}
                                            name={lesson.name}
                                            lesson={lesson}
                                            coursePageId={this.props.id}
                                            students={coursePage.students}
                                            openLesson={coursePage.openLesson}
                                            new_students={student_list}
                                            open={index + 1 === 1}
                                            index={index + 1}
                                          />
                                        ))}
                                    </div>
                                  )} */}
                                  {data.coursePage.result && (
                                    <div className="blue">
                                      <div className="header">
                                        🎁 Что вы получите в результате
                                        прохождения курса?
                                      </div>
                                      <div>
                                        {renderHTML(data.coursePage.result)}
                                      </div>
                                    </div>
                                  )}
                                  {data.coursePage.batch && (
                                    <div className="red">
                                      <div className="header">
                                        🏋🏻‍♂️ Информация о следующем живом потоке
                                      </div>
                                      {renderHTML(data.coursePage.batch)}
                                    </div>
                                  )}
                                </Details>
                                <LessonsInfo>
                                  <Buttons>
                                    <Button
                                      primary={this.state.page === "lessons"}
                                      name="lessons"
                                      onClick={this.switch}
                                    >
                                      Уроки
                                    </Button>
                                    <Button
                                      primary={this.state.page === "feedback"}
                                      name="feedback"
                                      onClick={this.switch}
                                    >
                                      Обратная связь
                                    </Button>
                                  </Buttons>
                                  {this.state.page === "lessons" && (
                                    <>
                                      <Total>
                                        Всего:{" "}
                                        {
                                          data2.lessonsConnection.aggregate
                                            .count
                                        }
                                      </Total>
                                      {coursePage.lessons
                                        .sort((a, b) =>
                                          a.number > b.number ? 1 : -1
                                        )
                                        .map((lesson, index) => (
                                          <>
                                            {(index + 3) % 3 === 0 && (
                                              <div className="week">
                                                Неделя {(index + 3) / 3}
                                              </div>
                                            )}
                                            <LessonHeader
                                              me={me}
                                              key={lesson.id}
                                              name={lesson.name}
                                              lesson={lesson}
                                              coursePage={this.props.id}
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
                                  {this.state.page === "forum" &&
                                    (me &&
                                    (me.id === coursePage.user.id ||
                                      subjectArray.includes(coursePage.id) ||
                                      new_subjectArray.includes(
                                        coursePage.id
                                      ) ||
                                      me.permissions.includes("ADMIN")) ? (
                                      <>
                                        <Forum
                                          coursePage={coursePage}
                                          me={me}
                                        />
                                      </>
                                    ) : (
                                      <Comment>
                                        Зарегистрируйтесь на курс, чтобы
                                        получить доступ к форуму.
                                      </Comment>
                                    ))}

                                  {this.state.page === "feedback" &&
                                    (me &&
                                    (me.id === coursePage.user.id ||
                                      subjectArray.includes(coursePage.id) ||
                                      new_subjectArray.includes(
                                        coursePage.id
                                      ) ||
                                      me.permissions.includes("ADMIN")) ? (
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
                                        Зарегистрируйтесь на курс по
                                        продвинутому тарифу, чтобы получать
                                        обратную связь по выполненным заданиям.
                                      </Comment>
                                    ))}
                                </LessonsInfo>
                                <Details>
                                  {data.coursePage.tariffs && (
                                    <div className="yellow">
                                      <div className="header">
                                        📚Как проходит обучение на разных
                                        тарифах?
                                      </div>
                                      <div>
                                        {renderHTML(data.coursePage.tariffs)}
                                      </div>
                                    </div>
                                  )}
                                </Details>
                                {(!subjectArray.includes(coursePage.id) &&
                                  !new_subjectArray.includes(coursePage.id)) ||
                                  (me.permissions.includes("ADMIN") && (
                                    <RegisterCard
                                      me={me}
                                      coursePage={coursePage}
                                      price={price}
                                      discountPrice={coursePage.discountPrice}
                                      promocode={coursePage.promocode}
                                      studentsArray={studentsArray}
                                      subjectArray={subjectArray}
                                    />
                                  ))}

                                {my_reviews[0] && (
                                  <>
                                    <Header2>
                                      Что ученики говорят про этот курс?
                                    </Header2>
                                    <ReviewsStyles>
                                      {my_reviews[0].reviews.map((post, i) => (
                                        <div className="post">
                                          <div>
                                            <div className="header">
                                              {post.author}
                                            </div>
                                            <a href={post.link} target="_blank">
                                              <div className="text">
                                                {post.text}
                                              </div>
                                            </a>
                                          </div>
                                          <div className="source">
                                            <span>{post.source}</span>
                                          </div>
                                        </div>
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
                  );
                }}
              </Query>
            </>
          )}
        </User>
      </>
    );
  }
}

export default CoursePage;
export { SINGLE_COURSEPAGE_QUERY };
