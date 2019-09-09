import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Course from "../Course";
import { CoursePerPage } from "../../../config";
import FetchMore from "../../FetchMore";

const FOR_MONEY_COURSE_PAGES_QUERY = gql`
  query FOR_MONEY_COURSE_PAGES_QUERY($type: CourseType!, $boolean: Boolean = true, $skip: Int = 0, $first: Int = ${CoursePerPage}) {
      coursePages(where: {courseType: $type, published: $boolean}, orderBy: createdAt_DESC, first: $first, skip: $skip ) {
        id
        title
        description
        image
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

const AGGREGATE_FOR_MONEY_COURSE_PAGES_QUERY = gql`
  query AGGREGATE_FOR_MONEY_COURSE_PAGES_QUERY($type: CourseType!) {
    coursePagesConnection(where: { courseType: $type }) {
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

const Title = styled.div`
  font-size: 1.8rem;
  margin-bottom: 1%;
  font-weight: 700;
  width: 17%;
  @media (max-width: 850px) {
    margin-left: 10px;
    width: 50%;
  }
`;

const Styles = styled.div``;

class ForMoneyCoursesList extends Component {
  render() {
    let me = this.props.me;
    return (
      <Query
        query={FOR_MONEY_COURSE_PAGES_QUERY}
        returnPartialData={true}
        fetchPolicy="cache-first"
        variables={{
          type: "FORMONEY",
          first: CoursePerPage,
          skip: 0
        }}
      >
        {({ data: data1, loading, error, fetchMore }) => {
          if (loading) return <p>Загрузка...</p>;
          if (error) return <p>Error: {error.message}</p>;
          return (
            <>
              <Styles data-tut="second-step">
                <Title> Платные курсы </Title>
                <CasesStyles>
                  {data1.coursePages &&
                    data1.coursePages.map(coursePage => (
                      <Course
                        key={coursePage.id}
                        id={coursePage.id}
                        coursePage={coursePage}
                        me={me}
                      />
                    ))}
                </CasesStyles>
                <Query
                  query={AGGREGATE_FOR_MONEY_COURSE_PAGES_QUERY}
                  fetchPolicy="cache-first"
                  variables={{
                    type: "FORMONEY"
                  }}
                >
                  {({ data: data2, error: error2, loading: loading2 }) => {
                    if (loading2) return <p>Загрузка...</p>;
                    if (error2) return <p>Error: {error2.message}</p>;
                    return (
                      <>
                        {data1.coursepages !== undefined && (
                          <>
                            {data2.coursePagesConnection.aggregate.count >
                            data1.coursePages.length ? (
                              <FetchMore
                                onLoadMore={() =>
                                  fetchMore({
                                    variables: {
                                      skip: data1.coursePages.length
                                    },
                                    updateQuery: (
                                      prev,
                                      { fetchMoreResult }
                                    ) => {
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
                        )}
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

export default ForMoneyCoursesList;
