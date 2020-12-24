import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "@apollo/client/react/components";
import styled from "styled-components";
import CareerTrackList from "./CareerTrackList";

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

const MenuStyle = styled.div``;

const Title = styled.div`
  font-size: 1.8rem;
  margin-bottom: 1%;
  font-weight: 700;
  @media (max-width: 900px) {
    padding: 2% 4%;
  }
`;

class CareerTrackMenu extends Component {
  render() {
    return (
      <MenuStyle>
        {this.props.me && this.props.me.careerTrackID && (
          <Query
            query={CAREER_TRACK_QUERY}
            variables={{
              id: this.props.me.careerTrackID,
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
                </>
              );
            }}
          </Query>
        )}
      </MenuStyle>
    );
  }
}

export default CareerTrackMenu;
