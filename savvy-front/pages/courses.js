import React, { Component } from 'react';
import Courses from '../components/course/Courses';
import Banner from '../components/Banner';
import User from '../components/User';
import Sandboxes from '../components/sandbox/Sandboxes';
import styled from 'styled-components';

const HomeStyles = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Button = styled.button`
    background-color: ${props => props.active ? "#122557" : "white"};
    color: ${props => props.active ? "white" : "black"};
    cursor: pointer;
`;

const Buttons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    Button {
        width: 25%;
    }
    @media (max-width: 800px) {
        Button {
            font-size: 1rem;
        }
    }
    @media (max-width: 500px) {
        Button {
            font-size: 0.7rem;
        }
    }
`;

class Home extends Component {
    state = {
        page: 'course',
        button1: true,
        button2: false
    }
    onCourse = () => {this.setState({page: "course", button1: true, button2: false})}
    onSandBox = () => {this.setState({page: "sandbox", button1: false, button2: true})}

    render() {
        return (
            <HomeStyles>
              <User>
                {({data: {me}}) => (  
                    <> 
                        <Banner/>
                        <Buttons>
                            <Button
                                onClick = {this.onCourse}
                                active={this.state.button1}
                            >
                                <h1>Курсы</h1>
                            </Button>
                            <Button
                                onClick = {this.onSandBox}
                                active={this.state.button2}
                            >
                                <h1>Песочницы</h1>
                            </Button>
                        </Buttons>
                        {this.state.page === 'course' ? 
                            <Courses page={parseFloat(this.props.query.page) || 1}/>
                        :
                            <Sandboxes page={parseFloat(this.props.query.page) || 1}/>
                        }
                    </>
                )}
            </User>
          </HomeStyles>
        )
    }
}


export default Home;