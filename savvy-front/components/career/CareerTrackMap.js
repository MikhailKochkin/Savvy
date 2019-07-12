import React, { Component } from 'react';
import styled from 'styled-components';

const Styles = styled.div`
    margin-top: 2%;
`;

const Banner = styled.img`
    width: 100%;;
    max-width: initial;
    height: auto;
`;

const Tech = styled.img`
    width: 100%;;
    max-width: initial;
    height: auto;
`;

class CareerTrackMap extends Component {

    onShow = (e) => {
        const src = e.target.getAttribute("src")
        window.open(src);
    }

    render() {
        return (
            <Styles>
                {this.props.data === "cjwx78u7700rb07121pelqctm" && <Tech src="../static/корпюрист.png" onClick={this.onShow}/>}
                {this.props.data === "cjwx79iaj00rk0712tz12j7vi" && <Banner src="../static/тех.png" onClick={this.onShow}/>}
            </Styles>
        );
    }
}

export default CareerTrackMap;