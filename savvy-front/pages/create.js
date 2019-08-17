import React, { Component } from "react";
import styled from "styled-components";
import CreateCourse from "../components/course/CreateCourse";
import CreateSandbox from "../components/sandbox/CreateSandbox";
import PleaseSignIn from "../components/auth/PleaseSignIn";

const HomeStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Button = styled.button`
  background-color: ${props => (props.active ? "#122557" : "white")};
  color: ${props => (props.active ? "white" : "black")};
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  button {
    width: 25%;
  }
  @media (max-width: 800px) {
    button {
      font-size: 1rem;
      width: 45%;
    }
  }
  @media (max-width: 500px) {
    button {
      font-size: 0.7rem;
      display: inline-block;
      /* width: 100%; */
    }
  }
`;

class CreateCoursePage extends Component {
  render() {
    return (
      <div>
        <PleaseSignIn>
          <HomeStyles>
            <CreateCourse />
          </HomeStyles>
        </PleaseSignIn>
      </div>
    );
  }
}

export default CreateCoursePage;
