import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import moment from 'moment';
import DeleteSingleLesson from '../DeleteSingleLesson';
import User from '../User';

const SINGLE_LESSON_QUERY = gql`
  query SINGLE_LESSON_QUERY($id: ID!) {
    lesson(where: { id: $id }) {
        id
        text
        video
        createdAt
        user {
          id
        }
    }
  }
`;

const ProposalBox = styled.div`
  margin: 2%;
  padding: 2%;
  width: 90%;
  display: flex;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column;
    text-align: left;
  }
`;

const SideBar = styled.div`
  margin-left: 2%;
  @media (max-width: 800px) {
    margin-bottom: 5%;
  }
`;

const TextBar = styled.div`
  width: 800px;
  font-size: 1.8rem;
  border: 1px solid #112A62;
  padding: 0 2%;
  border-radius: 5px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Date = styled.h4`
  color: #A8A8A8;
`;

class SingleLesson extends Component {
    render() {
      return (
        <>
        <User>
          {({data: {me}}) => (
          <Query
            query={SINGLE_LESSON_QUERY}
            variables={{
              id: this.props.lesson.id,
            }}
          >
            {({ data, error, loading }) => {
              // if (error) return <Error error={error} />;
              if (loading) return <p>Loading...</p>;
              // if (!data.lesson) return <p>No Lesson Found for {this.props.id}</p>;
              const lesson = data.lesson;
              moment.locale('ru');
              return (
                <>
                <ProposalBox>
                  <TextBar>
                    <div dangerouslySetInnerHTML={{ __html: lesson.text }}></div>
                    {lesson.video ?
                      <iframe width="620" height="400" src={lesson.video} allowFullScreen>
                      </iframe>
                    :
                    null } 
                  </TextBar>
                  <SideBar>
                    
                    <h2>Место для фотографии</h2>
                    {/* <h4>{me && me.favourites}</h4> */}
                    <Date>{moment(lesson.createdAt).format('D MMM YYYY')}</Date>
                    <br/>
                    { me && me.id === lesson.user.id ?
                    <DeleteSingleLesson 
                      id={this.props.lesson.id}
                      coursePageId={this.props.coursePageId}/>
                      :
                      null
                    }
                  </SideBar>
                </ProposalBox>
                </>
              );
            }}
          </Query>
          )}
          </User>
        </>
      );
    }
  }
  
  export default SingleLesson;
  export { SINGLE_CASE_QUERY };

