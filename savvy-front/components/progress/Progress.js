import React from "react";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import CourseBox from "./CourseBox";
import KPI from "./KPI";
import BotProgress from "./BotProgress";

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

const Progress = (props) => {
  const [course, setCourse] = useState("cjtreu3md00fp0897ga13aktp");
  const [open, setOpen] = useState(false);

  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(COURSEPAGES_QUERY);

  if (loading2) return <p>Loading1...</p>;

  // if (loading) return <p>Loading...</p>;
  // let coursePage = data.coursePage;

  const medianFunc = (values) => {
    // if (values.length === 0) throw new Error("No inputs");

    values.sort(function (a, b) {
      return a - b;
    });

    var half = Math.floor(values.length / 2);

    if (values.length % 2) return values[half];

    return (values[half - 1] + values[half]) / 2.0;
  };

  let coursePages = data2.coursePages;
  let rated_courses = [];
  let median_courses = [];
  coursePages
    .filter((c) => c.courseType.toLowerCase() !== "uni")
    .map((coursePage) => {
      let forums = [];
      let ratings = [];
      let average;
      let med_val;
      let number_ratings = 0;
      if (coursePage && coursePage.lessons) {
        coursePage.lessons.map((l) =>
          forums.push(l.forum ? l.forum.rating : null)
        );
        forums = forums.filter((f) => f !== null).filter((f) => f.length !== 0);
        forums.map((f) => f.map((r) => ratings.push(r.rating)));
        med_val = medianFunc(ratings);
        number_ratings = ratings.length;
        average = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(
          2
        );
      }
      let new_c = {
        ...coursePage,
        rating: average,
        median: med_val,
        number: number_ratings,
      };
      rated_courses.push(new_c);
    });

  return (
    <Styles>
      <Container>
        <h3>Bot</h3>
        <BotProgress />

        <h3>KPI</h3>
        <button onClick={(e) => setOpen(!open)}>Open</button>
        {open && <KPI coursePages={coursePages} />}
        <h3>Courses rating</h3>
        <div>
          {console.log("rated_courses", rated_courses)}
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
                  {c.rating == "NaN" ? "0" : c.rating} /
                  {c.median == "NaN" ? "NaN" : c.median} /
                  {c.number == 0 ? 0 : c.number}
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
