import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  /* min-height: 100vh; */
  width: 100vw;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 4rem;
    font-weight: 600;
    width: 80%;
    line-height: 1.4;
    margin-bottom: 50px;
    span {
      color: #3175f3;
    }
  }
  .parent {
    width: 90%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    /* grid-column-gap: 20px; */
  }

  .div1 {
    width: 370px;
    height: 330px;
    box-shadow: 0px 0px 5px rgba(149, 149, 149, 0.5);
    border-radius: 5px;
    border-top: 5px solid #f9ca16;
    transform: rotate(-1deg);
  }
  .div2 {
    width: 370px;
    box-shadow: 0px 0px 5px rgba(149, 149, 149, 0.5);
    border-radius: 5px;
    border-top: 5px solid #f9ca16;
    transform: rotate(1deg);
    height: 330px;
  }
  .div4 {
    width: 370px;
    box-shadow: 0px 0px 5px rgba(149, 149, 149, 0.5);
    border-radius: 5px;
    border-top: 5px solid #f9ca16;
    transform: rotate(1deg);
    height: 330px;
  }
  @media (max-width: 800px) {
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

const Reviews = () => {
  return (
    <Styles>
      <div class="parent">
        <div class="div1">
          <Review>
            <div className="author">
              <img src="https://sun9-26.userapi.com/impg/bW8uzC2OgE3N6mQ-UbGADprJjRKIozlD01DDhQ/K9y5nSC4IXM.jpg?size=1344x1792&quality=96&sign=6a0b284d5b394f7bc00e97f044a1a325&type=album" />
            </div>
            <div className="bubble">
              "После прохождения курса, невольно возникает вопрос, почему я не
              сделала это раньше?"
            </div>
            <div className="author">
              <div>
                <a href="https://vk.com/id89433019" target="_blank">
                  Анастасия Рудановская
                </a>
              </div>
            </div>
          </Review>
        </div>
        <div class="div2">
          {" "}
          <Review>
            <div className="author">
              <img src="https://sun9-48.userapi.com/impg/Eetn8cWpPY7rs__wS5FtQ9CRUylgePZ1PKSfPg/GxsQHAjsdHU.jpg?size=1080x1080&quality=96&sign=e9338491a7126108265a09b8469199f9&type=album" />
            </div>
            <div className="bubble">
              "Я получила инструменты для составления юридических документов и
              сейчас реализую их на практике."
            </div>
            <div className="author">
              <div>
                <a href="https://vk.com/veraglazik" target="_blank">
                  Вера Захарова
                </a>
              </div>
            </div>
          </Review>
        </div>

        <div class="div4">
          <Review>
            <div className="author">
              <img src="https://sun9-15.userapi.com/impg/Qa7Iq2HVJQSMkBnBbk3H4wZUXyVZN6fPOu9TqA/REW7SpbeV68.jpg?size=1534x2160&quality=96&sign=8cd3260f7c157977cba6654d06c2c046&type=album" />
            </div>
            <div className="bubble">
              <p>
                "Решение начать этот курс – одно из самых правильных моих
                решений."
              </p>
            </div>
            <div className="author">
              <div>
                <a
                  href="https://vk.com/topic-165635789_39227413"
                  target="_blank"
                >
                  Настя Шашкина
                </a>
              </div>
            </div>
          </Review>
        </div>
      </div>
    </Styles>
  );
};

export default Reviews;
