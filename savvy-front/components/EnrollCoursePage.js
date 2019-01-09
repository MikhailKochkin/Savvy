import React, { Component } from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';
import {CURRENT_USER_QUERY} from './User';
import {ALL_COURSE_PAGES_QUERY} from './course/Courses';


const ENROLL_COURSE_MUTATION = gql`
  mutation ENROLL_COURSE_MUTATION(
    $id: ID!,
    $subjects: [ID]
  ) {
    enrollOnCourse(
      id: $id,
      subjects: $subjects 
    ) {
      id
    }
  }
`;

const ADD_USER_TO_COURSEPAGE = gql`
  mutation ADD_USER_TO_COURSEPAGE(
    $id: ID!,
    $students: [ID]
  ) {
    addUserToCoursePage(
        id: $id,
        students: $students
    ) {
      id
    }
  }
`;

const Button = styled.button`
    background-color: ${props => props.delete ? "red" : "#008CBA"};
    border: none;
    color: white;
    padding: 5px 10px;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    width: 95%;
    margin: 0%;
    font-size:1.4rem;
    cursor: pointer;
`

class EnrollCoursePage extends Component {
    state = {
        students: this.props.studentsArray,
        subjects: this.props.subjectArray
    }
    onClick = async (e, enrollOnCourse, addUserToCoursePage) => {
        e.preventDefault();
        if(this.props.coursePage.courseType === "PUBLIC") {
            if(this.state.subjects.includes(this.props.coursePage.id)) {
                console.log("You are already enrolled!")
                Router.push({
                    pathname: '/coursePage',
                    query: {id: this.props.coursePage.id}
                })
            } else if(!this.state.subjects.includes(this.props.coursePage.id)) {
                const newSubjects = this.state.subjects.concat(this.props.coursePage.id)
                const newStudents = this.state.students.concat(this.props.meData.id)
                console.log("Approach setState")
                const res = await this.setState({
                    subjects: newSubjects,
                    students: newStudents
                })
                console.log("Approach mutation")
                enrollOnCourse({
                    variables: {
                        id: this.props.meData.id,
                        ...this.state
                    }
                })
                addUserToCoursePage({
                    variables: {
                        id: this.props.coursePage.id,
                        ...this.state
                    }
                })
                alert("Вы успешно зарегистрировлаись. Наслаждайтесь курсом!")
                Router.push({
                    pathname: '/coursePage',
                    query: {id: this.props.coursePage.id}
                })
            }
        } else if (this.props.coursePage.courseType === "PRIVATE") {
            console.log("This is a private Course!")
            this.props.getInputReveal(true);
        }
        

    }
    render() {
        return (
            <Mutation 
                mutation={ENROLL_COURSE_MUTATION}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                refetchQueries={[{ query: ALL_COURSE_PAGES_QUERY }]}>
                    {(enrollOnCourse) => (
                        <Mutation 
                            mutation={ADD_USER_TO_COURSEPAGE}>
                                {(addUserToCoursePage) => (
                                            <Button 
                                                onClick={e => this.onClick(e, 
                                                    enrollOnCourse, addUserToCoursePage)}>
                                            {this.state.subjects.includes(this.props.coursePage.id) ? "Войти" : "Зарегистрироваться"}
                                    </Button>
                        )}
                    </Mutation>
                )}
            </Mutation>
        );
    }
}

export default EnrollCoursePage;
export {ENROLL_COURSE_MUTATION};
export {ADD_USER_TO_COURSEPAGE};
