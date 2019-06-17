import React, { Component } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import CareerCoursesList from './CareerCoursesList';
import ForMoneyCoursesList from './ForMoneyCoursesList';
import FreeCoursesList from './FreeCoursesList';


const Center = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    &{
        padding-left: 5%;
    }
    @media (max-width: 800px) {
        & {
        padding-left: 0;
        text-align: center;
      } 
    }
`;

class Courses extends Component {

  render() {
    let me = this.props.me
    return (
      <Center>
          { me && me.careerTrack &&
            <CareerCoursesList me={me} />
          }
          <ForMoneyCoursesList me={me}/>
          <FreeCoursesList me={me}/>
       
      </Center>  
    );
  }
}

export default Courses;
