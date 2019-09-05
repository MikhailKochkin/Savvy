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

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`;

class CommunityCourses extends Component {
  state = {
    communities: ["Кейс-клуб МГУ", "Мародеры"],
    active: "Кейс-клуб МГУ"
  };

  switch = e => {
    const { value } = e.target;
    this.setState({ active: value });
  };

  render() {
    const { me } = this.props;
    const { communities, active } = this.state;

    return (
      <Container>
        <Buttons>
          {communities.map(com => (
            <Switch onClick={this.switch} value={com} active={com === active}>
              {com}
            </Switch>
          ))}
        </Buttons>
        {/* <UniCoursesList me={me} title={active} /> */}
      </Container>
    );
  }
}

export default CommunityCourses;
