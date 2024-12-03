import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import parse from "html-react-parser";

import PleaseSignIn from "../../auth/PleaseSignIn";
import Loading from "../../layout/Loading";
import {
  SecondaryButton,
  PrimaryButton,
} from "../../lesson/styles/DevPageStyles";

const MY_COURSES_QUERY = gql`
  query MY_COURSES_QUERY($id: String!) {
    coursePages(where: { userId: { equals: $id } }) {
      id
      title
      user {
        id
        name
        surname
      }
      authors {
        id
        name
        surname
      }
      description
      courseType
      image
      published
      updatedAt
    }
  }
`;

const MY_CO_AUTHORED_COURSES_QUERY = gql`
  query MY_CO_AUTHORED_COURSES_QUERY($id: String!) {
    coursePages(where: { authors: { some: { id: { equals: $id } } } }) {
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

const Styles = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #e8eff6;
  padding: 50px 0;
`;
const Courses = styled.div`
  width: 70%;
  max-width: 890px;
  padding: 1.5%;
  background: #fff;
  border-radius: 20px;
  margin-top: 30px;
  @media (max-width: 850px) {
    width: 95%;
  }
`;

const Background = styled.div`
  background: #e8eff6;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  margin-top: 0;
  font-weight: 400;
  margin-bottom: 1%;
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
  .name {
    width: 25%;
    margin-right: 3px;
    background: #fff;
    padding: 10px;
    line-height: 1.4;
    font-weight: 500;
  }
  .description {
    width: 40%;
    margin-right: 3px;
    background: #fff;
    padding: 10px;
    line-height: 1.4;
    p {
      margin: 0;
    }
  }
  .updated {
    width: 20%;
    margin-right: 3px;
    background: #fff;
    padding: 10px;
    line-height: 1.4;
  }
  .move {
    width: 15%;
    background: #fff;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const MyCourses = (props) => {
  const { me } = props;
  const { t } = useTranslation("educator");
  const router = useRouter();

  let publishedCourses = [];
  let developedCourses = [];
  let coauthoredCourses = [];

  const { loading, error, data } = useQuery(MY_COURSES_QUERY, {
    variables: { id: me.id },
  });

  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(MY_CO_AUTHORED_COURSES_QUERY, {
    variables: { id: me.id },
  });
  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  if (loading2) return <Loading />;
  if (error2) return <p>Error: {error2.message}</p>;
  const mergedCourses = [...data.coursePages, ...data2.coursePages];
  const uniqueCourses = mergedCourses.filter(
    (course, index, self) => index === self.findIndex((c) => c.id === course.id)
  );

  developedCourses = uniqueCourses
    .filter((coursePage) => coursePage.published === false)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  publishedCourses = uniqueCourses
    .filter((coursePage) => coursePage.published === true)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <PleaseSignIn>
      <Styles>
        {/* <EducatorImage /> */}
        <Container>
          <Courses>
            <Title primary>
              My courses in development: {developedCourses.length}
            </Title>

            <Background>
              <Row>
                <div className="name">
                  <b>Name</b>
                </div>
                <div className="description">
                  <b>Description</b>
                </div>
                <div className="updated">
                  <b>Last updated</b>
                </div>
                <div className="move">
                  {" "}
                  <b>Action</b>
                </div>
              </Row>
              {developedCourses.map((coursePage) => (
                <Row key={coursePage.id}>
                  <div className="name">{coursePage.title}</div>
                  <div className="description">
                    {parse(coursePage.description)}
                  </div>
                  <div className="updated">
                    {new Date(coursePage.updatedAt).toLocaleDateString()}
                  </div>
                  <div className="move">
                    <SecondaryButton
                      onClick={() => router.push(`course?id=${coursePage.id}`)}
                    >
                      Open
                    </SecondaryButton>
                  </div>
                </Row>
              ))}
              <Row>
                <div className="name">
                  <b>
                    <i>New Course</i>
                  </b>
                </div>
                <div className="description"></div>
                <div className="updated"></div>
                <div className="move">
                  <PrimaryButton onClick={() => router.push(`create`)}>
                    Create
                  </PrimaryButton>
                </div>
              </Row>
            </Background>
          </Courses>
          <Courses>
            <Title primary>
              My courses in production: {publishedCourses.length}
            </Title>
            <Background>
              <Row>
                <div className="name">
                  <b>Name</b>
                </div>
                <div className="description">
                  <b>Description</b>
                </div>
                <div className="updated">
                  <b>Last updated</b>
                </div>
                <div className="move">
                  {" "}
                  <b>Action</b>
                </div>
              </Row>
              {publishedCourses.length === 0 && <p>{t("No_Courses")}</p>}
              {publishedCourses.map((coursePage) => (
                <Row key={coursePage.id}>
                  <div className="name">{coursePage.title}</div>
                  <div className="description">{coursePage.description}</div>
                  <div className="updated">
                    {new Date(coursePage.updatedAt).toLocaleDateString()}
                  </div>
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
          </Courses>
        </Container>
      </Styles>
    </PleaseSignIn>
  );
};

MyCourses.propTypes = {
  me: PropTypes.object.isRequired,
};

export default MyCourses;
export { MY_COURSES_QUERY };
