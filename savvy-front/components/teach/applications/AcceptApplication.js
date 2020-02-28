import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import {
  ADD_USER_TO_COURSEPAGE,
  ENROLL_COURSE_MUTATION
} from "../../EnrollCoursePage";
import { CURRENT_USER_QUERY } from "../../User";

const DELETE_APPLICATION_MUTATION = gql`
  mutation DELETE_APPLICATION_MUTATION($id: ID!) {
    deleteApplication(id: $id) {
      id
    }
  }
`;

const Button = styled.button`
  background: ${props => props.theme.green};
  border-radius: 5px;
  width: 110px;
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

class AcceptApplication extends Component {
  state = {
    subjects: this.props.subjects,
    students: this.props.students
  };
  acceptApplication = () => {
    this.props.getData(true);
  };
  onClick = async (
    e,
    enrollOnCourse,
    addUserToCoursePage,
    deleteApplication
  ) => {
    e.preventDefault();
    const newSubjects = this.state.subjects.concat(this.props.coursePageId);
    const newStudents = this.state.students.concat(this.props.applicantId);
    const res = await this.setState({
      subjects: newSubjects,
      students: newStudents
    });
    enrollOnCourse({
      variables: {
        id: this.props.applicantId,
        coursePageID: this.props.coursePageId,
        ...this.state
      }
    });
    addUserToCoursePage({
      variables: {
        id: this.props.coursePageId,
        ...this.state
      }
    });
    deleteApplication({
      variables: {
        id: this.props.applicationId
      }
    });
    this.props.getData("accept");
  };
  render() {
    return (
      <div>
        <Mutation
          mutation={ENROLL_COURSE_MUTATION}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          //   refetchQueries={[{ query: ALL_COURSE_PAGES_QUERY }]}
        >
          {enrollOnCourse => (
            <Mutation mutation={ADD_USER_TO_COURSEPAGE}>
              {addUserToCoursePage => (
                <Mutation mutation={DELETE_APPLICATION_MUTATION}>
                  {deleteApplication => (
                    <Button
                      onClick={e =>
                        this.onClick(
                          e,
                          enrollOnCourse,
                          addUserToCoursePage,
                          deleteApplication
                        )
                      }
                    >
                      Принять
                    </Button>
                  )}
                </Mutation>
              )}
            </Mutation>
          )}
        </Mutation>
      </div>
    );
  }
}

export default AcceptApplication;
export { DELETE_APPLICATION_MUTATION };
