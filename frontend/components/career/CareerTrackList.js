import React, { Component } from "react";
import styled from "styled-components";
import Carousel from "nuka-carousel";
import Link from "next/link";
import renderHTML from "react-render-html";
import ReactResizeDetector from "react-resize-detector";
import CareerTrackUnit from "./CareerTrackUnit";

const ListStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2rem;
  margin-right: 2%;
  margin-left: 2%;
  @media (max-width: 900px) {
    margin-right: 0;
    flex-direction: column;
  }
  a {
    border: 1px solid white;
    border-radius: 4px;
    padding: 2%;
    &:hover {
      color: grey;
    }
  }
  li {
    list-style-type: none;
    display: block;
    margin-left: -10%;
    margin-bottom: 3%;
  }
`;

const TrackInfo = styled.div`
  display: flex;
  width: 100%;
  margin: 1% 0;
  flex-direction: row;
  background: #f0f8ff;
  border-radius: 10px;
  padding: 1%;
  .closebtn {
    padding: 8px 8px 0px 16px;
    text-decoration: none;
    font-size: 35px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    padding: 2% 5%;
    margin-bottom: 3%;
    .closebtn {
      padding: 0;
    }
  }
`;

const Subsection = styled.div`
  flex: 33%;
  text-align: left;
  padding: 0 2%;
  border-right: 1px solid #e4e4e4;
  .head {
    font-size: 1.8rem;
  }
  .comment {
    font-size: 1.4rem;
    color: #767676;
    margin-bottom: 10px;
  }
  .link:hover {
    background: white;
  }
  @media (max-width: 900px) {
    border-bottom: 1px solid #e4e4e4;
    border-right: 1px solid #f0f8ff;
    padding: 4% 2%;
  }
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

class CareerTrackList extends Component {
  state = {
    start: 0,
    finish: 2,
    text: "",
    shadow_index: 0,
    width: 0
  };
  myCallback = dataFromChild => {
    this.setState({
      text: dataFromChild
    });
  };
  myCallback2 = dataFromChild => {
    this.setState({
      shadow_index: dataFromChild
    });
  };
  hide = () => {
    this.setState({
      text: "",
      shadow_index: 0
    });
  };
  onResize = width => {
    this.setState({ width });
  };

  render() {
    const { careerTrackUnits } = this.props;
    const { text } = this.state;
    let arr = careerTrackUnits.slice(this.state.start, this.state.finish);
    let slides;
    if (this.state.width > 1200) {
      slides = 5;
    } else if (this.state.width < 1200 && this.state.width > 900) {
      slides = 4;
    } else if (this.state.width < 900 && this.state.width > 650) {
      slides = 3;
    } else if (this.state.width < 650 && this.state.width > 400) {
      slides = 2;
    } else if (this.state.width < 400) {
      slides = 1;
    }
    return (
      <>
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.onResize}
        />

        <ListStyle>
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
            {careerTrackUnits.map((unit, index) => (
              <CareerTrackUnit
                unit={unit}
                index={index + 1}
                shadow_index={this.state.shadow_index}
                onClick={this.onShow}
                getData={this.myCallback}
                getData2={this.myCallback2}
              />
            ))}
          </Carousel>
        </ListStyle>
        {text !== "" && text !== undefined && (
          <>
            <TrackInfo>
              <Subsection className="side">
                <div className="head">Подтемы</div>
                <div className="comment">
                  Составляйте план прохождения темы с помощью подтем:
                </div>
                {text.topics.map((topic, index) => (
                  <div>
                    {index + 1}. {topic}
                  </div>
                ))}
              </Subsection>
              <Subsection className="side">
                <div className="head">Знания</div>
                <div className="comment">
                  Информацию по выбранным подтемам можно получить их этих
                  источников:
                </div>
                {text.articles.map((article, index) => (
                  <div>
                    {" "}
                    {index + 1}. {renderHTML(article)}
                  </div>
                ))}
              </Subsection>
              <Subsection>
                <div className="head">Навыки</div>
                <div className="comment">
                  На основе новых знаний выработайте навыки с помощью курсов:
                </div>
                {text.coursePages.map((course, index) => (
                  <Link
                    href={{
                      pathname: "/coursePage",
                      query: { id: course.id }
                    }}
                  >
                    <a className="link">
                      <div>
                        {index + 1}. {course.title}
                      </div>
                      <div>{course.user.name}</div>
                    </a>
                  </Link>
                ))}
              </Subsection>
              <a href="javascript:void(0)" class="closebtn" onClick={this.hide}>
                &times;
              </a>
            </TrackInfo>
          </>
        )}
      </>
    );
  }
}

export default CareerTrackList;
