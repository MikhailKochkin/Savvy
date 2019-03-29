import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import styled from 'styled-components';
import PointATest from './PointATest';
import User from '../User';


const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: ID!) {
    coursePage(where: { id: $id }) {
        pointsA {
            id
            description
        }
        pointATests {
            id
            answer1
            answer1Correct
            answer2
            answer2Correct
            answer3
            answer3Correct
            answer4
            answer4Correct
            question
            user {
                id
            }
        }
    }
  }
`;

const TextBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;;
  font-size: 1.8rem;
  padding: 0 2%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Center = styled.div`
    /* border-top: 1px solid #0A2342; */
    padding-top: 1%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

class PointA extends Component {
    render() {
        return (
            <User>
            {({data: {me}}) => (
                <Query
                    query={SINGLE_COURSEPAGE_QUERY}
                    variables={{
                        id: this.props.id,
                    }}
                >
                    {({ data, error, loading }) => {
                        if (loading) return <p>Loading...</p>;
                        return (
                            <Center>
                                <TextBar>
                                    <h2>Готовы ли вы проходить этот курс?</h2>
                                    {data.coursePage.pointsA.map(point => 
                                        <div key={point.id}>
                                            {renderHTML(point.description)}
                                            <Link href={{
                                                pathname: '/updatePointA',
                                                query: {id: point.id}
                                            }}>
                                                <a>
                                                    <button>Изменить</button>
                                                </a>
                                            </Link>
                                        </div>
                                    )}
                                    <h3>Ниже даны тестовые вопросы.</h3> 
                                    <p>Они могут вам помочь понять, насколько этот 
                                        курс соотвествует вашему уровню знаний. Для этого ответьте правильно более, 
                                        чем на половину вопросов.</p>
                                    <Link href={{
                                        pathname: '/testPointA',
                                        query: {id: this.props.id}
                                        }}>
                                        <a>
                                            <button>Составить тест</button>
                                         </a>
                                    </Link>
                                    {data.coursePage.pointATests.length > 0 ?
                                        <>
                                            {data.coursePage.pointATests.map(test => 
                                            <PointATest 
                                                key={test.id}  
                                                data={test}
                                                me={me}
                                            />
                                            )}
                                        </>
                                        :
                                        <Center>
                                            <h2>Тестов пока нет</h2>
                                        </Center>
                                    }
                                </TextBar>
                            </Center>
                        );
                    }}
              </Query>
            )}
          </User>
        );
    }
}

export default PointA;