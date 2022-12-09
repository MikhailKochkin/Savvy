import { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { gql, useQuery } from "@apollo/client";

import UserData from "./UserData";

const USERS_QUERY = gql`
  query USERS_QUERY {
    users(where: { updatedAt: { gte: "2022-11-20T15:10:10.734Z" } }) {
      id
      name
      surname
      createdAt
      updatedAt
      country
      status
      traffic_sources
      orders {
        id
        isPaid
        createdAt
        updatedAt
      }
      new_subjects {
        id
        title
      }
      coursePages {
        id
        lessons {
          id
        }
      }
      lessonResults {
        id
        updatedAt
        lesson {
          id
          open
          coursePageID
        }
      }
    }
  }
`;

const Styles = styled.div`
  margin: 20px 0;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid grey;
  padding: 10px 0;
  .description {
    width: 50%;
  }
  .data {
    width: 40%;
  }
  button {
    height: 50px;
    width: 100px;
    margin: 0;
  }
`;

const KPI = (props) => {
  const { coursePages } = props;
  const [showWeekly, setShowWeekly] = useState(false);
  const [showDaily, setShowDaily] = useState(false);
  const [showDailyActive, setShowDailyActive] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showFresh, setShowFresh] = useState(false);
  const [showInterested, setShowInterested] = useState(false);
  const subtractDays = (numOfDays, date = new Date()) => {
    date.setDate(date.getDate() - numOfDays);
    return date;
  };

  // let six_months_ago = subtractDays(180).toISOString();

  const {
    loading: loading3,
    error: error3,
    data: data3,
  } = useQuery(USERS_QUERY);

  if (loading3) return <p>Loading2...</p>;
  let users = data3.users;

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

  let ever_active_users = users.filter((u) => u.lessonResults.length > 0);

  let weekly_active_users = ever_active_users.filter(
    (u) =>
      u.lessonResults.filter(
        (lr) => new Date(lr.updatedAt).getTime() > subtractDays(7)
      ).length > 0
  );

  let interested_users = ever_active_users.filter(
    (u) =>
      u.lessonResults.filter(
        (lr) =>
          new Date(lr.updatedAt).getTime() > subtractDays(14) &&
          lr.lesson.open &&
          u.new_subjects.filter((subj) => subj.id == lr.lesson.coursePageID)
            .length == 0
      ).length > 0
  );

  let fresh_students = users.filter(
    (u) =>
      u.orders.filter(
        (or) =>
          new Date(or.createdAt).getTime() > subtractDays(180) &&
          or.isPaid == true
      ).length > 0
  );

  let daily_active_users = weekly_active_users.filter(
    (u) =>
      u.lessonResults.filter(
        (lr) => new Date(moment(lr.updatedAt)).getTime() > subtractDays(1)
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
        <div className="description">
          Last week new users (<b>Engage</b>)
        </div>
        <div className="data">{last_week_users.length}</div>
        <button onClick={(e) => setShowNew(!showNew)}>Show New Users</button>
      </Row>
      {showNew && (
        <div>
          <ol>
            {last_week_users
              .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1))
              .map((d) => (
                <UserData d={d} coursePages={coursePages} />
              ))}
          </ol>
        </div>
      )}
      <Row>
        <div className="description">
          # Weekly Users: signed in in the last 7 days (<b>Engage</b>)
        </div>
        <div className="data">{weekly_users.length}</div>
        <button onClick={(e) => setShowWeekly(!showWeekly)}>
          Show Weekly Users
        </button>
      </Row>
      {showWeekly && (
        <div>
          <ol>
            {weekly_users
              .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1))
              .map((d) => (
                <UserData d={d} coursePages={coursePages} />
              ))}
          </ol>
        </div>
      )}
      <Row>
        <div className="description">
          # Daily Users: signed in in the last 24 hours (<b>Engage</b>)
        </div>
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
              <UserData d={d} coursePages={coursePages} />
            ))}
        </div>
      )}
      <Row>
        <div className="description">
          # Fresh Students: bought a course in the last 2 months (<b>Delight</b>
          )
        </div>
        <div className="data">{fresh_students.length}</div>
        <button onClick={(e) => setShowFresh(!showFresh)}>
          Show Fresh Students
        </button>
      </Row>
      {showFresh && (
        <div>
          <ol>
            {" "}
            {fresh_students
              .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1))
              .map((d) => (
                <UserData d={d} coursePages={coursePages} />
              ))}
          </ol>
        </div>
      )}
      <Row>
        <div className="description">
          # Interested Students: went through the demo but did not enroll in the
          last 14 days (<b>Delight</b>)
        </div>
        <div className="data">{interested_users.length}</div>
        <button onClick={(e) => setShowInterested(!showInterested)}>
          Show interested Students
        </button>
      </Row>
      {showInterested && (
        <div>
          <ol>
            {" "}
            {interested_users
              .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1))
              .map((d) => (
                <UserData d={d} coursePages={coursePages} />
              ))}
          </ol>
        </div>
      )}

      <Row>
        <div className="description">
          # Weekly Active users: studied in the last 7 days (<b>Recruit</b>){" "}
        </div>
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
        <div className="description">
          # Daily Active users: studied in the last 24 hours (<b>Recruit</b>){" "}
        </div>
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
              <UserData d={d} coursePages={coursePages} />
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
