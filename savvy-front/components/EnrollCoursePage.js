import React, { useState } from "react";
import Router from "next/router";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import Link from "next/link";

import { CURRENT_USER_QUERY } from "./User";
import { SINGLE_COURSEPAGE_QUERY } from "./course/CoursePage";

const CREATE_PRIVATE_ORDER_MUTATION = gql`
  mutation createPrivateOrder(
    $coursePageId: String!
    $userId: String!
    $promocode: String
  ) {
    createPrivateOrder(
      coursePageId: $coursePageId
      userId: $userId
      promocode: $promocode
    ) {
      order {
        id
      }
    }
  }
`;

const ENROLL_COURSE_MUTATION = gql`
  mutation ENROLL_COURSE_MUTATION($id: String!, $coursePageId: String) {
    enrollOnCourse(id: $id, coursePageId: $coursePageId) {
      id
    }
  }
`;

const Button = styled.button`
  background: #0846d8;
  border-radius: 5px;
  width: 95%;
  height: 38px;
  outline: 0;
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

const Comment = styled.div`
  padding-top: 15px;
`;

const EnrollCoursePage = (props) => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation("course");

  let subj = [];
  props.meData.new_subjects.map((s) => subj.push(s.id));
  const onClick = async (e, enrollOnCourse) => {
    e.preventDefault();
    if (
      props.coursePage.courseType === "PUBLIC" ||
      props.coursePage.courseType === "CHALLENGE"
    ) {
      if (!subj.includes(props.coursePage.id)) {
        enrollOnCourse({
          variables: {
            id: props.meData.id,
            coursePageId: props.coursePage.id,
          },
        });
      } else {
        alert(t("have_access"));
      }
    }
  };

  const { coursePage, meData } = props;
  return (
    <>
      {(coursePage.courseType === "PUBLIC" ||
        coursePage.courseType === "CHALLENGE") && (
        <Mutation
          mutation={ENROLL_COURSE_MUTATION}
          refetchQueries={() => [{ query: CURRENT_USER_QUERY }]}
        >
          {(enrollOnCourse) =>
            !subj.includes(coursePage.id) ? (
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  const res = await onClick(e, enrollOnCourse);
                  Router.reload();
                }}
              >
                {t("enroll")}
              </Button>
            ) : (
              <div>{t("have_access")}</div>
            )
          }
        </Mutation>
      )}
      {coursePage.courseType === "FORMONEY" && !show && (
        <Button
          onClick={async (e) => {
            e.preventDefault();
          }}
        >
          <Link
            href={{
              pathname: "/coursePage",
              query: {
                id: props.coursePage.id,
              },
            }}
          >
            {t("enroll")}
          </Link>
        </Button>
      )}
      {coursePage.courseType === "PRIVATE" && !show && (
        <Mutation
          mutation={CREATE_PRIVATE_ORDER_MUTATION}
          variables={{
            coursePageId: coursePage.id,
            userId: meData.id,
            promocode: "",
          }}
        >
          {(createPrivateOrder, { loading, error }) =>
            !subj.includes(coursePage.id) ? (
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  setShow(true);
                  const res = await createPrivateOrder();
                }}
              >
                {t("enroll")}
              </Button>
            ) : (
              <div>{t("have_access")}</div>
            )
          }
        </Mutation>
      )}
      {show && <Comment>{t("applied")}</Comment>}
    </>
  );
};

export default EnrollCoursePage;
export { ENROLL_COURSE_MUTATION };
