import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";
import CareerTrackList from "./career/CareerTrackList";
import ForMoneyCoursesList from "./course/courseLists/ForMoneyCoursesList";
import FreeCoursesList from "./course/courseLists/FreeCoursesList";
import Articles from "./article/Articles";

const CAREER_TRACK_QUERY = gql`
  query CAREER_TRACK_QUERY($id: ID!) {
    careerTrack(where: { id: $id }) {
      id
      name
      careerTrackUnits {
        id
        title
        topics
        img
        articles
        coursePages {
          id
          title
          user {
            id
            name
          }
        }
      }
      coursePages {
        id
        title
        description
        numInCareerTrack
      }
    }
  }
`;

const Title = styled.div`
  font-size: 1.8rem;
  margin-bottom: 1%;
  font-weight: 700;
  @media (max-width: 900px) {
    padding: 2%;
  }
`;

const Styles = styled.div``;

class LandingCareerTrack extends Component {
  render() {
    return (
      <Styles>
        <Query
          query={CAREER_TRACK_QUERY}
          variables={{
            id: "cjwx78u7700rb07121pelqctm"
          }}
        >
          {({ data, error, loading }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading...</p>;
            const career = data.careerTrack;
            return (
              <>
                <Title>
                  Карьерный трек "<span className="name">{career.name}</span>"
                </Title>
                <CareerTrackList
                  CareerList={career.coursePages}
                  id={career.id}
                  careerTrackUnits={career.careerTrackUnits}
                />
                <ForMoneyCoursesList />
                <FreeCoursesList />
                <Articles />
              </>
            );
          }}
        </Query>
      </Styles>
    );
  }
}

export default LandingCareerTrack;
