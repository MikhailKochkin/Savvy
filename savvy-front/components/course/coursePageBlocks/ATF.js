import { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import moment from "moment";
import parse from "html-react-parser";

import Loading from "../../Loading";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      user {
        id
        name
        surname
        work
        image
      }
      authors {
        id
        name
        surname
        work
        image
      }
      nextStart
      header
      subheader
      new_students {
        id
      }
    }
  }
`;

const BImage = styled.div`
  /* background-image: url("./static/back_image.png"); */
  width: 100%;
  /* min-height: 90vh; */
  max-height: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  background-image: url("/static/pattern6.svg");
  background-size: contain;
  @media (max-width: 800px) {
    /* padding: 50px 0; */
    min-height: 60vh;
    background-size: contain;
  }
`;

const InfoBlock = styled.div`
  width: 100%;
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  /* background-image: url("./static/back_image.png"); */
  width: 85%;
  max-width: 1050px;
  margin-top: 50px;
  /* height: 50%; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .date {
    font-weight: bold;
    color: #252f3f;
  }

  h1 {
    font-size: 4.4rem;
    line-height: 1.2;
    font-weight: 800;
    margin: 0;
    color: #252f3f;
    span {
      background: #fce969;
      display: inline-block;
      transform: skew(-8deg);
      /* -webkit-transform: skew(-5deg);
      -moz-transform: skew(-5deg);
      -o-transform: skew(-5deg); */
    }
  }
  h2 {
    font-size: 2.2rem;
    line-height: 1.4;
    margin-top: 10px;
    width: 75%;
    font-weight: 500;
    color: #4b5563;
    margin-bottom: 30px;
  }
  @media (max-width: 800px) {
    width: 90%;

    h1 {
      font-size: 3.6rem;
      line-height: 1.4;
      span {
        display: inline;
      }
    }
    h2 {
      font-size: 2rem;
      width: 100%;
      margin-bottom: 0px;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 65%;
  flex-direction: row;
  justify-content: center;
  margin: 30px 0;
  #atf_look_at_syllabus_button {
    width: 45%;
    height: 50px;
    font-size: 2rem;
    font-family: Montserrat;
    background-color: #dedede;
    border: 1px solid #dedede;
    border-radius: 8px;
    transition: 0.2s ease-in;
    cursor: pointer;
    &:hover {
      background: #c2c2c2;
    }
  }
  #atf_buy_button {
    width: 45%;
    margin-left: 50px;
    background: #175ffe;
    color: #fff;
    border-radius: 5px;
    border: none;
    height: 50px;
    font-size: 2rem;
    outline: 0;
    cursor: pointer;
    font-family: Montserrat;
    transition: 0.3s;
    &:hover {
      background: #0135a9;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    #atf_look_at_syllabus_button {
      width: 100%;
      margin-bottom: 20px;
    }
    #atf_buy_button {
      width: 100%;
      margin-left: 0;
    }
  }
`;

const TimeLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  #clock {
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .clock_section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 300px;
      .clock_time {
        font-size: 3rem;
        font-weight: 600;
      }
      .clock_name {
        font-size: 1.8rem;
        font-weight: 400;
      }
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    #clock {
      width: 100vw;
      .clock_section {
        width: 25%;
      }
    }
  }
`;

const AuthorsInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  .info {
    margin-top: 10px;
    line-height: 1.6;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .names {
      margin-right: 15px;
    }
  }
`;

const NextMeeting = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.8rem;
  justify-content: center;
  .image_container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-right: 5px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
      object-fit: cover;
      border: 1px solid #dde2e1;
    }
  }
`;

const ATF = (props) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const { t } = useTranslation("coursePage");
  const router = useRouter();

  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.id },
  });

  if (loading) return <Loading />;

  const course = data.coursePage;

  router.locale == "ru" ? moment.locale("ru") : moment.locale("en");
  return (
    <div id="ATF">
      <BImage>
        <InfoBlock>
          <Container>
            <h1>{course?.header?.length > 0 ? parse(course.header[0]) : ""}</h1>
            <h2 id="header2">
              {course.subheader.length > 0 ? parse(course.subheader[0]) : ""}
            </h2>
          </Container>
        </InfoBlock>
      </BImage>
    </div>
  );
};

export default ATF;
