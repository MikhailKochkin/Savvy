import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";
import { useQuery, gql } from "@apollo/client";

import { useTranslation } from "next-i18next";
import ReactResizeDetector from "react-resize-detector";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      user {
        id
        name
        surname
      }
    }
  }
`;

const Banner = styled.div`
  width: 100%;
  min-height: 10vh;
  background-image: url("/static/pattern.svg");
  background-size: cover;
  color: #dfe1ec;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  justify-content: center;
  /* padding-right: 300px; */
  .bottomline_text {
    max-width: 95%;
    min-width: 45%;
    font-size: 1.9rem;
    height: 100%;
    line-height: 1.6;
    font-weight: 600;
    padding: 10px;
    margin-right: 50px;
  }
  .more_bottomline_text {
    max-width: 65%;
    min-width: 45%;
    font-size: 1.3rem;
    height: 100%;
    line-height: 1.6;
    font-weight: 500;
    padding: 10px;
    margin-right: 50px;
  }
  button {
    background: #fcc419;
    color: #000;
    border: 1px solid #fcc419;
    border-radius: 5px;
    width: 220px;
    font-family: Montserrat;
    font-size: 1.7rem;
    font-weight: 400;
    height: 45px;
    opacity: 1;
    cursor: pointer;
    z-index: 4;
    transition: ease-in 0.2s;
    &:hover {
      background-color: #dea702;
      border: 1px solid #dea702;
    }
  }
  a {
    background: #fcc419;
    color: #000;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px solid #fcc419;
    border-radius: 5px;
    width: 220px;
    font-family: Montserrat;
    font-size: 1.7rem;
    font-weight: 400;
    height: 45px;
    opacity: 1;
    cursor: pointer;
    z-index: 4;
    transition: ease-in 0.2s;
    &:hover {
      background-color: #dea702;
      border: 1px solid #dea702;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    /* position: fixed; */
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    padding: 10px 0;
    background-size: cover;

    .bottomline_text {
      width: 90%;
      max-width: 90%;
      padding: 0;
      margin: 0;
    }
    button {
      min-width: 90%;
      font-size: 1.8rem;
    }
  }
`;

const Container = styled.div`
  width: 85%;
`;

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  max-width: 40%;
  min-width: 400px;
  padding: 2%;
  .top_message {
    padding-bottom: 2%;
    border-bottom: 1px solid grey;
    font-size: 2rem;
    width: 100%;
    text-align: center;
  }
  .bottom_message {
    margin-top: 2%;
  }
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

const Ad = (props) => {
  const [width, setWidth] = useState(0);
  const { t } = useTranslation("coursePage");
  const onResize = (width, height) => {
    setWidth(width);
  };
  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.id },
  });
  if (loading) return <div></div>;
  const course = data.coursePage;

  return (
    <Banner>
      <Container>
        <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
        <div className="bottomline_text">
          <span>
            🚀 {t("course")} "{course.title}"
            {/* Автор – {course.user.name}{" "}
            {course.user.surname} */}
          </span>
        </div>
      </Container>
    </Banner>
  );
};

export default Ad;
