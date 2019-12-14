import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Course from "../Course";
import { CoursePerPage } from "../../../config";
import FetchMore from "../../FetchMore";
import LoadingDummy from "../LoadingDummy";

const FREE_COURSE_PAGES_QUERY = gql`
  query FREE_COURSE_PAGES_QUERY($type: [ CourseType! ], $boolean: Boolean = true, $skip: Int = 0, $first: Int = ${CoursePerPage}) {
      coursePages(where: {courseType_in: $type, published: $boolean }, orderBy: createdAt_DESC, first: $first, skip: $skip ) {
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
            status
            company {
              id
              name
            }
            uni {
              id
              title
          }
        }
      }
  }
`;

const AGGREGATE_FREE_COURSE_PAGES_QUERY = gql`
  query AGGREGATE_FREE_COURSE_PAGES_QUERY(
    $type: [CourseType!]
    $boolean: Boolean = true
  ) {
    coursePagesConnection(
      where: { courseType_in: $type, published: $boolean }
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
  @media (max-width: 800px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const Styles = styled.div``;

class FreeCoursesList extends Component {
  render() {
    let me = this.props.me;
    return (
      <Query
        query={FREE_COURSE_PAGES_QUERY}
        returnPartialData={true}
        fetchPolicy="cache-and-network"
        variables={{
          type: ["PUBLIC"],
          first: CoursePerPage,
          skip: 0
        }}
      >
        {({ data: data1, error, loading, fetchMore }) => {
          if (error) return <p>Error: {error.message}</p>;
          if (loading) return <LoadingDummy />;
          const coursePages = data1.coursePages;
          return (
            <>
              <Styles data-tut="third-step">
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
                  query={AGGREGATE_FREE_COURSE_PAGES_QUERY}
                  fetchPolicy="cache-first"
                  variables={{
                    type: ["PUBLIC"]
                  }}
                >
                  {({ data: data2, error: error2, loading: loading2 }) => {
                    if (loading2) return <p>Загрузка...</p>;
                    if (error2) return <p>Error: {error2.message}</p>;
                    const coursePagesConnection = data2.coursePagesConnection;
                    return (
                      <>
                        {coursePages !== undefined &&
                        coursePagesConnection.aggregate.count >
                          coursePages.length ? (
                          <FetchMore
                            onLoadMore={() =>
                              fetchMore({
                                variables: {
                                  skip: coursePages.length
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
              </Styles>
            </>
          );
        }}
      </Query>
    );
  }
}

export default FreeCoursesList;
export { FREE_COURSE_PAGES_QUERY };
