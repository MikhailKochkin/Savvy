import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Link from 'next/link';
import moment from 'moment';
import DeleteSingleLesson from '../delete/DeleteSingleLesson';
import User from '../User';

const SINGLE_LESSON_QUERY = gql`
  query SINGLE_LESSON_QUERY($id: ID!) {
    lesson(where: { id: $id }) {
        id
        text
        number
        video
        createdAt
        user {
          id
        }
    }
  }
`;

const TextBar = styled.div`
  display: grid;
  grid-template-columns: 60% 20% 20%;
  width: 100%;;
  font-size: 1.8rem;
  border-top: 1px solid #112A62;
  padding: 0 2%;
  @media (max-width: 800px) {
      grid-template-columns: 50% 25% 25%;
    }
`;

const A = styled.a`
  justify-self: center;
  align-self: center;
`

const Button = styled.button`
    font-size: 1.4rem;
    font-weight: 600;
    padding: 5% ;
    /* margin: 2%; */
    color: #FFFDF7;
    background-color: #84BC9C;
    border: solid 1px white;
    cursor: pointer;
    &:hover{
        background-color: #294D4A;
    }
    
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
              return (
                <>
                    <TextBar>
                      <h4>Урок {this.props.lesson.number}. {this.props.name}</h4>
                      <Link href={{
                          pathname: '/lesson',
                          query: {id: this.props.lesson.id}
                          }}>
                          <A>
                          <Button>Перейти к уроку</Button>
                          </A>
                      </Link>
                      { me && me.id === lesson.user.id ?
                      <DeleteSingleLesson 
                          id={this.props.lesson.id}
                          coursePageId={this.props.coursePageId}
                      />
                      :
                      null
                      }
                    </TextBar>
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

