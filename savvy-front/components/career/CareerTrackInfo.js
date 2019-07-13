import React, { Component } from 'react';
import styled from 'styled-components';

const InfoStyle = styled.div`
    background-color: white;
    border: 0.25px solid #F8F8F8;
    border-radius: 4px;
    padding: 4%;
    padding-bottom: 0;
    margin-bottom: 2rem;
    @media (max-width: 700px) {
        margin-top: 2rem;
        margin-right: 0;
    }
`;


class CareerTrackInfo extends Component {
    render() {
        return (
            <InfoStyle>
                Ваш карьерный трек: <h3> {this.props.name}</h3>
            </InfoStyle>
        );
    }
}

export default CareerTrackInfo;