import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import ManageNews from './ManageNews';
import ManageAnalytics from './ManageAnalytics';
import AreYouAdmin from '../auth/AreYouAdmin';

const CAREER_TRACKS_QUERY = gql`
  query CAREER_TRACKS_QUERY {
    careerTracks {
        id
        name
        # analytics {
        #   id
        #   title
        #   synopsis
        #   link
        # }
        # news {
        #   id
        #   title
        #   synopsis
        #   link
        # }
        # coursePages {
        #   id
        #   title
        #   description
        #   numInCareerTrack
        # }
    }
  }
`;

const Header = styled.div`
    background: white;
    border-radius: 4px;
    margin-bottom: 2%;
    padding:2%;
    padding-left:4%;
`;

const Button = styled.button`
    border: none;
    background: none;
    outline: none;
    font-size: ${props => props.primary ? "2.2rem" : "1.6rem"};
    font-weight: ${props => props.primary ? "bold" : "none"};
    cursor: pointer;
    /* &:hover {
      font-size: 2rem;
    } */
`;


class CarreerManage extends Component {
    state = {
        news: true,
        articles: false
      }
      onChange = () => { this.setState(prevState => ({
        news: !prevState.news,
        articles: !prevState.articles,
      }))}
    render() {
        return (
            <AreYouAdmin>
                <Query
                    query={CAREER_TRACKS_QUERY}
                 >
                    {({ data, error, loading }) => {
                        // if (error) return <Error error={error} />;
                        if (loading) return <p>Loading...</p>;
                        const career = data.careerTracks;
                        return (
                            <>
                                <h1>Управление карьерой</h1>
                                <Header>
                                    <h2>Карьрный трек: {career.name}</h2>
                                    Хочу написать <Button onClick={this.onChange} primary={this.state.news}>События</Button>/
                                    <Button onClick={this.onChange} primary={this.state.articles}>Аналитику</Button>.
                                </Header>
                                {this.state.news && <ManageNews data={career} />}
                                {this.state.articles && <ManageAnalytics data={career}/>}
                            </>
                    )}}
                </Query>
            </AreYouAdmin>
        );
    }
}

export default CarreerManage;