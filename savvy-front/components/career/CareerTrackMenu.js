import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import CareerTrackInfo from './CareerTrackInfo';
import CareerTrackList from './CareerTrackList';
import CareerTrackNone from './CareerTrackNone';
import Conf from './Conf';
import Resume from './Resume';

const CAREER_TRACK_QUERY = gql`
  query CAREER_TRACK_QUERY($id: ID!) {
    careerTrack(where: { id: $id }) {
        id
        name
        coursePages {
          id
          title
          description
          numInCareerTrack
        }
    }
  }
`;

const MenuStyle = styled.div`
    position: sticky;
    top: -150px;
    @media (max-width: 700px) {
        position: -webkit-relaitve;
        position: relative;
        top: 0; 
    }
`;


class CareerTrackMenu extends Component {
  render() {
    return (
    <MenuStyle>
      {!this.props.me && <CareerTrackNone />}
      {this.props.me && !this.props.me.careerTrack && <CareerTrackNone me={this.props.me.id} />}
      {this.props.me && this.props.me.careerTrack &&
      <Query
        query={CAREER_TRACK_QUERY}
        variables={{
          id: this.props.me.careerTrack.id
        }}
      >
        {({ data, error, loading }) => {
          // if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          const career = data.careerTrack;
          return (
            <>
              <CareerTrackInfo name={career.name} />
              <CareerTrackList CareerList={career.coursePages} id={career.id} />
            </>
          )
        }}
      </Query>}
      <Conf />
      <Resume />
    </MenuStyle>
  )}
}

export default CareerTrackMenu;