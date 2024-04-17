import { useState } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import ReactResizeDetector from "react-resize-detector";
import { useTranslation } from "next-i18next";
import DemoStoryEx from "./DemoStoryEx";
import { TailSpin } from "react-loader-spinner";

const NEW_SINGLE_LESSON_QUERY = gql`
  query NEW_SINGLE_LESSON_QUERY($id: String!) {
    lesson(where: { id: $id }) {
      id
      text
      name
      number
      type
      structure
      change
      open
      totalPoints
      hasSecret
      createdAt
      user {
        id
        name
        surname
        image
      }
      notes {
        id
        link_clicks
        text
        name
        type
        isSecret
        complexity
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
        answer
        answers
        complexity
        ifRight
        ifWrong
        check
        type
        name
        image
        goalType
        next
        user {
          id
        }
      }
      newTests {
        answers
        type
        correct
        comments
        complexity
        ifRight
        ifWrong
        question
        instructorName
        name
        image
        next
        id
        user {
          id
        }
      }
      problems {
        id
        text
        name
        nodeID
        steps
        complexity
        nodeType
        type
        user {
          id
        }
        createdAt
      }
      constructions {
        id
        name
        answer
        elements
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
        complexity
        text
        totalMistakes
        user {
          id
        }
      }
      documents {
        id
        title
        complexity
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
        name
        title
        parts
        comments
        user {
          id
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
        lessons {
          id
          number
          type
          published
          name
          open
        }
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
  background-image: url("/static/law_pattern.svg");
  background-size: contain;
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  cursor: pointer;
  min-height: 10vh;
  background-image: url("/static/pattern.svg");
  background-size: cover;
  color: #dfe1ec;
  width: 100%;
  font-size: 2rem;
  padding: 0 20px;
  #change_page {
    font-size: 1.7rem;
  }
  span {
    color: #fff;
  }
  .block {
    font-size: 1.7rem;
    margin-left: 10px;
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

const Head2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0;
  background: #1a2980; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #26d0ce,
    #1a2980
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #26d0ce, #1a2980);
  color: white;
  width: 100%;
  text-align: center;
  font-size: 1.8rem;
  span {
    color: #3ddc97;
    cursor: pointer;
    &:hover {
      color: #139a43;
    }
  }
  @media (max-width: 800px) {
    font-size: 1.6rem;
    justify-content: space-between;
    padding: 2% 15px;
    div {
      flex: 85%;
      text-align: right;
    }
  }
`;

const Progress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
  margin: 0 0 2% 0;
`;

const LessonPart = styled.div`
  display: flex;
  padding: 0% 2%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  margin: 0 0 20px 0;
  h1 {
    max-width: 650px;
    line-height: 1.4;
    font-weight: 600;
  }
  @media (max-width: 1500px) {
    width: 55%;
  }
  @media (max-width: 1000px) {
    margin: 1%;
    width: 90%;
    h1 {
      width: 95%;
      font-size: 2.6rem;
    }
  }
  .example-enter {
    opacity: 0.01;
  }

  .example-enter.example-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  .example-leave {
    /* opacity: 1; */
  }

  .example-leave.example-leave-active {
    /* opacity: 0.01; */
    /* transition: opacity 3000ms ease-in; */
  }
`;

const NewSingleLesson = (props) => {
  const [width, setWidth] = useState(0);
  const { t } = useTranslation("lesson");

  const onResize = (width) => setWidth(width);
  const me = {
    company: {
      __typename: "Company",
      id: "ck95eoaef03600794opika5y8",
      name: "BeSavvy",
    },
    coursePages: [],
    courseVisits: [],
    email: "mixa101094@yandex.ru",
    id: "ckmddnbfy180981gwpn2ir82c9",
    image: "",
    tags: ["IP/IT", "Гражданское право"],
    lessonResults: [],
    lessons: [],
    level: {
      __typename: "UserLevel",
      id: "ckmddnbr7181041gwpimgpqmin",
      level: 1,
    },
    name: "Demo User",
    new_subjects: [],
    orders: [],
    permissions: ["USER"],
    status: "STUDENT",
    studentFeedback: [],
    surname: "",
    teacherFeedback: [],
    uni: {
      __typename: "Uni",
      id: "cjyimfz2e00lp07174jpder3m",
      title: "Другой",
      capacity: -7,
      paidMonths: 0,
    },
    __typename: "User",
    __proto__: Object,
  };
  const { loading, error, data } = useQuery(NEW_SINGLE_LESSON_QUERY, {
    variables: { id: props.id },
    fetchPolicy: "no-cache",
  });
  if (loading)
    return (
      <Progress>
        <TailSpin
          height="80"
          width="80"
          color="#2E80EC"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </Progress>
    );

  let lesson = data.lesson;
  let next = lesson.coursePage.lessons.find(
    (l) => l.number === lesson.number + 1
  );

  return (
    <>
      <div id="root"></div>

      {lesson && (
        <Container>
          <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
          <LessonPart>
            {/* <h1>Demo lesson</h1> */}
            <DemoStoryEx
              id={props.id}
              tasks={
                props.add == "offer"
                  ? [...lesson.structure.lessonItems, { id: 1, type: "offer" }]
                  : lesson.structure.lessonItems
              }
              me={me}
              size={props.size == "short" ? "short" : "long"}
              lesson={lesson}
              next={next}
              coursePageID={lesson.coursePage.id}
            />
          </LessonPart>
        </Container>
      )}
    </>
  );
};

export default NewSingleLesson;
export { NEW_SINGLE_LESSON_QUERY };
