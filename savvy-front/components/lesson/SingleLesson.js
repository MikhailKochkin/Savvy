import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import Head from "next/head";

import { useUser } from "../User";
import LessonBuilder from "./LessonBuilder";
import Navigation from "./lesson_management/Navigation";
import LoadingText from "../layout/LoadingText";
import NoAccess from "../layout/NoAccess";

const SINGLE_LESSON_QUERY = gql`
  query SINGLE_LESSON_QUERY($id: String!) {
    lesson(id: $id) {
      id
      text
      name
      number
      description
      context
      open
      goal
      story
      type
      totalPoints
      hasSecret
      challenge_num
      createdAt
      structure {
        lessonItems {
          id
          type
          comment
        }
      }
      characters {
        id
        name
        description
        image
      }
      assignment
      change
      user {
        name
        surname
        email
        image
        id
      }
      coursePage {
        id
        lessons {
          id
          number
          characters {
            id
            name
            description
            image
          }
          story
        }
        characters {
          id
          name
          description
          image
        }
        courseAccessControls {
          id
          user {
            id
            name
            surname
            email
          }
          role
          changeScope
          areAllLessonsAccessible
          accessibleLessons
          createdAt
        }
      }
      comments {
        id
        text
        status
        sourceCommentId
        blockId
        createdAt
        updatedAt
        user {
          id
          name
          surname
          image
        }
        replies {
          id
          text
          status
          sourceCommentId
          blockId
          createdAt
          updatedAt
          user {
            id
            name
            surname
            image
          }
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
      notes {
        id
        name
        type
        instructorId
        link_clicks
        complexity
        isSecret
        text
        next {
          true {
            type
            value
          }
          false {
            type
            value
          }
          branches {
            source
            type
            value
          }
        }
        vertical_image
        horizontal_image
        user {
          id
        }
      }
      chats {
        id
        name
        type
        isSecret
        link_clicks
        complexity

        messages {
          messagesList {
            id
            characterId
            number
            author
            name
            text
            image
            reactions {
              reaction
              comment
              name
              image
            }
          }
        }
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
        isScoringShown
        ifRight
        ifWrong
        answer
        answers {
          answerElements {
            id
            answer
            relatedAnswers
            index
            feedback
          }
        }
        isOrderOfAnswersImportant
        shouldAnswerSizeMatchSample
        name
        image
        instructorId
        next {
          true {
            type
            value
          }
          false {
            type
            value
          }
          branches {
            source
            type
            value
          }
        }
        createdAt
        user {
          id
          name
          surname
        }
      }
      # processManagers {
      #   id
      #   name
      #   remainingResources
      #   backgroundStory
      #   nodes
      #   edges
      #   user {
      #     id
      #   }
      # }
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
        complexTestAnswers {
          complexTestAnswers {
            id
            answer
          }
        }
        correct
        goal
        goalType
        type
        comments
        complexity
        ifRight
        ifWrong
        next {
          true {
            type
            value
          }
          false {
            type
            value
          }
          branches {
            source
            type
            value
          }
        }
        name
        instructorId
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
        steps {
          problemItems {
            id
            type
            next {
              true {
                type
                value
              }
              false {
                type
                value
              }
              branches {
                source
                type
                value
                sourceAnswerId
              }
            }
            position {
              x
              y
            }
          }
        }
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
        elements {
          elements {
            type
            value
            text
            comment
            place
            size
            rows
            inDoc
            isTest
            edit
            borders {
              top
              bottom
              left
              right
            }
          }
        }
        columnsNum
        complexity
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
  min-height: 90vh;
  background: #fafafa;
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
  let is_analytics_page_open = false;
  let may_i_edit = false;

  let role;
  let changeScope;
  let areAllLessonsAccessible = true;
  let accessibleLessons = null;

  if (me && lesson.coursePage?.courseAccessControls?.length > 0) {
    lesson.coursePage?.courseAccessControls?.forEach((c) => {
      if (c.user?.id == me.id) {
        role = c.role;
        changeScope = c.changeScope;
        areAllLessonsAccessible = c.areAllLessonsAccessible;
        accessibleLessons = c.accessibleLessons;
      }
    });
  }

  if (
    (role == "AUTHOR" &&
      (areAllLessonsAccessible || accessibleLessons?.includes(lesson.id))) ||
    me?.permissions.includes("ADMIN") ||
    lesson.coursePage?.user?.id == me?.id
  ) {
    i_am_author = true;
  }

  if (
    ((role == "AUTHOR" || role == "MENTOR") &&
      (areAllLessonsAccessible || accessibleLessons?.includes(lesson.id))) ||
    me?.permissions.includes("ADMIN") ||
    lesson.coursePage?.user?.id == me?.id
  ) {
    is_analytics_page_open = true;
  }

  if (
    (role == "AUTHOR" &&
      (areAllLessonsAccessible || accessibleLessons?.includes(lesson.id)) &&
      changeScope == "EDIT") ||
    me?.permissions.includes("ADMIN") ||
    lesson.coursePage?.user?.id == me?.id
  ) {
    may_i_edit = true;
  }

  if (!me) {
    return "Please sign up or log in to access this page";
  }
  return (
    <Container>
      <Head>
        <title>Development Page</title>
        <meta name="Development Page" content="Simulator Development Page" />
      </Head>
      <Navigation
        i_am_author={i_am_author}
        is_analytics_page_open={is_analytics_page_open}
        lesson={lesson}
        coursePageId={lesson?.coursePage?.id}
        me={me}
        page="development"
        story={false}
      />
      {i_am_author ? (
        <LessonStyles>
          <LessonPart>
            <LessonBuilder
              lesson={lesson}
              me={me}
              i_am_author={i_am_author}
              may_i_edit={may_i_edit}
            />
          </LessonPart>
        </LessonStyles>
      ) : (
        <NoAccess />
      )}
    </Container>
  );
};

export default SingleLesson;
export { SINGLE_LESSON_QUERY };
