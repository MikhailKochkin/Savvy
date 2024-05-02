import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import PleaseSignIn from "../auth/PleaseSignIn";
import AreYouEnrolled from "../auth/AreYouEnrolled";
import { useUser } from "../User";
import LessonBuilder from "./LessonBuilder";
import Navigation from "./Navigation";
import LoadingText from "../LoadingText";

const SINGLE_LESSON_QUERY = gql`
  query SINGLE_LESSON_QUERY($id: String!) {
    lesson(where: { id: $id }) {
      id
      text
      name
      number
      description
      open
      goal
      type
      totalPoints
      hasSecret
      challenge_num
      createdAt
      structure
      assignment
      change
      user {
        name
        surname
        image
        id
      }
      coursePage {
        id
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
      testPractices {
        id
        tasks
        goal
        tasksNum
        intro
        successText
        failureText
      }
      offers {
        id
        header
        text
        type
        courseId
        price
        program {
          id
          months
          syllabus
        }
        discountPrice
        user {
          id
        }
        lesson {
          id
        }
      }
      teamQuests {
        id
        introduction
        solution
        tasks
      }
      notes {
        id
        name
        type
        link_clicks
        complexity
        isSecret
        text
        next
        user {
          id
        }
      }
      chats {
        id
        name
        isSecret
        link_clicks
        complexity
        messages
        user {
          id
        }
      }
      quizes {
        id
        question
        type
        goal
        goalType
        complexity
        check
        ifRight
        ifWrong
        answer
        answers
        name
        image
        next
        createdAt
        user {
          id
          name
          surname
        }
      }
      documents {
        id
        title
        goal
        complexity
        user {
          id
        }
        clauses {
          id
          user {
            id
          }
          number
          commentary
          keywords
          sample
        }
      }
      miniforums {
        id
        type
        value
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
      newTests {
        id
        answers
        correct
        goal
        goalType
        type
        comments
        complexity
        ifRight
        ifWrong
        next
        name
        instructorName
        image
        question
        createdAt
        user {
          id
        }
      }
      problems {
        id
        text
        name
        goal
        nodeID
        context
        complexity
        steps
        type
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
        goal
        complexity
        elements
        context
        columnsNum
        variants
        hint
        type
        text
        hasText
        user {
          id
        }
      }
      texteditors {
        id
        name
        goal
        context
        complexity
        text
        totalMistakes
        user {
          id
        }
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  /* The side navigation menu */
  .sidenav {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #112a62; /* Blue*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
  }

  /* The navigation menu links */
  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  /* When you mouse over the navigation links, change their color */
  .sidenav a:hover {
    color: #f1f1f1;
  }

  /* Position and style the close button (top right corner) */
  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
  #main {
    transition: margin-left 0.5s;
    padding: 20px;
  }

  /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
    .sidenav a {
      font-size: 18px;
    }
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  cursor: pointer;
  height: 10vh;
  background-image: url("/static/pattern.svg");
  background-size: cover;
  width: 100vw;
  font-size: 2rem;
  padding: 0 20px;
  #to_student_page {
    width: 400px;
    text-align: right;
    font-size: 1.7rem;
  }
  span {
    margin: 0 3%;
    color: #fff;
  }
  #back {
    &:hover {
      color: #e4e4e4;
    }
    cursor: pointer;
  }
  @media (max-width: 800px) {
    font-size: 1.6rem;
    justify-content: space-between;
    align-items: center;
    margin: 0 1%;
  }
`;

const LessonStyles = styled.div`
  display: flex;
  max-width: 1400px;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 90%;
  }
  .slideout-menu {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 256px;
    min-height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    z-index: 0;
    display: none;
  }

  .slideout-menu-left {
    left: 0;
  }

  .slideout-menu-right {
    right: 0;
  }

  .slideout-panel {
    position: relative;
    z-index: 1;
    will-change: transform;
    background-color: #fff; /* A background-color is required */
    min-height: 100vh;
  }

  .slideout-open,
  .slideout-open body,
  .slideout-open .slideout-panel {
    overflow: hidden;
  }

  .slideout-open .slideout-menu {
    display: block;
  }
`;

const LessonPart = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  border-radius: 2px;
  @media (max-width: 800px) {
    order: 2;
    margin: 1%;
  }
`;

const SingleLesson = (props) => {
  const me = useUser();
  const { loading, error, data } = useQuery(SINGLE_LESSON_QUERY, {
    variables: { id: props.id },
  });
  if (loading) return <LoadingText />;
  if (error) return <Error error={error} />;
  if (!data || !data.lesson) return <p>No lesson found</p>;
  const lesson = data.lesson;
  let i_am_author = false;
  if (
    me &&
    (me.coursePages.filter((c) => c.id == lesson.coursePage.id).length > 0 ||
      me.co_coursePages.filter((c) => c.id == lesson.coursePage.id).length > 0)
  ) {
    i_am_author = true;
  }
  if (!me) {
    return "Please sign up or log in to access this page";
  }
  if (!me.permissions.includes("ADMIN") && !i_am_author) {
    return "No access";
  }
  return (
    <Container>
      <Navigation
        i_am_author={true}
        lesson={lesson}
        me={me}
        page="development"
      />
      <LessonStyles>
        <LessonPart>
          <LessonBuilder lesson={lesson} me={me} />
        </LessonPart>
      </LessonStyles>
    </Container>
  );
};

export default SingleLesson;
export { SINGLE_LESSON_QUERY };
