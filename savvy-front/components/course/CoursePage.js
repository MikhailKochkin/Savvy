import React, { Component } from "react";
import { Query } from "react-apollo";
import Link from "next/link";
import gql from "graphql-tag";
import styled from "styled-components";
import LessonHeader from "../lesson/LessonHeader";
import PleaseSignIn from "../auth/PleaseSignIn";
import User from "../User";
import RegisterCard from "./coursePageCards/RegisterCard";
import StudentCard from "./coursePageCards/StudentCard";
import TeacherCard from "./coursePageCards/TeacherCard";
import ApplicationCard from "./coursePageCards/ApplicationCard";
import ExamAnswer from "./ExamAnswer";
import ExamQuestion from "./ExamQuestion";
import UpdateExamQuestion from "./UpdateExamQuestion";

const PAGE_LESSONS_QUERY = gql`
  query PAGE_LESSONS_QUERY($id: ID!) {
    lessons(where: { coursePageID: $id }, orderBy: number_ASC) {
      id
      name
      number
      type
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
  max-width: 1100px;
  min-width: 900px;
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
  padding-left: 3%;
`;

const Data = styled.div`
  flex: 50%;
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
  flex: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1000px) {
    margin-bottom: 20px;
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
  render() {
    return (
      <PleaseSignIn>
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
                        {({
                          data: data2,
                          error: error2,
                          loading: loading2
                        }) => {
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
                                me &&
                                  me.subjects.map(subject =>
                                    subjectArray.push(subject)
                                  );

                                const applicationsList = [];
                                coursePage.applications.map(application =>
                                  applicationsList.push(application.applicantId)
                                );
                                return (
                                  <>
                                    <Container>
                                      <LessonImage
                                        src={
                                          "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1567424791/singapore-river-255116.jpg"
                                        }
                                        // src={coursePage.careerTrack[0].img}
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
                                            {/* {coursePage.careerTrack && (
                                              <p className="track">
                                                Этот курс является частью
                                                карьерного трека:{" "}
                                                <span className="trackName">
                                                  {
                                                    coursePage.careerTrack[0]
                                                      .name
                                                  }
                                                </span>
                                              </p>
                                            )} */}
                                            <p className="track2">
                                              {coursePage.description}
                                            </p>
                                          </Data>
                                          <PayBox>
                                            {/* Карточка регистрации */}
                                            {me &&
                                              me.id !== coursePage.user.id &&
                                              !applicationsList.includes(
                                                me.id
                                              ) &&
                                              !subjectArray.includes(
                                                coursePage.id
                                              ) &&
                                              !me.permissions.includes(
                                                "ADMIN"
                                              ) && (
                                                <RegisterCard
                                                  me={me}
                                                  coursePage={coursePage}
                                                  price={price}
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
                                              subjectArray.includes(
                                                coursePage.id
                                              ) &&
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
                                        <LessonsInfo>
                                          {me &&
                                            (me.id === coursePage.user.id ||
                                              me.permissions.includes(
                                                "ADMIN"
                                              )) && (
                                              <Buttons>
                                                <Button
                                                  primary={
                                                    this.state.page ===
                                                    "lessons"
                                                  }
                                                  name="lessons"
                                                  onClick={this.switch}
                                                >
                                                  Уроки
                                                </Button>

                                                <Button
                                                  primary={
                                                    this.state.page === "finals"
                                                  }
                                                  name="finals"
                                                  onClick={this.switch}
                                                >
                                                  Финальное задание
                                                </Button>
                                              </Buttons>
                                            )}
                                          {this.state.page === "lessons" && (
                                            <>
                                              <Total>
                                                Всего уроков:{" "}
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
                                                    students={
                                                      coursePage.students
                                                    }
                                                    new_students={student_list}
                                                    open={index + 1 === 1}
                                                    index={index + 1}
                                                  />
                                                )
                                              )}
                                            </>
                                          )}
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
      </PleaseSignIn>
    );
  }
}

export default CoursePage;
export { SINGLE_COURSEPAGE_QUERY };
export { PAGE_LESSONS_QUERY };
