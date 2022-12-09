import { useState } from "react";
import moment from "moment";
import styled from "styled-components";

moment.locale("ru");

const Styles = styled.div`
  margin-bottom: 20px;
  ul {
    margin: 0;
  }
  .traffic_data {
    margin-left: 15px;
  }
  .box {
    border-bottom: 1px solid grey;
    width: 40%;
    margin-bottom: 10px;
  }
`;

const UserData = (props) => {
  const [show, setShow] = useState(false);
  const { d } = props;
  let all_results = [];
  d.lessonResults.map((lr) => all_results.push(lr.lesson.coursePage.title));
  let visited_courses = [...new Set(all_results)];

  return (
    <Styles>
      <li>
        {d.name} {d.surname} – {d.country} –{" "}
        {moment(d.updatedAt).format("DD.MM.YY HH:mm:ss")}
        <div>They study:</div>
        <div>
          <ul>
            {d.new_subjects.map((s) => (
              <li>{s.title}</li>
            ))}
            {d.new_subjects.length == 0 ? "No courses" : null}
          </ul>
        </div>
        <div>They look into:</div>
        <div>
          <ul>
            {visited_courses.map((s) => (
              <li>{s}</li>
            ))}
            {visited_courses.length == 0 ? "No courses" : null}
          </ul>
        </div>
      </li>
      {show && d.traffic_sources && d.traffic_sources.visitsList && (
        <>
          <div>
            <b>Traffic data</b>
          </div>
          <div className="traffic_data">
            {d.traffic_sources.visitsList.map((v) => (
              <div className="box">
                <div>date: {v.date}</div>
                <div>utm_campaign: {v.utm_campaign}</div>
                <div>utm_medium: {v.utm_medium}</div>
                <div>utm_source: {v.utm_source}</div>
              </div>
            ))}
          </div>
        </>
      )}
      {d.traffic_sources && (
        <button onClick={(e) => setShow(!show)}>
          {show ? "Hide Traffic Data" : "Show Traffic Data"}
        </button>
      )}
    </Styles>
  );
};

export default UserData;
