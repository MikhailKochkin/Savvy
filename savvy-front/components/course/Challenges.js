import React, { Component } from "react";
import { useUser } from "../User";
import styled from "styled-components";
import ChallengesList from "./courseLists/ChallengesList";

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
            <ChallengesList me={me} />
          </Container>
        )}
      </User>
    );
  }
}

export default Communities;
