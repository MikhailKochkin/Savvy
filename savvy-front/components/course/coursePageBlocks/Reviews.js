import React from "react";
import styled from "styled-components";

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
    text-align: center;
    font-weight: 400;
    font-size: 3rem;
    line-height: 1.4;
    margin-bottom: 100px;
  }
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: space-between;
  width: 100%;
`;

const Review = styled.div`
  width: 410px;
  display: flex;
  background: #fff;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 40px;
  box-shadow: 0px 0px 10px rgba(129, 129, 129, 0.45);
  border-radius: 5px;
  padding: 40px 0;
  position: relative;
  .header {
    display: flex;
    width: 80%;
    flex-direction: row;
    align-items: space-between;
    justify-content: space-between;
    .name {
      color: #313d48;
      font-size: 2.2rem;
      text-align: center;
      line-height: 1.4;
      margin-bottom: 20px;
    }
  }

  .description {
    color: #687481;
    width: 80%;
    font-size: 1.4rem;
    line-height: 1.5;
  }
  img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 50px;
    position: absolute;
    top: -45px;
    z-index: 1;
  }
  .header {
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 1.4;
    margin-bottom: 10px;
    span {
      padding-bottom: 1px;
      border-bottom: 2px solid #d7690b;
    }
  }
  .text {
    font-weight: 300;
    line-height: 1.4;
    font-size: 1.4rem;
  }
  @media (max-width: 1040px) {
    .header {
      .name {
        font-size: 1.8rem;
        text-align: left;
        line-height: 1.4;
      }
    }
  }
`;

const Reviews = () => {
  return (
    <Styles>
      <Container>
        <h2>Отзывы участников о программе:</h2>
        <ReviewsList>
          <Review>
            <div className="header">
              <div className="name">Карина Б.</div>
              <div className="arrows">⭐️ ⭐️ ⭐️ ⭐️ ⭐️</div>
            </div>
            <div className="description">
              Этот курс стал для меня неотъемлемым помощником в эффективном
              изучении гражданского права. Материал изложен очень лаконично и
              интересно, а также помогает систематизировать полученные знания.
              Спасибо создателям курса!
            </div>
          </Review>
          <Review>
            <div className="header">
              <div className="name">Игорь Б.</div>
              <div className="arrows">⭐️ ⭐️ ⭐️ ⭐️ ⭐️</div>
            </div>
            <div className="description">
              Хороший курс. Вопрос по реальным и консенсуальным договорам
              попался на собеседовании. А мне изначально казалось, что это
              глупый вопрос.
            </div>
          </Review>
          <Review>
            <div className="header">
              <div className="name">Екатерина П.</div>
              <div className="arrows">⭐️ ⭐️ ⭐️ ⭐️ ⭐️</div>
            </div>
            <div className="description">
              Курс мне очень понравился! Все очень понятно, структурировано!
            </div>
          </Review>
          <Review>
            <div className="header">
              <div className="name">Анастасия Б.</div>
              <div className="arrows">⭐️ ⭐️ ⭐️ ⭐️ ⭐️</div>
            </div>
            <div className="description">
              Курс четко структурирован, что позволяет последовательно изучить
              непростой материал. Также, хочется отметить, что такой подход
              особенно сильно выручает в сессионный период, когда объем
              информации для усвоения только копится день ото дня.
            </div>
          </Review>
        </ReviewsList>
      </Container>
    </Styles>
  );
};

export default Reviews;
