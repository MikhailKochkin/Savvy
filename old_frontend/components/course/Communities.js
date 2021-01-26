import React, { Component } from "react";
import { useUser } from "../User";
import styled from "styled-components";
import CommunityCourses from "./courseLists/CommunityCourses";
import UniCourses from "./courseLists/UniCourses";

const Container = styled.div`
  padding: 2% 4%;
  border: none;
`;

class Communities extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Container>
            <UniCourses me={me} />
            {/* <CommunityCourses me={me} /> */}
          </Container>
        )}
      </User>
    );
  }
}

export default Communities;
