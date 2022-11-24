import { useState } from "react";
import styled from "styled-components";
import moment from "moment";

import UserData from "./UserData";

const Styles = styled.div`
  margin: 20px 0;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid grey;
  padding: 10px 0;
  .description {
    width: 40%;
  }
  .data {
    width: 40%;
  }
`;

const KPI = (props) => {
  const { coursePages, users } = props;
  const [showWeekly, setShowWeekly] = useState(false);
  const [showDaily, setShowDaily] = useState(false);
  const [showDailyActive, setShowDailyActive] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const subtractDays = (numOfDays, date = new Date()) => {
    date.setDate(date.getDate() - numOfDays);
    return date;
  };

  let published_courses = coursePages.filter(
    (c) => c.courseType == "FORMONEY" && c.published == true
  );
  let all_courses = coursePages.filter(
    (c) => c.user.id !== "cjqy9i57l000k0821rj0oo8l4" && c.courseType !== "UNI"
  );

  let weekly_users = users.filter(
    (u) => new Date(u.updatedAt).getTime() > subtractDays(7)
  );

  let daily_users = weekly_users.filter(
    (u) => new Date(u.updatedAt).getTime() > subtractDays(1)
  );

  // // console.log("weekly_users", weekly_users);

  // console.log("daily_users", daily_users);

  let ever_active_users = users.filter((u) => u.lessonResults.length > 0);

  let weekly_active_users = ever_active_users.filter(
    (u) =>
      u.lessonResults.filter(
        (lr) => new Date(lr.updatedAt).getTime() > subtractDays(7)
      ).length > 0
  );

  let daily_active_users = weekly_active_users.filter(
    (u) =>
      u.lessonResults.filter(
        (lr) => new Date(lr.updatedAt).getTime() > subtractDays(1)
      ).length > 0
  );

  let last_week_users = users.filter(
    (u) => new Date(u.createdAt).getTime() > subtractDays(7)
  );

  let last_week_active_users = last_week_users.filter(
    (lwu) => lwu.lessonResults.length > 0
  );

  let author_users = users.filter((us) => us.status == "AUTHOR");

  let author_user_first = author_users.filter(
    (au) => au.coursePages.filter((c) => c.lessons.length >= 1).length > 0
  );
  let author_user_full = author_users.filter(
    (au) => au.coursePages.filter((c) => c.lessons.length >= 5).length > 0
  );
  moment.locale("ru");
  return (
    <Styles>
      <Row>
        <div className="description"># Active courses</div>
        <div className="data">{published_courses.length}</div>
      </Row>
      <Row>
        <div className="description"># Total courses</div>
        <div className="data">{all_courses.length + 5}</div>
      </Row>
      <Row>
        <div className="description"># Weekly Users</div>
        <div className="data">{weekly_users.length}</div>
        <button onClick={(e) => setShowWeekly(!showWeekly)}>
          Show Weekly Users
        </button>
      </Row>
      {showWeekly && (
        <div>
          {weekly_users
            .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1))
            .map((d) => (
              <UserData d={d} />
            ))}
        </div>
      )}
      <Row>
        <div className="description"># Daily Users</div>
        <div className="data">{daily_users.length}</div>
        <button onClick={(e) => setShowDaily(!showDaily)}>
          Show Daily Users
        </button>
      </Row>
      {showDaily && (
        <div>
          {daily_users
            .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1))
            .map((d) => (
              <UserData d={d} />
            ))}
        </div>
      )}
      <Row>
        <div className="description"># Weekly Active users</div>
        <div className="data">{weekly_active_users.length}</div>
        <button onClick={(e) => setShowWeekly(!showWeekly)}>
          Show Weekly Active Users
        </button>
      </Row>
      {showWeekly && (
        <div>
          {weekly_active_users
            .sort((a, b) =>
              a.lessonResults.filter(
                (lr) => new Date(lr.updatedAt).getTime() > subtractDays(7)
              )[0].updatedAt >
              b.lessonResults.filter(
                (lr) => new Date(lr.updatedAt).getTime() > subtractDays(7)
              )[0].updatedAt
                ? -1
                : 1
            )
            .map((d) => (
              <li>
                {d.name} {d.surname} {d.country} –
                {moment(
                  d.lessonResults.filter(
                    (lr) => new Date(lr.updatedAt).getTime() > subtractDays(7)
                  )[0].updatedAt
                ).format("DD.MM.YY HH:mm:ss")}
              </li>
            ))}
        </div>
      )}
      <Row>
        <div className="description"># Daily Active users</div>
        <div className="data">{daily_active_users.length}</div>
        <button onClick={(e) => setShowDailyActive(!showDailyActive)}>
          Show Daily Active Users
        </button>
      </Row>
      {showDailyActive && (
        <div>
          {daily_active_users
            .sort((a, b) =>
              a.lessonResults.filter(
                (lr) => new Date(lr.updatedAt).getTime() > subtractDays(1)
              )[0].updatedAt >
              b.lessonResults.filter(
                (lr) => new Date(lr.updatedAt).getTime() > subtractDays(1)
              )[0].updatedAt
                ? -1
                : 1
            )
            .map((d) => (
              <li>
                {d.name} {d.surname} {d.country} –
                {moment(
                  d.lessonResults.filter(
                    (lr) => new Date(lr.updatedAt).getTime() > subtractDays(1)
                  )[0].updatedAt
                ).format("DD.MM.YY HH:mm:ss")}
              </li>
            ))}
        </div>
      )}
      <Row>
        <div className="description">Last week new users</div>
        <div className="data">{last_week_users.length}</div>
        <button onClick={(e) => setShowNew(!showNew)}>Show New Users</button>
      </Row>
      {showNew && (
        <div>
          {last_week_users.map((d) => (
            <li>
              {d.name} {d.surname}
            </li>
          ))}
        </div>
      )}
      <Row>
        <div className="description">% churn rate</div>
        <div className="data">
          {100 -
            (last_week_active_users.length / last_week_users.length).toFixed(
              2
            ) *
              100}
        </div>
      </Row>
      <Row>
        <div className="description"># authors</div>
        <div className="data">{author_users.length}</div>
      </Row>
      <Row>
        <div className="description"># authors with 1st lesson</div>
        <div className="data">{author_user_first.length}</div>
      </Row>
      <Row>
        <div className="description"># authors with a full course</div>
        <div className="data">{author_user_full.length}</div>
      </Row>
    </Styles>
  );
};

export default KPI;
