import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import AcceptApplication from './AcceptApplication';
import RejectApplication from './RejectApplication';

const USER_QUERY = gql`
    query USER_QUERY($id: ID!) {
        users(where: {id: $id}) {
            subjects
        }
    },
`;

const COURSEPAGE_QUERY = gql`
    query COURSEPAGE_QUERY($id: ID!) {
        coursePages(where: {id: $id}) {
            students
        }
    }
`;

class ApplicationBox extends Component {
    render() {
        return (
            <div>
                <Query
                    query={USER_QUERY} 
                    variables={{
                            id: this.props.applicantId,
                        }}
                    fetchPolicy="cache-first"
                    >
                    {({ data: userData, loading: userLoading, }) => {
                        if (userLoading) return <p>Loading...</p>;
                        // if (error1) return <p>Error: {error1.message}</p>;
                        
                        const subjects = userData.users[0].subjects
                        return (
                        
                          <Query
                            query={COURSEPAGE_QUERY} 
                            variables={{
                                    id: this.props.coursePageId,
                                }}
                            fetchPolicy="cache-first"
                          >
                            {({ data: courseData, loading: courseLoading, }) => {
                                if (courseLoading) return <p>Loading...</p>;
                                // if (error1) return <p>Error: {error1.message}</p>;
                                const arr2 = []
                                console.log(courseData.coursePages[0].students)
                                courseData.coursePages.map(course => arr2.push(course.students))
                                const students = courseData.coursePages[0].students
                                return (
                                    <>
                                    <AcceptApplication
                                        subjects={subjects}
                                        students={students}
                                        applicantId = {this.props.applicantId}
                                        coursePageId = {this.props.coursePageId}
                                        applicationId = {this.props.applicationId}
                                    />
                                    <RejectApplication
                                        applicationId = {this.props.applicationId}
                                    />
                                    </>
                                )}}
                          </Query>
                    )}}
                </Query>
            </div>
        );
    }
}

export default ApplicationBox;