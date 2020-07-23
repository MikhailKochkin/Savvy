import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Applications from "./applications/Applications";
import Exercises from "./Exercises";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: ID!) {
    coursePage(where: { id: $id }) {
      id
      title
      courseType
      new_students {
        id
        name
        surname
        email
        resume
        coverLetter
        courseVisits {
          id
          reminders
          visitsNumber
          coursePage {
            id
          }
        }
        studentFeedback {
          id
          text
          lesson {
            id
          }
          createdAt
        }
        lessonResults {
          id
          visitsNumber
          lesson {
            id
          }
          createdAt
          updatedAt
        }
        problemResults {
          id
          answer
          problem {
            id
          }
          lesson {
            id
          }
        }
        testResults {
          id
          answer
          test {
            id
          }
        }
        quizResults {
          id
          student {
            id
          }
          quiz {
            id
          }
          answer
        }
      }
      examQuestion {
        id
        question
        answers {
          id
          answer
          student {
            id
            name
          }
        }
      }
      lessons {
        id
        text
        name
        number
        structure
        coursePage {
          id
        }
        forum {
          id
          rating {
            id
            rating
          }
        }
        newTests {
          id
          question
          answers
          correct
          next
          testResults {
            id
            student {
              id
            }
            answer
            test {
              id
              question
            }
          }
        }
        quizes {
          id
          question
          answer
          next
          quizResults {
            id
            student {
              id
            }
            quiz {
              id
            }
            answer
          }
        }
        documents {
          id
          title
          documentResults {
            id
            user {
              id
            }
            document {
              id
            }
            answers
            drafts
          }
        }
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
              lesson {
                id
              }
            }
          }
        }
        texteditors {
          id
          text
          totalMistakes
          textEditorResults {
            id
            student {
              id
            }
            correct
            guess
            wrong
            attempts
            textEditor {
              id
              text
              totalMistakes
            }
          }
        }
        constructions {
          id
          name
          variants
          answer
          constructionResults {
            id
            student {
              id
            }
            inputs
            attempts
            answer
            construction {
              id
              name
            }
          }
        }
        user {
          id
        }
        lessonResults {
          id
          student {
            id
            email
          }
          visitsNumber
          createdAt
          updatedAt
        }
        problemResults {
          id
          answer
          lesson {
            id
          }
          student {
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
  align-items: center;
`;

const Container = styled.div`
  width: 70%;
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
  loading: () => <p>Загрузка...</p>,
  ssr: false,
});

class Analytics extends Component {
  state = {
    page: "exercises_results",
  };

  onSwitch = (e) => {
    e.preventDefault();
    const name = e.target.getAttribute("name");
    this.setState({ page: name });
  };

  render() {
    return (
      <>
        <div id="root" />
        <Query
          query={SINGLE_COURSEPAGE_QUERY}
          variables={{
            id: this.props.id,
          }}
        >
          {({ data: data2, error: error2, loading: loading2 }) => {
            if (loading2) return <p>Loading...</p>;
            let coursePage = data2.coursePage;
            return (
              <Styles>
                <Container>
                  <div className="menu">
                    <div
                      className="button"
                      name="student_results"
                      onClick={this.onSwitch}
                    >
                      Студенты{" "}
                    </div>
                    <div
                      className="button"
                      name="exercises_results"
                      onClick={this.onSwitch}
                    >
                      Задания{" "}
                    </div>
                    {coursePage.courseType !== "FORMONEY" && (
                      <div
                        className="button"
                        name="applications"
                        onClick={this.onSwitch}
                      >
                        Заявки
                      </div>
                    )}
                  </div>
                  <div className="data">
                    {this.state.page === "student_results" && (
                      <DynamicUserAnalytics
                        coursePage={coursePage}
                        students={coursePage.new_students}
                      />
                    )}
                    {this.state.page === "exercises_results" && (
                      <Exercises
                        coursePage={coursePage}
                        students={coursePage.new_students}
                      />
                    )}
                    {this.state.page === "applications" &&
                      coursePage.courseType !== "FORMONEY" && (
                        <Applications id={coursePage.id} />
                      )}
                  </div>
                </Container>
              </Styles>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Analytics;
export { SINGLE_COURSEPAGE_QUERY };
