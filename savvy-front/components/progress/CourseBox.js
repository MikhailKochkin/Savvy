import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useState } from "react";
import * as _ from "lodash";
import UserAnalytics from "../stats/UserAnalytics";

const Box = styled.div`
  margin: 10px 0;
  border-bottom: 1px solid grey;
`;

const CourseBox = (props) => {
  const [show, setShow] = useState(false);

  moment.locale("ru");
  let two_months_ago = new Date();
  two_months_ago.setMonth(two_months_ago.getMonth() - 2);
  let c = props.c;
  let coursePageID = props.c.id;
  let forums = [];
  let ratings = [];
  let average;
  let last_average;
  let last_ratings = [];
  let last_ratings2 = [];
  if (c && c.lessons) {
    c.lessons.map((l) => forums.push(l.forum ? [...l.forum.rating] : null));
    forums = forums.filter((f) => f !== null).filter((f) => f.length !== 0);
    forums.map((f) => f.map((r) => ratings.push(r.rating)));
    forums.map((f) =>
      f.map((r) => {
        if (r.createdAt > moment(two_months_ago).format()) {
          return last_ratings.push(r), last_ratings2.push(r.rating);
        }
      })
    );

    average = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2);
    last_average = (
      last_ratings2.reduce((a, b) => a + b, 0) / last_ratings2.length
    ).toFixed(2);
  }
  let sorted_ratings = last_ratings.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  let comments = [];
  //   forums.map((f) => f.statements.map((s) => comments.push(s)));
  let students = c.new_students;
  let cloned_elements = _.cloneDeep(students);
  let d = cloned_elements.map((el) =>
    Object.defineProperty(el, "date", {
      value:
        el.courseVisits.filter((c) => c.coursePage.id == coursePageID).length >
        0
          ? new Date(
              el.courseVisits.filter(
                (c) => c.coursePage.id == coursePageID
              )[0].createdAt
            )
          : new Date("2016-01-01T08:16:20.669Z"),
      writable: true,
    })
  );
  let sorted = d.sort((a, b) => b.date - a.date);
  let fresh = sorted.slice(0, 20);

  return (
    <Box>
      <div>
        <b>{c.title}</b>
      </div>
      <div>
        Общий рейтинг – <b>{average}</b>
      </div>
      <div>
        Рейтинг последних 2 месяцев – <b>{last_average}</b>
      </div>
      <div>
        <div>Оценки за последние 2 месяца: </div>
        {sorted_ratings.length > 0 && (
          <button onClick={(e) => setShow(!show)}>Открыть</button>
        )}

        {show &&
          [...sorted_ratings].map((l) => (
            <li>
              <b>{l.rating}</b> – {moment(l.createdAt).format("LLL")} –{" "}
              {l.user.name} {l.user.surname}
            </li>
          ))}
      </div>
      <div>Недавние студенты:</div>
      <div>
        <UserAnalytics
          coursePageID={coursePageID}
          students={fresh}
          lessons={c.lessons}
        />
      </div>
    </Box>
  );
};

export default CourseBox;
