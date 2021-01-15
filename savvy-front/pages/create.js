import React, { Component } from "react";
import styled from "styled-components";
import CreateCourse from "../components/course/CreateCourse";
import PleaseSignIn from "../components/auth/PleaseSignIn";
import { useUser } from "../components/User";

const HomeStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CreateCoursePage = () => {
  const me = useUser();
  return (
    <PleaseSignIn>
      <HomeStyles>
        <CreateCourse me={me} />
      </HomeStyles>
    </PleaseSignIn>
  );
};

export default CreateCoursePage;
