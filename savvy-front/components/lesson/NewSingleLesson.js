import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import PleaseSignIn from "../auth/PleaseSignIn";
import User from "../User";
import NSL from "./NSL";

const NEW_SINGLE_LESSON_QUERY = gql`
  query NEW_SINGLE_LESSON_QUERY($id: ID!) {
    lesson(where: { id: $id }) {
      id
      text
      name
      number
      type
      map
      structure
      change
      open
      createdAt
      user {
        id
      }
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
        ifRight
        ifWrong
        type
        next
        user {
          id
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
        }
      }
      problems {
        id
        text
        nodeID
        nodeType
        user {
          id
        }
        createdAt
      }
      constructions {
        id
        name
        answer
        variants
        hint
        type
        user {
          id
        }
      }
      texteditors {
        id
        name
        text
        totalMistakes
        user {
          id
        }
      }
      documents {
        id
        title
        user {
          id
        }
        clauses {
          id
          number
          user {
            id
          }
          commentary
          keywords
          sample
        }
      }
      shots {
        id
        title
        parts
        comments
        user {
          id
        }
      }
      forum {
        id
        text
        rating {
          id
          rating
          user {
            id
          }
        }
        statements {
          id
          text
          createdAt
          user {
            id
            name
            surname
          }
          forum {
            id
            rating {
              id
              rating
            }
          }
        }
        lesson {
          id
          user {
            id
          }
        }
        user {
          id
          name
          surname
        }
      }
      shotResults {
        id
        student {
          id
        }
        shot {
          id
        }
        answer
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
      textEditorResults {
        id
        student {
          id
        }
        textEditor {
          id
        }
      }
      constructionResults {
        id
        answer
        student {
          id
        }
        construction {
          id
        }
      }
      coursePage {
        id
      }
      exams {
        id
        name
        question
        nodeID
        nodeType
        user {
          id
        }
      }
    }
  }
`;

const NewSingleLesson = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <PleaseSignIn>
      <User>
        {({ data: { me } }) => (
          <Query
            query={NEW_SINGLE_LESSON_QUERY}
            variables={{
              id: props.id,
            }}
            fetchPolicy="no-cache"
            returnPartialData={true}
          >
            {({ data, error, loading }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading...</p>;
              let lesson = data.lesson;
              console.log(lesson);
              // if (lesson === undefined) return <Reload />;
              return (
                <>
                  <NSL me={me} lesson={lesson} />
                </>
              );
            }}
          </Query>
        )}
      </User>
    </PleaseSignIn>
  );
};

export default NewSingleLesson;
export { NEW_SINGLE_LESSON_QUERY };
