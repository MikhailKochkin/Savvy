import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query } from "@apollo/client/react/components";
import Link from "next/link";
import Course from "../course/Course";
import { useUser } from "../User";
import Uni from "./Uni";
import EducatorImage from "./EducatorImage";
import PleaseSignIn from "../auth/PleaseSignIn";

const MY_COURSES_QUERY = gql`
  query MY_COURSES_QUERY($id: String!) {
    coursePages(where: { userId: { equals: $id } }) {
      id
      title
      user {
        id
        name
        surname
        image
        uni {
          id
          title
        }
        company {
          id
          name
        }
      }
      authors {
        id
        name
        surname
        image
        uni {
          id
          title
        }
        company {
          id
          name
        }
      }
      lessons {
        id
        forum {
          id
          rating {
            id
            rating
          }
        }
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
  text-align: left;
  background: white;
  padding: 4px;
  border: 1px solid #edefed;
  border-radius: 10px;
  margin: 2%;
  width: 285px;
  line-height: 1.2;
  @media (max-width: 950px) {
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

const Img = styled.div`
  width: 100%;
  height: 200px;
  border: 1px dashed lightgrey;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  @media (max-width: 950px) {
    object-fit: cover;
    height: 100px;
  }
`;

const Title2 = styled.p`
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

const Styles = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  font-size: 1.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Courses = styled.div`
  width: 80%;
  max-width: 1200px;
  background: white;
  padding: 1.5%;
  @media (max-width: 850px) {
    width: 95%;
  }
`;

const Title = styled.p`
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 1%;
`;

const Author = styled.p`
  color: #686868;
  @media (max-width: 950px) {
    font-size: 1.4rem;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Additional = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

const Teach = (props) => {
  const me = useUser();
  return (
    <PleaseSignIn>
      <Styles>
        {me && (
          <>
            <Query
              query={MY_COURSES_QUERY}
              variables={{
                id: me.id,
              }}
            >
              {({ data, error, loading, fetchMore }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error: {error.message}</p>;
                console.log(data);
                let publishedCourses = data.coursePages.filter(
                  (coursePage) => coursePage.published === true
                );
                let developedCourses = data.coursePages.filter(
                  (coursePage) => coursePage.published === false
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
                    <EducatorImage />
                    <Container>
                      <Uni me={me} />
                      <Courses>
                        <Title primary> Опубликованные курсы </Title>
                        <Row>
                          {status && publishedCourses.length === 0 && (
                            <p>У вас еще нет запущенных курсов.</p>
                          )}
                          {status &&
                            publishedCourses.map((coursePage) => (
                              <Course
                                key={coursePage.id}
                                id={coursePage.id}
                                coursePage={coursePage}
                                me={me}
                              />
                            ))}
                          {!status && "Нет доступа к управлению курсами"}
                        </Row>
                      </Courses>
                      <Courses>
                        <Title primary> Курсы в разработке </Title>
                        <Row>
                          <CaseCard>
                            <Additional>
                              {me && (
                                <>
                                  <Img />
                                  <Title2>Ваш новый курс</Title2>
                                  <Author>{me.name}</Author>
                                </>
                              )}
                              <>
                                <Link href="/create">
                                  <Button>
                                    <a>Создать курс</a>
                                  </Button>
                                </Link>
                              </>
                            </Additional>
                          </CaseCard>
                          {developedCourses.map((coursePage) => (
                            <Course
                              key={coursePage.id}
                              id={coursePage.id}
                              coursePage={coursePage}
                              me={me}
                            />
                          ))}
                        </Row>
                        {!status && "Нет доступа к управлению курсами"}
                      </Courses>
                    </Container>
                  </>
                );
              }}
            </Query>
          </>
        )}
      </Styles>
    </PleaseSignIn>
  );
};

export default Teach;
export { MY_COURSES_QUERY };
