import React from "react";
import styled from "styled-components";
// import { graduationCap } from "react-icons-kit/fa/graduationCap";
import renderHTML from "react-render-html";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Styles = styled.div`
  width: 100%;
  min-height: 70vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-bottom: 50px;
  /* border-top: 1px solid #dce2e7; */
  @media (max-width: 800px) {
    min-height: 40vh;
  }
`;

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  color: #313d48;
  h2 {
    line-height: 1.2;
    font-weight: 700;
    font-size: 2.4rem;
  }
  button {
    background: #327998;
    color: #fff;
    border: 1px solid #327998;
    border-radius: 5px;
    width: 290px;
    font-family: Montserrat;
    font-size: 1.7rem;
    font-weight: 400;
    height: 45px;
    cursor: pointer;
  }
  #goal_message {
    width: 90%;
    /* height: 150px; */
  }
  #audience_id {
    width: 90%;
    /* height: 150px; */
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  #goal_examples {
    width: 70%;
    /* height: 150px; */
    font-size: 1.6rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: space-between;
    justify-content: space-between;
    margin-bottom: 20px;
    img {
      width: 100%;
    }
    div {
    }
    .audience {
      font-size: 1.6rem;
      /* margin: 10px 0; */
      width: 90%;
      /* p {
        margin: 0;
      } */
    }
    .example {
      display: flex;
      width: 46%;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      margin-right: 10px;
      font-size: 1.6rem;
      margin: 10px 0;
      p {
        margin: 0;
      }
      .icon {
        margin-right: 20px;
        color: #327998;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      div {
        line-height: 1.5;
        span {
          font-size: 3.6rem;
        }
      }
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    margin: 50px 0;
    #goal_message {
      height: auto;
      width: 90%;
      button {
        width: 90%;
      }
    }
    #goal_examples {
      height: auto;
      flex-direction: column;

      width: 100%;
      .example {
        margin: 10px 0;
        line-height: 1.8;
        width: 100%;
      }
    }
  }
`;

const Blue = styled.div`
  background: #171e2e;
  background-image: url("/static/pattern.svg");
  background-size: cover;
  color: #dee1ec;
  padding: 10px 30px;
  border-radius: 15px;
  width: 85%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Goal = (props) => {
  const { t } = useTranslation("coursePage");
  const router = useRouter();

  const slide = () => {
    var my_element = document.getElementById("c2a");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const { coursePage } = props;
  return (
    <Styles>
      <Container>
        <div id="goal_message"></div>
        <div id="goal_examples">
          {coursePage.goals.map((g) => (
            <div>{renderHTML(g)}</div>
          ))}
        </div>
        <Blue>
          <h2>
            {/* {d.goal_header ? (
              renderHTML(d.goal_header)
            ) : ( */}
            {/* <>
              {router.locale == "ru" ? (
                <>Для кого этот курс?</>
              ) : (
                <>Who is this course for?</>
              )}
            </> */}
            {/* )} */}
          </h2>
          <div id="audience_id">
            <div className="audience">
              {coursePage.audience && renderHTML(coursePage.audience)}
            </div>
          </div>
        </Blue>
      </Container>
    </Styles>
  );
};

export default Goal;
