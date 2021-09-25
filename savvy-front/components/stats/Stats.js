import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
// import Applications from "./applications/Applications";
import Exercises from "./Exercises";
import Loading from "../Loading";
import UserAnalytics from "./UserAnalytics";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      courseType
      new_students {
        id
        name
        surname
        email
        studentFeedback {
          id
          lesson {
            id
            coursePage {
              id
            }
          }
        }
        courseVisits {
          id
          reminders
          visitsNumber
          coursePage {
            id
          }
          createdAt
        }
      }
      lessons {
        id
        text
        name
        number
        structure
        # coursePage {
        #   id
        # }
        # forum {
        #   id
        # }
        newTests {
          id
          question
          answers
          correct
          next
        }
        quizes {
          id
          question
          answer
          next
        }
        forum {
          rating {
            id
            rating
            user {
              id
              name
              surname
            }
          }
        }
        # documents {
        #   id
        #   title
        #   documentResults {
        #     id
        #     user {
        #       id
        #     }
        #     document {
        #       id
        #     }
        #     answers
        #     drafts
        #     createdAt
        #   }
        # }
        notes {
          id
          text
          next
        }
        problems {
          id
          text
          nodeID
          nodeType
        }
        texteditors {
          id
          text
          totalMistakes
        }
        constructions {
          id
          name
          variants
          answer
        }
        documents {
          id
          title
        }
        # user {
        #   id
        # }
      }
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  .menu {
    flex: 15%;
    display: flex;
    flex-direction: column;
    margin-top: 3.5%;
    font-size: 1.8rem;
    button {
      margin-bottom: 5px;
      cursor: pointer;
      outline: 0;
      width: 75%;
      background: none;
      border: none;
      font-size: 1.8rem;
    }
    .header {
      margin-bottom: 20px;
    }
    .button {
      cursor: pointer;
      margin-bottom: 4%;
      text-align: right;
      margin-left: 4%;
      margin-right: 20px;
      &:hover {
        border-left: 1px solid #122a62;
      }
    }
  }
  .data {
    flex: 85%;
  }
  @media (max-width: 950px) {
    flex-direction: column;
    width: 95%;
    .menu {
      flex-direction: row;
    }
    .data {
    }
  }
`;

const DynamicUserAnalytics = dynamic(import("./UserAnalytics"), {
  loading: () => <Loading />,
  ssr: false,
});

const Stats = (props) => {
  const [page, setPage] = useState("student_results");

  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.id },
  });
  if (loading) return <Loading />;
  let coursePage = data.coursePage;
  return (
    <>
      <div id="root" />
      <Styles>
        <Container>
          <div className="menu">
            <div
              className="button"
              name="student_results"
              onClick={(e) => setPage("student_results")}
            >
              Студенты{" "}
            </div>
            <div
              className="button"
              name="exercises_results"
              onClick={(e) => setPage("exercises_results")}
            >
              Задания{" "}
            </div>
            <div
              className="button"
              name="applications"
              onClick={(e) => setPage("applications")}
            >
              Заявки
            </div>
          </div>
          <div className="data">
            {page === "student_results" && (
              <UserAnalytics
                coursePageID={coursePage.id}
                lessons={coursePage.lessons}
                students={coursePage.new_students}
              />
            )}
            {page === "exercises_results" && (
              <Exercises
                lessons={coursePage.lessons}
                students={coursePage.new_students}
              />
            )}
            {/* 
                      {page === "applications" &&
                        coursePage.courseType !== "FORMONEY" && (
                          <Applications id={coursePage.id} />
                        )} */}
          </div>
        </Container>
      </Styles>
    </>
  );
};

Stats.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Stats;
export { SINGLE_COURSEPAGE_QUERY };
