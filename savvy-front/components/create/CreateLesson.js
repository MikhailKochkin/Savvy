import React, { Component } from "react";
import styled from "styled-components";
import CreateLes from "./CreateLes";

const Width = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 3%;
`;

const Container = styled.div`
  width: 40%;
  margin: 3% 0;
  input {
    height: 50%;
    width: 100%;
    margin: 1% 0;
    border: 1px solid #e5e5e5;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.6rem;
    outline: 0;
  }
  input.model {
    height: 15px;
    width: 15px;
    margin: 0px;
    margin-right: 15px;
    /* margin: 1% 0;
    border: 1px solid #e5e5e5;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.6rem;
    outline: 0; */
  }
  @media (max-width: 850px) {
    width: 85%;
  }
`;

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
`;

const Span = styled.span`
  cursor: pointer;
  text-decoration: ${(props) => (props.selected ? "underline" : "none")};
`;

export default class CreateLesson extends Component {
  state = {
    page: "lesson",
  };
  render() {
    const { id } = this.props;
    return (
      <Width>
        <Container>
          <Title>
            <Span>New Lesson</Span>{" "}
          </Title>
          <CreateLes id={id} />
        </Container>
      </Width>
    );
  }
}
