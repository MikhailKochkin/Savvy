import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const Styles = styled.div`
  /* min-height: 100vh; */
  width: 100vw;
  min-height: 30vh;

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
  h2 {
    font-size: 3.4rem;
    font-weight: 600;
    width: 100%;
    line-height: 1.2;
    text-align: center;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    h2 {
      font-size: 3rem;
    }
  }
`;

const Logos = styled.div`
  width: 40vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  img {
    height: 70px;
    margin: 20px 0;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    img {
      height: 40px;
      margin: 20px 0;
    }
  }
`;

const Reviews = () => {
  const router = useRouter();

  let eng_reviews = [
    {
      text: "I wish I had started this Legal English course earlier.",
      author_name: "Nastya R.",
      author_image:
        "https://sun9-26.userapi.com/impg/bW8uzC2OgE3N6mQ-UbGADprJjRKIozlD01DDhQ/K9y5nSC4IXM.jpg?size=1344x1792&quality=96&sign=6a0b284d5b394f7bc00e97f044a1a325&type=album",
    },
    {
      text: "I acquired drafting skills that I can now use in my every-day job.",
      author_name: "Vera Z.",
      author_image:
        "https://sun9-48.userapi.com/impg/Eetn8cWpPY7rs__wS5FtQ9CRUylgePZ1PKSfPg/GxsQHAjsdHU.jpg?size=1080x1080&quality=96&sign=e9338491a7126108265a09b8469199f9&type=album",
    },
    {
      text: "Enrolling on this course was one of the best educational decisions I have ever made.",
      author_name: "Nastya Sh.",
      author_image:
        "https://sun9-15.userapi.com/impg/Qa7Iq2HVJQSMkBnBbk3H4wZUXyVZN6fPOu9TqA/REW7SpbeV68.jpg?size=1534x2160&quality=96&sign=8cd3260f7c157977cba6654d06c2c046&type=album",
    },
  ];

  let rus_reviews = [
    {
      text: "После прохождения курса, невольно возникает вопрос, почему я не сделала это раньше?",
      author_name: "Анастасия Рудановская",
      author_image:
        "https://sun9-26.userapi.com/impg/bW8uzC2OgE3N6mQ-UbGADprJjRKIozlD01DDhQ/K9y5nSC4IXM.jpg?size=1344x1792&quality=96&sign=6a0b284d5b394f7bc00e97f044a1a325&type=album",
    },
    {
      text: "Я получила инструменты для составления юр документов и сейчас использую их на практике.",
      author_name: "Вера Захарова",
      author_image:
        "https://sun9-48.userapi.com/impg/Eetn8cWpPY7rs__wS5FtQ9CRUylgePZ1PKSfPg/GxsQHAjsdHU.jpg?size=1080x1080&quality=96&sign=e9338491a7126108265a09b8469199f9&type=album",
    },
    {
      text: "Решение начать этот курс – одно из самых правильных моих решений.",
      author_name: "Настя Шашкина",
      author_image:
        "https://sun9-15.userapi.com/impg/Qa7Iq2HVJQSMkBnBbk3H4wZUXyVZN6fPOu9TqA/REW7SpbeV68.jpg?size=1534x2160&quality=96&sign=8cd3260f7c157977cba6654d06c2c046&type=album",
    },
  ];

  let reviews;
  router.locale == "ru" ? (reviews = rus_reviews) : (reviews = eng_reviews);

  return (
    <Styles>
      {router.locale == "ru" ? (
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
      ) : (
        <LogoBlock>
          <h2>Worked with and supported by</h2>
          <Logos>
            <img src="static/Strive.png" alt="" />
            <img src="static/lawtechuk.png" alt="" />
          </Logos>
        </LogoBlock>
      )}
    </Styles>
  );
};

export default Reviews;
