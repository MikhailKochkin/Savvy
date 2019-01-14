import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { NavButton, SubmitButton } from '../styles/Button';
import { CURRENT_USER_QUERY } from '../User';
import { ALL_COURSE_PAGES_QUERY } from './Courses';
import ApplicationBox from './ApplicationBox';


const App = styled.div`
    border: 2px solid black;
    padding: 2%;
    margin: 1%;
    width: 50%;
    display: flex;
    flex-direction: column;
`;

const PAGE_APPLICATIONS_QUERY = gql`
  query PAGE_APPLICATIONS_QUERY($id: ID!) {
    applications(where: {coursePageID: $id}) {
      id
      applicantId
      applicantName
      message
    }
  },
  
`;

class Applications extends Component {
    render() {
        return (
            <div>
                <Query
                    query={PAGE_APPLICATIONS_QUERY} 
                    variables={{
                            id: this.props.id,
                        }}
                    fetchPolicy="cache-first"
                    >
                    {({ data, error, loading, fetchMore}) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error: {error.message}</p>;
                        return (
                        <> 
                        
                            <h1>Список заявок от участников</h1>
                            {data.applications === 0 ?
                            <p>По этому курсу нет заявок!</p>
                            :
                            null
                            } 
                            <div>
                                {data.applications.map(application => (
                                    <App>
                                    <h3>Заявка от участника по имени: {application.applicantName}</h3>
                                    {application.message ?    
                                        <p>Сообщение участника: {application.message}</p>
                                    :
                                        null
                                    }
                                    <ApplicationBox
                                        key = {application.applicantId}
                                        applicantId = {application.applicantId}
                                        coursePageId = {this.props.id}
                                        applicationId = {application.id}
                                    />
                                    </App>
                                )
                                )}
                            </div>
                            {/* <button onClick={this.onFetchMore}>Fetch More</button> */}
                        </>
                        )
                    }}
                </Query>
            </div>
        );
    }
}

export default Applications;