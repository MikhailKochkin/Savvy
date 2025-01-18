import React from "react";
import { useState } from "react";
import dayjs from "dayjs";

const StudentData = (props) => {
  const [open, setOpen] = useState(false);

  const { s, results, courseVisits } = props;

  return (
    <div>
      <button onClick={(e) => setOpen(!open)}>Открыть</button>
      {open && (
        <>
          <h4>Курсы</h4>
          <div>
            {s.new_subjects.map((c) => {
              let cv = courseVisits.find(
                (courseVisit) => courseVisit.coursePage.id == c.id
              );
              return <li>{c.title}</li>;
            })}
          </div>

          <h4>Результаты уроков</h4>
          <div>
            {[...results]
              .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
              .map((r) => {
                let ratings = s.ratings.filter(
                  (rating) => rating.forum.lesson.id == r.lesson.id
                );
                let new_ratings = [];
                ratings.map((r) => new_ratings.push(r.rating));
                return (
                  <div>
                    {r.lesson.name} – {r.progress} /{" "}
                    {r.lesson.structure?.lessonItems.length} –{" "}
                    <b>
                      {new_ratings.length > 0
                        ? new_ratings.join(", ")
                        : "Нет оценки"}
                    </b>{" "}
                    –{dayjs(r.updatedAt).format("LLL")}
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentData;
