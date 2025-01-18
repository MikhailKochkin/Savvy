import { useState } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import Modal from "styled-react-modal";

import CreateCourse from "./CreateCourse";

import Loading from "../../layout/Loading";
import {
  SecondaryButton,
  PrimaryButton,
} from "../../lesson/styles/DevPageStyles";

const MY_COURSES_QUERY = gql`
  query MY_COURSES_QUERY($id: String!) {
    coursePages(userId: $id) {
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
    coursePages(co_authorId: $id) {
      id
      title
      user {
        id
        name
        surname
        image
      }
      authors {
        id
        name
        surname
        image
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
  padding: 20px 0;
  border-radius: 20px;
`;
const Courses = styled.div`
  width: 95%;
  max-width: 890px;
  padding: 1.5%;
  background: #fff;
  border-radius: 20px;
  margin-bottom: 20px;
  @media (max-width: 850px) {
    width: 400px;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
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
  font-weight: 500;
  @media (max-width: 850px) {
    width: 700px;
  }
  .name {
    width: 25%;
    margin-right: 3px;
    background: #fff;
    padding: 10px;
    line-height: 1.4;
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation("account");
  const router = useRouter();

  let publishedCourses = [];
  let developedCourses = [];
  let coauthoredCourses = [];

  const toggleCourseCreateModal = (e) => setIsModalOpen(!isModalOpen);

  const { loading, error, data } = useQuery(MY_COURSES_QUERY, {
    variables: { id: me.id },
    fetchPolicy: "cache-first", // Default: Check cache first, then network if not found
  });

  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(MY_CO_AUTHORED_COURSES_QUERY, {
    variables: { id: me.id },
    fetchPolicy: "cache-first", // Default: Check cache first, then network if not found
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
    <Styles>
      {/* <EducatorImage /> */}
      <Container>
        <Courses>
          <Title primary>
            {t("my_courses_in_development")}: {developedCourses.length}
          </Title>

          <Background>
            <Row>
              <div className="name">
                <b>{t("name")}</b>
              </div>
              <div className="description">
                <b>{t("description")}</b>
              </div>
              <div className="updated">
                <b>{t("last_updated")}</b>
              </div>
              <div className="move">
                <b>{t("action")}</b>
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
                    {t("open")}
                  </SecondaryButton>
                </div>
              </Row>
            ))}
            <Row>
              <div className="name">
                <b>
                  <i>{t("new_course")}</i>
                </b>
              </div>
              <div className="description"></div>
              <div className="updated"></div>
              <div className="move">
                <PrimaryButton onClick={() => toggleCourseCreateModal()}>
                  {t("create")}
                </PrimaryButton>
              </div>
            </Row>
          </Background>
        </Courses>
        <Courses>
          <Title primary>
            {t("my_courses_in_production")}: {publishedCourses.length}
          </Title>
          <Background>
            <Row>
              <div className="name">
                <b>{t("name")}</b>
              </div>
              <div className="description">
                <b>{t("description")}</b>
              </div>
              <div className="updated">
                <b>{t("last_updated")}</b>
              </div>
              <div className="move">
                <b>{t("action")}</b>
              </div>
            </Row>
            {publishedCourses.length === 0 && (
              <Row>
                <div className="name">{t("no_courses_yet")}</div>
                <div className="description">{t("no_courses_explanation")}</div>
                <div className="updated"></div>
                <div className="move"></div>
              </Row>
            )}
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
                    {t("open")}
                  </SecondaryButton>
                </div>
              </Row>
            ))}
          </Background>
        </Courses>
      </Container>
      <StyledModal
        isOpen={isModalOpen}
        onBackgroundClick={toggleCourseCreateModal}
        onEscapeKeydown={toggleCourseCreateModal}
      >
        <CreateCourse />
      </StyledModal>
    </Styles>
  );
};

MyCourses.propTypes = {
  me: PropTypes.object.isRequired,
};

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  height: 800px;
  width: 640px;
  padding: 2%;
      overflow-y: scroll;

  @media (max-width: 1300px) {
    max-width: 70%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
  @media (max-width: 800px) {
    max-width: 90%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
`;

export default MyCourses;
export { MY_COURSES_QUERY };
