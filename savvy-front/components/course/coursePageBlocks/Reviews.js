import React from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import renderHTML from "react-render-html";

const Styles = styled.div`
  width: 100%;
  /* min-height: 100vh; */
  background: #f4f8fc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
`;

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  h2 {
    line-height: 1.4;
    font-weight: 700;
    font-size: 2.8rem;
  }
  @media (max-width: 800px) {
    h2 {
      margin: 40px 0;
      font-size: 3.2rem;
    }
  }
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* flex-wrap: wrap; */
  align-items: space-between;
  width: 100%;
`;

const Review = styled.div`
  /* width: 450px; */
  margin-right: 50px;
  display: flex;
  background: #fff;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 40px;
  /* box-shadow: 0px 0px 10px rgba(129, 129, 129, 0.45); */
  /* border-radius: 5px; */
  position: relative;
  .img_component {
    width: 100px;
    margin: 15px;
    height: 100px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    position: relative;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      z-index: 1;
    }
  }
  .author {
    /* width: 30%; */
  }
  .text {
    width: 100%;
  }
  .name {
    color: #313d48;
    font-size: 1.8rem;
    text-align: left;
    line-height: 1.4;
    font-weight: 600;
    margin-bottom: 20px;
    div {
    }
  }
  .description {
    color: #687481;
    width: 100%;
    font-size: 1.6rem;
    line-height: 1.5;
    font-weight: 500;
  }
  .text {
    font-weight: 300;
    line-height: 1.4;
    font-size: 1.4rem;
    padding: 15px;
  }
  @media (max-width: 1040px) {
    width: 100%;
    margin-right: 0;
    flex-direction: column;
    .author {
      width: 100%;
    }
    .text {
      width: 100%;
    }
    .img_component {
      width: 100%;
      width: 80px;
      margin: 15px;
      height: 80px;
    }
    .name {
      font-size: 1.8rem;
      text-align: left;
      line-height: 1.4;
    }
  }
`;

const Reviews = (props) => {
  const { t } = useTranslation("coursePage");

  const reviews = props.data.reviews.reviews;
  return (
    <Styles>
      <Container>
        <h2>{t("reviews")}</h2>
        <ReviewsList>
          {reviews.map((r, i) => (
            <Review key={i}>
              {r.image && r.image.length > 0 && (
                <div className="author">
                  <div className="img_component">
                    <img src={r.image} layout="fill" />
                  </div>
                </div>
              )}
              <div className="text">
                <div className="name">
                  <div>{r.name}</div>
                </div>
                <div className="description">{renderHTML(r.text)}</div>
              </div>
            </Review>
          ))}
        </ReviewsList>
      </Container>
    </Styles>
  );
};

export default Reviews;
