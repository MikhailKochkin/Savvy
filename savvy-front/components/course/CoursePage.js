import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import LessonHeader from "../lesson/LessonHeader";
import CoursePageNav from "./CoursePageNav";
import PleaseSignIn from "../auth/PleaseSignIn";
import User from "../User";

const PAGE_LESSONS_QUERY = gql`
  query PAGE_LESSONS_QUERY($id: ID!) {
    lessons(where: { coursePageID: $id }, orderBy: number_ASC) {
      id
      name
      number
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
      title
      image
      courseType
      students
      new_students {
        id
      }
      user {
        id
        name
      }
    }
  }
`;

class CoursePage extends Component {
  render() {
    return (
      <PleaseSignIn>
        <User>
          {({ data: { me } }) => (
            <>
              <Query
                query={PAGE_LESSONS_QUERY}
                fetchPolicy="cache-and-network"
                variables={{
                  id: this.props.id
                }}
              >
                {({ data: data1, error: error1, loading: loading1 }) => {
                  if (loading1) return <p>Загрузка...</p>;
                  if (error1) return <p>Error: {error1.message}</p>;
                  // if(data1.lessons == 0) return <p>По этому курсу, к сожалению, уроки пока еще не были созданы.</p>
                  // console.log(data1)
                  return (
                    <>
                      <Query
                        query={AGGREGATE_PAGE_LESSONS_QUERY}
                        fetchPolicy="cache-and-network"
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
                                return (
                                  <>
                                    <CoursePageNav
                                      id={this.props.id}
                                      students={coursePage.new_students}
                                    />
                                    <h4>
                                      Всего уроков:{" "}
                                      {data2.lessonsConnection.aggregate.count}
                                    </h4>
                                    {data1.lessons.map((lesson, index) => (
                                      <LessonHeader
                                        me={me}
                                        key={lesson.id}
                                        name={lesson.name}
                                        lesson={lesson}
                                        coursePageId={this.props.id}
                                        students={coursePage.students}
                                        open={index + 1 === 1}
                                        index={index + 1}
                                      />
                                    ))}
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
