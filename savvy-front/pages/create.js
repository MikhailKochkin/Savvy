import React, { Component } from 'react';
import styled from 'styled-components';
import CreateCourse from '../components/course/CreateCourse';
import CreateSandbox from '../components/sandbox/CreateSandbox';
import PleaseSignIn from '../components/PleaseSignIn';


const HomeStyles = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Button = styled.button`
    background-color: ${props => props.active ? "#122557" : "white"};
    color: ${props => props.active ? "white" : "black"};
`;

const Buttons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    Button {
        width: 25%;
    }
`;

class CreateCoursePage extends Component {
  state = {
    page: 'course',
    button1: true,
    button2: false
  }
  onCourse = () => {this.setState({page: "course", button1: true, button2: false})}
  onSandBox = () => {this.setState({page: "sandbox", button1: false, button2: true})}

  render() {
    return (
        <div>
          <PleaseSignIn>
          <HomeStyles>
            <Buttons>
              <Button
                onClick = {this.onCourse}
                active={this.state.button1}
              >
              <h1>Создать курс</h1>
              </Button>
              <Button
                onClick = {this.onSandBox}
                active={this.state.button2}
              >
              <h1>Создать песочницу</h1>
              </Button>
            </Buttons>
              {this.state.page === 'course' ? 
                  <CreateCourse/>
              :
              <CreateSandbox/>
              }
            </HomeStyles>
          </PleaseSignIn>
        </div>
    )
  }
}

export default CreateCoursePage;