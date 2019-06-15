import React, { Component } from 'react';
import Router from 'next/router';
import styled from 'styled-components';

const MenuStyle = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #F2F2F2;
  border-bottom: 1px solid #152A5E;
  padding-left: 4%;
  padding-right: 4%;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Title = styled.a`
  font-size: 1.8rem;
  color: black;
  cursor: pointer;
  &:hover {
    color: #6DAAE1;
  }
`;

const Mail = styled.a`
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #6DAAE1;
  }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 1%;
    flex-basis: 33.3%;
    @media (max-width: 600px) {
      text-align: left;
  }
`;

class Menu extends Component {
    render() {
        let paidCourses = [];
        let freeCourses = []
        let uniCourses = []

        const data = this.props.courses;
        // data.map(course => (
        //     course.courseType == "PRIVATE" ? paidCourses.push(course) : null 
        // ))
        data.map(course => (
            course.courseType == "PUBLIC" ? freeCourses.push(course) : null 
        ))
        data.map(course => (
          course.courseType == "FORMONEY" ? paidCourses.push(course) : null 
      ))
        return (
            <MenuStyle>
                <Column>
                  <h3>Платные курсы:</h3>
                  {paidCourses.map(coursePage =>
                  <Title 
                    key={coursePage.id} 
                    onClick={() => 
                        Router.push({
                          pathname: '/coursePage',
                          query: { id: coursePage.id },
                        })
                    }>
                    {coursePage.title}
                  </Title>
                  )}
                </Column>
                <Column>
                  <h3>Бесплатные курсы:</h3>
                  {freeCourses.map(coursePage =>
                  <Title 
                    key={coursePage.id} 
                    onClick={() => 
                        Router.push({
                          pathname: '/coursePage',
                          query: { id: coursePage.id },
                        })
                    }>
                    {coursePage.title}
                  </Title>
                  )}
                </Column>
                <Column>
                  <h3>Курсы университетов:</h3>
                  {/* {uniCourses.map(coursePage => */}
                  <Title 
                    // key={coursePage.id} 
                    // onClick={() => 
                    //     Router.push({
                    //       pathname: '/coursePage',
                    //       query: { id: coursePage.id },
                    //     })
                    // }
                  >
                    {/* {coursePage.title} */} Готовим к сентябрю! 
                  </Title>
                  <p>Если вы хотите с нами сотрудничать на уровне университетов, <Mail href="mailto:mikhailkochkin@savvvy.app">напишите нам!</Mail></p>
                  {/* )} */}
                </Column>
            </MenuStyle> 
        );
    }
}

export default Menu;