import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const Styles = styled.div`
  /* min-height: 100vh; */
  width: 100vw;
  min-height: 30vh;
  background: #fffaf6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 4rem;
    font-weight: 500;
    width: 80%;
    line-height: 1.4;
    color: #b0b0b0;
    margin-bottom: 50px;
    span {
      color: #b0b0b0;
    }
  }
  .parent {
    width: 90%;
    display: flex;
    flex-direction: row;
    max-width: 1300px;
    margin-bottom: 50px;
    flex-wrap: nowrap;
    justify-content: space-between;
    /* grid-column-gap: 20px; */
  }

  .div1 {
    width: 370px;
    height: 330px;
    box-shadow: 0px 0px 5px rgba(149, 149, 149, 0.5);
    border-radius: 5px;
    border-top: 5px solid #f9ca16;
    transform: rotate(1deg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .div2 {
    width: 370px;
    box-shadow: 0px 0px 5px rgba(149, 149, 149, 0.5);
    border-radius: 5px;
    border-top: 5px solid #f9ca16;
    transform: rotate(-1deg);
    height: 330px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .div4 {
    width: 370px;
    box-shadow: 0px 0px 5px rgba(149, 149, 149, 0.5);
    border-radius: 5px;
    border-top: 5px solid #f9ca16;
    transform: rotate(1deg);
    height: 330px;
  }
  @media (max-width: 1200px) {
    .parent {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      /* width: 95%; */
      .div1 {
        margin-bottom: 50px;
      }
      .div2 {
        margin-bottom: 50px;
      }
      .div4 {
        margin-bottom: 50px;
      }
    }
  }
  @media (max-width: 600px) {
    h2 {
      font-size: 3.4rem;
      margin-bottom: 30px;
      width: 85%;
    }
    .parent {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 95%;
    }
    .div1 {
      width: 90%;
      margin-bottom: 30px;
    }
    .div2 {
      width: 90%;
      margin-bottom: 30px;
    }
    .div3 {
      width: 90%;
      margin-bottom: 30px;
    }
    .div4 {
      width: 90%;
      margin-bottom: 30px;
    }
  }
`;
const Review = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .bubble {
    border-radius: 10px;
    text-align: center;
    font-size: 1.8rem;
    color: #4b5563;
    padding: 3%;
    p {
      margin: 10px 0;
    }
  }
  .author {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top: 1px solid #fff;
    padding-top: 10px;
    margin-top: 10px;
    font-size: 2rem;
    font-weight: 500;
    a {
      transition: ease-in 0.2s;
      &:hover {
        text-decoration: underline;
      }
    }
    img {
      width: 80px;
      border-radius: 50%;
      margin-right: 15px;
      height: 80px;
      object-fit: cover;
    }
  }
  @media (max-width: 800px) {
    padding-left: 0%;
    width: 100%;
    .bubble {
      width: 100%;
      margin-bottom: 20px;
    }
    .author {
      margin-top: 0px;
    }
    a {
      font-size: 2rem;
    }
  }
`;

const LogoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 150px;
  margin-top: 80px;
  max-width: 750px;
  h2 {
    font-size: 3.4rem;
    font-weight: 600;
    width: 100%;
    line-height: 1.2;
    text-align: center;
  }
  @media (max-width: 800px) {
    margin-bottom: 20px;

    flex-direction: column;
    h2 {
      font-size: 3rem;
    }
  }
`;

const Logos = styled.div`
  width: 50vw;
  max-width: 700px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  img {
    height: 55px;
    margin: 20px 0;
    /* filter: grayscale(100%); */
  }
  @media (max-width: 1000px) {
    width: 90vw;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    img {
      height: 40px;
      margin: 20px 0;
    }
  }
`;

const Reviews = () => {
  const router = useRouter();

  return (
    <Styles>
      {/* {router.locale == "ru" ? (
        <div class="parent">
          {reviews.map((r, i) => (
            <div
              key={"review" + i}
              className={(i + 1) % 2 == 0 ? "div1" : "div2"}
            >
              <Review>
                <div className="author">
                  <img src={r.author_image} />
                </div>
                <div className="bubble">{r.text}</div>
                <div className="author">
                  <div>{r.author_name}</div>
                </div>
              </Review>
            </div>
          ))}
        </div>
      ) : ( */}
      <LogoBlock>
        <h2>
          {router.locale == "ru"
            ? "Клиенты и партнеры"
            : "Worked with and supported by"}
        </h2>
        <Logos>
          {/* P&C */}
          {/* <img
            src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1725619037/Screenshot_2024-09-06_at_14.36.20.png"
            alt=""
          /> */}
          {/* LawtechUK */}
          <img src="static/lawtechuk.png" alt="" />
          {/* Wealthbrite */}
          <img
            src="https://images.squarespace-cdn.com/content/v1/61eed1691f94c320aaed58e6/425e7edc-b9be-4271-9132-765bb4237f4b/WEALTHBRITE-wordmark-Black.png"
            alt=""
          />
          {/* Avail */}
          <img
            src="https://www.legalgeek.co/wp-content/uploads/2023/02/Avail-logo-1-200x100-1.png"
            alt=""
          />
          {/* Rigas */}
          <img
            src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1725619314/Screenshot_2024-09-06_at_14.41.45.png"
            alt=""
          />

          {/* <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrJ46SxnTGYW1Ph5MCiW4xius8DHlh6vSOzw&s"
            alt=""
          /> */}
          <img src="static/Strive.png" alt="" />
        </Logos>
      </LogoBlock>
    </Styles>
  );
};

export default Reviews;
