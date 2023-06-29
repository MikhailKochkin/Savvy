import React from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import parse from 'html-react-parser';

import moment from "moment";

const Box = styled.div`
  border-bottom: 2px solid #edefed;
  border-top: 2px solid #522b47;

  margin: 3%;
`;

const Answer = styled.div`
  margin: 3%;
  border-bottom: 2px solid #edefed;
  ins,
  u {
    text-decoration: none;
    background: #edffe7;
    /* padding: 0.5% 0.3%; */
  }
  del {
    background: #f6b7bc;
  }
`;

const GET_RESULTS = gql`
  query stats($lessonId: String!) {
    stats(lessonId: $lessonId) {
      problemResults {
        id
        answer
        lesson {
          id
        }
        problem {
          id
        }
        student {
          id
          name
          surname
        }
        revealed
        createdAt
      }
      feedbacks {
        id
        text
        teacher {
          id
          name
          surname
        }
        student {
          id
          name
          surname
        }
        lesson {
          id
        }
        createdAt
      }
    }
  }
`;

const Problems = (props) => {
  const { loading, error, data } = useQuery(GET_RESULTS, {
    variables: { lessonId: props.lesson.id },
  });
  if (loading) return <p>Loading...</p>;
  let results = data.stats;

  moment.locale("ru");

  return (
    <div>
      <div>Задачи: </div>
      {props.lesson.problems.map((p) => (
        <>
          <Box>{parse(p.text)}</Box>
          {/* {console.log(
            results.problemResults.filter((pr) => pr.problem.id === p.id)
          )} */}
          <div>
            {results.problemResults
              .filter((pr) => pr.problem.id === p.id)
              .map((r) => (
                <>
                  <Answer>
                    {parse(r.answer)}
                    <div>
                      {r.student.name} {r.student.surname}{" "}
                      {moment(r.createdAt).format("LLL")}
                    </div>
                  </Answer>
                </>
              ))}
          </div>
          <div>
            {results.feedbacks
              // .filter((prob) => prob.problem.id == p.id)
              .map((r) => (
                <>
                  <Answer>
                    {parse(r.text)}
                    <div>
                      {r.student.name} {r.student.surname}{" "}
                      {moment(r.createdAt).format("LLL")}
                    </div>
                  </Answer>
                </>
              ))}
          </div>
        </>
      ))}
    </div>
  );
};

export default Problems;
