import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";
import { gql } from "@apollo/client";
import { Mutation, Query } from "@apollo/client/react/components";
import { useTranslation } from "next-i18next";

const SINGLE_COURSE_VISIT_QUERY = gql`
  query SINGLE_COURSE_VISIT_QUERY($coursePageId: String!, $student: String!) {
    courseVisits(
      where: {
        coursePageId: { equals: $coursePageId }
        student: { id: { equals: $student } }
      }
    ) {
      id
      visitsNumber
      student {
        id
      }
    }
  }
`;

const CREATE_COURSE_VISIT_MUTATION = gql`
  mutation CREATE_COURSE_VISIT_MUTATION(
    $visitsNumber: Int
    $coursePageId: String
    $studentId: String
  ) {
    createCourseVisit(
      visitsNumber: $visitsNumber
      coursePageId: $coursePageId
      studentId: $studentId
    ) {
      id
    }
  }
`;

const UPDATE_COURSE_VISIT_MUTATION = gql`
  mutation UPDATE_COURSE_VISIT_MUTATION($id: String!, $visitsNumber: Int) {
    updateCourseVisit(id: $id, visitsNumber: $visitsNumber) {
      id
    }
  }
`;

const CaseCard = styled.div`
  position: relative;
  margin: 2%;
  width: 295px;
  height: 255px;
  line-height: 1.2;
  background: #ffffff;
  box-shadow: 0px 0px 5px rgba(149, 149, 149, 0.5);
  width: 360px;
  img {
    object-fit: cover;
    width: 100%;
    max-height: 295px;
    /* height: 100%; */
  }
  .title {
    font-size: 1.7rem;
    margin-bottom: 20px;
  }
  .name {
    font-size: 1.5rem;
    margin-bottom: 5px;
  }
  .company {
    font-size: 1.3rem;
    display: inline-block;
  }
  @media (max-width: 1200px) {
    margin-bottom: 35px;
  }
  @media (max-width: 800px) {
    margin-bottom: 35px;
  }
`;
const Box = styled.div`
  width: 90%;
  height: 100%;
  bottom: 0px;
  left: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .content {
    height: 85%;
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: space-between;
    img {
      width: 55px;
      height: 55px;
      border-radius: 50px;
    }
    .author {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
    .rating {
      margin-top: 20px;
      display: flex;
      font-size: 1.5rem;
      flex-direction: row;
      justify-content: flex-start;
      .num {
        margin-left: 15px;
      }
    }
  }
  button {
    background: ${(props) => (props.program ? "#7000FF" : "#496ddb")};
    border-radius: 5px;
    border: 1px solid;
    border-color: ${(props) => (props.program ? "#7000FF" : "#496ddb")};
    height: 45px;
    width: 90%;
    color: #fff;
    font-family: Montserrat;
    font-size: 1.6rem;
    cursor: pointer;
    margin-bottom: 10px;
    transition: ease-in 0.2s;
    &:hover {
      background: #0135a9;
    }
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${(props) => (props.authors ? "0" : "10px")};
`;

const Course = (props) => {
  const { t } = useTranslation("course");

  const { coursePage, id, me } = props;
  let forums = [];
  let ratings = [];
  let average;
  if (coursePage && coursePage.lessons) {
    coursePage.lessons.map((l) => forums.push(l.forum ? l.forum.rating : null));
    forums = forums.filter((f) => f !== null).filter((f) => f.length !== 0);
    forums.map((f) => f.map((r) => ratings.push(r.rating)));
    average = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2);
  }
  return (
    <CaseCard>
      {/* <img src={coursePage.image} /> */}
      <Box>
        <div className="content">
          <div>
            <div className="title">{coursePage.title}</div>
            <div className="author">
              {coursePage.authors.length == 0 && coursePage.user.image && (
                <img src={coursePage.user.image} />
              )}
              <Details authors={coursePage.authors.length > 0}>
                {coursePage.authors.length > 0 ? (
                  <div className="name">
                    {coursePage.authors.map((a, i) => (
                      <span key={i + "dfdg"}>
                        {a.name[0].toUpperCase()}. {a.surname}
                        {i + 1 === coursePage.authors.length ? " " : ", "}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="name">
                    {coursePage.user.name} {coursePage.user.surname}
                  </div>
                )}
              </Details>
            </div>
            {/* {average >= 0 ? (
              <div className="rating">
                <div> {t("rating")}:</div>
                <div className="num">{average}</div>
              </div>
            ) : null} */}
          </div>
          <div>
            {!me && (
              <Link
                legacyBehavior
                href={{
                  pathname: "/course",
                  query: { id },
                }}
              >
                <a>
                  <button
                    onClick={() => {
                      console.log(0);
                    }}
                  >
                    {t("open")}
                  </button>
                </a>
              </Link>
            )}
            {me && (
              <Query
                query={SINGLE_COURSE_VISIT_QUERY}
                variables={{
                  coursePageId: id,
                  student: me.id,
                }}
              >
                {({ data, error, loading }) => {
                  if (loading) return <p></p>;
                  if (error) return <p>Error: {error.message}</p>;
                  return (
                    <>
                      {data.courseVisits.length === 0 && (
                        <Mutation
                          mutation={CREATE_COURSE_VISIT_MUTATION}
                          variables={{
                            coursePageId: id,
                            visitsNumber: 1,
                            studentId: me.id,
                          }}
                          refetchQueries={() => [
                            {
                              query: SINGLE_COURSE_VISIT_QUERY,
                              variables: {
                                coursePageId: id,
                                student: me.id,
                              },
                            },
                          ]}
                        >
                          {(createCourseVisit, { loading, error }) => {
                            return (
                              <>
                                <>
                                  {me && coursePage && (
                                    <Link
                                      legacyBehavior
                                      href={{
                                        pathname: "/course",
                                        query: { id },
                                      }}
                                    >
                                      <a>
                                        <button
                                          onClick={() => {
                                            console.log(1);
                                            createCourseVisit();
                                          }}
                                        >
                                          {t("open")}
                                        </button>
                                      </a>
                                    </Link>
                                  )}
                                </>
                              </>
                            );
                          }}
                        </Mutation>
                      )}
                      {data.courseVisits.length > 0 && (
                        <Mutation
                          mutation={UPDATE_COURSE_VISIT_MUTATION}
                          variables={{
                            id: data.courseVisits[0].id,
                            visitsNumber: data.courseVisits[0].visitsNumber + 1,
                          }}
                          refetchQueries={() => [
                            {
                              query: SINGLE_COURSE_VISIT_QUERY,
                              variables: {
                                coursePageId: id,
                                student: me.id,
                              },
                            },
                          ]}
                        >
                          {(updateCourseVisit, { loading, error }) => {
                            return (
                              me &&
                              coursePage && (
                                <Link
                                  legacyBehavior
                                  href={{
                                    pathname: "/course",
                                    query: { id },
                                  }}
                                >
                                  <a>
                                    <button
                                      onClick={() => {
                                        console.log(2);
                                        updateCourseVisit();
                                      }}
                                    >
                                      {t("open")}
                                    </button>
                                  </a>
                                </Link>
                              )
                            );
                          }}
                        </Mutation>
                      )}
                    </>
                  );
                }}
              </Query>
            )}
          </div>
        </div>
      </Box>
    </CaseCard>
  );
};

export default Course;
