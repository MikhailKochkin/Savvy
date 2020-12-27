import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation, Query } from "@apollo/client/react/components";

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
  ) {
    createCourseVisit(
      visitsNumber: $visitsNumber
      coursePageId: $coursePageId
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
  height: 295px;
  line-height: 1.2;
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
  @media (max-width: 800px) {
    margin-bottom: 35px;
  }
`;
const Box = styled.div`
  color: white;
  background: linear-gradient(
    270deg,
    rgba(46, 46, 46, 0.7) 0%,
    rgba(46, 46, 46, 0.85) 100%
  );
  width: 245px;
  height: 100%;
  position: absolute;
  bottom: 0px;
  left: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:hover {
    background: rgba(46, 46, 46, 0.9);
  }
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
    background: #00c3ff;
    border-radius: 20px;
    width: 100%;
    height: 35px;
    padding: 2%;
    border: none;
    color: white;
    font-family: Montserrat;
    font-size: 1.6rem;
    outline: 0;
    cursor: pointer;
    &:hover {
      background: #0195c2;
    }
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${(props) => (props.authors ? "0" : "10px")};
`;

export default class Course extends Component {
  state = {
    revealApplication: false,
    isOpen: false,
    auth: "signin",
  };
  static propTypes = {
    coursePage: PropTypes.object.isRequired,
  };

  toggleModal = (e) => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  changeState = (dataFromChild) => {
    this.setState({
      auth: dataFromChild,
    });
  };

  render() {
    const { coursePage, id, me } = this.props;
    let forums = [];
    let ratings = [];
    let average;
    if (coursePage && coursePage.lessons) {
      coursePage.lessons.map((l) =>
        forums.push(l.forum ? [...l.forum.rating] : null)
      );
      forums = forums.filter((f) => f !== null).filter((f) => f.length !== 0);
      forums.map((f) => f.map((r) => ratings.push(r.rating)));
      average = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(
        2
      );
    }
    return (
      <CaseCard>
        <img src={coursePage.image} />
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
                  <div className="company">
                    {coursePage.authors.length > 0 ? (
                      <>
                        {coursePage.authors.map((a, i) => (
                          <span key={i + "sdfgv"}>
                            {a.company.name}
                            {i + 1 === coursePage.authors.length ? " " : ", "}
                          </span>
                        ))}
                      </>
                    ) : (
                      <>
                        {coursePage.user.company
                          ? coursePage.user.company.name
                          : "BeSavvy"}
                      </>
                    )}
                  </div>
                </Details>
              </div>
              {average >= 0 ? (
                <div className="rating">
                  <div>Оценка курса: </div>
                  <div className="num">{average}</div>
                </div>
              ) : null}
            </div>
            <div>
              {!me && (
                // <SignUpbutton onClick={this.toggleModal}>Войти</SignUpbutton>
                <Link
                  href={{
                    pathname: "/coursePage",
                    query: { id },
                  }}
                >
                  <a>
                    <button
                      onClick={() => {
                        console.log(0);
                      }}
                    >
                      Перейти
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
                              student: me.id,
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
                                        href={{
                                          pathname: "/coursePage",
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
                                            Перейти
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
                              visitsNumber:
                                data.courseVisits[0].visitsNumber + 1,
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
                                    href={{
                                      pathname: "/coursePage",
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
                                        Перейти
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
  }
}
