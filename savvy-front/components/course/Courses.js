import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import EnglishCourses from "./courseLists/EnglishCourses";
import ExamCourses from "./courseLists/ExamCourses";
import InterviewCourses from "./courseLists/InterviewCourses";
import JuniorCourses from "./courseLists/JuniorCourses";
import Landing from "./Landing";
import Ad from "../Ad";
import Reviews from "./Reviews";
import User from "../User";
import Loading from "../Loading";

const COURSE_PAGES_QUERY = gql`
  query COURSE_PAGES_QUERY {
    coursePages(orderBy: createdAt_DESC) {
      id
      title
      description
      image
      tags
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

const Container = styled.div`
  padding: 2% 4%;
  border: none;
`;

class Courses extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Query query={COURSE_PAGES_QUERY} fetchPolicy="cache-first">
            {({ data, error, loading, fetchMore }) => {
              if (error) return <p>Error: {error.message}</p>;
              if (loading) return <Loading />;
              const coursePages = data.coursePages;
              let eng = coursePages.filter(c => c.tags.includes("Английский"));
              let exam = coursePages.filter(c => c.tags.includes("Экзамен"));
              let interview = coursePages.filter(c =>
                c.tags.includes("Собеседование")
              );
              let junior = coursePages.filter(c => c.tags.includes("Джуниор"));
              return (
                <>
                  <Landing />
                  <Container>
                    <EnglishCourses courses={eng} me={me} />
                    <ExamCourses courses={exam} me={me} />
                    <InterviewCourses courses={interview} me={me} />
                    <JuniorCourses courses={junior} me={me} />
                    <Reviews />
                  </Container>
                  {/* <Ad /> */}
                </>
              );
            }}
          </Query>
        )}
      </User>
    );
  }
}

export default Courses;
