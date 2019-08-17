import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";
import UserAnalytics from "./UserAnalytics";
import GeneralAnalytics from "./GeneralAnalytics";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: ID!) {
    coursePage(where: { id: $id }) {
      title
      new_students {
        id
        name
      }
      lessons {
        id
        text
        name
        newTests {
          id
        }
        quizes {
          id
        }
        problems {
          id
          text
        }
        texteditors {
          id
          text
          totalMistakes
        }
        constructions {
          id
          name
        }
        user {
          id
        }
        lessonResults {
          id
          student {
            id
          }
          visitsNumber
          createdAt
          updatedAt
        }
        testResults {
          id
          student {
            id
          }
          answer
        }
        quizResults {
          id
          student {
            id
          }
          answer
        }
        problemResults {
          id
          student {
            id
          }
          answer
          revealed
          problem {
            id
            text
          }
        }
        textEditorResults {
          id
          student {
            id
          }
          revealed
          attempts
          textEditor {
            id
            text
            totalMistakes
          }
        }
        constructionResults {
          id
          student {
            id
          }
          attempts
          answer
          construction {
            id
            name
          }
        }
      }
    }
  }
`;

const Styles = styled.div`
  /* background: white;
  padding: 3%; */
`;

class Analytics extends Component {
  render() {
    return (
      <Query
        query={SINGLE_COURSEPAGE_QUERY}
        fetchPolicy="no-cache"
        variables={{
          id: this.props.id
        }}
      >
        {({ data: data2, error: error2, loading: loading2 }) => {
          if (loading2) return <p>Loading...</p>;
          let coursePage = data2.coursePage;
          return (
            <Styles>
              <h2>Аналитика</h2>
              <>
                <GeneralAnalytics students={coursePage.new_students} />
                <UserAnalytics
                  coursePage={coursePage}
                  students={coursePage.new_students}
                />
              </>
            </Styles>
          );
        }}
      </Query>
    );
  }
}

export default Analytics;
