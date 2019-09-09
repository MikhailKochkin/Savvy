import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Course from "../Course";
import { CoursePerPage } from "../../../config";
import FetchMore from "../../FetchMore";

const CAREER_TRACK_COURSE_PAGES_QUERY = gql`
  query CAREER_TRACK_COURSE_PAGES_QUERY($id: ID!, $boolean: Boolean = true, $skip: Int = 0, $first: Int = ${CoursePerPage}) {
      coursePages(where: {careerTrack_some: { id: $id}, published: $boolean}, orderBy: createdAt_DESC, first: $first, skip: $skip ) {
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

const AGGREGATE_CAREER_TRACK_COURSE_PAGES_QUERY = gql`
  query AGGREGATE_CAREER_TRACK_COURSE_PAGES_QUERY(
    $id: ID!
    $boolean: Boolean = true
  ) {
    coursePagesConnection(
      where: { careerTrack_some: { id: $id }, published: $boolean }
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

const Title = styled.div`
  font-size: 1.8rem;
  margin-bottom: 1%;
  font-weight: bold;
  @media (max-width: 850px) {
    margin-left: 10px;
  }
`;

class CareerCoursesList extends Component {
  render() {
    let me = this.props.me;
    return (
      <Query
        query={CAREER_TRACK_COURSE_PAGES_QUERY}
        returnPartialData={true}
        fetchPolicy="cache-first"
        variables={{
          id: me.careerTrackID,
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
              {me !== null && me.careerTrackID && (
                <>
                  <Title> Курсы для вашего карьерного трека </Title>
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
                    query={AGGREGATE_CAREER_TRACK_COURSE_PAGES_QUERY}
                    fetchPolicy="cache-first"
                    variables={{
                      id: me.careerTrackID
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
                </>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default CareerCoursesList;
