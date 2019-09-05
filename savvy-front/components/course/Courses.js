import React, { Component } from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import CareerCoursesList from "./courseLists/CareerCoursesList";
import ForMoneyCoursesList from "./courseLists/ForMoneyCoursesList";
import FreeCoursesList from "./courseLists/FreeCoursesList";
import Articles from "../article/Articles";
import CareerTrackMenu from "../career/CareerTrackMenu";
import User from "../User";

const Container = styled.div`
  padding: 2% 4%;
  border: none;
`;

class Courses extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Container>
            {me && me.careerTrackID && <CareerTrackMenu me={me} />}
            {me && me.careerTrackID && <CareerCoursesList me={me} />}
            <ForMoneyCoursesList me={me} />
            <FreeCoursesList me={me} />
            <Articles me={me} />
          </Container>
        )}
      </User>
    );
  }
}

export default Courses;
