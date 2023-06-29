import React from "react";
import styled from "styled-components";
import parse from 'html-react-parser';


const Styles = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    text-align: left;
    font-weight: 400;
    font-size: 4rem;
    line-height: 1.4;
    width: 100%;
    margin: 80px 0;
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
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: space-between;
  width: 100%;
`;

const Review = styled.div`
  width: 450px;
  margin-right: 50px;
  display: flex;
  background: #fff;
  flex-direction: column;
  margin-bottom: 40px;
  box-shadow: 0px 0px 10px rgba(129, 129, 129, 0.45);
  border-radius: 5px;
  position: relative;
  .img_component {
    width: 100%;
    height: 150px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    position: relative;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }
  .author {
    width: 100%;
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
    font-size: 1.4rem;
    line-height: 1.5;
  }
  .text {
    font-weight: 300;
    line-height: 1.4;
    font-size: 1.4rem;
    padding: 4%;
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
      height: 200px;
    }
    .name {
      font-size: 1.8rem;
      text-align: left;
      line-height: 1.4;
    }
  }
`;

const Reviews = (props) => {
  const d = props.data;
  return (
    <Styles id="reviews">
      <Container>
        <h2>Отзывы участников</h2>
        <ReviewsList>
          {d.reviews.map((r, i) => (
            <Review key={i}>
              {r.img && r.img.length > 0 && (
                <div className="author">
                  <div className="img_component">
                    <img src={r.img} layout="fill" />
                  </div>
                </div>
              )}
              <div className="text">
                <div className="name">
                  <div>{r.name}</div>
                </div>
                <div className="description">{parse(r.info)}</div>
              </div>
            </Review>
          ))}
        </ReviewsList>
      </Container>
    </Styles>
  );
};

export default Reviews;
