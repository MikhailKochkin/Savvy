import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "./User";
import { SINGLE_COURSEPAGE_QUERY } from "./course/CoursePage";

const CREATE_PRIVATE_ORDER_MUTATION = gql`
  mutation createPrivateOrder(
    $coursePageId: String!
    $userId: String!
    $promocode: String
  ) {
    createPrivateOrder(
      coursePage: $coursePage
      user: $user
      promocode: $promocode
    ) {
      id
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
  background: ${(props) => props.theme.green};
  border-radius: 5px;
  width: 200px;
  height: 38px;
  outline: 0;
  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  &:active {
    background-color: ${(props) => props.theme.darkGreen};
  }
`;

const Comment = styled.div`
  padding-top: 15px;
`;

const EnrollCoursePage = (props) => {
  const [show, setShow] = useState(false);

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
            coursePage: props.coursePage.id,
          },
        });
        alert("Вы успешно зарегистрировлаись. Наслаждайтесь курсом!");
      } else {
        alert("Вы уже зарегистрированы!");
      }
    }
  };

  const { coursePage, meData } = props;
  console.log(props.coursePage.id);
  return (
    <>
      {(coursePage.courseType === "PUBLIC" ||
        coursePage.courseType === "CHALLENGE") && (
        <Mutation
          mutation={ENROLL_COURSE_MUTATION}
          refetchQueries={() => [{ query: CURRENT_USER_QUERY }]}
          refetchQueries={() => [
            {
              query: SINGLE_COURSEPAGE_QUERY,
              variables: { id: coursePage.id },
            },
          ]}
        >
          {(enrollOnCourse) =>
            !subj.includes(coursePage.id) ? (
              <Button onClick={(e) => onClick(e, enrollOnCourse)}>
                Регистрация
              </Button>
            ) : (
              <div>Вы уже зарегистрированы!</div>
            )
          }
        </Mutation>
      )}
      {coursePage.courseType === "PRIVATE" && !show && (
        <Mutation
          mutation={CREATE_PRIVATE_ORDER_MUTATION}
          variables={{
            coursePage: coursePage.id,
            user: meData.id,
            promocode: "",
          }}
        >
          {(createPrivateOrder, { loading, error }) =>
            !subj.includes(coursePage.id) ? (
              <Button
                onClick={async (e) => {
                  e.preventDefault;
                  setShow(true);
                  const res = await createPrivateOrder();
                }}
              >
                Регистрация
              </Button>
            ) : (
              <div>Уже зарегистрированы!</div>
            )
          }
        </Mutation>
      )}
      {show && (
        <Comment>
          Ваша заявка на рассмотрении. Скоро преподаватель рассмотрит ее и
          откроет доступ к курсу.
        </Comment>
      )}
    </>
  );
};

export default EnrollCoursePage;
export { ENROLL_COURSE_MUTATION };
