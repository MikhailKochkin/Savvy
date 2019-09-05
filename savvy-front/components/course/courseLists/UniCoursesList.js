import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Course from "../Course";
import { CoursePerPage } from "../../../config";
import FetchMore from "../../FetchMore";

const UNI_COURSE_PAGES_QUERY = gql`
  query UNI_COURSE_PAGES_QUERY($title: String!, $boolean: Boolean = true, $skip: Int = 0, $first: Int = ${CoursePerPage}) {
      coursePages(where: { user: { uni: {title: $title}}, published: $boolean }, orderBy: createdAt_DESC, first: $first, skip: $skip ) {
        id
        title
        description
        image
        tags
        courseType
        students
        price
        discountPrice
        careerTrack {
            id
        }
        pointsA {
            id
        }
        applications {
            id
            applicantId
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

const AGGREGATE_UNI_COURSE_PAGES_QUERY = gql`
  query AGGREGATE_UNI_COURSE_PAGES_QUERY(
    $title: String!
    $boolean: Boolean = true
  ) {
    coursePagesConnection(
      where: { user: { uni: { title: $title } }, published: $boolean }
    ) {
      aggregate {
        count
      }
    }
  }
`;

const CasesStyles = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  @media (max-width: 850px) {
    justify-content: flex-start;
  }
`;

class UniCoursesList extends Component {
  render() {
    const { me, title } = this.props;
    return (
      <Query
        query={UNI_COURSE_PAGES_QUERY}
        returnPartialData={true}
        fetchPolicy="cache-first"
        variables={{
          title: title,
          first: CoursePerPage,
          skip: 0
        }}
      >
        {({ data: data1, error, loading, fetchMore }) => {
          if (error) return <p>Error: {error.message}</p>;
          if (loading) return <p>Загрузка...</p>;
          const coursePages = data1.coursePages;
          return (
            <>
              <>
                <CasesStyles>
                  {coursePages &&
                    coursePages.map(coursePage => (
                      <Course
                        key={coursePage.id}
                        id={coursePage.id}
                        coursePage={coursePage}
                        me={me}
                      />
                    ))}
                </CasesStyles>
                <Query
                  query={AGGREGATE_UNI_COURSE_PAGES_QUERY}
                  fetchPolicy="cache-first"
                  variables={{
                    title: title
                  }}
                >
                  {({ data: data2, error: error2, loading: loading2 }) => {
                    if (loading2) return <p>Loading...</p>;
                    if (error2) return <p>Error: {error2.message}</p>;
                    return (
                      <>
                        {coursePages !== undefined &&
                        data2.coursePagesConnection.aggregate.count >
                          coursePages.length ? (
                          <FetchMore
                            onLoadMore={() =>
                              fetchMore({
                                variables: {
                                  skip: data1.coursePages.length
                                },
                                updateQuery: (prev, { fetchMoreResult }) => {
                                  if (!fetchMoreResult) return prev;
                                  return Object.assign({}, prev, {
                                    coursePages: [
                                      ...prev.coursePages,
                                      ...fetchMoreResult.coursePages
                                    ]
                                  });
                                }
                              })
                            }
                          />
                        ) : null}
                      </>
                    );
                  }}
                </Query>
              </>
            </>
          );
        }}
      </Query>
    );
  }
}

export default UniCoursesList;
