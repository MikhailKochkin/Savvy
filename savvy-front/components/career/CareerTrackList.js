import React, { Component } from "react";
import styled from "styled-components";
import CareerTrackUnit from "./CareerTrackUnit";

const ListStyle = styled.div`
  background-color: white;
  display: block;
  border: 0.25px solid #f8f8f8;
  border-radius: 4px;
  padding: 2% 4%;
  margin-bottom: 2rem;
  @media (max-width: 700px) {
    margin-right: 0;
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

const Title = styled.p`
  margin-top: 10px;
`;

class CareerTrackList extends Component {
  render() {
    const newList = this.props.CareerList.sort((a, b) =>
      a.numInCareerTrack > b.numInCareerTrack ? 1 : -1
    );
    console.log(this.props.careerTrackUnits);
    const { careerTrackUnits } = this.props;
    console.log(careerTrackUnits);
    return (
      <ListStyle>
        <Title>Рекомендованная программа карьерного трека:</Title>
        {careerTrackUnits.map((unit, index) => (
          <CareerTrackUnit unit={unit} index={index + 1} />
        ))}
      </ListStyle>
    );
  }
}

export default CareerTrackList;
