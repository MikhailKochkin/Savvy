import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const ListStyle = styled.div`
    background-color: white;
    display: block;
    /* font-size: 1.6rem; */
    border: 0.25px solid #F8F8F8;
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

const Button = styled.button`
    background: none;
    border: none;
    font-size: 1.8rem;
    font-style: italic;
    color: #112A61;
    padding: 0%;
    cursor: pointer;
    &:hover{
        color: #145C9E;
    }
`;

const Number = styled.span`
    border: 1px solid green;
    border: ${props => props.primary ? `1px solid ${props.primary}` : `1px solid black`};
    padding:1%;
    border-radius: 50%;
    display: inline-block;
    height: 30px;
    width: 30px;
    line-height: 20px;
    text-align: center;
    -moz-border-radius: 30px;
`;

class CareerTrackList extends Component {
    render() {
        const newList = this.props.CareerList.sort((a, b) => (a.numInCareerTrack > b.numInCareerTrack) ? 1 : -1)
        return (
            <ListStyle>

                    <Title>Рекомендованная программа карьерного трека:</Title>
                    <ol>
                    {newList.map(item => (
                    <>
                        {this.props.mySubjects.includes(item.id) ? 
                        <>
                        <li key={item.numInCareerTrack}><Number primary={"#F89B4F"}>{item.numInCareerTrack}.</Number>
                            <span> </span>
                            {item.title} – <span/>
                            <Link href={{
                                pathname: '/coursePage',
                                query: {id: item.id}
                            }}>
                            <Button>Перейти</Button>
                            </Link>
                        </li>
                        </>
                        : 
                        <li key={item.numInCareerTrack}><Number primary={"#008CBA"}>{item.numInCareerTrack}.</Number>
                            <span> </span>
                            {item.title} – <span/>
                            <Link href={{
                                pathname: '/coursePage',
                                query: {id: item.id}
                            }}>
                            <Button>Перейти</Button>
                            </Link>
                        </li> }
                    </> )
                    )}
                    </ol>
            </ListStyle>
        );
    }
}

export default CareerTrackList;