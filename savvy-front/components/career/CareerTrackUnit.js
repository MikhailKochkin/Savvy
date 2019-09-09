import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import Link from "next/link";

const Styles = styled.div`
  /* background: #f0f8ff; */
  object-fit: none;
  /* object-position: 0% 0%; */
  width: 90%;
  height: 210px;
  border-radius: 10px;
  min-height: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 3% 0;
  margin-left: 5%;
  box-shadow: ${props =>
    props.shadow ? `4px 4px 4px rgba(0, 0, 0, 0.1)` : `none`};
`;

const Img = styled.img`
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  flex: 70%;
  height: 70%;
  object-fit: cover;
`;

const Title = styled.div`
  font-size: 1.5rem;
  flex: 30%;
  width: 100%;
  border: 1px solid #e5e5e5;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  text-align: center;

  padding: 5px;
  @media (max-width: 900px) {
    font-size: 1.7rem;
  }
`;

class CareerTrackUnit extends Component {
  state = {
    effect: false
  };
  show = () => {
    this.setState(prevState => ({
      secret: !prevState.secret
    }));
  };
  onShow = () => {
    this.props.getData(this.props.unit);
    this.props.getData2(this.props.index);
  };

  render() {
    const { unit, index, shadow_index } = this.props;
    return (
      <>
        <Styles onClick={this.onShow} shadow={index === shadow_index}>
          <Img src={unit.img} />
          <Title>{unit.title}</Title>
        </Styles>
      </>
    );
  }
}

export default CareerTrackUnit;
