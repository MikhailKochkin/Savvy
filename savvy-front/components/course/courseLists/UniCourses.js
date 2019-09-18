import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import UniCoursesList from "./UniCoursesList";

const Container = styled.div``;

const Switch = styled.button`
  padding: 0.5%;
  background: white;
  font-size: 1.8rem;
  position: relative;
  cursor: pointer;
  border: ${props =>
    props.active ? "1.5px solid #112A62" : "1px solid #C4C4C4"};
  border-radius: 8px;
  width: auto;
  outline: 0;
  margin-right: 20px;
  @media (max-width: 800px) {
    padding: 1.5%;
  }
`;

const Message = styled.div`
  font-size: 1.8rem;
  margin-top: 2%;
  border-bottom: 2px solid #112a62;
  width: 32%;
  a {
    color: #112a62;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`;

class UniCourses extends Component {
  state = {
    uni: ["МГИМО"],
    active: "МГИМО"
  };

  switch = e => {
    const { value } = e.target;
    this.setState({ active: value });
  };

  render() {
    const { me } = this.props;
    const { uni, active } = this.state;

    return (
      <Container>
        <Buttons>
          {uni.map(uni => (
            <Switch onClick={this.switch} value={uni} active={uni === active}>
              {uni}
            </Switch>
          ))}
        </Buttons>
        <UniCoursesList me={me} title={active} />
      </Container>
    );
  }
}

export default UniCourses;
