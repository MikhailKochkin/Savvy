import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import renderHTML from "react-render-html";
import LessonHeader from "../lesson/LessonHeader";
import PleaseSignIn from "../auth/PleaseSignIn";
import User from "../User";
import RegisterCard from "./coursePageCards/RegisterCard";
import StudentCard from "./coursePageCards/StudentCard";
import TeacherCard from "./coursePageCards/TeacherCard";
import SignInCard from "./coursePageCards/SignInCard";
import ApplicationCard from "./coursePageCards/ApplicationCard";
import ExamAnswer from "./ExamAnswer";
import ExamQuestion from "./ExamQuestion";
import UpdateExamQuestion from "./UpdateExamQuestion";
import Feedback from "./Feedback";

const PAGE_LESSONS_QUERY = gql`
  query PAGE_LESSONS_QUERY($id: ID!) {
    lessons(where: { coursePageID: $id }, orderBy: number_ASC) {
      id
      name
      number
      type
      description
      published
      text
      user {
        id
      }
    }
  }
`;

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
      audience
      result
      tariffs
      methods
      reviews
      discountPrice
      promocode
      openLesson
      published
      lessons {
        id
        lessonResults {
          id
          student {
            id
            name
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
        status
        uni {
          id
          title
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
`;

const Data = styled.div`
  flex: 60%;
  padding: 2% 3%;
  p {
    margin: 0;
  }
  .name {
    font-size: 1.8rem;
    padding-bottom: 4%;
  }
  .company {
    font-size: 1.6rem;
    padding-bottom: 4%;
    border-bottom: 1px solid #e4e4e4;
  }
  .track {
    font-size: 1.6rem;
    line-height: 1.4;
    padding-top: 4%;
    padding-bottom: 4%;
    border-bottom: 1px solid #e4e4e4;
  }
  .track2 {
    font-size: 1.6rem;
    line-height: 1.4;
    padding-top: 4%;
    padding-bottom: 4%;
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
  padding-bottom: 6%;
  padding-top: 4%;
  line-height: 1.4;
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
  border-bottom: ${props =>
    props.primary ? "1px solid black" : "1px solid white"};
`;

const Reviews = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MoveButton = styled.button`
  background: #0846d8;
  border-radius: 5px;
  width: 20%;
  height: 38px;
  outline: 0;
  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  &:hover {
    background: rgba(8, 70, 216, 0.85);
  }
  &:active {
    background-color: ${props => props.theme.darkGreen};
  }
  &:disabled {
    &:hover {
      background-color: #84bc9c;
    }
  }
  @media (max-width: 800px) {
    width: 50%;
  }
`;

const Details = styled.div`
  margin: 3% 0;
  padding: 0 2%;
  font-size: 1.6rem;
  .yellow {
    padding: 4%;
    background: rgba(253, 173, 18, 0.05);
    margin-top: 2%;
    width: 100%;
    @media (max-width: 800px) {
      padding: 20px;
    }
  }
  .green {
    padding: 4%;
    background: rgba(50, 172, 102, 0.05);
    width: 100%;
    @media (max-width: 800px) {
      padding: 20px;
    }
  }
  .blue {
    padding: 4%;
    background: rgba(36, 101, 255, 0.1);
    margin-bottom: 4%;
    width: 100%;
    @media (max-width: 800px) {
      padding: 20px;
    }
  }
  .header {
    font-size: 1.8rem;
    font-weight: bold;
  }
`;

class CoursePage extends Component {
  state = {
    page: "lessons",
    primary1: true,
    primary2: false
  };
  switch = e => {
    const { name } = e.target;
    this.setState({ page: name });
  };
  scroll = () => {
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <>
            <Query
              query={PAGE_LESSONS_QUERY}
              variables={{
                id: this.props.id
              }}
            >
              {({ data: data1, error: error1, loading: loading1 }) => {
                if (loading1) return <p>Загрузка...</p>;
                if (error1) return <p>Error: {error1.message}</p>;
                return (
                  <>
                    <Query
                      query={AGGREGATE_PAGE_LESSONS_QUERY}
                      variables={{
                        id: this.props.id
                      }}
                    >
                      {({ data: data2, error: error2, loading: loading2 }) => {
                        if (loading2) return <p>Loading...</p>;
                        if (error2) return <p>Error: {error2.message}</p>;
                        return (
                          <Query
                            query={SINGLE_COURSEPAGE_QUERY}
                            variables={{
                              id: this.props.id
                            }}
                          >
                            {({ error, loading, data }) => {
                              if (error) return <Error error={error} />;
                              if (loading) return <p>Loading...</p>;
                              const coursePage = data.coursePage;
                              const student_list = [];
                              coursePage.new_students.map(ns =>
                                student_list.push(ns.id)
                              );
                              let price;
                              if (coursePage.price === null) {
                                price = "Бесплатно";
                              } else {
                                price = coursePage.price;
                              }
                              const studentsArray = [];
                              coursePage.students.map(student =>
                                studentsArray.push(student)
                              );

                              const subjectArray = [];
                              const new_subjectArray = [];
                              me &&
                                me.subjects.map(subject =>
                                  subjectArray.push(subject)
                                );
                              me &&
                                me.new_subjects.map(new_subject =>
                                  new_subjectArray.push(new_subject.id)
                                );
                              const applicationsList = [];
                              coursePage.applications.map(application =>
                                applicationsList.push(application.applicantId)
                              );

                              let lessonsList = [];
                              coursePage.lessons.map(l =>
                                lessonsList.push(l.id)
                              );
                              return (
                                <>
                                  <Container>
                                    <LessonImage
                                      src={
                                        "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1567424791/singapore-river-255116.jpg"
                                      }
                                    />
                                    <LessonStyles>
                                      <CourseInfo>
                                        <Data>
                                          <Header>{coursePage.title}</Header>
                                          <p className="name">
                                            {coursePage.user.name}
                                          </p>
                                          <p className="company">
                                            {coursePage.user.uni.title}
                                          </p>
                                          <p className="track2">
                                            {coursePage.description}
                                          </p>
                                        </Data>
                                        <PayBox>
                                          {/* Карточка регистрации на сайте */}
                                          {!me && <SignInCard />}
                                          {/* Карточка регистрации на курс */}
                                          {me &&
                                            me.id !== coursePage.user.id &&
                                            !applicationsList.includes(me.id) &&
                                            (!subjectArray.includes(
                                              coursePage.id
                                            ) &&
                                              !new_subjectArray.includes(
                                                coursePage.id
                                              )) &&
                                            !me.permissions.includes(
                                              "ADMIN"
                                            ) && (
                                              <RegisterCard
                                                me={me}
                                                coursePage={coursePage}
                                                price={price}
                                                discountPrice={
                                                  coursePage.discountPrice
                                                }
                                                promocode={
                                                  coursePage.promocode[0]
                                                }
                                                studentsArray={studentsArray}
                                                subjectArray={subjectArray}
                                              />
                                            )}
                                          {/* Карточка заявки на рассмотрении */}
                                          {me &&
                                            me.id !== coursePage.user.id &&
                                            applicationsList.includes(
                                              me.id
                                            ) && <ApplicationCard />}
                                          {/* Карточка преподавателя */}
                                          {me &&
                                            (me.id === coursePage.user.id ||
                                              me.permissions.includes(
                                                "ADMIN"
                                              )) && (
                                              <TeacherCard
                                                id={coursePage.id}
                                                coursePage={coursePage}
                                              />
                                            )}
                                          {/* Карточка ученика */}
                                          {me &&
                                            (subjectArray.includes(
                                              coursePage.id
                                            ) ||
                                              new_subjectArray.includes(
                                                coursePage.id
                                              )) &&
                                            !me.permissions.includes(
                                              "ADMIN"
                                            ) && (
                                              <StudentCard
                                                coursePage={coursePage}
                                                me={me}
                                              />
                                            )}
                                        </PayBox>
                                      </CourseInfo>
                                      <Details>
                                        {data.coursePage.methods && (
                                          <div className="yellow">
                                            <div className="header">
                                              🛠 Какие методики мы использовали
                                              при создании онлайн-уроков?
                                            </div>
                                            <div>
                                              {renderHTML(
                                                data.coursePage.methods
                                              )}
                                            </div>
                                          </div>
                                        )}
                                        {data.coursePage.audience && (
                                          <div className="green">
                                            <div className="header">
                                              🙋🏻‍♀ Для кого этот курс
                                              предназначен?
                                            </div>
                                            <div>
                                              {renderHTML(
                                                data.coursePage.audience
                                              )}
                                            </div>
                                          </div>
                                        )}
                                        {data.coursePage.result && (
                                          <div className="blue">
                                            <div className="header">
                                              ️️🎁 Что вы получите в результате
                                              прохождения курса?
                                            </div>
                                            <div>
                                              {renderHTML(
                                                data.coursePage.result
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </Details>
                                      <LessonsInfo>
                                        <Buttons>
                                          <Button
                                            primary={
                                              this.state.page === "lessons"
                                            }
                                            name="lessons"
                                            onClick={this.switch}
                                          >
                                            Уроки
                                          </Button>

                                          <Button
                                            primary={
                                              this.state.page === "feedback"
                                            }
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
                                                data2.lessonsConnection
                                                  .aggregate.count
                                              }
                                            </Total>
                                            {data1.lessons.map(
                                              (lesson, index) => (
                                                <LessonHeader
                                                  me={me}
                                                  key={lesson.id}
                                                  name={lesson.name}
                                                  lesson={lesson}
                                                  coursePageId={this.props.id}
                                                  students={coursePage.students}
                                                  openLesson={
                                                    coursePage.openLesson
                                                  }
                                                  new_students={student_list}
                                                  open={index + 1 === 1}
                                                  index={index + 1}
                                                />
                                              )
                                            )}
                                          </>
                                        )}
                                        {this.state.page === "feedback" &&
                                          (me && (
                                            <>
                                              {me.studentFeedback.filter(feed =>
                                                lessonsList.includes(
                                                  feed.lesson.id
                                                )
                                              ).length === 0 ? (
                                                <p>Обратной связи нет</p>
                                              ) : null}
                                              {me.studentFeedback
                                                .filter(feed =>
                                                  lessonsList.includes(
                                                    feed.lesson.id
                                                  )
                                                )
                                                .map(feedback => (
                                                  <Feedback
                                                    feedback={feedback}
                                                  />
                                                ))}
                                            </>
                                          ))}
                                        {this.state.page === "finals" && (
                                          <>
                                            {me &&
                                              (me.id === coursePage.user.id ||
                                                me.permissions.includes(
                                                  "ADMIN"
                                                )) &&
                                              (coursePage.examQuestion ? (
                                                <UpdateExamQuestion
                                                  id={this.props.id}
                                                />
                                              ) : (
                                                <ExamQuestion
                                                  id={this.props.id}
                                                />
                                              ))}
                                            {me &&
                                              (me.id !== coursePage.user.id &&
                                                !me.permissions.includes(
                                                  "ADMIN"
                                                )) &&
                                              (coursePage.examQuestion ? (
                                                <ExamAnswer
                                                  id={this.props.id}
                                                  question={
                                                    coursePage.examQuestion
                                                  }
                                                />
                                              ) : (
                                                <p>
                                                  На этом курсе пока нет
                                                  финального задания
                                                </p>
                                              ))}
                                          </>
                                        )}
                                      </LessonsInfo>
                                      <Details>
                                        {data.coursePage.tariffs && (
                                          <div className="yellow">
                                            <div className="header">
                                              ️️📚Как проходит обучение на
                                              разных тарифах?
                                            </div>
                                            <div>
                                              {renderHTML(
                                                data.coursePage.tariffs
                                              )}
                                            </div>
                                            <MoveButton onClick={this.scroll}>
                                              Наверх
                                            </MoveButton>
                                          </div>
                                        )}
                                      </Details>
                                      {/* )} */}
                                      {data.coursePage.reviews.length > 0 && (
                                        <Reviews>
                                          {data.coursePage.reviews.map(post =>
                                            renderHTML(post)
                                          )}
                                        </Reviews>
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
                );
              }}
            </Query>
          </>
        )}
      </User>
    );
  }
}

export default CoursePage;
export { SINGLE_COURSEPAGE_QUERY };
export { PAGE_LESSONS_QUERY };
