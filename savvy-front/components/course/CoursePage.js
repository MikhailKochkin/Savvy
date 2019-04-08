import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import LessonHeader from './LessonHeader';
import CoursePageNav from './CoursePageNav';
import { MaterialPerPage } from '../../config';
import PleaseSignIn from '../PleaseSignIn';
import AreYouEnrolled from '../AreYouEnrolled';

const PAGE_LESSONS_QUERY = gql`
  query PAGE_LESSONS_QUERY($id: ID!, $skip: Int = 0) {
    lessons(where: {coursePageID: $id}, skip: $skip, orderBy: number_ASC) {
      id
      name
      number
      text
      user {
          id
      }
    }
  }
`;

const AGGREGATE_PAGE_LESSONS_QUERY = gql`
  query AGGREGATE_PAGE_LESSONS_QUERY($id: ID!) {
    lessonsConnection(where: {coursePageID: $id}) {
        aggregate {
            count
        }
    }
  }
`;

class CoursePage extends Component {
    render() {
        return (
            <PleaseSignIn>
                <AreYouEnrolled 
                  subject={this.props.id}
                >
                  <CoursePageNav id={this.props.id}/>
                    <Query
                        query={PAGE_LESSONS_QUERY} 
                        fetchPolicy="cache-first"
                        variables={{
                                id: this.props.id,
                        }}

                        >
                        {({ data: data1, error: error1, loading: loading1, fetchMore}) => {
                            if (loading1) return <p>Загрузка...</p>
                            if (error1) return <p>Error: {error1.message}</p>;
                            if(data1.lessons == 0) return <p>По этому курсу, к сожалению,уроки пока еще не были созданы.</p>
                            return (
                                <>
                                <Query
                                    query={AGGREGATE_PAGE_LESSONS_QUERY} 
                                    fetchPolicy="cache-first"
                                    variables={{
                                        id: this.props.id,
                                    }}
                                >
                                {({ data: data2, error: error2, loading: loading2 }) => {
                                    if (loading2) return <p>Loading...</p>;
                                    if (error2) return <p>Error: {error2.message}</p>;
                                    return (
                                        <div>
                                            <h4>Всего уроков: {data2.lessonsConnection.aggregate.count}</h4>
                                            {data1.lessons.map(lesson => <LessonHeader key={lesson.id} 
                                            name={lesson.name} lesson={lesson} coursePageId={this.props.id}/>)}
                                    </div>
                                )
                                }}
                            </Query> 
                            </>
                        )
                        }}
                    </Query>
                </AreYouEnrolled>
            </PleaseSignIn>
    )}
}

export default CoursePage;
export { PAGE_LESSONS_QUERY };
export { PAGE_TESTS_QUERY };
export { PAGE_PROBLEMS_QUERY };