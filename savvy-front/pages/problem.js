import React from 'react';
import SingleProblem from "../components/lesson/problems/SingleProblem";
import gql from "graphql-tag";
import styled from "styled-components";
import { Query } from "react-apollo";
import User from "../components/User";

const SINGLE_PROBLEM_QUERY = gql`
  query SINGLE_PROBLEM_QUERY($id: ID!) {
    problem(where: { id: $id }) {
      id
      text
      nodeID
      nodeType
      user {
        id
      }
      problemResults {
        id
        student {
          id
        }
        answer
        problem {
          id
        }
      }
      createdAt
      lesson {
        notes {
            id
            text
            next
            user {
                id
            }
        }
      quizes {
        id
        question
        answer
        check
        ifRight
        ifWrong
        type
        next
        user {
          id
          name
          surname
        }
      }
      newTests {
        answers
        type
        correct
        ifRight
        ifWrong
        question
        next
        id
        user {
          id
          name
          surname
        }
      }
      testResults {
        id
        student {
          id
        }
        testID
        answer
        attempts
      }
      quizResults {
        id
        student {
          id
        }
        answer
        quiz {
          id
        }
      }
  }
  }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  min-height: 50vh;
  max-width: 50vw;
  @media (max-width: 900px) {
    max-width: 95vw;
  }
`;


const Problem = (props) => {
    return (
      <Styles>
                <div id="root"></div>

      <Container>
        <User>
        {({ data: { me } }) => (
          <Query
            query={SINGLE_PROBLEM_QUERY}
            variables={{
              id: props.query.id,
            }}
          >
            {({ data, error, loading }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading...</p>;
              let p = data.problem;
                return (
                <SingleProblem 
                  key={p.id}
                  problem={p}
                  lessonID={p.lesson.id}
                  me={me}
                  userData={p.problemResults}
                  story={true}
                  lesson={p.lesson} 
                />
        );
    }}
  </Query>
)}
</User>
</Container>
</Styles>
    );
};

export default Problem;