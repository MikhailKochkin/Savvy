import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const NavButton = styled.button`
    width: 30%;
    color: #0B78C6; 
    background-color: none;
    border: 1px solid #0B78C6;
    border-radius: 6px;
    padding: 1%;
    margin-bottom: 1%;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: 600;
    outline: none;
    &:hover {
        background: #112A62;
        color: white;
    }
    a {
        color: white;
    }
`;

class FetchMore extends Component {
    render() {
        return (
            <>
               <NavButton onClick={this.props.onLoadMore}>Загрузить еще</NavButton> 
            </>
        );
    }
}

export default FetchMore;