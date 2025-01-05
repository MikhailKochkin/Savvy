import React from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import Loading from "./layout/Loading";

import { SecondaryButton } from "./lesson/styles/DevPageStyles";

const MY_COURSE_PAGES_QUERY = gql`
  query MY_COURSE_PAGES_QUERY($id: String!, $orderByCreatedAt: String) {
    coursePages(studentId: $id, orderByCreatedAt: $orderByCreatedAt) {
      id
      title
      description
      image
      tags
      lessons {
        id
        forum {
          id
          ratings {
            id
            rating
          }
        }
      }
      user {
        id
        name
        surname
        image
        status
      }
      authors {
        id
        name
        surname
        status
      }
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: #e8eff6;
  padding: 13px 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Background = styled.div`
  background: #e8eff6;
  border-radius: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 3px;
  background: #e8eff6;
  width: 100%;
  .name {
    width: 25%;
    margin-right: 3px;
    background: #fff;
    padding: 10px;
    line-height: 1.4;
    font-weight: 500;
  }
  .description {
    width: 50%;
    margin-right: 3px;
    background: #fff;
    padding: 10px;
    line-height: 1.4;
    p {
      margin: 0;
    }
  }
  .updated {
    width: 25%;
    margin-right: 3px;
    background: #fff;
    padding: 10px;
    line-height: 1.4;
  }
  .move {
    width: 20%;
    background: #fff;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const MyCourses = (props) => {
  const { loading, error, data } = useQuery(MY_COURSE_PAGES_QUERY, {
    variables: { id: props.me.id },
  });
  const router = useRouter();

  if (error) return <p>Error: {error.message}</p>;

  if (loading) return <Loading />;
  return (
    <Styles>
      <Container>
        <Background>
          <Row>
            <div className="name">
              <b>Name</b>
            </div>
            <div className="description">
              <b>Description</b>
            </div>

            <div className="move">
              {" "}
              <b>Action</b>
            </div>
          </Row>
          {data.coursePages.map((coursePage) => (
            <Row key={coursePage.id}>
              <div className="name">{coursePage.title}</div>
              <div className="description">{parse(coursePage.description)}</div>

              <div className="move">
                <SecondaryButton
                  onClick={() => router.push(`course?id=${coursePage.id}`)}
                >
                  Open
                </SecondaryButton>
              </div>
            </Row>
          ))}
        </Background>
        {/* {data.coursePages.map((c) => (
          <Course key={c.id} id={c.id} coursePage={c} me={props.me} />
        ))} */}
      </Container>
    </Styles>
  );
};

export default MyCourses;
