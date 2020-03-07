import React, { useState } from "react";
import styled from "styled-components";
import Icon from "react-icons-kit";
import ReactResizeDetector from "react-resize-detector";
import Carousel from "nuka-carousel";
import { userCircleO } from "react-icons-kit/fa/userCircleO";

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5%;
`;

const Circle = styled.button`
  border: 1px solid #112a62;
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  outline: 0;
  span {
    font-size: 1.8rem;
  }
  &:active {
    border: 2px solid #112a62;
    color: #112a62;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: auto;
  width: 100%;
  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const Review = styled.div`
  background: #f5f5f5;
  border-radius: 5px;
  margin-left: 3%;
  width: 90%;
  padding: 3% 2%;
  margin-left: 5%;
  text-align: center;
  @media (max-width: 1100px) {
    width: 95%;
    margin: 0;
    margin-bottom: 5%;
    padding: 15px;
  }
  .icons {
    text-align: center;
    margin-bottom: 3%;
  }
  .author {
    font-weight: bold;
    margin-top: 3%;
  }
`;

const Reviews = () => {
  const [width, setWidth] = useState(0);
  const onResize = width => {
    setWidth(width);
  };
  let slides;
  if (width > 650) {
    slides = 3;
  } else if (width < 650 && width > 400) {
    slides = 2;
  } else if (width < 400) {
    slides = 1;
  }
  return (
    <>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <Title>Что говорят пользователи про наши курсы:</Title>
      <Block>
        <Carousel
          slidesToShow={slides}
          renderBottomCenterControls={false}
          renderCenterLeftControls={({ previousSlide }) => (
            <Circle onClick={previousSlide}>
              <span>&#8249;</span>
            </Circle>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <Circle onClick={nextSlide}>
              <span>&#8250;</span>
            </Circle>
          )}
        >
          <Review>
            <div className="icons">
              <Icon size={30} icon={userCircleO} />
              <div className="author">
                <a
                  href="https://vk.com/topic-165635789_39227413"
                  target="_blank"
                >
                  Karina Karatamakova
                </a>
              </div>
            </div>
            <div>
              Несомненным плюсом является и то, что курс [по юридическому
              английскому] максимально адаптирован под современные реалии, нет
              абстрактных и отвлеченных заданий. Задания небольшие по объему,
              каждое из них направлено на то, чтобы быстро сформировать навык,
              который сразу же можно применить на практике.
            </div>
          </Review>
          <Review>
            <div className="icons">
              <Icon size={30} icon={userCircleO} />
              <div className="author">
                <a
                  href="https://vk.com/topic-165635789_39227413"
                  target="_blank"
                >
                  Кристина Буракова
                </a>
              </div>
            </div>
            <div>
              Наставник (Михаил) структурирует каждое занятие так, что материал
              действительно усваивается, причём это не скучные правила
              грамматики, а именно развитие юридических навыков. Самое важное
              для меня в курсе - стремление преподнести только нужный материал,
              который пригодится в юридический практике.
            </div>
          </Review>
          <Review>
            <div className="icons">
              <Icon size={30} icon={userCircleO} />
              <div className="author">
                <a
                  href="https://www.instagram.com/p/B7ToStbI79t/"
                  target="_blank"
                >
                  margaret_get_tart
                </a>
              </div>
            </div>
            <div>
              Очень интересный проект! понравилось,что можно быстро освежить
              знания по ГП. Будет интересно увидеть и другие курсы)для молодых
              специалистов именно такого проекта не хватало)
            </div>
          </Review>
          <Review>
            <div className="icons">
              <Icon size={30} icon={userCircleO} />
              <div className="author">
                <a
                  href="https://vk.com/topic-165635789_39227413"
                  target="_blank"
                >
                  Илья Казеко
                </a>
              </div>
            </div>
            <div>
              Решение начать этот курс [юридического английского] - одно из
              самых правильных моих решений. Хочу поблагодарить Мишу за хороший
              и доступный по цене курс.
              <br />В целом, рекомендовал бы каждому пройти как минимум первый
              месяц, чтобы оценить свои навыки и увидеть зоны роста.
            </div>
          </Review>
          <Review>
            <div className="icons">
              <Icon size={30} icon={userCircleO} />
              <div className="author">
                <a
                  href="https://vk.com/topic-165635789_39227413"
                  target="_blank"
                >
                  Лев Толстопятов
                </a>
              </div>
            </div>
            <div>
              Михаил помогает выяснить, как используется грамматика в том или
              ином случае, применительно к юридическому английскому (к примеру,
              на данный момент мы проходим модальные глаголы. Казалось бы, для
              человека, который изучал английский, они не представляют
              сложности, но на самом деле в юридическом английском есть, как
              оказалось, определенные тонкости).
            </div>
          </Review>
        </Carousel>
      </Block>
    </>
  );
};

export default Reviews;
