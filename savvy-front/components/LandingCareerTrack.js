import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "@apollo/client/react/components";
import styled from "styled-components";
import CareerTrackList from "./career/CareerTrackList";
import ForMoneyCoursesList from "./course/courseLists/ForMoneyCoursesList";
import FreeCoursesList from "./course/courseLists/FreeCoursesList";

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
  width: 30%;
  @media (max-width: 1500px) {
    width: 50%;
  }
  @media (max-width: 900px) {
    padding: 2%;
    width: 100%;
  }
`;

const Styles = styled.div`
  padding: 2% 4%;
`;

const Group = styled.div``;

class LandingCareerTrack extends Component {
  state = {
    isTourOpen: false,
    times: 0,
  };
  open = () => {
    this.setState({ isTourOpen: true });
  };
  closeTour = () => {
    this.setState({ isTourOpen: false });
  };
  render() {
    return (
      <>
        <Styles className="el">
          <Query
            query={CAREER_TRACK_QUERY}
            variables={{
              id: "cjwx78u7700rb07121pelqctm",
            }}
          >
            {({ data, error, loading }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading...</p>;
              const career = data.careerTrack;
              return (
                <>
                  <Group data-tut="first-step">
                    <Title>
                      Карьерный трек "
                      <span className="name">{career.name}</span>"
                    </Title>
                    <CareerTrackList
                      CareerList={career.coursePages}
                      id={career.id}
                      careerTrackUnits={career.careerTrackUnits}
                    />
                  </Group>
                  <ForMoneyCoursesList />
                  <FreeCoursesList />
                </>
              );
            }}
          </Query>
        </Styles>
      </>
    );
  }
}

export default LandingCareerTrack;
