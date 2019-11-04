import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

const SINGLE_COURSE_VISIT_QUERY = gql`
  query SINGLE_COURSE_VISIT_QUERY($coursePage: ID!) {
    courseVisits(where: { coursePage: { id: $coursePage } }) {
      id
      visitsNumber
      student {
        id
      }
    }
  }
`;

const CREATE_COURSE_VISIT_MUTATION = gql`
  mutation CREATE_COURSE_VISIT_MUTATION($visitsNumber: Int, $coursePage: ID) {
    createCourseVisit(visitsNumber: $visitsNumber, coursePage: $coursePage) {
      id
    }
  }
`;

const UPDATE_COURSE_VISIT_MUTATION = gql`
  mutation UPDATE_COURSE_VISIT_MUTATION($id: ID!, $visitsNumber: Int) {
    updateCourseVisit(id: $id, visitsNumber: $visitsNumber) {
      id
    }
  }
`;

const CaseCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 4px;
  border: 1px solid #edefed;
  border-radius: 10px;
  margin: 2%;
  width: 285px;
  line-height: 1.2;
  @media (max-width: 1000px) {
    width: 205px;
    button {
      padding: 4px 6px;
    }
  }
  @media (max-width: 650px) {
    padding: 2%;
    width: 158px;
    button {
      padding: 4px 6px;
    }
  }
  @media (max-width: 374px) {
    width: 150px;
  }
`;

const Author = styled.p`
  color: #686868;
  @media (max-width: 950px) {
    font-size: 1.4rem;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 200px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  @media (max-width: 950px) {
    object-fit: cover;
    height: 100px;
  }
`;

const Title = styled.p`
  font-size: 1.6rem;
  margin-top: 5%;
`;

const Button = styled.button`
  border: 1px solid #112a62;
  color: #112a62;
  padding: 5px 12px;
  background: white;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  outline: 0;
  &:active {
    border: 2px solid #112a62;
  }
  @media (max-width: 950px) {
    margin: 0;
  }
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 0.5%;
  width: 100%;
  a {
    width: 100%;
  }
`;

const Additional = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export default class Course extends Component {
  state = {
    revealApplication: false
  };
  static propTypes = {
    coursePage: PropTypes.object.isRequired
  };
  myCallback = dataFromChild => {
    this.setState({
      revealApplication: dataFromChild
    });
  };

  render() {
    const { coursePage, id, me } = this.props;

    return (
      <CaseCard>
        <Additional>
          <>
            {coursePage.image && (
              <Img src={coursePage.image} alt={coursePage.title} />
            )}
            <Title>
              <a>{coursePage.title}</a>
            </Title>
            {coursePage.user.status === "HR" && (
              <Author>
                {coursePage.user.name} из {coursePage.user.company.name}
              </Author>
            )}
            {me && (
              <Query
                query={SINGLE_COURSE_VISIT_QUERY}
                variables={{
                  coursePage: id
                }}
              >
                {({ data, error, loading }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error: {error.message}</p>;
                  const my_course_visitis = data.courseVisits.filter(
                    visit => visit.student.id === me.id
                  );
                  console.log(my_course_visitis.length);
                  return (
                    <>
                      {my_course_visitis.length === 0 && (
                        <Mutation
                          mutation={CREATE_COURSE_VISIT_MUTATION}
                          variables={{
                            coursePage: id,
                            visitsNumber: 1
                          }}
                          refetchQueries={() => [
                            {
                              query: SINGLE_COURSE_VISIT_QUERY,
                              variables: {
                                coursePage: id
                              }
                            }
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
                                        query: { id }
                                      }}
                                    >
                                      <a>
                                        <Button
                                          onClick={() => {
                                            console.log("1");
                                            createCourseVisit();
                                          }}
                                        >
                                          Перейти
                                        </Button>
                                      </a>
                                    </Link>
                                  )}
                                </>
                              </>
                            );
                          }}
                        </Mutation>
                      )}
                      {my_course_visitis.length > 0 && (
                        <Mutation
                          mutation={UPDATE_COURSE_VISIT_MUTATION}
                          variables={{
                            id: my_course_visitis[0].id,
                            visitsNumber: my_course_visitis[0].visitsNumber + 1
                          }}
                          refetchQueries={() => [
                            {
                              query: SINGLE_COURSE_VISIT_QUERY,
                              variables: {
                                coursePage: id
                              }
                            }
                          ]}
                        >
                          {(updateCourseVisit, { loading, error }) => {
                            return (
                              me &&
                              coursePage && (
                                <Link
                                  href={{
                                    pathname: "/coursePage",
                                    query: { id }
                                  }}
                                >
                                  <a>
                                    <Button
                                      onClick={() => {
                                        console.log("2");
                                        console.log(
                                          data.courseVisits[0].id,
                                          data.courseVisits[0].visitsNumber
                                        );
                                        updateCourseVisit();
                                      }}
                                    >
                                      Перейти
                                    </Button>
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
          </>
        </Additional>
      </CaseCard>
    );
  }
}
