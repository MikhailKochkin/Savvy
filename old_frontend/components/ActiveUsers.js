import React, { useState } from "react";
import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag";
import moment from "moment";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const COURSE_VISITS_QUERY = gql`
  query COURSE_VISITS_QUERY($day: DateTime, $nextday: DateTime) {
    courseVisits(where: { updatedAt_gte: $day, updatedAt_lte: $nextday }) {
      id
      student {
        id
      }
    }
  }
`;

const LESSON_RESULTS_QUERY = gql`
  query LESSON_RESULTS_QUERY($day: DateTime, $nextday: DateTime) {
    lessonResults(where: { updatedAt_gte: $day, updatedAt_lte: $nextday }) {
      id
      student {
        id
      }
    }
  }
`;

const TEST_RESULTS_QUERY = gql`
  query TEST_RESULTS_QUERY($day: DateTime, $nextday: DateTime) {
    testResults(where: { updatedAt_gte: $day, updatedAt_lte: $nextday }) {
      id
      student {
        id
      }
    }
  }
`;

const QUIZ_RESULTS_QUERY = gql`
  query QUIZ_RESULTS_QUERY($day: DateTime, $nextday: DateTime) {
    quizResults(where: { updatedAt_gte: $day, updatedAt_lte: $nextday }) {
      id
      student {
        id
      }
    }
  }
`;

const ActiveUsers = () => {
  const initialDate = new Date();
  // const [date, setDate] = useState(moment(initialDate).format("L"));
  const [date, setDate] = useState(initialDate);

  moment.locale("ru");
  const handleChange = (date) => {
    setDate(date);
  };
  let current = moment(date)
    .toISOString()
    .substring(0, moment(date).toISOString().indexOf("T"));
  let next = moment(date)
    .add(1, "d")
    .toISOString()
    .substring(0, moment(date).toISOString().indexOf("T"));
  return (
    <>
      <Query
        query={COURSE_VISITS_QUERY}
        variables={{
          day: current,
          nextday: next,
        }}
      >
        {({ data: data1, error: error1, loading: loading1 }) => {
          if (loading1) return <p>loading1...</p>;
          if (error1) return <p>Error: {error1.message}</p>;
          let a = [];
          data1.courseVisits.map((el) => a.push(el.student.id));
          let course_visists = [...new Set(a)];
          return (
            <Query
              query={LESSON_RESULTS_QUERY}
              variables={{
                day: current,
                nextday: next,
              }}
            >
              {({ data: data2, error: error2, loading: loading2 }) => {
                if (loading2) return <p>loading1...</p>;
                if (error2) return <p>Error: {error2.message}</p>;
                let b = [];
                data2.lessonResults.map((el) => b.push(el.student.id));
                let lesson_results = [...new Set(b)];
                return (
                  <Query
                    query={TEST_RESULTS_QUERY}
                    variables={{
                      day: current,
                      nextday: next,
                    }}
                  >
                    {({ data: data3, error: error3, loading: loading3 }) => {
                      if (loading3) return <p>loading3...</p>;
                      if (error3) return <p>Error: {error3.message}</p>;
                      let c = [];
                      data3.testResults.map((el) => c.push(el.student.id));
                      let test_results = [...new Set(c)];
                      return (
                        <Query
                          query={QUIZ_RESULTS_QUERY}
                          variables={{
                            day: current,
                            nextday: next,
                          }}
                        >
                          {({
                            data: data4,
                            error: error4,
                            loading: loading4,
                          }) => {
                            if (loading4) return <p>loading4...</p>;
                            if (error4) return <p>Error: {error4.message}</p>;
                            let d = [];
                            data4.quizResults.map((el) =>
                              d.push(el.student.id)
                            );
                            let quiz_results = [...new Set(d)];
                            let final = [
                              ...new Set(
                                course_visists.concat(
                                  lesson_results,
                                  test_results,
                                  quiz_results
                                )
                              ),
                            ];
                            return (
                              <>
                                <p>Активные пользователи: {final.length} </p>
                                {/* <DatePicker
                                  selected={date}
                                  onChange={handleChange}
                                /> */}
                              </>
                            );
                          }}
                        </Query>
                      );
                    }}
                  </Query>
                );
              }}
            </Query>
          );
        }}
      </Query>
    </>
  );
};

export default ActiveUsers;
