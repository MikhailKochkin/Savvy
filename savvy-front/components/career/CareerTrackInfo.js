import React, { Component } from 'react';
import styled from 'styled-components';

const InfoStyle = styled.div`
    background-color: white;
    margin-left: 2%;
    border: 0.25px solid #F8F8F8;
    border-radius: 4px;
    padding: 4%;
    padding-bottom: 0;
    margin-bottom: 2rem;
    h2 {
        margin-top: 0;
    }
    @media (max-width: 700px) {
        margin-top: 2rem;
        margin-left: 0;
    }
`;


class CareerTrackInfo extends Component {
    render() {
        return (
            <InfoStyle>
                Ваш карьерный трек: <h2> {this.props.name}</h2>
            </InfoStyle>
        );
    }
}

export default CareerTrackInfo;