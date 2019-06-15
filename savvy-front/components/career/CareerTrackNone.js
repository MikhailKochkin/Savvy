import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import CareerTrackChoose from './CareerTrackChoose';

const MenuStyle = styled.div`
    background-color: white;
    font-size: 2rem;
    margin-left: 2%;
    border: 0.25px solid #F8F8F8;
    border-radius: 4px;
    padding: 4%;
    margin-bottom: 2rem;
    @media (max-width: 700px) {
        margin-top: 2rem;
        margin-left: 0;
    }
    button {
        margin-top: 3%;
        padding: 2% 4%;
        font-size: 1.6rem;
        background: #4DAC44;
        color: white;
        border: none;
        border-radius: 6px;
        outline: none;
        cursor: pointer;
        &:hover {
            background: #006400;
        }
    }
`;

class CareerTrackNone extends Component {
    render() {
        return (
                <MenuStyle>
                    <CareerTrackChoose auth = {this.props.me}/>
                    {this.props.me ? <Link 
                        prefetch
                        href={{
                            pathname: 'account',
                            query: {id: this.props.me}
                    
                    }}>
                    <button>Выбрать</button>
                    </Link> :
                    <Link prefetch href="/signup">
                        <button>Зарегистрироваться</button>
                    </Link>
                      
                }
                </MenuStyle>
            )
        }
    }

export default CareerTrackNone;