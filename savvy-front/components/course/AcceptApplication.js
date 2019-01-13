import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { NavButton, SubmitButton } from '../styles/Button';
import { ADD_USER_TO_COURSEPAGE, ENROLL_COURSE_MUTATION } from '../EnrollCoursePage';
import { CURRENT_USER_QUERY } from '../User';
import { ALL_COURSE_PAGES_QUERY } from './Courses';

const DELETE_APPLICATION_MUTATION =gql`
    mutation DELETE_APPLICATION_MUTATION($id: ID!){
        deleteApplication(id: $id) {
            id
        }
    }
`

class AcceptApplication extends Component {
    state = {
        subjects: this.props.subjects,
        students: this.props.students,
    }
    onClick = async (e, enrollOnCourse, addUserToCoursePage, deleteApplication) => {
        e.preventDefault();
        const newSubjects = this.state.subjects.concat(this.props.coursePageId)
        const newStudents = this.state.students.concat(this.props.applicantId)
        const res = await this.setState({
            subjects: newSubjects,
            students: newStudents
        })
        enrollOnCourse({
            variables: {
                id: this.props.applicantId,
                ...this.state
            }
        })
        addUserToCoursePage({
            variables: {
                id: this.props.coursePageId,
                ...this.state
                }
            })
        deleteApplication({
            variables: {
                id: this.props.applicationId
            }
        })
        }
    render() {
        return (
            <div>
                <Mutation 
                    mutation={ENROLL_COURSE_MUTATION}
                    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                    refetchQueries={[{ query: ALL_COURSE_PAGES_QUERY }]}>
                    {(enrollOnCourse) => (
                        <Mutation 
                            mutation={ADD_USER_TO_COURSEPAGE}>
                            {(addUserToCoursePage) => (
                                <Mutation 
                                    mutation={DELETE_APPLICATION_MUTATION}>
                                        {(deleteApplication) => (
                                            <SubmitButton
                                                onClick={e => this.onClick(e, enrollOnCourse, addUserToCoursePage, deleteApplication)}
                                            >
                                            Принять
                                            </SubmitButton>
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