import React from "react";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import CourseBox from "./CourseBox";
import KPI from "./KPI";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  margin: 50px 0;
  width: 70%;
  display: flex;
  flex-direction: column;
  select {
    width: 510px;
  }
  .bottom_button {
    width: 210px;
    margin-top: 20px;
  }
`;

const COURSEPAGES_QUERY = gql`
  query COURSEPAGES_QUERY {
    coursePages {
      id
      title
      published
      lessons {
        forum {
          rating {
            id
            rating
          }
          id
        }
      }
      courseType
      user {
        id
      }
      # new_students {
      #   id
      #   name
      # }
    }
  }
`;

const COURSEPAGE_QUERY = gql`
  query COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      courseType
      new_students {
        id
        name
        surname
        tags
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
        assignment
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
          id
          text
          lesson {
            id
            name
          }
          rating {
            id
            rating
            createdAt
            user {
              id
              name
              surname
            }
          }
          statements {
            id
            text
            createdAt
            answered
            comments
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
          # lesson {
          #   id
          #   user {
          #     id
          #   }
          # }
          # user {
          #   id
          #   name
          #   surname
          # }
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
      }
    }
  }
`;

const Progress = (props) => {
  const [course, setCourse] = useState("cjtreu3md00fp0897ga13aktp");

  // const { loading, error, data } = useQuery(COURSEPAGE_QUERY, {
  //   variables: { id: option },
  // });

  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(COURSEPAGES_QUERY);

  // if (loading) return <p>Loading...</p>;
  if (loading2) return <p>Loading1...</p>;

  // let coursePage = data.coursePage;
  let coursePages = data2.coursePages;

  let rated_courses = [];
  coursePages
    .filter((c) => c.courseType.toLowerCase() !== "uni")
    .map((coursePage) => {
      let forums = [];
      let ratings = [];
      let average;
      if (coursePage && coursePage.lessons) {
        coursePage.lessons.map((l) =>
          forums.push(l.forum ? l.forum.rating : null)
        );
        forums = forums.filter((f) => f !== null).filter((f) => f.length !== 0);
        forums.map((f) => f.map((r) => ratings.push(r.rating)));
        average = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(
          2
        );
      }
      let new_c = { ...coursePage, rating: average };
      rated_courses.push(new_c);
    });

  return (
    <Styles>
      <Container>
        <h3>KPI</h3>
        <KPI coursePages={coursePages} />
        <h3>Courses rating</h3>
        <div>
          <ol>
            {rated_courses
              .sort(
                (a, b) =>
                  parseFloat(b.rating == "NaN" ? 0 : b.rating) -
                  parseFloat(a.rating == "NaN" ? 0 : a.rating)
              )
              .map((c) => (
                <li>
                  {c.title} –{" "}
                  {c.published == true ? <b>Published</b> : "Not published"} – 
                  {c.rating == "NaN" ? "0" : c.rating}
                </li>
              ))}
          </ol>
        </div>
        <h3>Active courses</h3>
        <select onChange={(e) => setCourse(e.target.value)}>
          {coursePages
            .filter(
              (c) => c.courseType.toLowerCase() !== "uni" && c.published == true
            )
            .map((c) => (
              <option value={c.id}>{c.title}</option>
            ))}
        </select>
        <button className="bottom_button">
          <a
            target="_blank"
            href={`https://besavvy.app/ru/stats?id=${course}&name=stats`}
          >
            Open stats
          </a>
        </button>
        <h3>Courses in development</h3>
        <select onChange={(e) => setCourse(e.target.value)}>
          {coursePages
            .filter(
              (c) =>
                c.courseType.toLowerCase() !== "uni" && c.published == false
            )
            .map((c) => (
              <option value={c.id}>{c.title}</option>
            ))}
        </select>
        <button className="bottom_button">
          <a
            target="_blank"
            href={`https://besavvy.app/ru/stats?id=${course}&name=stats`}
          >
            Open stats
          </a>
        </button>
        {/* <CourseBox key={coursePage.id} id={coursePage.id} c={coursePage} /> */}
      </Container>
    </Styles>
  );
};

export default Progress;
