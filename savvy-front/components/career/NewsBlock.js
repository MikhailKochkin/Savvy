import React, { Component } from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';

const Styles = styled.div`
    background: white;
    border-radius: 4px;
    padding:2%;
    padding-left:4%;
`;

const Title = styled.p`
    font-size: 2.6rem;
`;

const Body = styled.p`
    font-size: 1.8rem;
`;


class NewsBlock extends Component {
    render() {
        const List = this.props.NewsList.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1)
        return (
            <Styles>
                {List.map(item => 
                <>
                    <Title>{item.title}</Title>
                    <Moment format="YYYY/MM/DD">{item.createdAt}</Moment>
                    <Body>{item.synopsis}</Body>
                </>           
                )}
            </Styles>
        );
    }
}

export default NewsBlock;