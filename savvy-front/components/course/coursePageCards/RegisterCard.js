import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import parse from "html-react-parser";

import EnrollCoursePage from "../../EnrollCoursePage";
import { CREATE_LESSONRESULT_MUTATION } from "../../lesson/LessonHeader";
import { UPDATE_LESSONRESULT_MUTATION } from "../../lesson/LessonHeader";

const Data = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px 0;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    padding: 3%;
  }
`;

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  background: #ffffff;
  box-sizing: border-box;
  width: 350px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Part1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .message {
    /* text-align: center; */
    margin-bottom: 10%;
    margin: 0 10px;
    font-size: 1.6rem;
    .lesson_name {
      font-size: 1.8rem;
      font-weight: bold;
    }
    .lesson_description {
      font-size: 1.6rem;
      p {
        margin: 5px 0;
      }
    }
  }
`;

const Part2 = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const Paid = styled.div`
  background: #fdf3c8;
  padding: 1% 3%;
  border-radius: 5px;
  font-size: 1.4rem;
  margin-top: 2%;
`;

const StartLesson = styled.button`
  background: #0846d8;
  border-radius: 5px;
  width: 95%;
  height: 38px;
  outline: 0;
  font-family: Montserrat;

  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  a {
    color: white;
    font-weight: 600;
    font-size: 1.4rem;
  }
  border: none;
  margin-top: 10px;
  transition: 0.3s;
  &:hover {
    background: rgba(8, 70, 216, 0.85);
  }
  &:active {
    background-color: ${(props) => props.theme.darkGreen};
  }
  &:disabled {
    &:hover {
      background-color: #84bc9c;
    }
  }
`;

const RegisterCard = (props) => {
  const { t } = useTranslation("course");
  const [width, setWidth] = useState(800);

  const onResize = (width) => {
    setWidth(width);
  };

  const [createLessonResult, { create_data }] = useMutation(
    CREATE_LESSONRESULT_MUTATION
  );

  const [updateLessonResult, { update_data }] = useMutation(
    UPDATE_LESSONRESULT_MUTATION
  );

  const { coursePage, me, studentsArray, subjectArray } = props;
  let applied;
  me &&
  me.orders.filter(
    (o) => o.coursePage.id === coursePage.id && o.isPaid === null
  ).length > 0
    ? (applied = true)
    : (applied = false);

  return (
    <>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      {props.first_lesson && (
        <Data>
          <Payment>
            <Text>
              <Part1>
                {props.first_lesson && (
                  <div className="message">
                    <div className="lesson_name">
                      {t("lesson")} 1. "
                      {props.first_lesson ? props.first_lesson.name : ""}"
                    </div>{" "}
                    {props.first_lesson.description && (
                      <div className="lesson_description">
                        {parse(props.first_lesson.description)}
                      </div>
                    )}
                  </div>
                )}
              </Part1>
              <Part2>
                {applied && <Paid>{t("applied")}</Paid>}
                <Link
                  legacyBehavior
                  href={{
                    pathname: "/lesson",
                    query: {
                      id: props.first_lesson.id,
                      type: props.first_lesson.type.toLowerCase(),
                    },
                  }}
                >
                  <StartLesson
                    onClick={(e) => {
                      if (props.lessonResults.length == 0) {
                        createLessonResult({
                          variables: {
                            lessonID: props.first_lesson.id,
                            visitsNumber: 1,
                          },
                        });
                      } else {
                        updateLessonResult({
                          variables: {
                            id: props.lessonResults[0].id,
                            visitsNumber:
                              props.lessonResults[0].visitsNumber + 1,
                          },
                        });
                      }
                    }}
                  >
                    <a target="_blank">{t("start_lesson1")}</a>
                  </StartLesson>
                </Link>
                {me && (
                  <>
                    {/* {coursePage.courseType !== "FORMONEY" && ( */}
                    <EnrollCoursePage
                      coursePage={coursePage}
                      studentsArray={studentsArray}
                      subjectArray={subjectArray}
                      meData={me}
                    />
                    {/* )} */}
                  </>
                )}
              </Part2>
            </Text>
          </Payment>
        </Data>
      )}
    </>
  );
};

export default RegisterCard;
