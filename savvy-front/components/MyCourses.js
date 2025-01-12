import React from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import Loading from "./layout/Loading";
import { useTranslation } from "next-i18next";

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
          rating {
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
  border-radius: 20px;
`;

const Container = styled.div`
  width: 100%;
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
  width: 100%;
  background: #e8eff6;
  font-weight: 500;

  .name {
    width: 25%;
    margin-right: 3px;
    background: #fff;
    padding: 10px;
    line-height: 1.4;
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
  const { t } = useTranslation("account");

  if (error) return <p>Error: {error.message}</p>;

  if (loading) return <Loading />;
  return (
    <Styles>
      <Container>
        <Background>
          <Row>
            <div className="name">
              <b>{t("name")}</b>
            </div>
            <div className="description">
              <b>{t("description")}</b>
            </div>

            <div className="move">
              {" "}
              <b>{t("action")}</b>
            </div>
          </Row>
          {data.coursePages.length > 0 ? (
            data.coursePages.map((coursePage) => (
              <Row key={coursePage.id}>
                <div className="name">{coursePage.title}</div>
                <div className="description">
                  {parse(coursePage.description)}
                </div>

                <div className="move">
                  <SecondaryButton
                    onClick={() => router.push(`course?id=${coursePage.id}`)}
                  >
                    {t("open")}
                  </SecondaryButton>
                </div>
              </Row>
            ))
          ) : (
            <Row>
              <div className="name">You have no opened courses yet.</div>
              <div className="description">
                Please contact the administrator.
              </div>

              <div className="move"></div>
            </Row>
          )}
        </Background>
        {/* {data.coursePages.map((c) => (
          <Course key={c.id} id={c.id} coursePage={c} me={props.me} />
        ))} */}
      </Container>
    </Styles>
  );
};

export default MyCourses;
