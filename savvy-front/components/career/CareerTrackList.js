import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const ListStyle = styled.div`
    background-color: white;
    /* font-size: 1.6rem; */
    margin-left: 2%;
    border: 0.25px solid #F8F8F8;
    border-radius: 4px;
    padding: 2% 4%;
    margin-bottom: 2rem;
    @media (max-width: 700px) {
        margin-left: 0;
    }
    a {
        border: 1px solid white;
        /* background: #00CC00; */
        border-radius: 4px;
        padding: 2%;
        &:hover {
            color: grey;
        }
    }
`;

const Title = styled.p`
    font-size: 2rem;
    font-style: italic;
    margin-top: 10px;
`;

const Button = styled.button`
    background: none;
    border: none;
    font-size: 1.8rem;
    font-style: italic;
    color: #112A61;
    padding: 0;
    cursor: pointer;
    &:hover{
        color: #145C9E;
    }
`;

class CareerTrackList extends Component {
    render() {
        const newList = this.props.CareerList.sort((a, b) => (a.numInCareerTrack > b.numInCareerTrack) ? 1 : -1)
        return (
            <ListStyle>

                    <Title>Рекомендованная программа карьерного трека:</Title>
                    {newList.map(item =>
                    <>
                        <p key={item.numInCareerTrack}>{item.numInCareerTrack}. {item.title} – <span/>
                        <Link href={{
                            pathname: '/coursePage',
                            query: {id: item.id}
                          }}>
                          <Button>Перейти</Button>
                        </Link>
                        </p>
                    </>
                    )}
            </ListStyle>
        );
    }
}

export default CareerTrackList;