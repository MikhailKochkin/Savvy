import { useState } from "react";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import ReactResizeDetector from "react-resize-detector";

const Styles = styled.div`
  height: 80vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  #header {
    width: 80%;
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 1%;
  }
  @media (max-width: 800px) {
    height: auto;
    margin: 50px 0;
    #header {
      font-size: 2.2rem;
      margin: 20px 0;
    }
  }
`;

const Box = styled.div`
  width: 90%;
  padding: 1% 3%;
  @media (max-width: 800px) {
    /* border: 1px solid red; */
  }
`;

const Slide = styled.div`
  width: 90%;
  background: #f3f0ea;
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
      border: 1px solid;
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

const About = () => {
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
      <div id="header">Create simulators for any high skilled job</div>
      <Box>
        <Carousel
          responsive={responsive}
          partialVisible={width > 800 ? true : false}
        >
          <Slide>
            <Text>
              <div>
                <div className="header2">Case studies</div>
                <div className="text">
                  Learn to solve legal & business cases with our e-mentor
                </div>
                <button className="button">Try it</button>
              </div>
            </Text>
            <div className="image">
              <img src="../../static/CaseStudies.png" />
            </div>
          </Slide>
          <Slide>
            <Text>
              <div>
                <div className="header2">Decision Maker Simulator</div>
                <div className="text">
                  Master your decision-making skills using data and dashboards
                </div>
                <button className="button">Try it</button>
              </div>
            </Text>
            <div className="image">
              <img src="../../static/DecisionMaker.png" />
            </div>
          </Slide>
          <Slide>
            <Text>
              <div>
                <div className="header2">Document Builders</div>
                <div className="text">
                  Learn to draft complex documents from scratch
                </div>
                <button className="button">Try it</button>
              </div>
            </Text>
            <div className="image">
              <img src="../../static/DocBuilder.png" />
            </div>
          </Slide>
          <Slide>
            <Text>
              <div>
                <div className="header2">Text Checker</div>
                <div className="text">
                  Learn to find mistakes and insights in texts and data
                </div>
                <button className="button">Try it</button>
              </div>
            </Text>
            <div className="image">
              <img src="../../static/TextEditor.png" />
            </div>
          </Slide>
        </Carousel>
      </Box>
    </Styles>
  );
};

export default About;
