import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Course from './Course';
import { CoursePerPage } from '../../config';
import FetchMore from '../FetchMore';

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
        }
      }
  }
`;

const AGGREGATE_CAREER_TRACK_COURSE_PAGES_QUERY = gql`
  query AGGREGATE_CAREER_TRACK_COURSE_PAGES_QUERY($id: ID!) {
    coursePagesConnection(where: {careerTrack_some: { id: $id}}) {
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
        flex-direction: column;
        align-items: center;
    }
`;


class CareerCoursesList extends Component {
    render() {
        let me = this.props.me
        return (
            <Query
              query={CAREER_TRACK_COURSE_PAGES_QUERY}
              returnPartialData={true} 
              fetchPolicy="cache-first"
              variables={{
                id: me.careerTrackID,
                first: CoursePerPage,
                skip: 0,
                
              }}
            >
              {({ data: data1, error, loading, fetchMore }) => {
                if (error) return <p>Error: {error.message}</p>;
                return (
                  <>
                    {me !== null && me.careerTrackID &&
                    <>
                      <h2> Курсы для вашего карьерного трека: </h2>
                      <CasesStyles>
                        {loading === false &&
                        data1.coursePages.map(coursePage => (
                            <Course
                              key={coursePage.id}
                              id={coursePage.id}
                              coursePage={coursePage}
                              me={me}
                            />
                          ))
                        }
                      </CasesStyles>
                      <Query
                        query={AGGREGATE_CAREER_TRACK_COURSE_PAGES_QUERY} 
                        fetchPolicy="cache-first"
                        variables={{
                            id: me.careerTrackID,
                        }}
                      >
                        {({ data: data2, error: error2, loading: loading2 }) => {
                            if (loading2) return <p>Loading...</p>;
                            if (error2) return <p>Error: {error2.message}</p>;
                            return (
                      <>
                      {data1.coursepages !== undefined &&
                      data2.coursePagesConnection.aggregate.count > data1.coursePages.length ?
                      <FetchMore
                          onLoadMore={() =>
                            fetchMore({
                            variables: {
                              skip: data1.coursePages.length  
                            },
                              updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult) return prev;
                                return Object.assign({}, prev, {
                                    coursePages: [...prev.coursePages, ...fetchMoreResult.coursePages]
                                });
                              }
                            })
                          }
                        /> 
                        : 
                        null
                      }
                      </>
                      ) 
                    }}
                  </Query>
                </>
              }
            </> 
                );
              }}
            </Query>
        );
    }
}

export default CareerCoursesList;