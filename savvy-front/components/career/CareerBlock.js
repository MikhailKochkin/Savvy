import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
// import 

const Styles = styled.div`
    background: white;
    border-radius: 4px;
    padding:2%;
    padding-left:4%;
    margin-bottom: 3%;
`;


class CareerBlock extends Component {
    render() {
        const courses = this.props.careerList
        return (
            <Styles>
                <h2>Список курсов для карьерных треков</h2>
                <p>Советуем развиваться по следующему плану:</p>
                <ol>{courses.map(item => 
                    <li>{item.title} - {item.courseType === "PUBLIC" ? "Бесплатно" : "Платно"} – <span/>
                    <Link href={{
                            pathname: '/coursePage',
                            query: {id: item.id}
                        }}>
                            <button> Перейти</button>
                    </Link>
                    
                    </li>
                )}</ol>
            </Styles>
        );
    }
}

export default CareerBlock;