import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";
import dynamic from "next/dynamic";
import StudentInfo from "./StudentInfo";
import parse from "html-react-parser";

const COURSE_QUERY = gql`
  query COURSE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      lessons {
        id
        open
        name
        type
        lessonResults {
          id
          progress
          visitsNumber
          createdAt
          updatedAt
          student {
            id
            name
            surname
            email
            number
            messages {
              id
              text
              createdAt
            }
            new_subjects {
              id
              title
            }
          }
          lesson {
            id
            number
            structure
            coursePage {
              id
            }
          }
        }
        challengeResults {
          id
          student {
            id
            name
            surname
            email
            number
            messages {
              id
              text
              createdAt
            }
            new_subjects {
              id
              title
            }
          }
          createdAt
          updatedAt
          correct
          wrong
          time
        }
      }
    }
  }
`;

const Course = styled.div`
  .course_name {
    font-size: 2.1rem;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .lesson_name {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 20px 0;
  }
`;
const CourseInfo = (props) => {
  const [courseId, setCourseId] = useState("");
  const { loading, error, data } = useQuery(COURSE_QUERY, {
    variables: { id: props.courseId },
  });
  if (loading) return <p>Loading...</p>;

  let c = data.coursePage;
  moment.locale("ru");

  return (
    <Course>
      {data && c && (
        <>
          <div className="course_name">{c.title}</div>
          <div>
            {c.lessons
              .filter((les) => les.open == true)
              .map((l) => (
                <>
                  <div className="lesson_name">{l.name}</div>
                  <div>
                    {l.lessonResults
                      .filter((lr) => lr.progress != 0)
                      // .filter(
                      //   (lr) =>
                      //     lr.student.new_subjects.filter((s) => s.id == c.id)
                      //       .length == 0
                      // )
                      .map((lr, i) => (
                        <StudentInfo lr={lr} i={i} c={c} />
                      ))}
                  </div>
                </>
              ))}
            {c.lessons
              .filter((les) => les.type == "CHALLENGE")
              .map((l) => (
                <>
                  <div className="lesson_name">{l.name}</div>
                  <div>
                    {l.challengeResults
                      .filter(
                        (lr) =>
                          lr.student.new_subjects.filter((s) => s.id == c.id)
                            .length == 0
                      )
                      .map((lr, i) => (
                        <StudentInfo lr={lr} i={i} c={c} />
                      ))}
                  </div>
                </>
              ))}
          </div>
        </>
      )}
    </Course>
  );
};

export default CourseInfo;
