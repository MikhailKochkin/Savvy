import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Course from "../Course";
import { CoursePerPage } from "../../../config";
import FetchMore from "../../FetchMore";

const FOR_MONEY_COURSE_PAGES_QUERY = gql`
  query FOR_MONEY_COURSE_PAGES_QUERY($type: CourseType!, $status: Status!, $boolean: Boolean = true, $skip: Int = 0, $first: Int = ${CoursePerPage}) {
      coursePages(where: {courseType: $type, published: $boolean, user: {status: $status}}, orderBy: createdAt_DESC, first: $first, skip: $skip ) {
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

const Styles = styled.div`
  margin-top: 1.5%;
`;

class Vacancies extends Component {
  render() {
    let me = this.props.me;
    return (
      <Query
        query={FOR_MONEY_COURSE_PAGES_QUERY}
        returnPartialData={true}
        fetchPolicy="cache-first"
        variables={{
          type: "CHALLENGE",
          status: "HR",
          first: CoursePerPage,
          skip: 0
        }}
      >
        {({ data: data1, loading, error, fetchMore }) => {
          if (loading) return <p>Загрузка...</p>;
          if (error) return <p>Error: {error.message}</p>;
          return (
            <>
              {data1.coursePages && data1.coursePages.length > 0 && (
                <Styles data-tut="second-step">
                  <Title> Вакансии </Title>
                  <CasesStyles>
                    {data1.coursePages.map(coursePage => (
                      <Course
                        key={coursePage.id}
                        id={coursePage.id}
                        coursePage={coursePage}
                        me={me}
                      />
                    ))}
                  </CasesStyles>
                </Styles>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default Vacancies;
