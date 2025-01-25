import { useQuery, gql } from "@apollo/client";
import { useUser } from "../../User";
import Plan from "./Plan";

const NEW_SINGLE_LESSON_QUERY = gql`
  query NEW_SINGLE_LESSON_QUERY($id: String!) {
    shortLesson(id: $id) {
      id
      text
      name
      number
      type
      context
      open
      createdAt
      coursePageId
      user {
        id
        name
        surname
        image
      }
      structure {
        lessonItems {
          id
          type
          comment
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
          comments
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
      coursePage {
        id
        title
        authors {
          id
        }
        user {
          id
        }

        lessons {
          id
          number
          published
          name
          open
          story
        }
      }
    }
  }
`;

const LessonPlan = (props) => {
  // const { loading, error, data } = useQuery(NEW_SINGLE_LESSON_QUERY, {
  //   variables: { id: props.id },
  //   fetchPolicy: "no-cache",
  // });
  // let me = useUser();

  // if (loading) return <p>Loading...</p>;
  // let lesson = data.shortLesson;
  // console.log("lesson", lesson, me);
  return (
    <Plan
    // lesson={lesson} me={me}
    />
  );
};

export default LessonPlan;
