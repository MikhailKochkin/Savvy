import React, { Component } from 'react';
import styled from 'styled-components';
import Courses from '../components/course/Courses';
import Banner from '../components/Banner';
import User from '../components/User';
import CareerTrackMenu from '../components/career/CareerTrackMenu'
import CareerTrackMap from '../components/career/CareerTrackMap'

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
    flex-basis: 70%;
    background-color: white;
    border-radius: 2px;
    @media (max-width: 700px) {
        order: 2;
    }
`;

const CareerStyles = styled.div`
    flex-basis: 30%;
    margin-right: 2rem;
    margin-left: 0;
    @media (max-width: 700px) {
        order: 1;
    }
`;

class Home extends Component {
    render() {
        return (
            <HomeStyles>
              <User>
                {({data: {me}}) => (  
                    <>
                        <Menu>
                            <CareerStyles>
                                {!me && <CareerTrackMenu/> }
                                {me && !me.careerTrack && <CareerTrackMenu me={me}/>}
                                {me && me.careerTrack && <CareerTrackMenu me={me}/>}
                            </CareerStyles>
                            <CoursesStyles>
                                <Courses me={me}/>
                            </CoursesStyles>
                        </Menu>
                        {/* Do not remove me !== null, otherwise " Cannot read property 'careerTrack' of null" */}
                        {me === null && <Banner/>}
                        {me !== null && me.careerTrackID === null && <Banner/>}
                        {me !== null && me.careerTrackID !== null && <CareerTrackMap data={me.careerTrackID}/>}
                    </>
                )}
            </User>
          </HomeStyles>
        )
    }
}


export default Home;