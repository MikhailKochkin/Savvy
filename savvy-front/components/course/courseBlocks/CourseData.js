import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";
import Loading from "../../Loading";
import parse from 'html-react-parser';

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      #   image
      #   news
      #   price
      #   discountPrice
      #   video
      #   audience
      #   result
      #   tags
      #   weeks
      #   tariffs
      #   methods
      #   reviews
      #   subscriptionPrice
      #   subscription
      #   promocode
      # published
      # lessons {
      #   id
      #   assignment
      # }
      description
      #   students
      user {
        id
        name
        surname
        image
        description
        work
        status
      }
      authors {
        id
        name
        surname
        image
        description
        status
        work
      }
    }
  }
`;

const Data = styled.div`
  width: 50%;
  background: #fff;
  border-radius: 2rem;
  padding: 20px;
  box-shadow: 0 4px 6px -7px rgb(0 0 0 / 5%), 0 4px 30px -9px rgb(0 0 0 / 10%);
  .description {
    margin-top: 20px;
  }
  p {
    margin: 0;
  }
  img {
    width: 55px;
    height: 55px;
    border-radius: 50px;
    object-fit: cover;
  }
  .name {
    display: flex;
    flex-direction: row;
    font-size: 1.6rem;
    font-weight: bold;
    padding-top: 4%;
    /* border-top: 1px solid #e4e4e4; */
    p {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 4%;
    }
  }
  .company {
    font-size: 1.6rem;
    padding-bottom: 4%;
  }
  .track {
    font-size: 1.6rem;
    line-height: 1.4;
    padding-top: 4%;
    padding-bottom: 4%;
  }
  .rating {
    padding-bottom: 4%;
    font-size: 1.6rem;
  }
  .track2 {
    font-size: 1.6rem;
    line-height: 1.4;
    padding-top: 0%;
    padding-bottom: 2%;
    margin-top: 20px;
  }
  .trackName {
    font-weight: 600;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Header = styled.span`
  font-size: 2.4rem;
  margin: 1% 0;
  padding: 1%;
  padding-right: 1.5%;
  font-style: italic;
  -webkit-box-decoration-break: clone;
  -o-box-decoration-break: clone;
  box-decoration-break: clone;
  line-height: 1.4;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CourseData = (props) => {
  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.id },
  });
  if (loading) return <Loading />;
  // const { t } = useTranslation("course");

  const coursePage = data.coursePage;
  return (
    <Data id="info_box">
      <Header>{coursePage.title}</Header>
      {coursePage && coursePage.authors.length > 0 ? (
        coursePage.authors.map((a) => (
          <div className="name">
            <img src={a.image} />
            <p>
              {a.name} {a.surname}
            </p>
          </div>
        ))
      ) : (
        <>
          <div className="name">
            <img src={coursePage.user.image} />
            <p>
              {coursePage.user && coursePage.user.surname
                ? `${coursePage.user.name} ${coursePage.user.surname}`
                : coursePage.user.name}{" "}
            </p>
          </div>
          {coursePage.user.work ? (
            <p className="track2">{parse(coursePage.user.work)}</p>
          ) : (
            ""
          )}
        </>
      )}
      <div className="description">
        {coursePage.description && parse(coursePage.description)}
      </div>
    </Data>
  );
};

export default CourseData;
