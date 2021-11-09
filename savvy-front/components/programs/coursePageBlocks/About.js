import { useState } from "react";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReactResizeDetector from "react-resize-detector";
// s
const Styles = styled.div`
  min-height: 60vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  .custom-shape-divider-top-1615390650 {
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
  }

  .custom-shape-divider-top-1615390650 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 133px;
  }

  .custom-shape-divider-top-1615390650 .shape-fill {
    fill: #f5f5f5;
  }

  h2 {
    text-align: left;
    font-weight: 400;
    font-size: 3.2rem;
    line-height: 1.4;
    width: 90%;
    margin: 80px 0;
  }
  @media (max-width: 800px) {
    h2 {
      margin-bottom: 40px;
      font-size: 3.2rem;
    }
  }
  @media (max-width: 800px) {
    height: auto;
    /* margin: 50px 0; */
  }
`;

const Container = styled.div`
  width: 80%;
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const Box = styled.div`
  width: 100%;
  padding: 1% 3%;
  @media (max-width: 800px) {
    /* border: 1px solid red; */
  }
`;

const Slide = styled.div`
  width: 90%;
  background: #f5f5f5;
  padding: 3%;
  height: 400px;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  .image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    img {
      object-fit: cover;

      max-height: 95%;

      /* border: 1px solid; */
      /* border-radius: 6px; */
    }
  }
  @media (max-width: 800px) {
    width: 300px;
    flex-direction: column;
    height: auto;

    /* justify-content: center;
    align-items: center;
    border: 1px solid grey;
    width: 100%;

    .image {
      height: 50%;
      display: block;
    } */
    .image {
      width: 100%;
      img {
        width: 100%;

        /* object-fit: cover; */
        /* height: 100%; */
        border-radius: 6px;
      }
    }
  }
`;

const Text = styled.div`
  width: 50%;
  padding: 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .header2 {
    font-size: 2.6rem;
    font-weight: bold;
    margin-bottom: 10px;
    line-height: 1.4;
  }
  .text {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  .button {
    background: black;
    padding: 2%;
    color: white;
    font-family: Montserrat;
    border: 2px solid black;
    font-size: 1.8rem;
    border-radius: 5px;
    width: 140px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      background: white;
      color: black;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const About = (props) => {
  const [width, setWidth] = useState(0);
  const onResize = (width) => setWidth(width);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 200,
    },
    tablet: {
      breakpoint: { max: 1024, min: 800 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 800, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 0,
    },
  };
  return (
    <Styles id="about">
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <Container>
        <h2 id="header">
          Получите практические навыки с помощью онлайн-тренажеров
        </h2>
        <Box>
          <Carousel
            responsive={responsive}
            partialVisible={width > 800 ? true : false}
          >
            <Slide>
              <Text>
                <div>
                  <div className="header2">Тренажер для решения кейсов</div>
                  <div className="text">
                    Научим решать юридические кейсы: зададим наводящие вопросы,
                    дадим фидбэк по неправильным ответам и покажем образцовый
                    ответ.
                  </div>
                </div>
              </Text>
              <div className="image">
                <img src="../../static/CaseStudies.png" />
              </div>
            </Slide>
            <Slide>
              <Text>
                <div>
                  <div className="header2">Редактор документов</div>
                  <div className="text">
                    Научим находить и исправлять риски и ошибки в документах
                  </div>
                  {/* <button className="button">Try it</button> */}
                </div>
              </Text>
              <div className="image">
                <img src="../../static/TextEditor.png" />
              </div>
            </Slide>
            <Slide>
              <Text>
                <div>
                  <div className="header2">Симулятор принятия решений</div>
                  <div className="text">
                    Учитесь принимать решения на основе данных и дэшбордов
                  </div>
                </div>
              </Text>
              <div className="image">
                <img src="../../static/DecisionMaker.png" />
              </div>
            </Slide>
            <Slide>
              <Text>
                <div>
                  <div className="header2">Конструктор документов</div>
                  <div className="text">
                    Покажем, как струкутрировать и составить документ, используя
                    лучшие практики
                  </div>
                </div>
              </Text>
              <div className="image">
                <img src="../../static/DocBuilder.png" />
              </div>
            </Slide>
          </Carousel>
        </Box>
      </Container>
    </Styles>
  );
};

// export default withTranslation("business")(About);
export default About;
