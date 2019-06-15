import React, { Component } from 'react';
import styled from 'styled-components';

const InfoStyle = styled.div`
    
`;


class CareerTrackChoose extends Component {
    render() {
        return (
            <InfoStyle>
                {this.props.auth ? "Выберите карьерный трек в личном кабинете. Он откроет доступ к специальной аналитике, новостям и скидкам на курсы" : 
                "Зарегистрируйтесь на сайте, чтобы получить доступ ко всем материалам и преимуществам сайта."}
            </InfoStyle>
        );
    }
}

export default CareerTrackChoose;