import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Link from "next/link";
import MyCourse from "../course/MyCourse";
import User from "../User";
import Uni from "./Uni";
import CreateCourseButton from "./CreateCourseButton";
import PleaseSignIn from "../auth/PleaseSignIn";

const MY_COURSES_QUERY = gql`
  query MY_COURSES_QUERY($id: ID!) {
    coursePages(where: { user: { id: $id } }) {
      id
      title
      user {
        id
        name
      }
      description
      courseType
      image
      published
    }
  }
`;

const CaseCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px lightgrey dashed;
  border-radius: 5px;
  text-align: left;
  background: white;
  padding: 1%;
  margin: 2%;
  width: 300px;
  line-height: 1.2;
  @media (max-width: 800px) {
    padding: 2%;
    button {
      padding: 4px 6px;
    }
  }
`;

const Img = styled.div`
  width: 100%;
  height: 200px;
  border: 1px dashed lightgrey;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const Title2 = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1%;
  margin-bottom: 0;
`;

const Description = styled.p`
  width: 100%;
  height: 50px;
  border: 1px dashed lightgrey;
  border-radius: 5px;
  margin-bottom: 0;
`;

const Author = styled.p`
  font-size: 1.6rem;
  color: #686868;
`;

const Button = styled.button`
  background-color: ${props => (props.delete ? "red" : "#008CBA")};
  border: none;
  color: white;
  padding: 5px 10px;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  width: 135px;
  margin: 2px;
  font-size: 1.4rem;
  cursor: pointer;
  a {
    color: white;
  }
  &:hover {
    background-color: #003d5b;
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  font-size: 1.8rem;
  display: flex;
  flex-direction: row;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const Courses = styled.div`
  margin-top: 2%;
  background: white;
  padding: 1.5%;
`;

const Title = styled.p`
  font-size: ${props => (props.primary ? "2.6rem" : "1.6rem")};
  margin-top: 0;
  margin-bottom: 1%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

class Teach extends Component {
  render() {
    return (
      <PleaseSignIn>
        <Styles>
          <User>
            {({ data: { me } }) =>
              me && (
                <>
                  <Query
                    query={MY_COURSES_QUERY}
                    variables={{
                      id: me.id
                    }}
                    fetchPolicy="cache-and-network"
                  >
                    {({ data, error, loading, fetchMore }) => {
                      if (loading) return <p>Loading...</p>;
                      if (error) return <p>Error: {error.message}</p>;
                      let publishedCourses = data.coursePages.filter(
                        coursePage => coursePage.published === true
                      );
                      let developedCourses = data.coursePages.filter(
                        coursePage => coursePage.published === false
                      );
                      const uni = me.uni;
                      let isPaid;
                      if (uni.capacity > 0 && uni.capacity <= 2) {
                        isPaid = true;
                      } else if (
                        uni.capacity > 2 &&
                        uni.capacity >= uni.uniCoursePages.length &&
                        uni.paidMonths > 0
                      ) {
                        isPaid = true;
                      } else {
                        isPaid = false;
                      }
                      let status = uni.capacity <= 2 || uni.paidMonths > 0;
                      return (
                        <>
                          <Container>
                            <CreateCourseButton uni={me.uni} isPaid={isPaid} />
                            <Uni me={me} />
                          </Container>
                          <Courses>
                            <Title primary> Опубликованные курсы </Title>
                            <Row>
                              {status && publishedCourses.length === 0 && (
                                <Title>У вас еще нет запущенных курсов.</Title>
                              )}
                              {status &&
                                publishedCourses.map(coursePage => (
                                  <MyCourse
                                    key={coursePage.id}
                                    id={coursePage.id}
                                    coursePage={coursePage}
                                  />
                                ))}
                              {!status && "Нет доступа к управлению курсами"}
                            </Row>
                          </Courses>
                          <Courses>
                            <Title primary> Курсы в разработке </Title>
                            <Row>
                              <CaseCard>
                                <Img />
                                <Title2>Ваш новый курс</Title2>
                                <Description />
                                <Author>{me.name}</Author>
                                <Link prefetch href="/create">
                                  <Button>
                                    <a>Создать курс</a>
                                  </Button>
                                </Link>
                              </CaseCard>
                              {developedCourses.map(coursePage => (
                                <MyCourse
                                  key={coursePage.id}
                                  id={coursePage.id}
                                  coursePage={coursePage}
                                />
                              ))}
                            </Row>
                            {!status && "Нет доступа к управлению курсами"}
                          </Courses>
                        </>
                      );
                    }}
                  </Query>
                </>
              )
            }
          </User>
        </Styles>
      </PleaseSignIn>
    );
  }
}

export default Teach;
export { MY_COURSES_QUERY };
