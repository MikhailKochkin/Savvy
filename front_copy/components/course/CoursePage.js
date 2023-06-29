import { useState, useEffect } from "react";
// import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useTranslation } from "next-i18next";
import styled from "styled-components";

import { useUser } from "../User";
// import Loading from "../Loading";
// import Feedback from "./Feedback";
// import Certificate from "./Certificate";
import CourseData from "./courseBlocks/CourseData";
import ToolsBox from "./courseBlocks/ToolsBox";
import LessonsData from "./courseBlocks/LessonsData";

import {
  Container,
  LessonStyles,
  LessonsInfo,
  Total,
  Buttons,
  Button,
  Syllabus,
  Video,
  Comment,
  Lessons,
} from "./styles/CoursePage_Styles";

// const SINGLE_COURSEPAGE_QUERY = gql`
//   query SINGLE_COURSEPAGE_QUERY($id: String!) {
//     coursePage(where: { id: $id }) {
//       id
//       title
//       image
//       news
//       price
//       discountPrice
//       video
//       audience
//       result
//       tags
//       weeks
//       tariffs
//       methods
//       reviews
//       subscriptionPrice
//       subscription
//       promocode
//       published
//       user {
//         id
//       }
//       lessons {
//         id
//         name
//         number
//         type
//         open
//         description
//         structure
//         forum {
//           id
//           statements {
//             id
//             comments
//           }
//           rating {
//             id
//             rating
//           }
//         }
//         published
//         coursePage {
//           id
//         }
//         user {
//           id
//         }
//       }
//       description
//       courseType
//       students
//       new_students {
//         id
//       }
//       user {
//         id
//         name
//         surname
//         image
//         description
//         work
//         status
//         uni {
//           id
//           title
//         }
//         company {
//           id
//           name
//         }
//       }
//       authors {
//         id
//         name
//         surname
//         image
//         description
//         status
//         uni {
//           id
//           title
//         }
//         company {
//           id
//           name
//         }
//       }
//     }
//   }
// `;

// const LESSON_RESULTS_QUERY = gql`
//   query LESSON_RESULTS_QUERY($coursePageId: String!, $userId: String!) {
//     lessonResults(
//       where: {
//         lesson: { coursePageId: { equals: $coursePageId } }
//         student: { id: { equals: $userId } }
//       }
//     ) {
//       id
//       visitsNumber
//       progress
//       lesson {
//         id
//         name
//         structure
//         type
//         number
//       }
//       student {
//         id
//         email
//       }
//       createdAt
//       updatedAt
//     }
//   }
// `;

const CourseInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const CoursePage = (props) => {
  const me = useUser();
  return (
    <>
      <div id="root"></div>
      <>
        <Container>
          <LessonStyles>
            <CourseInfo>
              <CourseData id={props.id} />
              <ToolsBox me={me} id={props.id} />
            </CourseInfo>
            <LessonsData me={me} id={props.id} />

            {/* {me && (
              <Certificate
                completed={(maxes.length / coursePage.lessons.length) * 100}
                have_cert={have_cert}
                studentId={me.id}
                student={me}
                coursePageId={coursePage.id}
                coursePage={coursePage}
                createdAt={have_cert ? cert.createdAt : null}
                certId={have_cert ? cert.id : null}
              />
            )} */}
            {/* <Details>
              {data.coursePage.audience && (
                <div className="info">
                  <div className="header">
                    <span>{t("who_for")}</span>
                  </div>
                  <div>{renderHTML(data.coursePage.audience)}</div>
                </div>
              )}
              {data.coursePage.video && data.coursePage.video !== "" && (
                <Video>
                  <div className="header">{t("presentation")}</div>
                  <iframe src={data.coursePage.video} allowFullScreen />
                </Video>
              )}
              {data.coursePage.methods && (
                <div className="info">
                  <div className="header">{t("author")}</div>
                  <div>{renderHTML(data.coursePage.methods)}</div>
                </div>
              )}
              {data.coursePage.result && (
                <div className="info">
                  <div className="header">{t("about")}</div>
                  <div>{renderHTML(data.coursePage.result)}</div>
                </div>
              )}
              {data.coursePage.batch && (
                <div className="red">
                  <div className="header">{t("next_cohort")}</div>
                  {renderHTML(data.coursePage.batch)}
                </div>
              )}
            </Details>
            <Details>
              {data.coursePage.tariffs && (
                <div className="info">
                  <div className="header">{t("tariffs")}</div>
                  <div>{renderHTML(data.coursePage.tariffs)}</div>
                </div>
              )}
            </Details> */}
          </LessonStyles>
        </Container>
      </>
    </>
  );
};

export default CoursePage;
