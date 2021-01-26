import React, { Component } from "react";
import styled from "styled-components";
import CreateCourse from "../components/course/CreateCourse";
import PleaseSignIn from "../components/auth/PleaseSignIn";

const HomeStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
