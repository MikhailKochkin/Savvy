import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "./User";
import { SINGLE_COURSEPAGE_QUERY } from "./course/CoursePage";

const CREATE_APPLICATION_MUTATION = gql`
  mutation CREATE_APPLICATION_MUTATION(
    $applicantId: ID!
    $applicantName: String!
    $message: String
    $coursePageID: ID!
  ) {
    createApplication(
      applicantId: $applicantId
      applicantName: $applicantName
      message: $message
      coursePageID: $coursePageID
    ) {
      id
    }
  }
`;

const ENROLL_COURSE_MUTATION = gql`
  mutation ENROLL_COURSE_MUTATION(
    $id: ID!
    $subjects: [ID]
    $coursePageID: ID
  ) {
    enrollOnCourse(id: $id, subjects: $subjects, coursePageID: $coursePageID) {
      id
    }
  }
`;

const ADD_USER_TO_COURSEPAGE = gql`
  mutation ADD_USER_TO_COURSEPAGE($id: ID!, $students: [ID]) {
    addUserToCoursePage(id: $id, students: $students) {
      id
    }
  }
`;

const Button = styled.button`
  background: ${props => props.theme.green};
  border-radius: 5px;
  width: 200px;
  height: 38px;
  outline: 0;
  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  &:active {
    background-color: ${props => props.theme.darkGreen};
  }
`;

const Comment = styled.div`
  padding-top: 15px;
`;

class EnrollCoursePage extends Component {
  state = {
    students: this.props.studentsArray,
    subjects: this.props.subjectArray,
    show: false
  };
  onClick = async (e, enrollOnCourse, addUserToCoursePage) => {
    e.preventDefault();
    if (
      this.props.coursePage.courseType === "PUBLIC" ||
      this.props.coursePage.courseType === "CHALLENGE"
    ) {
      if (!this.state.subjects.includes(this.props.coursePage.id)) {
        const newSubjects = this.state.subjects.concat(
          this.props.coursePage.id
        );
        const newStudents = this.state.students.concat(this.props.meData.id);
        const res = await this.setState({
          subjects: newSubjects,
          students: newStudents
        });
        enrollOnCourse({
          variables: {
            id: this.props.meData.id,
            coursePageID: this.props.coursePage.id,
            ...this.state
          }
        });
        addUserToCoursePage({
          variables: {
            id: this.props.coursePage.id,
            ...this.state
          }
        });
        alert("Вы успешно зарегистрировлаись. Наслаждайтесь курсом!");
      }
    }
  };
  render() {
    const { coursePage, meData } = this.props;
    return (
      <>
        {(coursePage.courseType === "PUBLIC" ||
          coursePage.courseType === "CHALLENGE") && (
          <Mutation
            mutation={ENROLL_COURSE_MUTATION}
            refetchQueries={() => [{ query: CURRENT_USER_QUERY }]}
            refetchQueries={() => [
              {
                query: SINGLE_COURSEPAGE_QUERY,
                variables: { id: coursePage.id }
              }
            ]}
          >
            {enrollOnCourse => (
              <Mutation mutation={ADD_USER_TO_COURSEPAGE}>
                {addUserToCoursePage => (
                  <Button
                    onClick={e =>
                      this.onClick(e, enrollOnCourse, addUserToCoursePage)
                    }
                  >
                    Регистрация
                  </Button>
                )}
              </Mutation>
            )}
          </Mutation>
        )}
        {coursePage.courseType === "PRIVATE" && this.state.show === false && (
          <Mutation
            mutation={CREATE_APPLICATION_MUTATION}
            variables={{
              applicantId: meData.id,
              applicantName: meData.name,
              coursePageID: this.props.coursePage.id,
              ...this.state
            }}
          >
            {(createApplication, { loading, error }) => (
              <Button
                onClick={async e => {
                  e.preventDefault;
                  this.setState({
                    show: true
                  });
                  const res = await createApplication();
                }}
              >
                Регистрация
              </Button>
            )}
          </Mutation>
        )}
        {this.state.show === true && (
          <Comment>
            Ваша заявка на рассмотрении. Скоро преподаватель рассмотрит ее и
            откроет доступ к курсу.
          </Comment>
        )}
      </>
    );
  }
}

export default EnrollCoursePage;
export { ENROLL_COURSE_MUTATION };
export { ADD_USER_TO_COURSEPAGE };
