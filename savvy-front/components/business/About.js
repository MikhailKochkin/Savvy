import { useState } from "react";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Styles = styled.div`
  height: 90vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  #header {
    width: 80%;
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 1%;
  }
  /* .carousel-container {
    background: yellow;
  }*/
`;

const Box = styled.div`
  width: 90%;
  padding: 1% 3%;
`;

const Slide = styled.div`
  width: 90%;
  background: #f3f0ea;
  padding: 3%;
  height: 400px;
  display: flex;
  flex-direction: row;

  .image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    img {
      object-fit: cover;
      height: 100%;
      border-radius: 6px;
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
`;

const About = () => {
  // const [slide, setSlide] = useState(false);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 200,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <Styles id="about">
      <div id="header">Create simulators for any high skilled job</div>
      <Box>
        <Carousel
          responsive={responsive}
          // customTransition="all .5"
          // transitionDuration={500}
          partialVisible={true}
          // infinite={true}
          // showDots={true}
          // renderDotsOutside={true}
        >
          <Slide>
            <Text>
              <div>
                <div className="header2">Case studies</div>
                <div className="text">
                  Our e-mentor can teach how to solve legal & business cases
                </div>
                <button className="button">Try it</button>
              </div>
            </Text>
            <div className="image">
              <img src="https://images.unsplash.com/photo-1572662073398-afd34ca1f866?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1100&q=80" />
            </div>
          </Slide>
          <Slide>
            <Text>
              <div>
                <div className="header2">Decision Maker Simulator</div>
                <div className="text">
                  Our e-mentor can teach how to solve legal & business cases
                </div>
                <button className="button">Try it</button>
              </div>
            </Text>
            <div className="image">
              <img src="https://images.unsplash.com/photo-1572662073398-afd34ca1f866?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1100&q=80" />
            </div>
          </Slide>
          <Slide>
            <Text>
              <div>
                <div className="header2">Document Builders</div>
                <div className="text">
                  Our e-mentor can teach how to solve legal & business cases
                </div>
                <button className="button">Try it</button>
              </div>
            </Text>
            <div className="image">
              <img src="https://images.unsplash.com/photo-1551645120-d70bfe84c826?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80" />
            </div>
          </Slide>
          <Slide>
            <Text>
              <div>
                <div className="header2">Text Editors</div>
                <div className="text">
                  Our e-mentor can teach how to solve legal & business cases
                </div>
                <button className="button">Try it</button>
              </div>
            </Text>
            <div className="image">
              <img src="https://images.unsplash.com/photo-1551645120-d70bfe84c826?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80" />
            </div>
          </Slide>
        </Carousel>
      </Box>
    </Styles>
  );
};

export default About;
