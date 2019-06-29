import React, { Component } from 'react';
import styled from 'styled-components';
import Courses from './Courses';
import Banner from '../Banner';
import User from '../User';
import CareerTrackMenu from '../career/CareerTrackMenu'
import CareerTrackMap from '../career/CareerTrackMap'

const HomeStyles = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

const CoursesStyles = styled.div`
    flex-basis: 65%;
    background-color: white;
    border-radius: 2px;
    @media (max-width: 700px) {
        order: 2;
    }
`;

const CareerStyles = styled.div`
    flex-basis: 35%;
    margin-left: 1rem;
    @media (max-width: 700px) {
        order: 1;
    }
`;

class HomePage extends Component {
    render() {
        return (
            <HomeStyles>
              <User>
                {({data: {me}}) => (  
                    <>
                        {/* Do not remove me !== null, otherwise " Cannot read property 'careerTrack' of null" */}
                        {/* {me === null && <Banner/>}
                        {me !== null && me.careerTrack === null && <Banner/>}
                        {me !== null && me.careerTrack !== null && <CareerTrackMap data={me.careerTrack.id}/>} */}
                         <Menu>
                             <CoursesStyles>
                                 <Courses me={me}/>
                             </CoursesStyles>
                        {/* <CareerStyles>
                                {me === null && <CareerTrackMenu/>}
                                {me !== null && !me.careerTrack && <CareerTrackMenu me={me}/>}
                                {me !== null && me.careerTrack && <CareerTrackMenu me={me}/>}
                             </CareerStyles> */}
                         </Menu>
                    </>
                )}
            </User>
          </HomeStyles>
        )
    }
}


export default HomePage;